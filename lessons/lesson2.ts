
import { Difficulty, Lesson } from '../types';

export const lesson2: Lesson = {
  id: 'sudo-auth',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第二课：权限鉴定 - 逻辑判定',
  description: '学习 C++ 的 if/else 分支语句，模拟 Linux 系统中的 sudo 权限校验流程。',
  difficulty: Difficulty.EASY,
  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 系统的门禁卡",
      content: "在 Linux 系统中，不是所有人都能运行危险指令。只有拥有权限的用户才能使用 'sudo'。\n\n今天我们要写一个‘逻辑判定器’：检查输入的密码是否正确，决定是否打开那扇‘数据大门’。",
      codeSnippet: "int password = 1234;"
    },
    {
      title: "2. if-else：人生的十字路口",
      content: "if 就像一个交通警察：\n- 如果 (条件成立)，就走 A 路线。\n- 否则 (else)，就走 B 路线。\n\n语法格式：\nif (条件) { \n  // 成立时执行 \n} else { \n  // 不成立时执行 \n}",
      codeSnippet: "if (input == secret) { ... }"
    },
    {
      title: "3. 关系运算符的陷阱",
      content: "黄老师敲黑板：\n- 一个等号 (=) 是‘赋值’（把东西塞进变量）。\n- 两个等号 (==) 才是‘询问’（它们相等吗？）。\n\n此外，还有 > (大于), < (小于), != (不等于)。",
      codeSnippet: "if (age >= 18) { ... }"
    },
    {
      title: "4. 布尔值：黑与白",
      content: "在计算机底层，所有判断最终都只有两个结果：\n- true (真/1)\n- false (假/0)\n\n这就像灯的开关，没有中间态。",
      codeSnippet: "bool isAccessGranted = true;"
    }
  ],
  initialCode: `// 第2课：黄老师的权限鉴定器
int inputPass = 1337;
bool isRoot = false;

void setup() {
    background(10, 0, 0);
}

void loop() {
    background(10, 0, 0, 50);
    
    // 视觉反馈：动态扫描框
    color(0, 255, 0, 100);
    drawRect(50, 50, width-100, height-100);
    
    fontSize(20);
    drawText("AUTHENTICATING...", 80, 100);

    // 【核心黑客逻辑：权限判定】
    if (inputPass == 1337) {
        isRoot = true;
        color(0, 255, 100);
        drawText("STATUS: ACCESS GRANTED", 80, 150);
        drawText("ROLE: SYSTEM_ADMIN", 80, 180);
    } else {
        isRoot = false;
        color(255, 0, 0);
        drawText("STATUS: PERMISSION DENIED", 80, 150);
    }

    // 如果拥有权限，显示加密核心数据
    if (isRoot) {
        fontSize(12);
        for(int i=0; i<5; i++) {
            drawText("SECURE_DATA_" + char(48+i) + ": " + hex(rand()), 80, 220 + i*20);
        }
    }
}`,
  skeletonCode: `// 练习：尝试把 inputPass 改成错误的数字，观察系统如何拦截你！然后再尝试把判断条件改成 (inputPass > 1000) 会怎样？`
};
