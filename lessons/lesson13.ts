
import { Difficulty, Lesson } from '../types';

export const lesson13: Lesson = {
  id: 'subnet-bitwise',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第十三课：子网掩码 - 位运算的奥秘',
  description: '学习位运算 & (与) 的逻辑，理解路由器如何通过 IP 和掩码计算出网络号。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 任务背景：网络划分",
      content: "IP 地址在底层是 32 位二进制数。位运算 & (AND) 可以像筛子一样，只留下我们需要的网络部分，屏蔽主机部分。",
      codeSnippet: "network = ip & mask;"
    },
    {
      title: "2. & 运算：只有全 1 才为 1",
      content: "AND 运算的规则很简单：\n- 1 & 1 = 1\n- 1 & 0 = 0\n- 0 & 0 = 0\n就像两个开关，必须都打开，灯才会亮。",
      codeSnippet: "1100 & 1010 = 1000"
    },
    {
      title: "3. 子网掩码的作用",
      content: "掩码是一串连续的 1（比如 255.255.255.0）。它告诉路由器：这一部分是我的‘公司地址’（网络号），剩下的才是‘座位号’（主机号）。",
      codeSnippet: "mask = 255; // 二进制 11111111"
    },
    {
      title: "4. 二进制视觉化",
      content: "为了看清过程，我们将把 8 位数字拆解。用循环配合 `>>` (右移) 运算，逐个取出每一位，如果是 1 就画绿灯，如果是 0 就画灭掉的灯。",
      codeSnippet: "int bit = (val >> i) & 1;"
    }
  ],
  initialCode: `// 第13课：黄老师的位运算实验室
int ip = 192;
int mask = 255;
int result = 0;

void setup() {
    // 模拟 192 & 255
    result = ip & mask;
}

void loop() {
    background(0, 0, 10);

    color(0, 255, 150);
    fontSize(24);
    drawText("BITWISE_AND_LAB", 50, 60);

    fontSize(16);
    color(255, 255, 255);
    drawText("IP Segment: " + ip, 50, 120);
    drawText("Subnet Mask: " + mask, 50, 150);

    // 视觉化二进制位
    for(int i=0; i<8; i++) {
        int bit = (ip >> (7-i)) & 1;
        color(bit == 1 ? 0 : 50, bit == 1 ? 255 : 50, 0);
        drawRect(50 + i*40, 180, 30, 30);
        drawText(String(bit), 60 + i*40, 230);
    }

    color(255, 255, 0);
    drawText("RESULT (NETWORK ID): " + result, 50, 300);
}`,
  skeletonCode: `// 练习：尝试把 mask 改成 128，看看结果 result 变成了多少？观察二进制位的变化！`
};
