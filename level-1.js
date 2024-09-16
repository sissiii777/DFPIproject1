// Global variables
//let playerIndex = 0;
//let targetIndex = 0;
//const totalBoxes = 20;

function setup() {
  //执行后面写的函数
  createGrid();
}

// 创建20个方格并随即设定"player"和"target"
function createGrid() {
  document.getElementById('grid');
  grid.innerHTML = ''; // 先清0
  
  // 生成随机位置
  playerIndex = Math.floor(Math.random() * totalBoxes);
  do {
    targetIndex = Math.floor(Math.random() * totalBoxes);
  } while (playerIndex === targetIndex); // 确保"player"和"target"位置不重合
  
  // 在这里写了一个融合BOX&player&target的呈现
  for (let i = 0; i < totalBoxes; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    if (i === playerIndex) {
      box.classList.add('player');
    } else if (i === targetIndex) {
      box.classList.add('target');
    }
    grid.appendChild(box);
  }
}

// 控制玩家位置
function keyPressed() {
  const grid = document.getElementById('grid');
  grid.childNodes[playerIndex].classList.remove('player'); // Remove player class from current position
  
  if (key === '1') {
    // 左3
    playerIndex = (playerIndex - 3 + totalBoxes) % totalBoxes;
  } else if (key === '2') {
    // 左1
    playerIndex = (playerIndex - 1 + totalBoxes) % totalBoxes;
  } else if (key === '0') {
    // 右3
    playerIndex = (playerIndex + 3) % totalBoxes;
  } else if (key === '9') {
    // 右1
    playerIndex = (playerIndex + 1) % totalBoxes;
  }
  
  // 看player有没有碰到target，碰到后分数+1
  if (playerIndex === targetIndex) {
    increaseScore();
    
    // 碰到target后原有的target消失
    grid.childNodes[targetIndex].classList.remove('target');
    
    // 生成新的target，确保不和player重合
    do {
      targetIndex = Math.floor(Math.random() * totalBoxes);
    } while (playerIndex === targetIndex); // Ensure player and target are not the same
  }
  
  // Add player class to the new position
  grid.childNodes[playerIndex].classList.add('player');
  grid.childNodes[targetIndex].classList.add('target'); // Add the target class to the new position
}

window.setup = setup;
window.keyPressed = keyPressed;