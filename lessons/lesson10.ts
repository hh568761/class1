
import { Difficulty, Lesson } from '../types';

export const lesson10: Lesson = {
  id: 'web-scraper-basics',
  chapter: '第二阶段：网络协议与数据侦听',
  title: '第十课：初探爬虫 - 真实抓取',
  description: '学习使用 fetchURL 真实获取互联网页面的 HTML 源代码。',
  difficulty: Difficulty.MEDIUM,
  thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400',
  slides: [
    {
      title: "1. 网页背后的真相",
      content: "你看到的精美网页，在计算机眼里其实就是一串长长的、杂乱的文本流，叫做 HTML。\n\n作为极客，我们要跳过浏览器的渲染，直接去‘嗅探’这些原始数据。这是编写爬虫的第一步。",
      codeSnippet: "String data = fetchURL(\"...\");"
    },
    {
      title: "2. fetchURL 是如何工作的？",
      content: "当执行 fetchURL 时：\n1. 你的程序向服务器发出请求。\n2. 代理服务器帮我们避开跨域拦截。\n3. 服务器吐回一整袋‘数据快递’。\n\n注意：网络请求是异步的，就像等外卖，数据不会瞬间到达。",
      codeSnippet: "htmlData = fetchURL(\"https://www.bing.com\");"
    },
    {
      title: "3. 容错处理：黄老师的叮嘱",
      content: "网络世界并不总是美好的。\n- 如果网址填错了，或者目标网站倒闭了，程序会返回 [ERR] 开头的提示。\n- 在处理数据前，一定要先用 .length() 检查一下：袋子是不是空的？",
      codeSnippet: "if (data.substr(0, 5) == \"[ERR]\") { ... }"
    },
    {
      title: "4. 瀑布流输出原理",
      content: "HTML 源代码可能长达几万个字符，屏幕装不下！\n\n我们将学习如何用 for 循环，每隔 80 个字符‘切一刀’，像打印电报一样分行把源码显示出来。",
      codeSnippet: "String line = htmlData.substr(start, 80);"
    }
  ],
  initialCode: `// 第10课：黄老师的网页嗅探器
String htmlData = "正在获取数据...";

void setup() {
    // 爬取 Bing 首页，它比百度对代理更友好
    htmlData = fetchURL("https://www.bing.com");
}

void loop() {
    background(0, 10, 15);

    color(0, 255, 100);
    fontSize(14);
    drawText("HTTP_GET: https://www.bing.com", 20, 40);

    // 检查是否有报错
    if (htmlData.substr(0, 5) == "[ERR]") {
        color(255, 50, 50);
        drawText(htmlData, 20, 80);
        return;
    }

    // 检查数据是否已到达 (降到 50 字符确保快速响应)
    if (htmlData.length() < 50) {
        color(255, 200, 0);
        drawText("LOADING: 网络嗅探中...", 20, 80);
        return;
    }

    fontSize(10);
    color(0, 200, 100, 150);

    // 分段显示 HTML 源码
    for(int i = 0; i < 20; i++) {
        int startPos = i * 80;
        if (startPos < htmlData.length()) {
            String line = htmlData.substr(startPos, 80);
            drawText(line, 20, 80 + i * 20);
        }
    }

    color(255, 255, 255);
    fontSize(12);
    drawText("STATUS: 200 OK | SIZE: " + htmlData.length() + " bytes", 20, height - 30);
}`,
  skeletonCode: `// 挑战任务：尝试把 fetchURL 里的地址改为 "https://www.wikipedia.org"，看看结果有何不同？`
};
