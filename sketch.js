// BABYMONSTER name sketch
// 初始画面静止显示 BABYMONSTER，之后每点击一次切换到下一位成员：
// RUKA -> PHARITA -> ASA -> AHYEON -> RAMI -> RORA -> CHIQUITA -> 回到 BABYMONSTER

const STEPS = [
  { name: 'BABYMONSTER', color: '#F2F3F7', bg: [14, 14, 20] },
  { name: 'RUKA', color: '#FF4D6D', bg: [28, 10, 18] },
  { name: 'PHARITA', color: '#FFB703', bg: [30, 22, 8] },
  { name: 'ASA', color: '#4CC9F0', bg: [8, 22, 32] },
  { name: 'AHYEON', color: '#B892FF', bg: [22, 14, 34] },
  { name: 'RAMI', color: '#2EC4B6', bg: [8, 26, 24] },
  { name: 'RORA', color: '#FF8FAB', bg: [30, 14, 22] },
  { name: 'CHIQUITA', color: '#F2E86D', bg: [28, 26, 10] }
];

let index = 0;
let enter = 0; // 入场进度，静止后保持为 1

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Arial Black');
  enter = 1;
}

function draw() {
  const step = STEPS[index];

  // 背景：主色 + 成员色轻微晕染
  const b = step.bg;
  background(b[0], b[1], b[2]);
  const glow = color(step.color);
  noStroke();
  for (let i = 6; i > 0; i--) {
    fill(red(glow), green(glow), blue(glow), 5);
    ellipse(width / 2, height / 2, min(width, height) * (0.35 + i * 0.13));
  }

  // 文字尺寸自适应
  const size = constrain(width / (step.name.length * 0.78), 26, min(height * 0.26, 170));
  const spacing = size * 0.14;

  enter = min(enter + 0.12, 1);
  const alpha = easeOut(enter);
  const scaleY = 0.94 + 0.06 * alpha;

  push();
  translate(width / 2, height * 0.47);
  scale(1, scaleY);
  drawSpacedText(step.name, 0, 0, size, spacing, step.color, alpha);
  pop();

  // 下划线
  const lineW = min(width * 0.5, textW(step.name, size, spacing));
  stroke(red(glow), green(glow), blue(glow), 200 * alpha);
  strokeWeight(max(2, size * 0.05));
  line(width / 2 - lineW / 2, height * 0.47 + size * 0.85, width / 2 + lineW / 2, height * 0.47 + size * 0.85);

  // 底部指示点
  drawDots(alpha);

  // 提示
  noStroke();
  fill(235, 235, 245, 150);
  textFont('Arial');
  textSize(13);
  text('CLICK  —  ' + (index + 1) + ' / ' + STEPS.length, width / 2, height - 34);
}

function mousePressed() {
  index = (index + 1) % STEPS.length;
  enter = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function easeOut(t) {
  return 1 - pow(1 - t, 3);
}

// 逐字绘制以模拟字间距
function textW(txt, size, spacing) {
  textSize(size);
  let w = 0;
  for (const ch of txt) w += textWidth(ch) + spacing;
  return max(w - spacing, 1);
}

function drawSpacedText(txt, cx, cy, size, spacing, col, alpha) {
  textSize(size);
  const c = color(col);
  const total = textW(txt, size, spacing);
  let x = cx - total / 2;
  for (const ch of txt) {
    const w = textWidth(ch);
    fill(red(c), green(c), blue(c), 255 * alpha);
    text(ch, x + w / 2, cy);
    x += w + spacing;
  }
}

function drawDots(alpha) {
  const r = 6;
  const gap = 26;
  const y = height * 0.47 + max(height * 0.14, 110);
  const startX = width / 2 - ((STEPS.length - 1) * gap) / 2;

  noStroke();
  for (let i = 0; i < STEPS.length; i++) {
    const c = color(STEPS[i].color);
    if (i === index) {
      fill(red(c), green(c), blue(c), 255 * alpha);
      circle(startX + i * gap, y, r * 2.1);
    } else {
      fill(red(c), green(c), blue(c), 70);
      circle(startX + i * gap, y, r);
    }
  }
}
