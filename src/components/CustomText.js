import { Text } from 'react-native';

// Nhận một chuỗi văn bản và chuyển đổi các phần văn bản nằm trong cặp dấu ** thành chữ hoa
const convertToUpperCase = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.toUpperCase());
};


// Component CustomText nhận children là một chuỗi hoặc một component Text khác
// Nếu children là chuỗi, nó sẽ chuyển đổi các phần văn bản nằm trong cặp dấu ** thành chữ hoa
// Nếu children là một component Text khác, nó sẽ trả về children đó mà không thực hiện chuyển đổi
export const CustomText = ({ children, ...props }) => {
    const processedText = typeof children === 'string' ? convertToUpperCase(children) : children;
    return <Text {...props}>{processedText}</Text>;
};