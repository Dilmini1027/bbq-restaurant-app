import { memo } from "react";

const LazyMenuCard = memo(({ src, alt, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={(e) => {
        e.target.src = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop";
      }}
    />
  );
});

LazyMenuCard.displayName = "LazyMenuCard";

export default LazyMenuCard;