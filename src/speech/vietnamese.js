import * as Speech from 'expo-speech';

export const Vietnamese = (text) => {
    try {
        Speech.speak(text, { language: 'vi' });
    } catch (error) {
        console.error("Lỗi khi phát lời nói:", error);
    }
}