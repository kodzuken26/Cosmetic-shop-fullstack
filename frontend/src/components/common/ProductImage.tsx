import { useMemo } from "react";

interface ProductImageProps {
  imagePath: string;
  alt: string;
}

const ProductImage = ({ imagePath, alt }: ProductImageProps) => {
  const API_URL = import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://kodzuken.pythonanywhere.com";

  const imageUrl = useMemo(() => `${API_URL}${imagePath}`, [imagePath]);

  return (
    <img
      src={imageUrl}
      alt={alt}
      onError={(e) => {
        e.currentTarget.src = "/placeholder.png";
      }}
    />
  );
};

export default ProductImage;
