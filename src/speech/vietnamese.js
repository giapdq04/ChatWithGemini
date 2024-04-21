import * as Speech from 'expo-speech';

// Hàm phát âm tiếng Việt
export const Vietnamese = (text) => {
    try {
        Speech.speak(text, { language: 'vi' });
    } catch (error) {
        console.error("Lỗi khi phát lời nói:", error);
    }
}