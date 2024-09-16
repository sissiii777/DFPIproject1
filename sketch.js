//进度 能跳到三关，不能重新回到第一关 问chris回到第一关的code
//分数清零逻辑是什么。后台和下一关

let playerIndex = 0;
let targetIndex = 0;
let currentLevel = 1;
let score = 0;
const maxScore = 3;
const totalBoxes = 20;

function setup() {
  createScoreDisplay();
  loadLevel(currentLevel); // 加载当前关卡
}

// 显示分数和关卡
function createScoreDisplay() {
  if (!document.getElementById('score')) {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.innerText = `Score: ${score}`;
    document.body.appendChild(scoreDisplay);
  }

  if (!document.getElementById('level')) {
    const levelDisplay = document.createElement('div');
    levelDisplay.id = 'level';
    levelDisplay.innerText = `Level: ${currentLevel}`;
    document.body.appendChild(levelDisplay);
  }
}

function loadLevel(level) {
  if (!document.getElementById('grid')) {
    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.classList.add('grid');
    document.body.appendChild(grid);
  } else {
    document.getElementById('grid').innerHTML = ''; // 清空之前的内容
  }

  if (level === 1) {
    setupLevel1();
  } else if (level === 2) {
    setupLevel2();
  } else if (level === 3) {
    setupLevel3();
  }
}

// Level-1
function setupLevel1() {
  createGrid();
  window.keyPressed = keyPressedLevel1;
}

function keyPressedLevel1() {
  movePlayer();
  checkCollision();
}

//Level-2
function setupLevel2() {
  createGrid();
  window.keyPressed = keyPressedLevel2;
  setInterval(moveTargetLevel2, 1000);
}

function keyPressedLevel2() {
  movePlayer();
  checkCollision();
}

function moveTargetLevel2() {
  moveTargetRandomly();
}

// Level-3
function setupLevel3() {
  createGrid();
  window.keyPressed = keyPressedLevel3;
  setInterval(moveTargetLevel3, 500);
}

function keyPressedLevel3() {
  movePlayer();
  checkCollision();
}

function moveTargetLevel3() {
  moveTargetRandomly();
}

// 创建20个方格并随即设定"player"和"target"
function createGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';  // 先清0

  // 生成随机位置
  playerIndex = Math.floor(Math.random() * totalBoxes);
  do {
    targetIndex = Math.floor(Math.random() * totalBoxes);
  } while (playerIndex === targetIndex);// 确保"player"和"target"位置不重合

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

// 玩家移动
function movePlayer() {
  const grid = document.getElementById('grid');
  grid.childNodes[playerIndex].classList.remove('player');

  if (key === '1') {
    playerIndex = (playerIndex - 3 + totalBoxes) % totalBoxes; //左3
  } else if (key === '2') {
    playerIndex = (playerIndex - 1 + totalBoxes) % totalBoxes; //左1
  } else if (key === '0') {
    playerIndex = (playerIndex + 3) % totalBoxes; //右3
  } else if (key === '9') {
    playerIndex = (playerIndex + 1) % totalBoxes; //右1
  }

  grid.childNodes[playerIndex].classList.add('player');
}

// 检测player是否碰到target，碰到后分数+1
function checkCollision() {
  const grid = document.getElementById('grid');
  if (playerIndex === targetIndex) {
    increaseScore();

    // 碰到target后原有的target消失，生成新target
    grid.childNodes[targetIndex].classList.remove('target');
    do {
      targetIndex = Math.floor(Math.random() * totalBoxes);
    } while (playerIndex === targetIndex);
    grid.childNodes[targetIndex].classList.add('target');
  }
}

function increaseScore() {
  score++;
  document.getElementById('score').innerText = `Score: ${score}`;

  if (score >= maxScore) {
    currentLevel++;
    if (currentLevel > 3) {
      currentLevel = 1; // 回到第一关
    }
    score = 0; // 重置分数
    document.getElementById('level').innerText = `Level: ${currentLevel}`;
    loadLevel(currentLevel); // 加载新关卡
  }
}

// 移动 target，并确保不与 player 重合
function moveTargetRandomly() {
  const grid = document.getElementById('grid');
  grid.childNodes[targetIndex].classList.remove('target');

  let moveDirection = Math.random() < 0.5 ? -1 : 1;
  let newTargetIndex = (targetIndex + moveDirection + totalBoxes) % totalBoxes;
  if (newTargetIndex === playerIndex) {
    newTargetIndex = (targetIndex - moveDirection + totalBoxes) % totalBoxes;
  }

  targetIndex = newTargetIndex;
  grid.childNodes[targetIndex].classList.add('target');
}

window.addEventListener('keydown', function () {
  if (typeof window.keyPressed === 'function') {
    window.keyPressed();
  }
});
window.onload = setup;