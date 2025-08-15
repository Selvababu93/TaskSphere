import React from "react";

const RandomAvatar = ({ name }) => {
  const randomId = Math.floor(Math.random() * 70) + 1;
  const imageUrl = `https://i.pravatar.cc/150?${randomId}`;
  return (
    <div className="flex items-center space-x-3 p-2">
      <img
        src={imageUrl}
        alt={name}
        className="w-12 h-12 rounded-full border-2 border-gray-300"
      />
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default RandomAvatar;
