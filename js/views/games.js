export default {
    render() {
        return `
            <div class="container animate-in">
                <div id="list-view">
                    <div class="tool-header" style="padding-top: 4rem;">
                        <h1>Mini Games</h1>
                        <p>Take a break and play some simple browser games.</p>
                    </div>

                    <div class="grid grid-2">
                        <div class="card animate-in" data-delay="1" style="--accent-color: var(--accent-games); cursor: pointer;" onclick="window.playGame('snake')">
                            <i class="fa-solid fa-staff-snake card-icon"></i>
                            <h3>Snake Game</h3>
                            <p>The classic snake game. Eat food, grow longer, don't hit the walls!</p>
                            <span class="btn btn-accent btn-sm">Play Game</span>
                        </div>

                        <div class="card animate-in" data-delay="2" style="--accent-color: var(--accent-games); cursor: pointer;" onclick="window.playGame('same')">
                            <i class="fa-solid fa-cubes card-icon"></i>
                            <h3>Same Game (Coming Soon)</h3>
                            <p>A simple tile-matching puzzle game.</p>
                            <span class="btn btn-accent btn-sm">Play Game</span>
                        </div>
                    </div>
                </div>

                <div id="game-view" style="display: none;">
                    <div class="animate-in">
                        <button class="btn btn-accent" style="margin-bottom: 1rem;" onclick="window.stopGame()"><i class="fa-solid fa-arrow-left"></i> Back to Games</button>
                        <div id="game-container" style="display: flex; justify-content: center; align-items: center; background: #0F172A; padding: 2rem; border-radius: var(--radius-card); box-shadow: var(--card-glow); flex-direction: column; border: 1px solid rgba(255,255,255,0.1);">
                            <!-- Game Canvas injected here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    postRender() {
        let snakeInterval;
        
        window.stopGame = () => {
             document.getElementById('list-view').style.display = 'block';
             document.getElementById('game-view').style.display = 'none';
             if (snakeInterval) clearInterval(snakeInterval);
        };
        
        window.playGame = (type) => {
            document.getElementById('list-view').style.display = 'none';
            document.getElementById('game-view').style.display = 'block';
            const gc = document.getElementById('game-container');
            
            if (type === 'snake') {
                gc.innerHTML = `
                    <h3 style="color: white; margin-bottom: 1rem;">Snake</h3>
                    <p style="color: #94A3B8; margin-bottom: 1rem;">Use Arrow Keys to move.</p>
                    <canvas id="snakeCanvas" width="400" height="400" style="background: #000; border: 2px solid white; border-radius: 4px;"></canvas>
                `;
                initSnakeGame();
            } else {
                gc.innerHTML = `
                    <h3 style="color: white; margin-bottom: 1rem;">Same Game</h3>
                    <p style="color: #94A3B8;">This game is currently under development!</p>
                `;
            }
        };

        function initSnakeGame() {
            const canvas = document.getElementById('snakeCanvas');
            if(!canvas) return;
            const ctx = canvas.getContext('2d');
            
            const box = 20;
            let snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };
            
            let food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
            
            let score = 0;
            let d;
            
            const keyHandler = (event) => {
                let key = event.keyCode;
                if( key == 37 && d != "RIGHT"){ d = "LEFT"; }
                else if(key == 38 && d != "DOWN"){ d = "UP"; }
                else if(key == 39 && d != "LEFT"){ d = "RIGHT"; }
                else if(key == 40 && d != "UP"){ d = "DOWN"; }
            };
            
            document.addEventListener("keydown", keyHandler);
            
            function collision(head, array){
                for(let i = 0; i < array.length; i++){
                    if(head.x == array[i].x && head.y == array[i].y) return true;
                }
                return false;
            }
            
            function draw() {
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, 400, 400);
                
                for(let i = 0; i < snake.length; i++){
                    ctx.fillStyle = (i == 0) ? "#F59E0B" : "white";
                    ctx.fillRect(snake[i].x, snake[i].y, box, box);
                    ctx.strokeStyle = "#000";
                    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
                }
                
                ctx.fillStyle = "red";
                ctx.fillRect(food.x, food.y, box, box);
                
                let snakeX = snake[0].x;
                let snakeY = snake[0].y;
                
                if( d == "LEFT") snakeX -= box;
                if( d == "UP") snakeY -= box;
                if( d == "RIGHT") snakeX += box;
                if( d == "DOWN") snakeY += box;
                
                if(snakeX == food.x && snakeY == food.y){
                    score++;
                    food = {
                        x: Math.floor(Math.random() * 19 + 1) * box,
                        y: Math.floor(Math.random() * 19 + 1) * box
                    }
                } else {
                    snake.pop();
                }
                
                let newHead = { x: snakeX, y: snakeY };
                
                if(snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)){
                    clearInterval(snakeInterval);
                    document.removeEventListener("keydown", keyHandler);
                    ctx.fillStyle = "white";
                    ctx.font = "30px Arial";
                    ctx.fillText("Game Over", 120, 200);
                    ctx.fillText("Score: " + score, 135, 240);
                    return;
                }
                
                snake.unshift(newHead);
                
                ctx.fillStyle = "white";
                ctx.font = "20px Arial";
                ctx.fillText("Score: " + score, box, 1.5 * box);
            }
            
            snakeInterval = setInterval(draw, 100);
        }
    }
}
