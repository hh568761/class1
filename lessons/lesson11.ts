
import { Difficulty, Lesson } from '../types';

export const lesson11: Lesson = {
  id: 'data-extractor',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第十一课：数据清洗 - 关键特征提取',
  description: '学习 C++ 字符串的 find 和 substr 方法，从杂乱的 HTML 中抠出目标数据。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 砂里淘金的爬虫",
      content: "上一课我们抓到了整个网页的 HTML。但网页里 99% 都是没用的标签代码，我们需要编写‘清洗程序’，把关键的信息抠出来。",
      codeSnippet: "String target = \"提取的内容\";"
    },
    {
      title: "2. find：寻找坐标",
      content: "String 对象的 .find(\"关键词\") 方法会告诉我们这个关键词在第几个字符。如果没有找到，它会返回 -1。这是我们‘手术’的起点。",
      codeSnippet: "int pos = data.find(\"<title>\");"
    },
    {
      title: "3. substr：精准手术刀",
      content: "一旦知道了位置，我们就用 .substr(起点, 长度) 这一把手术刀。它能从一串长文本中切下一小截你想要的内容。",
      codeSnippet: "String result = data.substr(start, 20);"
    },
    {
      title: "4. 真实案例：提取标题",
      content: "今天我们将模拟提取服务器名称的任务。逻辑是：寻找 <title> 标签，计算它后面的偏移量，然后截取到 </title> 为止。准备好了吗？",
      codeSnippet: "int end = data.find(\"</title>\");"
    }
  ],
  initialCode: `// 第11课：黄老师的数据提取器
String rawData = "<html><head><title>SECRET_SERVER_B01</title></head><body>...</body></html>";
String extracted = "WAITING...";

void setup() {
    // 模拟真实的 find 和 substring 逻辑
    // 寻找起始标签，并向后偏移 7 位（跳过 <title> 本身）
    int start = rawData.find("<title>") + 7;
    int end = rawData.find("</title>");
    
    if (start != -1 && end != -1) {
        // 截取中间的文字内容
        extracted = rawData.substr(start, end - start);
    }
}

void loop() {
    background(0, 10, 5);

    color(0, 255, 100);
    fontSize(18);
    drawText("RAW_DATA_STREAM:", 20, 50);
    
    fontSize(10);
    color(0, 200, 80, 100);
    drawText(rawData, 20, 80);

    color(255, 255, 0);
    fontSize(20);
    drawText("EXTRACTED_TITLE:", 20, 150);
    
    color(255, 255, 255);
    drawText(extracted, 20, 190);
    
    // 模拟数据流扫描线
    color(0, 255, 255, 30);
    drawRect(0, (rand()%height), width, 1);
}`,
  skeletonCode: `// 练习：尝试修改 rawData 中的标题内容（例如把 SECRET_SERVER_B01 改成你的代号），看看提取器显示的文字是否随之改变？`
};
