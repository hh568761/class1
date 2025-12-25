
import { Difficulty, Lesson } from '../types';

export const lesson23: Lesson = {
  id: 'signature-scanner',
  chapter: '第三阶段：加密解密与安全算法',
  title: '第二十三课：防御系统 - 特征码扫描',
  description: '学习反病毒软件的基本原理：通过对比已知病毒的“指纹”（特征码）来识别威胁。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 什么是特征码？",
      content: "病毒代码中总有一些独特的字节序列。杀毒软件维护一个庞大的‘指纹库’。扫描文件时一旦匹配成功，就会报警并隔离威胁。",
      codeSnippet: "if(fileData.find(VIRUS_SIG) != -1)"
    },
    {
      title: "2. 查杀逻辑：字符串匹配",
      content: "在内存中，代码是一长串字节（十六进制）。我们使用 `.find()` 函数在内存流中搜索病毒的特征序列，如 `CD 21`。",
      codeSnippet: "found = memory.find(\"CD 21\");"
    },
    {
      title: "3. 实时扫描面板",
      content: "为了模拟扫描，我们要画一个不停上下移动的‘扫描线’。扫描线经过的地方，如果发现了病毒特征码，就在那里画出红色的高亮矩形。",
      codeSnippet: "drawRect(x, scanY, width, 2);"
    },
    {
      title: "4. 威胁告警 UI",
      content: "一个专业的扫描器会在发现威胁时改变整个界面的色调。我们将使用全屏的红色半透明叠加效果，模拟紧急警报状态。",
      codeSnippet: "color(255, 0, 0, 30); drawRect(0,0,w,h);"
    }
  ],
  initialCode: `// 第23课：黄老师的反病毒扫描器
String fileBuffer = "B9 00 4C CD 21 E8 00 00 5B 81 EB"; 
String virusSignature = "CD 21"; 
bool found = false;

void setup() {
    // 自查逻辑：使用 find 方法查找特征码
    if (fileBuffer.find(virusSignature) != -1) {
        found = true;
    }
}

void loop() {
    background(0, 20, 10);

    fontSize(22);
    color(0, 255, 150);
    drawText("AV_ENGINE: SCANNING_MEMORY", 50, 60);

    fontSize(14);
    color(255, 255, 255);
    drawText("BUFFER_STREAM: " + fileBuffer, 50, 150);
    drawText("TARGET_SIGNATURE: " + virusSignature, 50, 180);

    if (found) {
        color(255, 0, 0);
        fontSize(24);
        drawText("!! MALWARE_SIGNATURE_FOUND !!", 50, 300);
        drawRect(40, 270, width-80, 60);
    } else {
        color(0, 255, 0);
        drawText("SYSTEM SECURE: NO THREATS", 50, 300);
    }
    
    color(0, 255, 100, 30);
    drawRect((rand()%width), 0, 2, height);
}`,
  skeletonCode: `// 练习：修改 virusSignature 变量的内容，使其无法在 fileBuffer 中找到，看看系统是否变回“安全”状态？`
};
