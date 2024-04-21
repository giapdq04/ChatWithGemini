import { Text } from 'react-native';
const convertToUpperCase = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.toUpperCase());
};

export const CustomText = ({ children, ...props }) => {
    const processedText = typeof children === 'string' ? convertToUpperCase(children) : children;
    return <Text {...props}>{processedText}</Text>;
};