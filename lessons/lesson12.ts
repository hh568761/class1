
import { Difficulty, Lesson } from '../types';

export const lesson12: Lesson = {
  id: 'hex-sniffer',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第十二课：数据嗅探 - 十六进制视窗',
  description: '学习数据的底层表示，将原始字节转换为黑客专用的 Hex 格式。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 原始数据之美",
      content: "电脑不认识文字，只认识 0 和 1。黑客喜欢用十六进制 (Hex) 来观察数据，因为 1 个字节刚好对应 2 位十六进制数，非常整齐。",
      codeSnippet: "String hexVal = hex(data);"
    },
    {
      title: "2. 什么是十六进制？",
      content: "平时我们数到 10 进位，Hex 数到 16 才进位。它包含 0-9 和 A-F（代表 10-15）。\n例如：十进制 15 就是 Hex 的 F。",
      codeSnippet: "hex(255) // 返回 \"FF\""
    },
    {
      title: "3. 内存地址：数据的门牌号",
      content: "每一行数据的最左侧通常显示‘地址’。比如 0x0010。这能帮我们定位这段数据在系统里的精确位置。",
      codeSnippet: "drawText(\"0x00\" + hex(addr), x, y);"
    },
    {
      title: "4. 动态嗅探面板设计",
      content: "为了模拟真实嗅探，我们会让 Hex 数据随时间不停变动。这就需要在一个双重循环里：\n- 外层循环控制行（地址）。\n- 内层循环控制每行的 8 个字节。",
      codeSnippet: "for(int j=0; j<8; j++) { ... }"
    }
  ],
  initialCode: `// 第12课：黄老师的 Hex 嗅探器
int timer = 0;

void setup() {
    background(10, 10, 10);
}

void loop() {
    background(0, 0, 0, 50);
    
    color(0, 255, 100);
    fontSize(18);
    drawText("NETWORK DATA SNIFFER (HEX_DUMP)", 30, 40);
    
    fontSize(12);
    for(int i=0; i<10; i++) {
        int y = 80 + i * 30;
        // 模拟内存地址
        color(100, 100, 100);
        drawText("0x00" + hex(i * 16), 30, y);
        
        // 模拟 Hex 字节
        color(0, 200, 255);
        for(int j=0; j<8; j++) {
            // 随时间变化的模拟流量
            int val = (rand() + timer + i*j) % 256;
            drawText(hex(val), 120 + j * 30, y);
        }
    }
    
    timer++;
}`,
  skeletonCode: `// 练习：尝试把 drawText 中的间隔 (j * 30) 改大，看看面板布局会发生什么变化？`
};
