import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryItem, TranslationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Using gemini-2.5-flash as recommended for general text tasks
const MODEL_NAME = 'gemini-2.5-flash';

export const askAiAboutSpot = async (item: ItineraryItem): Promise<string> => {
    if (!process.env.API_KEY) return "API Key 未設定，無法使用 AI 功能。";
    try {
        const prompt = `你是專業的越南導遊。請用繁體中文為遊客介紹位於河內的景點：「${item.title}」。
        請包含：1. 歷史背景或特色 (簡短) 2. 參觀重點 3. 一個有趣的冷知識。
        語氣要輕鬆有趣，適合家庭旅遊。不要超過 250 字。使用 Markdown 格式 (bold key terms).`;

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
        });

        return response.text || "抱歉，無法獲取資訊。";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "抱歉，AI 目前有點忙碌，請稍後再試。";
    }
};

export const sendChatMessage = async (userMsg: string, itinerary: ItineraryItem[]): Promise<string> => {
    if (!process.env.API_KEY) return "API Key 未設定，無法使用 AI 功能。";
    try {
        const itineraryContext = JSON.stringify(itinerary.map(i => `${i.date} ${i.time} ${i.title}`));
        const systemContext = `你是一個專業的河內旅遊嚮導，正在協助「蛋蛋全家」進行旅遊。
        目前的行程如下：${itineraryContext}。
        使用者目前的問題是：「${userMsg}」。
        請用繁體中文回答，語氣親切活潑。如果問題與行程無關，就提供一般河內旅遊建議。
        回答請簡潔，不要長篇大論。`;

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: systemContext,
        });
        
        return response.text || "我無法回答該問題。";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "抱歉，AI 連線發生問題。";
    }
};

export const translateText = async (text: string, sourceLang: 'zh' | 'vi'): Promise<TranslationResult | null> => {
    if (!process.env.API_KEY) return null;
    try {
        const prompt = `Translate the following text: "${text}".
        Source language: ${sourceLang === 'zh' ? 'Traditional Chinese (Mandarin)' : 'Vietnamese'}.`;

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: { 
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        zh: { type: Type.STRING },
                        vi: { type: Type.STRING },
                        en: { type: Type.STRING }
                    },
                    required: ['zh', 'vi', 'en']
                }
            }
        });

        const jsonStr = response.text || "{}";
        const result = JSON.parse(jsonStr);
        
        return {
            original: text,
            zh: result.zh || '',
            vi: result.vi || '',
            en: result.en || ''
        };
    } catch (error) {
        console.error("Translation Error:", error);
        return null;
    }
};