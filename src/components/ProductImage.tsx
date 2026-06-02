import { useState } from "react";
import {
  getProductImageUrl,
  PRODUCT_IMAGE_PLACEHOLDER,
} from "../utils/productImage";

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Imgur and similar hosts block hotlinks when a Referer header is sent (e.g. from localhost).
 * referrerPolicy="no-referrer" fixes that for Escuela JS product images.
 */
const ProductImage = ({ src, alt, className = "" }: ProductImageProps) => {
  const initial = src ? getProductImageUrl([src]) : PRODUCT_IMAGE_PLACEHOLDER;
  const [imgSrc, setImgSrc] = useState(initial);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (imgSrc !== PRODUCT_IMAGE_PLACEHOLDER) {
          setImgSrc(PRODUCT_IMAGE_PLACEHOLDER);
        }
      }}
    />
  );
};

export default ProductImage;
