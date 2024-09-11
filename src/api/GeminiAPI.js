import { GoogleGenerativeAI } from '@google/generative-ai';

const API_Key = 'AIzaSyBAbvw-Um7rrTCxU8EajTMSpABvQW0KKf0';

// Tạo một thể hiện của lớp GoogleGenerativeAI với khóa API
const genAI = new GoogleGenerativeAI(API_Key);

// Hàm GenAI trả về một mô hình tạo nội dung
export const GenAI = () => genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
