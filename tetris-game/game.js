// Game Constants
const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = {
    I: '#00f0f0',
    O: '#f0f000',
    T: '#a000f0',
    S: '#00f000',
    Z: '#f00000',
    J: '#0000f0',
    L: '#f0a000',
    EMPTY: '#1a1a2e',
    GRID: '#2a2a3e'
};

// Tetromino shapes
const SHAPES = {
    I: [
        [[0, 0, 0, 0],
         [1, 1, 1, 1],
         [0, 0, 0, 0],
         [0, 0, 0, 0]]
    ],
    O: [
        [[1, 1],
         [1, 1]]
    ],
    T: [
        [[0, 1, 0],
         [1, 1, 1],
         [0, 0, 0]],
        [[0, 1, 0],
         [0, 1, 1],
         [0, 1, 0]],
        [[0, 0, 0],
         [1, 1, 1],
         [0, 1, 0]],
        [[0, 1, 0],
         [1, 1, 0],
         [0, 1, 0]]
    ],
    S: [
        [[0, 1, 1],
         [1, 1, 0],
         [0, 0, 0]],
        [[0, 1, 0],
         [0, 1, 1],
         [0, 0, 1]]
    ],
    Z: [
        [[1, 1, 0],
         [0, 1, 1],
         [0, 0, 0]],
        [[0, 0, 1],
         [0, 1, 1],
         [0, 1, 0]]
    ],
    J: [
        [[1, 0, 0],
         [1, 1, 1],
         [0, 0, 0]],
        [[0, 1, 1],
         [0, 1, 0],
         [0, 1, 0]],
        [[0, 0, 0],
         [1, 1, 1],
         [0, 0, 1]],
        [[0, 1, 0],
         [0, 1, 0],
         [1, 1, 0]]
    ],
    L: [
        [[0, 0, 1],
         [1, 1, 1],
         [0, 0, 0]],
        [[0, 1, 0],
         [0, 1, 0],
         [0, 1, 1]],
        [[0, 0, 0],
         [1, 1, 1],
         [1, 0, 0]],
        [[1, 1, 0],
         [0, 1, 0],
         [0, 1, 0]]
    ]
};

// Game State
class TetrisGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.nextPieceCanvas = document.getElementById('next-piece-canvas');
        this.nextPieceCtx = this.nextPieceCanvas.getContext('2d');

        this.board = this.createBoard();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.isRunning = false;

        this.currentPiece = null;
        this.nextPiece = null;
        this.currentX = 0;
        this.currentY = 0;
        this.currentRotation = 0;

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;

        this.setupControls();
        this.updateDisplay();
    }

    createBoard() {
        return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    }

    setupControls() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.getElementById('start-button').addEventListener('click', () => this.startGame());
        document.getElementById('pause-button').addEventListener('click', () => this.togglePause());
        document.getElementById('restart-button').addEventListener('click', () => this.restartGame());
    }

    handleKeyPress(e) {
        if (!this.isRunning || this.gameOver || this.isPaused) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.moveLeft();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.moveRight();
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveDown();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.rotate();
                break;
            case ' ':
                e.preventDefault();
                this.hardDrop();
                break;
            case 'p':
            case 'P':
                e.preventDefault();
                this.togglePause();
                break;
        }
    }

    startGame() {
        this.board = this.createBoard();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.gameOver = false;
        this.isPaused = false;
        this.isRunning = true;

        this.currentPiece = this.createRandomPiece();
        this.nextPiece = this.createRandomPiece();
        this.spawnPiece();

        document.getElementById('start-button').disabled = true;
        document.getElementById('pause-button').disabled = false;
        document.getElementById('game-over-overlay').classList.add('hidden');

        this.updateDisplay();
        this.lastTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    togglePause() {
        if (!this.isRunning || this.gameOver) return;

        this.isPaused = !this.isPaused;
        const pauseButton = document.getElementById('pause-button');
        pauseButton.textContent = this.isPaused ? 'Resume' : 'Pause';

        if (!this.isPaused) {
            this.lastTime = performance.now();
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    restartGame() {
        this.startGame();
    }

    createRandomPiece() {
        const pieces = Object.keys(SHAPES);
        const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
        return {
            type: randomPiece,
            shape: SHAPES[randomPiece],
            color: COLORS[randomPiece]
        };
    }

    spawnPiece() {
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.createRandomPiece();
        this.currentRotation = 0;
        this.currentX = Math.floor(COLS / 2) - Math.floor(this.getCurrentShape()[0].length / 2);
        this.currentY = 0;

        if (this.checkCollision(this.currentX, this.currentY, this.getCurrentShape())) {
            this.endGame();
        }

        this.drawNextPiece();
    }

    getCurrentShape() {
        return this.currentPiece.shape[this.currentRotation];
    }

    checkCollision(x, y, shape) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const newX = x + col;
                    const newY = y + row;

                    if (newX < 0 || newX >= COLS || newY >= ROWS) {
                        return true;
                    }

                    if (newY >= 0 && this.board[newY][newX]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    moveLeft() {
        if (!this.checkCollision(this.currentX - 1, this.currentY, this.getCurrentShape())) {
            this.currentX--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.checkCollision(this.currentX + 1, this.currentY, this.getCurrentShape())) {
            this.currentX++;
            this.draw();
        }
    }

    moveDown() {
        if (!this.checkCollision(this.currentX, this.currentY + 1, this.getCurrentShape())) {
            this.currentY++;
            this.dropCounter = 0;
            this.draw();
            return true;
        } else {
            this.lockPiece();
            return false;
        }
    }

    hardDrop() {
        while (this.moveDown()) {
            this.score += 2;
        }
        this.updateDisplay();
    }

    rotate() {
        const nextRotation = (this.currentRotation + 1) % this.currentPiece.shape.length;
        const nextShape = this.currentPiece.shape[nextRotation];

        if (!this.checkCollision(this.currentX, this.currentY, nextShape)) {
            this.currentRotation = nextRotation;
            this.draw();
        } else {
            // Wall kick - try moving left or right
            if (!this.checkCollision(this.currentX - 1, this.currentY, nextShape)) {
                this.currentX--;
                this.currentRotation = nextRotation;
                this.draw();
            } else if (!this.checkCollision(this.currentX + 1, this.currentY, nextShape)) {
                this.currentX++;
                this.currentRotation = nextRotation;
                this.draw();
            }
        }
    }

    lockPiece() {
        const shape = this.getCurrentShape();
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const boardY = this.currentY + row;
                    const boardX = this.currentX + col;
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.color;
                    }
                }
            }
        }

        this.clearLines();
        this.spawnPiece();
    }

    clearLines() {
        let linesCleared = 0;

        for (let row = ROWS - 1; row >= 0; row--) {
            if (this.board[row].every(cell => cell !== 0)) {
                this.board.splice(row, 1);
                this.board.unshift(Array(COLS).fill(0));
                linesCleared++;
                row++;
            }
        }

        if (linesCleared > 0) {
            this.lines += linesCleared;

            // Scoring system
            const lineScores = [0, 100, 300, 500, 800];
            this.score += lineScores[linesCleared] * this.level;

            // Level up every 10 lines
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);

            this.updateDisplay();
        }
    }

    updateDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lines').textContent = this.lines;
    }

    endGame() {
        this.gameOver = true;
        this.isRunning = false;

        document.getElementById('start-button').disabled = false;
        document.getElementById('pause-button').disabled = true;
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-over-overlay').classList.remove('hidden');
    }

    gameLoop(time) {
        if (!this.isRunning || this.gameOver || this.isPaused) return;

        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += deltaTime;

        if (this.dropCounter > this.dropInterval) {
            this.moveDown();
            this.dropCounter = 0;
        }

        this.draw();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = COLORS.EMPTY;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.ctx.strokeStyle = COLORS.GRID;
        this.ctx.lineWidth = 0.5;
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                this.ctx.strokeRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }

        // Draw locked pieces
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                if (this.board[row][col]) {
                    this.drawBlock(col, row, this.board[row][col]);
                }
            }
        }

        // Draw current piece
        if (this.currentPiece) {
            const shape = this.getCurrentShape();
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        this.drawBlock(
                            this.currentX + col,
                            this.currentY + row,
                            this.currentPiece.color
                        );
                    }
                }
            }
        }
    }

    drawBlock(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * BLOCK_SIZE + 1,
            y * BLOCK_SIZE + 1,
            BLOCK_SIZE - 2,
            BLOCK_SIZE - 2
        );

        // Add highlight for 3D effect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.fillRect(
            x * BLOCK_SIZE + 1,
            y * BLOCK_SIZE + 1,
            BLOCK_SIZE - 2,
            4
        );
    }

    drawNextPiece() {
        const canvas = this.nextPieceCanvas;
        const ctx = this.nextPieceCtx;

        // Clear canvas
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!this.nextPiece) return;

        const shape = this.nextPiece.shape[0];
        const blockSize = 25;
        const offsetX = (canvas.width - shape[0].length * blockSize) / 2;
        const offsetY = (canvas.height - shape.length * blockSize) / 2;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    ctx.fillStyle = this.nextPiece.color;
                    ctx.fillRect(
                        offsetX + col * blockSize + 1,
                        offsetY + row * blockSize + 1,
                        blockSize - 2,
                        blockSize - 2
                    );

                    // Add highlight
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.fillRect(
                        offsetX + col * blockSize + 1,
                        offsetY + row * blockSize + 1,
                        blockSize - 2,
                        3
                    );
                }
            }
        }
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    game = new TetrisGame();
});
