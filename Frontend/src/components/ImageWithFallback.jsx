// src/components/ImageWithFallback.jsx
import React, { useState } from "react";


export default function ImageWithFallback({ src, alt, fallback, className }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (fallback) setImgSrc(fallback);
        else setImgSrc("https://via.placeholder.com/400x300?text=Image+Not+Found");
      }}
      loading="lazy"
    />
  );
}
