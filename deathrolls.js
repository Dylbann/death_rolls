Hooks.once("init", () => {
  console.log("Death Rolls | Initialized");
});

Hooks.once("ready", () => {
  console.log("Death Rolls | Ready");
});

// Listen for /deathrolls command in chat
Hooks.on("chatMessage", (chatLog, messageText, chatData) => {
  if (messageText.toLowerCase().startsWith("/deathrolls")) {
    openStartDialog();
    return false; 
  }
  return true;
});

function openStartDialog() {
  new foundry.applications.api.DialogV2({
    window: { title: "Start Death Roll" },
    content: `
      <div>
        <label>Starting Number: </label>
        <input type="number" id="deathroll-start" value="100" />
      </div>
    `,
    buttons: [
      {
        label: "Start",
        callback: (event, button, dialog) => {
          const start = parseInt(dialog.element.querySelector("#deathroll-start").value) || 100;
          postDeathRollButton(start);
        },
      },
    ],
  }).render(true);
}

function postDeathRollButton(start) {
  const content = `
    <div class="death-roll-container">
      <button class="death-roll-button" data-target="${start}">
        🎲 Roll Death Roll ${start}
      </button>
    </div>
  `;

  ChatMessage.create({
    user: game.user.id,
    speaker: { alias: "Death Roll" },
    content,
  });
}

async function doDeathRoll(target) {
  const roll = await (new Roll(`1d${target}`)).evaluate({ async: true });

  await roll.toMessage(
    {
      speaker: { alias: "Death Roll" },
      flavor: `Rolling 1-${target}...`,
    },
    { rollMode: "publicroll" }
  );

  if (roll.total === 1) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Player rolled 1 — game over
    await ChatMessage.create({
      speaker: { alias: "Death Roll" },
      content: `<strong>💀 Rolled a 1! Game over!</strong>`,
    });
  } else {
    // Show the next roll button
    postDeathRollButton(roll.total);
  }
}


Hooks.on("renderChatMessageHTML", (message, html, data) => {
  const button = html.querySelector(".death-roll-button");
  if (!button) return;

  button.addEventListener("click", async () => {
    const target = parseInt(button.dataset.target, 10);
    if (!isNaN(target)) {
      button.disabled = true;
      button.textContent = "🎲 Rolled!";
      
      await doDeathRoll(target);
    }
  });
});

