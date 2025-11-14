# Tetris Game

A classic Tetris game implementation with modern design and smooth gameplay.

## Features

- **Classic Tetris Gameplay**: All standard Tetris mechanics including rotation, line clearing, and scoring
- **Progressive Difficulty**: Game speed increases as you level up
- **Beautiful UI**: Modern gradient design with smooth animations
- **Next Piece Preview**: See what's coming next to plan your strategy
- **Score & Statistics**: Track your score, lines cleared, and current level
- **Responsive Controls**: Smooth keyboard controls for the best gaming experience

## How to Play

1. Open `tetris.html` in your web browser
2. Click "Start Game" to begin
3. Use keyboard controls to play:
   - **← →**: Move piece left/right
   - **↑**: Rotate piece
   - **↓**: Soft drop (move down faster)
   - **Space**: Hard drop (instant drop)
   - **P**: Pause/Resume game

## Game Rules

- Clear horizontal lines by filling them completely
- Game ends when pieces stack to the top
- Score points by:
  - Clearing lines (more lines at once = more points)
  - Soft drop (1 point per row)
  - Hard drop (2 points per row)

## Scoring System

- 1 line: 100 points × level
- 2 lines: 300 points × level
- 3 lines: 500 points × level
- 4 lines: 800 points × level

## Level System

- Start at Level 1
- Level up every 10 lines cleared
- Each level increases the falling speed
- Higher levels = higher score multipliers

## Technical Details

- Pure HTML5, CSS3, and JavaScript
- No external dependencies
- Canvas-based rendering for smooth performance
- Responsive design works on different screen sizes

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## Tips for High Scores

1. Plan ahead using the next piece preview
2. Clear multiple lines at once for bonus points
3. Use hard drop for extra points when you know where the piece should go
4. Keep the stack low and even to avoid game over
5. Focus on creating Tetris (4 lines at once) for maximum points

Enjoy the game!
