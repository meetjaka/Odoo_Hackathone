import React from 'react';

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 40 }) => {
  return src ? (
    <img
      src={src}
      alt={name}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="rounded-full bg-accent flex items-center justify-center text-lg font-bold text-primary-foreground"
      style={{ width: size, height: size }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar; 