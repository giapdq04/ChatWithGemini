import { GoogleGenerativeAI } from '@google/generative-ai';

const API_Key = 'AIzaSyDtoLEeiTLt8_2gELyL3--lADs1yEMSGbQ';
const genAI = new GoogleGenerativeAI(API_Key);


export const GenAI = () => genAI.getGenerativeModel({ model: "gemini-pro" });
