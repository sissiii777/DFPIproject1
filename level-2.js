// Global variables
//let playerIndex = 0;
//let targetIndex = 0;
//const totalBoxes = 20;
//let score = 0;

function setup() {
  //执行后面写的函数
  createGrid();
}

// 创建20个方格并随即设定"player"和"target"
function createGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';  // 先清空

  // 生成随机位置
  playerIndex = Math.floor(Math.random() * totalBoxes);
  do {
    targetIndex = Math.floor(Math.random() * totalBoxes);
  } while (playerIndex === targetIndex);  // 确保"player"和"target"位置不重合
  
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
function keyPressed(event) {
  const grid = document.getElementById('grid');
  grid.childNodes[playerIndex].classList.remove('player');  // 从当前玩家位置移除 'player' 类

  // 控制玩家的移动
  if (key === '1') {
    playerIndex = (playerIndex - 3 + totalBoxes) % totalBoxes; // 左3
  } else if (key === '2') {
    playerIndex = (playerIndex - 1 + totalBoxes) % totalBoxes; // 左1
  } else if (key === '0') {
    playerIndex = (playerIndex + 3) % totalBoxes; // 右3
  } else if (key === '9') {
    playerIndex = (playerIndex + 1) % totalBoxes; // 右1
  }

  // 检查玩家是否与目标重合，若重合则分数+1
  if (playerIndex === targetIndex) {
    score++;
    document.getElementById('score').innerText = score; // 更新分数显示
    
    // 移除旧目标
    grid.childNodes[targetIndex].classList.remove('target');
    
  // 生成新的目标，确保不与玩家位置重合
    do {
      targetIndex = Math.floor(Math.random() * totalBoxes);
    } while (playerIndex === targetIndex);
  }

  // 更新玩家和目标的位置
  grid.childNodes[playerIndex].classList.add('player');
  grid.childNodes[targetIndex].classList.add('target');
}

// 每秒随机移动 "target"，并确保其不会与 "player" 重合
function moveTarget() {
  const grid = document.getElementById('grid');
  grid.childNodes[targetIndex].classList.remove('target');  // 移除旧位置的 'target' 类

  let moveDirection = Math.random() < 0.5 ? -1 : 1;// 随机选择左移或右移

  // 检查 target 是否在 player 的旁边
  if (Math.abs(targetIndex - playerIndex) === 1 || Math.abs(targetIndex - playerIndex) === totalBoxes - 1) {
    moveDirection = targetIndex > playerIndex ? 1 : -1;// 如果相邻，则向远离玩家的方向移动
  }

  // 移动 target，并确保不与 player 重合
  let newTargetIndex = (targetIndex + moveDirection + totalBoxes) % totalBoxes;
  if (newTargetIndex === playerIndex) {
    newTargetIndex = (targetIndex - moveDirection + totalBoxes) % totalBoxes;     // 如果移动后与玩家重合，则向相反方向移动
  }
  
  // 更新 target 的位置
  targetIndex = newTargetIndex; 
  grid.childNodes[targetIndex].classList.add('target'); 
}

// 设置定时器，每秒调用 moveTarget 函数一次
setInterval(moveTarget, 1000);

window.addEventListener('keydown', keyPressed);
window.onload = setup;
window.keyPressed = keyPressed;

document.getElementById('score').innerText = score; // 更新分数显示