
import { Difficulty, Lesson } from '../types';

export const lesson6: Lesson = {
  id: 'kernel-processes',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第六课：进程管理器 - 内核心跳',
  description: '学习 C++ 结构体 (struct)，封装 PID、名称和状态。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 现实世界的物品",
      content: "变量只能存一个值，但现实世界很复杂。一个‘进程’不仅有名字，还有 PID、内存大小、是否危险。我们需要把这些信息打包。",
      codeSnippet: "struct Process { ... };"
    },
    {
      title: "2. 结构体：自制类型",
      content: "struct 是你的‘模具’。一旦定义好，你就可以像用 int 一样用它。它能把不同类型（String, int, bool）的数据粘在一起。",
      codeSnippet: "Process p; p.name = \"kernel\";"
    },
    {
      title: "3. 结构体数组：大名单",
      content: "为了管理整个系统，我们会创建一个结构体数组。这就像一张表格，每一行是一个结构体，每一列是该结构体的一个变量。",
      codeSnippet: "Process taskList[5];"
    },
    {
      title: "4. 威胁侦测逻辑",
      content: "我们将在循环中检查每个进程的 .isDanger 属性。如果是 true，就用红色高亮并显示威胁警报。这是安全软件的核心逻辑！",
      codeSnippet: "if(taskList[i].isDanger) { color(255,0,0); }"
    }
  ],
  initialCode: `// 第6课：黄老师的任务管理器
struct Process {
    int pid;
    String name;
    int mem;
    bool isDanger;
};

// 关键：声明结构体数组
Process taskList[5];

void setup() {
    // 初始化进程数据
    taskList[0].pid = 1001; taskList[0].name = "sys_idle"; taskList[0].mem = 12; taskList[0].isDanger = false;
    taskList[1].pid = 2045; taskList[1].name = "chrome.exe"; taskList[1].mem = 850; taskList[1].isDanger = false;
    taskList[2].pid = 3301; taskList[2].name = "backdoor.sh"; taskList[2].mem = 4; taskList[2].isDanger = true;
    taskList[3].pid = 4002; taskList[3].name = "antivirus"; taskList[3].mem = 120; taskList[3].isDanger = false;
    taskList[4].pid = 5510; taskList[4].name = "kernel"; taskList[4].mem = 512; taskList[4].isDanger = false;
}

void loop() {
    background(10, 15, 25);
    
    fontSize(20);
    color(255, 255, 255);
    drawText("KERNEL PROCESS MONITOR", 50, 50);
    
    for(int i=0; i<5; i++) {
        int y = 120 + i * 45;
        
        // 判定危险状态改变颜色
        if (taskList[i].isDanger) {
            color(255, 0, 0);
            drawText(">> THREAT_FOUND <<", 380, y);
        } else {
            color(0, 255, 150);
        }
        
        // 绘制进程详情
        drawText("PID:" + String(taskList[i].pid), 50, y);
        drawText(taskList[i].name, 150, y);
        drawText(String(taskList[i].mem) + "MB", 300, y);
        
        // 绘制内存条视觉效果
        drawRect(50, y + 10, (taskList[i].mem / 3), 3);
    }
}`,
  skeletonCode: `// 挑战任务：尝试修改 taskList[2].isDanger 为 false，并把它的 name 改为 "safe_task"，观察红色的威胁警报是否消失？`
};
