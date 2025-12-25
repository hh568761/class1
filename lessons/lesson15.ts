
import { Difficulty, Lesson } from '../types';

export const lesson15: Lesson = {
  id: 'dos-flood',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第十五课：流量洪峰 - DoS 模拟',
  description: '学习高频率循环请求对系统的压力，观察服务器在负载下的视觉反馈。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1551288049-bbbda536ad0a?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 网络服务的负荷",
      content: "服务器就像一家餐厅。如果同时进来 1000 个客人点餐，厨师（CPU）和柜台（内存）就会瞬间崩溃。这就是‘资源耗尽’。",
      codeSnippet: "int serverHealth = 100;"
    },
    {
      title: "2. 什么是 DoS 攻击？",
      content: "Denial of Service（拒绝服务）。黑客利用大量毫无意义的请求占满服务器的通道，导致正常用户无法访问。这就像故意堵住大门，让谁也进不去。",
      codeSnippet: "for(int i=0; i<floodCount; i++)"
    },
    {
      title: "3. 流量洪峰的逻辑",
      content: "我们要编写一个累加逻辑：每一秒钟，请求数 (requests) 都会自动增加。当它超过一个阈值，服务器的健康值 (Health) 就会开始下降。",
      codeSnippet: "if (requests > 50) Health--;"
    },
    {
      title: "4. 视觉警报系统",
      content: "我们将用圆形代表服务器：\n- 蓝色波动：正常运行。\n- 红色覆盖：正在遭受攻击。\n- 剧烈抖动与闪烁：系统即将崩溃！",
      codeSnippet: "drawCircle(width/2, height/2, Health);"
    }
  ],
  initialCode: `// 第15课：黄老师的洪峰模拟器
int requests = 0;
int serverHealth = 100;

void setup() {
    background(0,0,0);
}

void loop() {
    background(10, 0, 0, 80);

    // 绘制受攻击的服务器核心
    // 颜色透明度随健康值变化
    color(0, 200, 255, serverHealth + 50);
    drawCircle(width/2, height/2, serverHealth + 20);
    
    fontSize(12);
    color(255,255,255);
    drawText("CORE_SERVER", width/2 - 40, height/2 + 5);

    // 绘制飞向核心的洪峰粒子
    for(int i=0; i < requests; i++) {
        color(255, 0, 0, 150);
        float x = (rand() % width);
        float y = (rand() % 50);
        // 粒子下落模拟攻击
        drawRect(x, (y + timer*5 + i*10) % height, 2, 8);
    }

    // 系统负载逻辑
    requests += 1; // 流量随时间增加
    if (requests > 100) {
        serverHealth -= 1;
    }
    
    // 崩溃状态判定
    if (serverHealth < 10) {
        serverHealth = 0;
        color(255, 0, 0);
        fontSize(30);
        drawText("!!! SYSTEM CRASHED !!!", width/2 - 150, height/2);
    }

    // 仪表盘显示
    fontSize(14);
    color(255, 255, 255);
    drawText("INCOMING_TRAFFIC: " + requests + " req/sec", 20, 30);
    drawText("SERVER_LOAD: " + (100 - serverHealth) + "%", 20, 50);
}`,
  skeletonCode: `// 练习：尝试把 requests += 1 改成 requests += 5，观察服务器多久会崩溃？然后再尝试在 setup 里把 serverHealth 设置为 500，看看服务器是不是变强悍了？`
};
