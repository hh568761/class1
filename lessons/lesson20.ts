
import { Difficulty, Lesson } from '../types';

export const lesson20: Lesson = {
  id: 'ultimate-terminal',
  chapter: '第四阶段：实战演习与大师项目',
  title: '第二十课：终极黑客终端 - 毕业大作',
  description: '整合之前所学的所有视觉技术，打造一个综合性的全屏黑客操作界面。',
  difficulty: Difficulty.HARD,
  thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 艺术背景：大师归位",
      content: "恭喜你！走到了前二十课的终点。现在我们将屏幕划分为多个模块：日志、内核、雷达。这是对你综合能力的终极考验。",
      codeSnippet: "drawRadar(); drawRain(); drawCore();"
    },
    {
      title: "2. 模块化设计思维",
      content: "一个大型软件不能写成一坨。我们要学会分块：\n- 背景层：代码雨 (Matrix Rain)\n- 核心层：呼吸灯 (Breathing Core)\n- 工具层：实时进度条 (Progress Bar)",
      codeSnippet: "drawBackground(); drawUI();"
    },
    {
      title: "3. 混合视觉特效",
      content: "在这里我们要综合运用 sin() 做的呼吸效果、rand() 做的噪点效果、以及数组循环做的列表显示。这是从‘写代码’到‘做产品’的跨越。",
      codeSnippet: "radius = 100 + sin(angle) * 20;"
    },
    {
      title: "4. 极客最后的签名",
      content: "在黑客世界里，Banner 就是你的名片。我们将使用 `fontSize` 和特殊的 Hex 格式来标记你的‘大师等级’。准备好展示你的作品了吗？",
      codeSnippet: "drawText(\"LEVEL_COMPLETE\", x, y);"
    }
  ],
  initialCode: `// 第20课：黄老师的终极毕业项目
int timer = 0;
float angle = 0;

void setup() {}

void loop() {
    background(0, 5, 10);
    
    // 模块1：背景代码雨
    color(0, 255, 70, 40);
    for(int i=0; i<width; i+=60) {
        drawText(char(33 + rand()%90), i, (timer*2 + i) % height);
    }

    // 模块2：中央呼吸内核
    float radius = 100 + sin(angle) * 20;
    color(0, 150, 255, 40);
    drawCircle(width/2, height/2, radius + 25);
    color(0, 200, 255);
    drawCircle(width/2, height/2, radius);
    color(255, 255, 255);
    drawCircle(width/2, height/2, 8);

    // 模块3：雷达扫描线
    color(0, 255, 100);
    float tx = width/2 + cos(angle*2.5) * 220;
    float ty = height/2 + sin(angle*2.5) * 220;
    drawRect(width/2, height/2, tx - width/2, 1);

    // 模块4：伪装终端日志
    fontSize(11);
    color(0, 255, 150);
    for(int k=0; k<8; k++) {
        drawText("> SYS_STATE_CHECK_0x" + hex(k*16) + ": OK", 30, 50 + k*22);
    }

    // 模块5：底部进度负载
    color(20, 20, 40);
    drawRect(30, height - 50, width - 60, 12);
    color(0, 255, 150);
    drawRect(30, height - 50, (timer % 400) * (width-60)/400, 12);

    timer++;
    angle += 0.04;
    
    color(255, 255, 255);
    fontSize(14);
    drawText("MASTER HACKER STATUS: LEVEL_COMPLETE", width/2 - 130, height - 70);
}`,
  skeletonCode: `// 最后的挑战：黄老师把舞台交给你。尝试改变内核的颜色，并加入你专属的黑客签名！`
};
