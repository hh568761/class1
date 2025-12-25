
import { Difficulty, Lesson } from '../types';

export const lesson21: Lesson = {
  id: 'digital-signature',
  chapter: '第三阶段：加密解密与安全算法',
  title: '第二十一课：身份验证 - 数字签名',
  description: '学习非对称加密中的签名逻辑，确保消息是由真实的发送者发出的。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 什么是数字签名？",
      content: "签名不是图片，而是一串由私钥生成的哈希值。接收者用公钥验证。如果对不上，说明消息被篡改了，或者是假冒的。",
      codeSnippet: "bool isValid = verify(data, signature, publicKey);"
    },
    {
      title: "2. 身份防伪原理",
      content: "就像你在信封上加盖印章。只有拥有印章（私钥）的人才能盖。其他人只能看（公钥验证），却无法伪造这个印章。",
      codeSnippet: "if(signature == CORRECT_HASH)"
    },
    {
      title: "3. 逻辑判定与反馈",
      content: "我们将编写一个简单的验证函数。当 `signature` 与我们的预设值相符时，界面显示绿色的‘SUCCESS’，否则闪烁红色的‘FAILED’。",
      codeSnippet: "if (verified) { drawText(\"OK\"); }"
    },
    {
      title: "4. 视觉表现：指纹波纹",
      content: "为了展现‘验证中’的动态感，我们将用 sin() 函数画出一排排流动的小圆点。验证成功后，波纹会变得平稳有序。",
      codeSnippet: "drawCircle(i, y + sin(timer), 2);"
    }
  ],
  initialCode: `// 第21课：黄老师的签名实验室
String message = "SEND_100_BTC";
int signature = 42; // 简化版模拟签名
bool verified = false;

void setup() {
    // 模拟验证过程：如果签名正确
    if (signature == 42) verified = true;
}

void loop() {
    background(10, 10, 30);

    fontSize(22);
    color(255, 255, 255);
    drawText("DIGITAL SIGNATURE VERIFIER", 50, 60);

    fontSize(16);
    color(0, 200, 255);
    drawText("MESSAGE: " + message, 50, 140);
    drawText("SIGNATURE_HEX: 0x" + hex(signature), 50, 180);

    if (verified) {
        color(0, 255, 100);
        fontSize(24);
        drawText("VERIFICATION: SUCCESS ✅", 50, 280);
        // 视觉反馈：流动的数据波纹
        for(int i=0; i<width; i+=20) {
            drawCircle(i, 350 + sin(i*0.05 + rand()%10)*10, 2);
        }
    } else {
        color(255, 0, 0);
        drawText("VERIFICATION: FAILED ❌", 50, 280);
    }
}`,
  skeletonCode: `// 练习：尝试修改 signature 的值，看看验证结果会发生什么变化？`
};
