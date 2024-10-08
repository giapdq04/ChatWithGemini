import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomText } from '../components/CustomText';
import { GenAI } from '../api/GeminiAPI';
import { Vietnamese } from '../speech/vietnamese';

const ChatGemini = () => {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false); // Đã sửa setLoading
    const scrollViewRef = useRef();

    const StartChat = async () => {
        setLoading(true);
        try {
            // Kiểm tra xem người dùng đã nhập prompt chưa
            if (prompt.length === 0) {
                console.log("Chưa nhập prompt.");
                return;
            }

            // Thêm tin nhắn người dùng vào danh sách tin nhắn
            const userMessage = {
                text: prompt,
                user: true
            };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            setPrompt('');

            // Tạo lịch sử tin nhắn để gửi đến API
            const messageHistory = [...messages, userMessage].map(msg => msg.text).join('\n');

            const genAI = GenAI();

            // Gửi lịch sử tin nhắn đến API
            const result = await genAI.generateContent(messageHistory);
            console.log(result);

            const response = result.response; // Nhận kết quả từ server
            const text = response.text(); // Lấy nội dung text từ kết quả
            console.log(text);

            // Thêm tin nhắn của bot vào danh sách tin nhắn
            const botMessage = {
                text,
                user: false
            };

            setMessages(prevMessages => [...prevMessages, botMessage]);

            // Phát âm tiếng Việt
            Vietnamese(text);
        } catch (error) {
            console.error("Lỗi:", error);
            // Xử lý lỗi phù hợp, ví dụ: thiết lập trạng thái lỗi
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // tự động cuộn đến cuối danh sách tin nhắn khi có tin nhắn mới
        scrollViewRef.current.scrollToEnd({ animated: true });
    }, [messages]);


    return (
        <View style={styles.container}>

            {/* Thanh trạng thái */}
            <StatusBar
                backgroundColor='#60c0f0'
                style='light'
            />

            {/* Tiêu đề */}
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    color: 'white'
                }}>Chat with Gemini</Text>

                <TouchableOpacity style={{
                    position: 'absolute',
                    top: 8,
                    right: 10
                }} onPress={() => setMessages([])}
                >
                    <Ionicons name='reload-outline' size={30} color={'white'} />
                </TouchableOpacity>
            </View>


            {/* Render các tin nhắn */}
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map((message, index) => (
                    <View
                        style={{
                            flexDirection: message.user ? 'row-reverse' : 'row',
                            marginBottom: 10,
                        }}
                        key={index}
                    >
                        <Image
                            source={{ uri: message.user ? 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745' : 'https://cdn-icons-png.freepik.com/512/8943/8943377.png' }}
                            style={{
                                width: 50,
                                height: 50,
                            }}
                        />
                        <View
                            style={{ backgroundColor: message.user ? 'lightblue' : 'white', padding: 10, margin: 5, borderRadius: 30, }}
                        >
                            <CustomText style={{ fontSize: 16, width: 300, fontWeight: 'bold', color: '#4b97bd' }}>
                                {message.text}
                            </CustomText>
                        </View>
                    </View>
                ))}
            </ScrollView>



            {
                loading ? (
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#60c0f0'
                        }}>Đang tải...</Text>
                    </View>

                ) : (
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                    }}>
                        <TextInput
                            placeholder="Nhập tin nhắn..."
                            style={{
                                height: 50,
                                width: 320,
                                fontSize: 25,
                                paddingHorizontal: 10,
                            }}
                            onChangeText={setPrompt}
                            value={prompt}
                        />

                        <TouchableOpacity
                            style={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={StartChat}>
                            <Ionicons name='send' size={20} color={'#60c0f0'} />
                        </TouchableOpacity>

                    </View>
                )
            }


        </View >
    );
};

export default ChatGemini;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#60c0f0',
        alignItems: 'center'
    },
});
