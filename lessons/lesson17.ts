
import { Difficulty, Lesson } from '../types';

export const lesson17: Lesson = {
  id: 'xor-cipher',
  chapter: '第三阶段：加密解密与安全算法',
  title: '第十七课：异或混淆 - XOR 算法',
  description: '学习位运算异或 (XOR) 的魔力：同一个密钥，加密即解密。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda536ad0a?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. XOR 的奇妙特性",
      content: "异或 (XOR) 符号是 `^`。它的口诀是：‘相同为 0，不同为 1’。它最神奇的地方在于：用同一个密钥异或两次，数据会原路返回！",
      codeSnippet: "A ^ B = C; C ^ B = A;"
    },
    {
      title: "2. 什么是流加密？",
      content: "XOR 是很多高级加密（如 WEP WiFi 加密）的基础。它把你的数据和一串密钥序列逐位比对。即使黑客拿到了加密后的结果，没有密钥也无法还原。",
      codeSnippet: "cipher = data ^ key;"
    },
    {
      title: "3. 二进制开关视窗",
      content: "我们将把字符转化为二进制位（0 和 1）。当两个对应的位不同时，结果位就是 1。这种逻辑非常适合用 UI 上的方块来表示亮和灭。",
      codeSnippet: "int bitE = bitO ^ bitK;"
    },
    {
      title: "4. 实战：数据混淆器",
      content: "今天我们要写一个‘还原实验室’：\n- 第一行：原始数据。\n- 第二行：经过 XOR 混乱后的乱码。\n- 第三行：再次 XOR 后神奇出现的原始文字。",
      codeSnippet: "decrypted = encrypted ^ key;"
    }
  ],
  initialCode: `// 第17课：黄老师的 XOR 实验室
int original = 65; // 'A'
int key = 123;
int encrypted = 0;
int decrypted = 0;

void setup() {
    encrypted = original ^ key;
    decrypted = encrypted ^ key;
}

void loop() {
    background(10, 0, 20);

    fontSize(24);
    color(0, 255, 255);
    drawText("XOR_ENCRYPTION_LAB", 50, 60);

    fontSize(16);
    color(255, 255, 255);
    drawText("Original Value: " + original, 50, 120);
    drawText("Key: " + key, 50, 150);

    color(255, 0, 100);
    drawText("Encrypted: " + encrypted, 50, 200);

    color(0, 255, 100);
    drawText("Decrypted: " + decrypted, 50, 250);

    // 动态演示位运算过程
    for(int i=0; i<8; i++) {
        int bitO = (original >> (7-i)) & 1;
        int bitK = (key >> (7-i)) & 1;
        int bitE = (encrypted >> (7-i)) & 1;
        
        color(bitE == 1 ? 0 : 50, 255, 100);
        drawRect(50 + i*40, 300, 30, 30);
    }
}`,
  skeletonCode: `// 练习：尝试把 key 改成另一个数字（0-255），观察加密后的值如何变化，而解密后的值是否依然保持 65？`
};
