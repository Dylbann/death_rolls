# Death Rolls (Foundry VTT Module)

A simple Foundry VTT module that adds **Death Rolls** to the chat.  
This mechanic starts with a large die (default `d100`) and keeps rolling smaller and smaller dice until someone rolls a **1**, ending the game.  

---

## ⚙️ Features
- Adds a `/deathrolls` chat command to start a Death Roll session.  
- Prompts the user for a starting die size (default `100`).  
- Posts a **Roll Death Roll** button in chat that *anyone* can click.  
- Rolls are always **public** so all players see the results.  
- Old buttons automatically disable after being clicked.  
- Keeps posting new buttons with the updated die size until a **1** is rolled.  
- Ends with a dramatic **💀 Game Over!** message when the 1 is rolled.  

---

## 📦 Installation

1. Clone or download this repository into your Foundry VTT `modules/` directory.  
   ```bash
   git clone https://github.com/Dylbann/death-rolls.git
