import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAi() {
  if (!aiInstance) {
    // Priority: 1. process.env (Vite define) 2. window.process.env (Polyfill)
    const apiKey = process.env.GEMINI_API_KEY || (window as any).process?.env?.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please ensure it is configured in your environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function getChatResponse(message: string, language: 'en' | 'ar') {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = language === 'ar' 
    ? "أنت مساعد ذكي لموقع زيزي (Ziizi). مهمتك هي مساعدة المستخدمين العرب في العثور على معلومات حول الهجرة، الزواج في الخارج، العمل، والسفر. أجب باللغة العربية بأسلوب مهني وودود."
    : "You are an AI assistant for Ziizi. Your goal is to help Arab expatriates find information about immigration, marriage abroad, work, and travel. Answer in English in a professional and friendly tone.";

  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model,
      contents: [{ parts: [{ text: message }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || (language === 'ar' ? "عذراً، حدث خطأ ما." : "Sorry, something went wrong.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' ? "عذراً، لا يمكنني الاتصال بالخدمة حالياً." : "Sorry, I cannot connect to the service right now.";
  }
}
