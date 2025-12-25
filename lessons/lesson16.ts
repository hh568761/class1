
import { Difficulty, Lesson } from '../types';

export const lesson16: Lesson = {
  id: 'password-cracker',
  chapter: '第三阶段：加密解密与安全算法',
  title: '第十六课：凯撒加密 - 字符位移',
  description: '学习字符编码与简单的位移算法，实现最古老的黑客加密通信。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 密码学的起源",
      content: "凯撒加密是最古老的加密方式之一。古罗马将军凯撒为了防止信件被截获，会将每个字母在字母表中向后移动固定位数。",
      codeSnippet: "newChar = oldChar + key;"
    },
    {
      title: "2. 位移逻辑 (Shift)",
      content: "如果 Key 是 3，那么 A -> D, B -> E。如果到了末尾 Z，它会重新跳回到 A。这在数学上叫‘模运算’。",
      codeSnippet: "char c = (old + shift) % 26;"
    },
    {
      title: "3. 循环显示加密文本",
      content: "在代码中，我们用循环遍历每一个字符，并把加密后的结果画在原单词的下方，这样可以清晰对比加密前后的差异。",
      codeSnippet: "for(int i=0; i<5; i++) { ... }"
    },
    {
      title: "4. 安全性思考",
      content: "凯撒加密非常容易破解，因为一共只有 25 种可能性。黑客只需要尝试每一个位移值，直到看到有意义的单词。这叫‘暴力破解’。",
      codeSnippet: "key = rand() % 26;"
    }
  ],
  initialCode: `// 第16课：黄老师的凯撒加密器
String secret = "HELLO";
int key = 3;
int timer = 0;

void setup() {
    background(0, 0, 0);
}

void loop() {
    background(0, 20, 10, 100);

    fontSize(40);
    color(0, 255, 100);
    
    drawText("ORIGINAL: " + secret, 50, 100);

    // 绘制加密后的结果
    color(255, 255, 255);
    drawText("ENCRYPTED: ", 50, 200);
    
    for(int i = 0; i < 5; i++) {
        // 在 JS 翻译层，直接访问索引即可
        // char() 辅助函数已被增强，可以处理字符
        drawText(secret[i], 300 + i * 45, 200);
    }

    fontSize(14);
    color(0, 255, 255);
    drawText("SHIFT_KEY: " + key, 50, 280);
}`,
  skeletonCode: `// 挑战任务：尝试修改 key 的值，观察加密后的文字变化！`
};
