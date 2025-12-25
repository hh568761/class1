
import { Difficulty, Lesson } from '../types';

export const lesson5: Lesson = {
  id: 'cmd-automation',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第五课：自动化序列 - 指令队列',
  description: '学习数组存储一组系统命令，并利用循环实现自动化批量执行。',
  difficulty: Difficulty.EASY,
  thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 极客效率：告别手动",
      content: "黑客在渗透系统时，不会一条一条地敲命令。我们会编写‘自动化脚本’，把所有指令排成队，让电脑自动执行。",
      codeSnippet: "String cmds[5] = { ... };"
    },
    {
      title: "2. 数组：排好队的变量",
      content: "数组就像一列火车，每个车厢（索引）装一个数据。\n- 第一节车厢的编号是 0，不是 1！\n- 语法：类型 数组名[数量] = {值1, 值2...};",
      codeSnippet: "String commands[3] = {\"BYPASS\", \"LOGIN\", \"LOGOUT\"};"
    },
    {
      title: "3. 状态控制逻辑",
      content: "我们需要三个变量来控制脚本：\n1. currentIdx: 记录当前执行到哪一条了。\n2. timer: 控制执行的速度（不要太快）。\n3. commands[]: 存放指令内容。",
      codeSnippet: "if(timer % 100 == 0) { currentIdx++; }"
    },
    {
      title: "4. UI 状态反馈",
      content: "为了让界面像科幻电影，我们用颜色区分状态：\n- 灰色：等待中 (WAIT)\n- 黄色：运行中 (RUNNING)\n- 灰色+DONE：已完成\n这将锻炼你对数组遍历的掌握。",
      codeSnippet: "for(int i=0; i<5; i++) { ... }"
    }
  ],
  initialCode: `// 第5课：黄老师的指令自动化脚本
String commands[5] = {"INIT_PROBE", "BYPASS_FIREWALL", "EXTRACT_DB", "WIPE_LOGS", "DISCONNECT"};
int currentIdx = 0;
int timer = 0;

void setup() {
    background(5, 5, 5);
}

void loop() {
    background(5, 5, 5, 30);

    color(0, 255, 200);
    fontSize(18);
    drawText("EXECUTING AUTO-SCRIPT...", 50, 50);

    // 绘制指令列表状态
    for(int i=0; i<5; i++) {
        if (i < currentIdx) {
            color(100, 100, 100); 
            drawText("[DONE] " + commands[i], 70, 100 + i * 40);
        } else if (i == currentIdx) {
            color(255, 255, 0);   
            drawText("[RUNNING] " + commands[i] + "...", 70, 100 + i * 40);
            drawRect(70, 110 + i * 40, (timer % 100) * 2, 2);
        } else {
            color(50, 50, 50);    
            drawText("[WAIT] " + commands[i], 70, 100 + i * 40);
        }
    }

    timer++;
    // 每 100 帧推进到下一个指令
    if (timer % 100 == 0 && currentIdx < 5) {
        currentIdx++;
    }
    
    if(currentIdx == 5) {
        color(0, 255, 0);
        fontSize(30);
        drawText("OPERATION SUCCESSFUL", 50, 350);
    }
}`,
  skeletonCode: `// 挑战任务：尝试把 commands 数组的长度改为 6，并在初始化的 {} 里增加一个你自创的黑客指令！`
};
