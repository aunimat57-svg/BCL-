
import { GoogleGenAI, Type } from "@google/genai";
import { PostType, SoftSellingState, ExtraTopicState } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generatePrompt = (
  type: PostType,
  content: string,
  soft: SoftSellingState,
  extra: ExtraTopicState
): string => {
  const basePrompt = "Anda adalah seorang pakar media sosial yang mahir dalam penulisan copywriting dalam Bahasa Melayu. Hasilkan 3 variasi post media sosial yang menarik, setiap satu dalam lingkungan 100-150 patah perkataan. Pastikan gaya bahasa mesra, mudah dibaca dan sesuai untuk platform seperti Facebook atau Instagram.";

  switch (type) {
    case 'topik':
      return `${basePrompt}\n\nBerdasarkan topik umum ini: "${content}".`;
    case 'softselling':
      return `${basePrompt}\n\nIni adalah post jenis soft selling. Gunakan formula berikut dan kembangkannya menjadi satu penceritaan yang lengkap dan meyakinkan:\n- Hook: "${soft.hook}"\n- Masalah: "${soft.problem}"\n- Solusi: "${soft.solution}"\n- CTA: "${soft.cta}"`;
    case 'sembang':
      return `${basePrompt}\n\nJenis post ini adalah sembang santai. Mulakan perbualan mengenai topik: "${extra.topic}". Gunakan gaya bahasa yang santai dan ajukan soalan di akhir post untuk menggalakkan interaksi.`;
    case 'kewangan':
      return `${basePrompt}\n\nFokus post ini adalah mengenai kewangan. Huraikan topik ini: "${extra.topic}" dengan cara yang mudah difahami oleh orang awam. Berikan tips atau nasihat yang praktikal dan boleh terus diamalkan.`;
    default:
      return basePrompt;
  }
};

export const generatePostVariations = async (
  type: PostType,
  content: string,
  soft: SoftSellingState,
  extra: ExtraTopicState
): Promise<string[]> => {
  const prompt = generatePrompt(type, content, soft, extra);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            posts: {
              type: Type.ARRAY,
              description: "Senarai 3 variasi copywriting post media sosial.",
              items: {
                type: Type.STRING,
                description: "Satu variasi copywriting post."
              },
            },
          },
          required: ["posts"],
        },
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    
    if (result.posts && Array.isArray(result.posts)) {
        return result.posts;
    } else {
        throw new Error("Invalid response format from AI.");
    }

  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw new Error("Gagal menjana kandungan. Sila cuba lagi.");
  }
};
