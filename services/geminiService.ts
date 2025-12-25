import { GoogleGenAI } from "@google/genai";

export const askAiAboutCode = async (code: string, question: string) => {
  // 获取 API 密钥
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "") {
    console.warn("API Key is missing. Please check your GitHub Secrets configuration.");
    return "🚨 [助教提醒]: 我的大脑目前处于离线状态。黄老师，请确保在 GitHub 仓库的 Settings -> Secrets -> Actions 中配置了名为 API_KEY 的密钥。";
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      config: {
        temperature: 0.7,
        systemInstruction: "你是一个专业的少儿编程老师，名字叫黄老师的AI助教。你说话幽默风趣，擅长用比喻解释C++概念。你的任务是引导学生思考，提供逻辑思路，绝对不能直接给出完整的代码答案。如果学生代码有错误，请温柔地指出并鼓励他们尝试修正。"
      },
      contents: `学生当前编写的代码：\n\`\`\`cpp\n${code}\n\`\`\`\n\n学生的问题：${question}`,
    });
    
    return response.text || "老师刚才信号闪了一下，没听清，能麻烦你再说一遍吗？";
  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    // 针对网络加速器/防火墙问题的友好提示
    return "🚨 [信号波动]: 助教目前无法连接到云端。这通常是因为本地网络限制，请尝试开启或切换网络代理工具后再次提问。";
  }
};