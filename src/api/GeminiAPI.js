import { GoogleGenerativeAI } from '@google/generative-ai';

const API_Key = 'AIzaSyDtoLEeiTLt8_2gELyL3--lADs1yEMSGbQ';

// Tạo một thể hiện của lớp GoogleGenerativeAI với khóa API
const genAI = new GoogleGenerativeAI(API_Key);

// Hàm GenAI trả về một mô hình tạo nội dung
export const GenAI = () => genAI.getGenerativeModel({ model: "gemini-pro" });
