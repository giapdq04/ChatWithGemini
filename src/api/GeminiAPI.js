import { GoogleGenerativeAI } from '@google/generative-ai';

const API_Key = 'AIzaSyDtoLEeiTLt8_2gELyL3--lADs1yEMSGbQ';

export const GenAI = () => {
    const genAI = new GoogleGenerativeAI(API_Key);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    return model;
}
