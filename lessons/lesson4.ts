
import { Difficulty, Lesson } from '../types';

export const lesson4: Lesson = {
  id: 'buffer-monitor',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第四课：内存监控 - 溢出预警',
  description: '学习变量的数值范围与内存模拟，理解缓冲区溢出 (Buffer Overflow) 的基础视觉。',
  difficulty: Difficulty.EASY,
  thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 内存容器的概念",
      content: "在 C++ 中，每个变量都是一个内存容器。'int' 就像一个 4 升的桶。如果你试图往里面倒 10 升水，水就会流出来淹没周围的地板——这就是‘溢出’。",
      codeSnippet: "int bucket = 0;"
    },
    {
      title: "2. 数据类型的边界",
      content: "不同的变量类型有不同的‘水位线’：\n- bool: 只能装 0 或 1。\n- char: 专门装一个字符。\n- int: 可以装几十亿以内的整数。\n一旦超过最大值，变量会突然‘跳水’变回最小值。",
      codeSnippet: "int max_val = 2147483647;"
    },
    {
      title: "3. 什么是缓冲区溢出？",
      content: "黑客攻击中最经典的漏洞就是 Buffer Overflow。当程序没有检查输入长度时，黑客可以输入超长数据，故意让其溢出，从而修改程序原本的运行逻辑。",
      codeSnippet: "if (size > capacity) { ALERT(); }"
    },
    {
      title: "4. 视觉监视器原理",
      content: "今天我们将写一个动态监视器：\n- 灰色矩形代表内存条背景。\n- 绿色/红色矩形代表当前数据占用。\n- 当占用超过背景长度时，触发红色的 OVERFLOW 报警！",
      codeSnippet: "drawRect(x, y, dataSize, 40);"
    }
  ],
  initialCode: `// 第4课：黄老师的内存监视器
int dataSize = 0;
int capacity = 300;

void setup() {
    background(0, 0, 0);
}

void loop() {
    background(0, 0, 0, 20);

    fontSize(24);
    color(255, 255, 255);
    drawText("MEMORY BUFFER STATUS", 50, 60);

    // 绘制内存条背景
    color(50, 50, 50);
    drawRect(50, 100, capacity, 40);

    // 计算当前占用颜色
    if (dataSize < capacity * 0.8) {
        color(0, 255, 150); // 安全色
    } else {
        color(255, 0, 0);   // 危险色
    }
    
    // 绘制实时占用情况 (通过取模模拟滚动)
    drawRect(50, 100, dataSize % (capacity + 1), 40);

    // 模拟数据注入
    dataSize += 2;

    if (dataSize > capacity) {
        fontSize(30);
        color(255, 0, 0);
        drawText("!!! BUFFER OVERFLOW !!!", 50, 200);
        // 视觉扰动：模拟内存破坏
        for(int i=0; i<10; i++) {
            color(255, 0, 0, 50);
            drawRect(rand()%width, rand()%height, 50, 2);
        }
    }

    fontSize(14);
    drawText("BYTES_WRITTEN: " + dataSize, 50, 250);
}`,
  skeletonCode: `// 练习：尝试把 dataSize += 2 改成 dataSize += 10，观察溢出的发生速度！`
};
