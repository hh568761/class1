
import { Difficulty, Lesson } from '../types';

export const lesson9: Lesson = {
  id: 'handshake-sim',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第九课：三次握手 - 协议建立',
  description: '模拟 TCP/IP 协议建立连接的过程，理解 SYN、ACK 数据包的来回逻辑。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 网络对话的礼仪",
      content: "数据传输前，电脑必须先打招呼：‘你好，想聊吗？’，‘收到，我也想聊，你准备好了吗？’，‘收到我也准备好了’。这就是三次握手。",
      codeSnippet: "sendPacket(\"SYN\");"
    },
    {
      title: "2. 什么是状态机？",
      content: "为了描述这三个步骤，我们需要一个 `step` 变量。当一个动作完成（比如数据包到达服务器），`step` 就会加 1。这叫‘状态迁移’。",
      codeSnippet: "if(arrived) step = 1;"
    },
    {
      title: "3. 数据包的坐标更新",
      content: "为了让数据包‘飞’起来，我们要控制它的 X 坐标。客户端在左，服务器在右。往右飞就是 X 增加，往左飞就是 X 减少。",
      codeSnippet: "packetX += velocity;"
    },
    {
      title: "4. SYN 与 ACK 的含义",
      content: "- SYN (Synchronize): 请求同步，开始聊天。\n- ACK (Acknowledge): 收到并确认。\n三次握手确保了双方都有发送和接收数据的能力。",
      codeSnippet: "drawText(\"SYN-ACK\", x, y);"
    }
  ],
  initialCode: `// 第9课：黄老师的握手仿真
int step = 0;
int timer = 0;
float packetX = 150;

void setup() {}

void loop() {
    background(5, 5, 15);

    // 绘制两个主机
    color(0, 150, 255);
    drawRect(50, 100, 100, 200);
    drawText("CLIENT", 70, 330);

    drawRect(width-150, 100, 100, 200);
    drawText("SERVER", width-130, 330);

    // 协议逻辑机
    if (step == 0) {
        color(255, 255, 0);
        drawText("1. [SEND] SYN (请求建立连接)", 150, 50);
        packetX += 5;
        if(packetX > width-150) { step = 1; packetX = width-150; }
    } else if (step == 1) {
        color(255, 255, 0);
        drawText("2. [RECV] SYN-ACK (服务器响应)", 150, 50);
        packetX -= 5;
        if(packetX < 150) { step = 2; packetX = 150; }
    } else if (step == 2) {
        color(255, 255, 0);
        drawText("3. [SEND] ACK (确认连接完成)", 150, 50);
        packetX += 5;
        if(packetX > width-150) { step = 3; }
    } else {
        color(0, 255, 0);
        drawText("STATUS: CONNECTION ESTABLISHED", 150, 50);
        fontSize(30);
        drawText("CONNECTED", width/2 - 80, height/2);
    }

    // 绘制传输中的数据包
    color(255, 255, 255);
    drawCircle(packetX, height/2, 10);
}`,
  skeletonCode: `// 挑战：尝试加入一个变量来控制 packetX 的增加速度，模拟网络延迟 (Latency)！`
};
