import { useState, type FC } from 'react';

interface GalleryImage {
    id: number;
    image: string;
    is_main: boolean;
    order: number;
}

interface ProductGalleryProps {
    images: GalleryImage[];
}

const ProductGallery: FC<ProductGalleryProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState<string>(
        images.find(img => img.is_main)?.image || images[0]?.image || ''
    );

    if (!images || images.length === 0) {
        return <div className="no-images">Нет изображений</div>;
    }

    return (
        <div className="product-gallery">
            <div className="main-image">
                <img src={selectedImage} alt="Main product" />
            </div>
            <div className="thumbnails">
                {images.map((img) => (
                    <img
                        key={img.id}
                        src={img.image}
                        alt={`Thumbnail ${img.order}`}
                        className={`thumbnail ${selectedImage === img.image ? 'active' : ''}`}
                        onClick={() => setSelectedImage(img.image)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;