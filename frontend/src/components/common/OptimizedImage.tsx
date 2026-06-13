// src/components/common/OptimizedImage.tsx
import { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
}

const OptimizedImage = ({ src, alt, className }: OptimizedImageProps) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        // Обновляем src только если он изменился
        setImageSrc(prev => prev !== src ? src : prev);
    }, [src]);

    return (
        <img 
            src={imageSrc} 
            alt={alt}
            className={className}
            onError={(e) => {
                e.currentTarget.src = '/placeholder.png';
            }}
        />
    );
};

export default OptimizedImage;