
import { Difficulty, Lesson } from '../types';

export const lesson7: Lesson = {
  id: 'vfs-mapping',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第七课：虚拟文件系统 - 目录层级',
  description: '学习路径与树状结构，模拟 cd 和 ls 指令下的文件夹切换效果。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 路径的概念：地图的坐标",
      content: "文件系统像一棵大树。'/' 代表树根（根目录），所有的文件和文件夹都是从这里生长出来的枝叶。我们要学会如何描述路径的深度。",
      codeSnippet: "String currentPath = \"/root/bin\";"
    },
    {
      title: "2. 什么是虚拟文件系统？",
      content: "在安全测试中，我们经常需要模拟一个文件系统。我们不需要真实创建文件，只需要用数组或字符串来‘模拟’它们的存在。",
      codeSnippet: "String files[4] = {\"ssh\", \"grep\"};"
    },
    {
      title: "3. ls 指令：列出清单",
      content: "ls 是 list 的缩写。它的逻辑是：遍历当前路径下的所有文件名，并按照一定的格式（比如加上 0x 前缀的随机大小）显示出来。",
      codeSnippet: "for(int i=0; i<4; i++) { drawText(files[i]); }"
    },
    {
      title: "4. UI 布局：路径栏设计",
      content: "为了让我们的浏览器像那么回事，我们需要一个路径显示框。它的背景通常是深灰色，文字靠左对齐，并带有一个‘正在加载’的闪烁光标。",
      codeSnippet: "drawRect(40, 70, width-80, 30);"
    }
  ],
  initialCode: `// 第7课：黄老师的目录浏览器
String currentDir = "/usr/local/bin";
String files[4] = {"ssh", "grep", "top", "sudo"};

void setup() {
    background(0, 0, 0);
}

void loop() {
    background(0, 10, 20);

    color(0, 255, 100);
    fontSize(18);
    drawText("FILE_SYSTEM_EXPLORER", 40, 50);

    // 绘制路径栏
    color(50, 50, 50);
    drawRect(40, 70, width-80, 30);
    color(255, 255, 255);
    fontSize(14);
    drawText("LOCATION: " + currentDir, 50, 90);

    // 绘制文件列表
    for(int i=0; i<4; i++) {
        int y = 140 + i * 40;
        color(0, 150, 255);
        drawRect(50, y - 15, 20, 20); 
        
        color(200, 200, 200);
        drawText(files[i], 80, y);
        
        color(100, 100, 100);
        drawText("0x" + hex(rand()%255) + " KB", 250, y);
    }

    if((rand() % 60) > 30) {
        color(0, 255, 0);
        drawRect(50, 320, 10, 2);
    }
}`,
  skeletonCode: `// 练习：尝试把 files[0] 改为 "kernel.sys"，看看目录列表是否实时更新？`
};
