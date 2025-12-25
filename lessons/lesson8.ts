
import { Difficulty, Lesson } from '../types';

export const lesson8: Lesson = {
  id: 'log-auditor',
  chapter: '第一阶段：终端渗透与系统基础',
  title: '第八课：日志审计 - 特征搜寻',
  description: '学习字符串搜索与过滤，从海量系统日志中精准定位“非法入侵”痕迹。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dee592da1db?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 发现蛛丝马迹",
      content: "做过的事总会留下痕迹。日志 (Log) 是系统的日记。审计员的职责就是编写代码，自动找出包含 'ATTACK' 或 'FAIL' 关键字的危险记录。",
      codeSnippet: "if (log.find(\"FAIL\") != -1)"
    },
    {
      title: "2. find 方法：关键词探测器",
      content: "在 C++ 中，`find` 函数能在一长串文字里找到子字符串的位置。如果返回的结果不是 -1，就说明它找到了目标关键词。",
      codeSnippet: "int pos = text.find(\"ALERT\");"
    },
    {
      title: "3. 逻辑合并：|| (或) 的运用",
      content: "有时候我们需要同时搜寻多个危险信号。使用 || 符号（逻辑或），只要满足‘包含 ALERT’ 或者 ‘包含 block’ 其中的任何一个，我们就标记危险。",
      codeSnippet: "if (is_alert || is_block)"
    },
    {
      title: "4. 视觉警报：高亮标记",
      content: "在 UI 设计上，普通日志用绿色或灰色显示，而威胁日志必须用醒目的红色，并添加额外的‘!! THREAT !!’后缀，防止被管理员忽略。",
      codeSnippet: "if(threat) color(255, 0, 0);"
    }
  ],
  initialCode: `// 第8课：黄老师的日志审计员
String logs[6] = {
    "10:01:23 - User login: admin",
    "10:02:45 - Database connection: OK",
    "10:03:12 - ALERT: Unauthorized access from 192.168.1.105",
    "10:05:01 - File accessed: secret_keys.txt",
    "10:06:22 - Firewall block: suspicious packet detected",
    "10:07:00 - User logout: guest"
};

void setup() {
    background(0, 0, 0);
}

void loop() {
    background(0, 0, 0);

    color(255, 255, 255, 100);
    fontSize(18);
    drawText("SYSTEM AUDIT LOGS", 50, 50);

    for(int i=0; i<6; i++) {
        int y = 100 + i * 40;
        
        // 使用 find 方法寻找关键字
        if (logs[i].find("ALERT") != -1 || logs[i].find("block") != -1) {
            color(255, 0, 0);
            drawText("!! THREAT DETECTED !!", width - 250, y);
            fontSize(14);
            drawText(logs[i], 50, y);
        } else {
            color(0, 200, 100);
            fontSize(12);
            drawText(logs[i], 50, y);
        }
    }
}`,
  skeletonCode: `// 练习：尝试把 logs[0] 的内容改成一个包含 "ALERT" 的字符串，看看它是否会被自动标记为红色？`
};
