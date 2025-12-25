
import { Difficulty, Lesson } from '../types';

export const lesson3: Lesson = {
  id: 'port-scanner-sim',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第三课：端口扫描器 - 发现目标',
  description: '利用循环遍历端口，配合雷达视觉表现端口扫描过程。',
  difficulty: Difficulty.EASY,
  thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 任务背景：寻找入口",
      content: "一台服务器像一座堡垒，端口就是堡垒上的几万扇门。\n\n黑客不会手动去推每一扇门。我们要写一个程序，让它自动扫描 0 到 360 号端口，看看哪些门是‘虚掩’着的（开放状态）。",
      codeSnippet: "for (int i=0; i<360; i++)"
    },
    {
      title: "2. for 循环的三要素",
      content: "循环就像操场跑圈：\n1. 起点：int i = 0;\n2. 终点：i < 360;\n3. 步进：i++ (跑完一圈再加一)。\n\n只要没到终点，程序就会不知疲倦地重复执行大括号里的内容。",
      codeSnippet: "for(起点; 终点; 步进) { ... }"
    },
    {
      title: "3. 数组：一排储物柜",
      content: "我们要记住哪些端口开了，哪些没开。这时候需要数组。\n\nbool openPorts[360]; \n这就相当于一口气申请了 360 个小格子，每个格子只能放 0 或 1。",
      codeSnippet: "openPorts[端口号] = true;"
    },
    {
      title: "4. 雷达的数学美",
      content: "为了做出酷炫的扫描线，我们需要一点点数学：\n- sin(角度) 和 cos(角度) 能帮我们计算圆圈上的坐标。\n- 随着端口号增加，角度也在旋转，这就形成了雷达效果。",
      codeSnippet: "float x = cos(angle) * 半径;"
    }
  ],
  initialCode: `// 第3课：黄老师的端口扫描器模拟
int currentPort = 0;
int maxPorts = 360; 
bool openPorts[360]; 

void setup() {
    background(0, 0, 0);
    // 随机预置几个“开放”的端口
    for(int i=0; i<360; i++) {
        openPorts[i] = (rand() % 100 > 95);
    }
}

void loop() {
    background(0, 5, 10, 20); 

    // 绘制中央服务器核心
    color(0, 255, 255, 30);
    drawCircle(width/2, height/2, 100);

    // 计算扫描针的位置
    float angle = (currentPort / 360.0) * 2.0 * PI;
    float tx = width/2 + cos(angle) * 150;
    float ty = height/2 + sin(angle) * 150;

    // 绘制所有已发现的开放端口
    for(int i=0; i < currentPort; i++) {
        if(openPorts[i]) {
            float a = (i / 360.0) * 2.0 * PI;
            color(255, 0, 100);
            drawCircle(width/2 + cos(a)*100, height/2 + sin(a)*100, 3);
        }
    }

    // 绘制当前扫描线
    color(0, 255, 0);
    drawRect(width/2, height/2, tx - width/2, 1);
    
    fontSize(14);
    drawText("SCANNING PORT: " + currentPort, 20, 30);

    // 步进扫描
    currentPort = (currentPort + 2) % 360;
}`,
  skeletonCode: `// 练习：尝试把 background 的最后一个参数 20 改成 50，看看扫描轨迹有什么变化？`
};
