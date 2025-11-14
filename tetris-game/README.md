# Tetris Game

A fully functional, classic Tetris game built with vanilla HTML, CSS, and JavaScript.

## Features

- **Classic Tetris gameplay** with all 7 tetromino shapes (I, O, T, S, Z, J, L)
- **Smooth controls** with keyboard input
- **Scoring system** with increasing difficulty levels
- **Next piece preview** to plan your strategy
- **Modern, responsive design** with gradient backgrounds and smooth animations
- **Game over detection** with restart functionality
- **Pause/Resume** functionality
- **Line clearing** with visual feedback
- **Progressive difficulty** - game speeds up as you level up

## How to Play

### Starting the Game

1. Open `index.html` in your web browser
2. Click the "Start Game" button
3. Use the controls to play!

### Controls

- **← (Left Arrow)**: Move piece left
- **→ (Right Arrow)**: Move piece right
- **↓ (Down Arrow)**: Soft drop (move piece down faster)
- **↑ (Up Arrow)**: Rotate piece clockwise
- **Space**: Hard drop (instantly drop piece to bottom)
- **P**: Pause/Resume game

### Scoring

- **Single line**: 100 points × level
- **Double line**: 300 points × level
- **Triple line**: 500 points × level
- **Tetris (4 lines)**: 800 points × level
- **Hard drop**: 2 points per cell dropped

### Leveling Up

- Every 10 lines cleared increases your level
- Higher levels mean faster piece drops
- Maximum speed reached at level 10

## Game Mechanics

### Tetromino Shapes

The game includes all seven classic Tetris pieces:

- **I-piece** (Cyan): Straight line of 4 blocks
- **O-piece** (Yellow): 2×2 square
- **T-piece** (Purple): T-shaped piece
- **S-piece** (Green): S-shaped piece
- **Z-piece** (Red): Z-shaped piece
- **J-piece** (Blue): J-shaped piece
- **L-piece** (Orange): L-shaped piece

### Rotation System

- Pieces rotate clockwise with the up arrow
- Wall kicks allow rotation near edges when possible
- O-piece doesn't rotate (it's symmetrical)

### Game Over

The game ends when:
- A new piece spawns but cannot fit on the board
- This happens when blocks stack up to the top

## Technical Details

### Files Structure

```
tetris-game/
├── index.html      # Main HTML structure
├── styles.css      # Styling and animations
├── game.js         # Complete game logic
└── README.md       # This file
```

### Technologies Used

- **HTML5 Canvas** for game rendering
- **CSS3** for styling with gradients and animations
- **Vanilla JavaScript** (ES6+) for game logic
- **RequestAnimationFrame** for smooth game loop

### Game Architecture

The game uses an object-oriented approach with a `TetrisGame` class that handles:

- Board state management (10×20 grid)
- Piece generation and rotation
- Collision detection
- Line clearing algorithm
- Scoring and level progression
- Game loop with RequestAnimationFrame
- Keyboard input handling

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 (flexbox, gradients)

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

Potential features that could be added:

- Ghost piece (shows where piece will land)
- Hold piece functionality
- Touch controls for mobile devices
- Sound effects and music
- High score persistence (localStorage)
- Different game modes (Marathon, Sprint, Ultra)
- Multiplayer mode
- Customizable themes

## License

This project is open source and available for educational purposes.

## Credits

Created as a demonstration of vanilla JavaScript game development.
Based on the classic Tetris game created by Alexey Pajitnov in 1984.

---

Enjoy playing Tetris! 🎮
