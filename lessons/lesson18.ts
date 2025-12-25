
import { Difficulty, Lesson } from '../types';

export const lesson18: Lesson = {
  id: 'firewall-interceptor',
  chapter: '第四阶段：实战演习与大师项目',
  title: '第十八课：防火墙屏障 - 拦截逻辑',
  description: '学习碰撞检测，拦截飞来的红色攻击包，保护核心服务器。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 防御核心：系统的盾牌",
      content: "防火墙是系统的第一道防线。它会根据规则（Policy）过滤流量。我们要判断飞来的数据包：如果是‘恶意攻击’，就将其销毁。",
      codeSnippet: "if(x > wallX && type == ATTACK)"
    },
    {
      title: "2. 碰撞检测逻辑",
      content: "在编程中，拦截包其实就是‘位置判定’。如果包的 X 坐标超过了防火墙的坐标，且类型不匹配，我们就触发拦截函数。",
      codeSnippet: "if(pX > wallX) { block(); }"
    },
    {
      title: "3. 什么是拦截策略？",
      content: "一个好的防火墙不能杀错好人。我们用类型 0 代表正常包，类型 1 代表攻击包。我们的代码必须只对类型 1 生效。",
      codeSnippet: "if (pType == 1) { color(255,0,0); }"
    },
    {
      title: "4. 视觉表现：反弹与重置",
      content: "为了让防御看起来很爽，当包被拦截时，我们会将其 X 坐标重置到屏幕左侧之外。这模拟了‘连接被强制重置 (Connection Reset)’的过程。",
      codeSnippet: "pX = -100;"
    }
  ],
  initialCode: `// 第18课：黄老师的防火墙
float wallX = 400;
float pX[10];
float pY[10];
int pType[10]; // 0: 正常, 1: 攻击

void setup() {
    for(int i=0; i<10; i++) {
        pX[i] = -rand() % width;
        pY[i] = 100 + rand() % (height - 200);
        pType[i] = rand() % 2;
    }
}

void loop() {
    background(0, 10, 20);

    // 绘制保护屏障
    color(0, 150, 255, 80);
    drawRect(wallX, 0, 15, height);

    for(int i=0; i<10; i++) {
        pX[i] += 4;
        
        // 【核心防御逻辑：坐标判定】
        if(pX[i] > wallX && pType[i] == 1) {
            color(255, 0, 0);
            drawCircle(pX[i], pY[i], 15); // 拦截动画
            pX[i] = -rand() % 200; // 重置包
        } else {
            color(pType[i] == 0 ? 0 : 255, pType[i] == 0 ? 255 : 0, 100);
            drawCircle(pX[i], pY[i], 6);
        }

        if(pX[i] > width) pX[i] = 0;
    }
    
    color(255, 255, 255);
    fontSize(14);
    drawText("FIREWALL ACTIVE: MONITORING INBOUND TRAFFIC", 50, 40);
}`,
  skeletonCode: `// 练习：尝试把 wallX 改成 200，观察防火墙位置的变化！`
};
