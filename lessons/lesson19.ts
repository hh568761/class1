
import { Difficulty, Lesson } from '../types';

export const lesson19: Lesson = {
  id: 'route-visualizer',
  chapter: '第四阶段：实战演习与大师项目',
  title: '第十九课：路由追踪 - 节点跳跃',
  description: '学习节点间的插值动画，模拟数据包在全球路由节点间的跳转过程。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 节点传输：跳一跳",
      content: "互联网不是直连的。数据包需要从一个路由节点“跳”到下一个节点。这就像送快递需要经过好几个中转站。",
      codeSnippet: "int nextStep = (step + 1) % 4;"
    },
    {
      title: "2. 什么是线性插值？",
      content: "数据包在两点之间移动时，我们不能直接闪现。我们要通过一个 `progress` (0 到 1) 变量来计算中间位置。公式：起点 + (终点-起点) * 进度。",
      codeSnippet: "curX = start + (end - start) * progress;"
    },
    {
      title: "3. TRACERT 指令原理",
      content: "Tracert 是黑客常用的工具，用来查看数据包路径。我们将模拟这个过程：每跳过一个点，就在日志里记录一个‘HOP’（跳数）。",
      codeSnippet: "drawText(\"HOP_\" + i, x, y);"
    },
    {
      title: "4. 视觉效果：拖尾动画",
      content: "为了让传输看起来更流畅，我们在当前位置后面画出几个更小、透明度更高的圆圈。这能产生一种‘高速移动’的视觉残影。",
      codeSnippet: "color(255, 255, 255, alpha);"
    }
  ],
  initialCode: `// 第19课：黄老师的全球路由
float progress = 0;
int step = 0;
float nodesX[4] = {100, 300, 550, 750};
float nodesY[4] = {150, 400, 180, 420};

void setup() {}

void loop() {
    background(5, 5, 10);

    // 绘制路由节点
    for(int i=0; i<4; i++) {
        color(0, 150, 255);
        drawCircle(nodesX[i], nodesY[i], 12);
        fontSize(10);
        drawText("HOP_" + hex(i), nodesX[i] - 20, nodesY[i] + 35);
    }

    // 计算当前跳跃位置
    int nextStep = (step + 1) % 4;
    float curX = nodesX[step] + (nodesX[nextStep] - nodesX[step]) * progress;
    float curY = nodesY[step] + (nodesY[nextStep] - nodesY[step]) * progress;

    // 绘制传输中的数据包
    color(255, 255, 255);
    drawCircle(curX, curY, 6);
    // 绘制拖尾
    for(int j=0; j<5; j++) {
        color(255, 255, 255, 50 - j*10);
        drawCircle(curX - (nodesX[nextStep]-nodesX[step])*0.05*j, curY - (nodesY[nextStep]-nodesY[step])*0.05*j, 4);
    }

    progress += 0.03;
    if(progress >= 1.0) {
        progress = 0;
        step = nextStep;
    }
    
    color(0, 255, 150);
    fontSize(14);
    drawText("TRACERT: DATA_PACKET_ROUTING_IN_PROGRESS...", 30, 40);
}`,
  skeletonCode: `// 练习：尝试增加 progress 的步进值（如 0.08），观察数据传输速度的变化！`
};
