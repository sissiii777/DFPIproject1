let score = 0;
let currentLevel = 1;
const maxScore = 3;

// 初始化关卡
function setup() {
  if (!document.getElementById('grid')) {
    const grid = document.createElement('div');
    grid.id = 'grid';
    grid.classList.add('grid');
    document.body.appendChild(grid);
  }
  loadLevelScript(currentLevel);
  createScoreDisplay();
}

// 显示当前分数
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

// 加载关卡脚本
function loadLevelScript(level) {
  // 移除现有的关卡脚本
  const existingScript = document.querySelector('script[data-level]');
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement('script');
  script.src = `level-${level}.js`;
  script.setAttribute('data-level', `level-${level}`); // 给脚本添加标记，以便后续移除
  document.body.appendChild(script);

  script.onload = function () {
    setup(); // 调用关卡的 setup 函数
  };
}

// 增加分数并检查是否需要切换关卡
function increaseScore() {
  score++;
  document.getElementById('score').innerText = `Score: ${score}`;

  if (score >= maxScore) {
    currentLevel++;
    if (currentLevel > 3) {
      currentLevel = 1; // 重置为第一关
    }
    score = 0; // 重置分数
    document.getElementById('level').innerText = `Level: ${currentLevel}`;

    // 清空 grid 内的内容
    document.getElementById('grid').innerHTML = '';
    loadLevelScript(currentLevel); // 加载新关卡
  }
}