
import { Difficulty, Lesson } from '../types';

export const lesson14: Lesson = {
  id: 'dns-hijacker',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第十四课：解析重定向 - DNS 劫持',
  description: '模拟域名解析过程，通过修改“映射关系”实现访问重定向。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 域名背后的秘密",
      content: "DNS 像一本电话本，把 google.com 翻译成 IP 地址。如果你想去银行，但电话本被人篡改了，你就可能被带到黑客的假网站。",
      codeSnippet: "if (domain == \"bank.com\") return fake_ip;"
    },
    {
      title: "2. 什么是重定向？",
      content: "当服务器收到请求，它会查找映射。‘劫持’就是通过逻辑干扰，强行把原本该返回 A 的结果替换成 B。这在安全领域叫中间人攻击。",
      codeSnippet: "bool hijacked = true;"
    },
    {
      title: "3. 视觉化解析流",
      content: "我们要模拟‘查询’的过程。文字在左侧输入，光球代表请求，飞向远端的‘解析服务器’。当劫持触发时，服务器的颜色会变红并发出警告。",
      codeSnippet: "drawCircle(x, y, 2);"
    },
    {
      title: "4. 安全防御建议",
      content: "为了防止被劫持，真正的极客会使用 DNS over HTTPS (DoH)，它会给你的电话本查询加密。今天我们要实现最基础的逻辑模拟。",
      codeSnippet: "drawText(\"MALICIOUS_SERVER\", x, y);"
    }
  ],
  initialCode: `// 第14课：黄老师的 DNS 实验室
String query = "google.com";
String resultIP = "172.217.161.142";
bool hijacked = false;

void setup() {}

void loop() {
    background(5, 5, 15);

    fontSize(22);
    color(255, 255, 255);
    drawText("DNS RESOLVER STATUS", 50, 60);

    // 【核心黑客逻辑：劫持判定】
    if (hijacked) {
        resultIP = "6.6.6.6 (MALICIOUS_SERVER)";
        color(255, 0, 0);
    } else {
        color(0, 255, 150);
    }

    fontSize(18);
    drawText("QUERY: " + query, 50, 150);
    drawText("RESOLVED_TO: " + resultIP, 50, 200);

    // 绘制流动的连接线
    for(int i=0; i<10; i++) {
        drawCircle(100 + i*50, 250 + sin(i + (rand()%10)*0.1)*10, 2);
    }
    
    fontSize(12);
    color(100, 100, 100);
    drawText("PRESS [H] TO TOGGLE HIJACK (Simulation)", 50, height - 50);
}`,
  skeletonCode: `// 练习：尝试把 hijacked 设置为 true，看看解析结果是否发生了变化？`
};
