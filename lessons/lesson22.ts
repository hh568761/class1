
import { Difficulty, Lesson } from '../types';

export const lesson22: Lesson = {
  id: 'worm-infection',
  chapter: '第三阶段：加密解密与安全算法',
  title: '第二十二课：网络扩散 - 木马传播模拟',
  description: '学习递归思想，模拟病毒在受感染节点之间自动复制和传播的逻辑。',
  difficulty: Difficulty.HARD,
  thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 生物病毒 vs 数字病毒",
      content: "数字病毒（蠕虫）最可怕的地方在于‘自我复制’。它们一旦进入一台电脑，就会立刻扫描局域网，寻找下一个受害者。",
      codeSnippet: "infected[target] = 1;"
    },
    {
      title: "2. 网络拓扑：节点图",
      content: "我们将把网络抽象成一个矩阵（4x4 节点）。每个节点都有两个状态：\n- 0: 安全状态 (灰色)\n- 1: 已感染 (红色且剧烈跳动)",
      codeSnippet: "int infected[16];"
    },
    {
      title: "3. 传播动力学算法",
      content: "在代码中，我们用一个计时器控制扩散。每隔 60 帧，我们检查已感染的节点，并尝试寻找它的‘邻居’进行传染。这就是典型的递归式扩散逻辑。",
      codeSnippet: "if(timer % 60 == 0) { infect_neighbor(); }"
    },
    {
      title: "4. 视觉表现力：心跳脉冲",
      content: "为了增强视觉效果，受感染节点的圆圈大小会随 sin() 函数上下跳动，模拟出病毒在节点内疯狂运作的‘心跳’感。",
      codeSnippet: "radius = 20 + sin(timer*0.1)*5;"
    }
  ],
  initialCode: `// 第22课：黄老师的病毒实验室
int infected[16];
int timer = 0;

void setup() {
    // 初始化所有节点为安全
    for(int i=0; i<16; i++) {
        infected[i] = 0;
    }
    // 手动投放初始感染源
    infected[0] = 1; 
}

void loop() {
    background(20, 0, 0);

    fontSize(20);
    color(255, 0, 0);
    drawText("VIRUS SPREADING SIMULATION", 50, 50);

    // 绘制 4x4 网络节点矩阵
    for(int i=0; i<16; i++) {
        int x = 100 + (i % 4) * 150;
        int y = 120 + (i / 4) * 80;
        
        if (infected[i] == 1) {
            // 感染节点：红色 + 呼吸效果
            color(255, 0, 100);
            drawCircle(x, y, 20 + sin(timer*0.1)*5);
            
            // 绘制病毒特征连线（仅限感染节点）
            color(255, 0, 0, 50);
            drawRect(x, y, (rand()%100) - 50, 1);
        } else {
            // 安全节点：低调的灰色
            color(50, 50, 50);
            drawCircle(x, y, 15);
        }
        
        fontSize(10);
        color(150, 150, 150);
        drawText("NODE_" + hex(i), x - 20, y + 35);
    }

    // 传播引擎逻辑
    if (timer % 40 == 0) {
        // 寻找一个已感染的节点
        int source = rand() % 16;
        if (infected[source] == 1) {
            // 尝试感染它的下一个邻居
            int target = (source + 1) % 16;
            infected[target] = 1;
        }
    }

    timer++;
}`,
  skeletonCode: `// 练习：尝试把扩散速度（timer % 40）改快一点（比如 % 10），看看网络被完全感染需要多久？然后再尝试在 setup 里同时感染 0, 5, 10 三个点，看看扩散模式有何不同！`
};
