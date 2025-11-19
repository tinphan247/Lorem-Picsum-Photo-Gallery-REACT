// src/components/PhotoCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PhotoCard = ({ photo }) => {
  const thumbnailUrl = `https://picsum.photos/id/${photo.id}/300/200`;

  return (
    <Link
      to={`/photos/${photo.id}`}
      state={{ author: photo.author, id: photo.id }}
      className="
        photo-card-item block overflow-hidden rounded-xl shadow-md 
        bg-white transition-all duration-300 ease-out 
        hover:shadow-xl hover:scale-[1.03] active:scale-[0.99]
      "
    >
      {/* Image container: luôn căn giữa */}
      <div className="relative w-full h-40 flex items-center justify-center overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={`Photo by ${photo.author}`}
          className="
            max-w-none 
            transition-all duration-500 ease-out 
            opacity-0 animate-fadeInSlow
            group-hover:opacity-90
            object-cover
          "
          style={{ width: "100%", height: "100%", objectPosition: "center" }}
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-sm font-semibold truncate text-white">
          Tác giả: {photo.author}
        </p>
      </div>
    </Link>
  );
};

export default PhotoCard;
