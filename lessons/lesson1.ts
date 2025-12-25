
import { Difficulty, Lesson } from '../types';

export const lesson1: Lesson = {
  id: 'hacker-login',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第一课：接入控制台 - 登录 Slogan',
  description: '学习 C++ 的标准输出与颜色控制符，打造属于你的黑客身份标识。',
  difficulty: Difficulty.EASY,
  thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 欢迎来到极客实验室",
      content: "黑客的世界没有华丽的按钮。当你成功渗透入一个系统，迎接你的是冰冷的、充满字符的黑色控制台。\n\n今天，我们要在这里插上属于你的旗帜。在编程世界中，这叫 'Banner' 或 'Slogan'。",
      codeSnippet: "// 每一行代码都是你的指令"
    },
    {
      title: "2. 黄老师的秘密坐标系",
      content: "屏幕其实是一张巨大的棋盘：\n- 左上角是坐标原点 (0, 0)。\n- 向右走 X 增加，向下走 Y 增加。\n- 记住：在屏幕上画画，位置是第一步！",
      codeSnippet: "drawText(\"Hello\", X坐标, Y坐标);"
    },
    {
      title: "3. 极客色：RGB 的奥秘",
      content: "电脑用红(R)、绿(G)、蓝(B)三种光调制出所有颜色。\n- 每个值的范围是 0 到 255。\n- color(0, 255, 100) 是最经典的‘极客绿’。\n- color(255, 255, 255) 则是纯净的白色。",
      codeSnippet: "color(红, 绿, 蓝);"
    },
    {
      title: "4. setup 与 loop",
      content: "C++ 视觉编程有两个心脏：\n- setup(): 程序启动时只运行一次，用来初始化环境（比如设置底色）。\n- loop(): 像走马灯一样每秒跑 60 次，用来处理动态效果。",
      codeSnippet: "void setup() { ... }\nvoid loop() { ... }"
    }
  ],
  initialCode: `// 第1课：黄老师的黑客控制台
void setup() {
    // 设置深黑色的系统底色
    background(0, 10, 5);
}

void loop() {
    // 1. 设置极客绿
    color(0, 255, 100);
    fontSize(40);
    
    // 2. 打印核心状态
    drawText("SYSTEM: ONLINE", 50, 100);
    
    // 3. 打印身份信息
    fontSize(18);
    color(0, 200, 80);
    drawText("IDENTITY: GUEST_EXPLORER", 50, 150);
    drawText("IP_ADDR: 127.0.0.1", 50, 180);
    
    // 4. 模拟动态光标
    if((rand() % 60) > 30) {
        drawRect(50, 200, 15, 5);
    }
}`,
  skeletonCode: `// 挑战任务：黄老师希望你把 IDENTITY 改成你的名字拼音，并把颜色调成更有科技感的蓝色 (0, 150, 255)！`
};
