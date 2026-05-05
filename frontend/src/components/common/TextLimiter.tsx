import { type FC } from 'react';

interface TextLimiterProps {
    text: string;
    limit: number;
}

export const TextLimiter: FC<TextLimiterProps> = ({ text, limit }) => {
    if (!text) return null;
    if (text.length <= limit) return <span>{text}</span>;
    return <span>{text.slice(0, limit)}...</span>;
};