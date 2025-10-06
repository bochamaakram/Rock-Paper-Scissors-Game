# 🎮 Rock Paper Scissors Game (React Native)

**A fun, interactive Rock-Paper-Scissors mobile game built with React Native and TypeScript.
Play against the computer, beat the countdown timer, and see who reaches 5 points first!**

## 🚀 Features

✅ **Classic gameplay — Rock beats Scissors, Scissors beats Paper, Paper beats Rock.**

✅ **Countdown timer — You have 10 seconds to make a move, or you lose the round!**

✅ **Dynamic scoring system — First to reach 5 points wins the game.**

✅ **Automatic game-over handling — Alerts and visual messages when the game ends.**

✅ **Reset button — Instantly restart the game at any time.**

✅ **Modern UI — Clean design using icons from FontAwesome and FontAwesome5.**

## 🧠 Game Logic

Player chooses between Rock, Paper, or Scissors.

The computer randomly selects one.

The winner is determined by standard rules:

🪨 Rock beats Scissors

📄 Paper beats Rock

✂️ Scissors beats Paper

If the player doesn’t choose within 10 seconds, the computer wins that round.

The first to reach 5 points wins the game.

## 🛠️ Tech Stack

**React Native**

**TypeScript**

**react-native-vector-icons (FontAwesome, FontAwesome5)**

**React Hooks (useState, useEffect, useCallback)**

📱 Screens & UI Overview
🏠 Main Screen

Displays title, scoreboard, and reset button.

Shows the current result and computer’s choice.

Countdown timer visible at the bottom.

✊✋✌️ **Player Choices**

Touchable buttons for Rock, Paper, and Scissors with icons.

Disabled after game over.

🕹️ **Game End**

Alert displays "You won!" or "You lost!".

All inputs disabled until you press the reset button.

🔄 Gameplay Flow

You start with 10 seconds to choose a weapon.

The computer automatically picks after your choice (or when time runs out).

Scores update instantly with results displayed.

The game ends when either player reaches 5 points.

Tap Reset 🔄 to start again.

## ⚙️ How to Run
1️⃣ Clone the Repository

    git clone https://github.com/yourusername/rock-paper-scissors-reactnative.git
    cd rock-paper-scissors-reactnative

2️⃣ Install Dependencies

    npm install

3️⃣ Run the App

    npx react-native start


In another terminal:

    npx react-native run-android
    or
    npx react-native run-ios


# this is but a project to put what i learned i in raect-native in action 
