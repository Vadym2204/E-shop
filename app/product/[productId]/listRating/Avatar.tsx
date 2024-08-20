import Image from "next/image";
import React, { FC } from "react";
import { FaUserCircle } from "react-icons/fa";

interface IAvatarProps {
  src?: string | null | undefined;
}

const Avatar: FC<IAvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={30}
        width={30}
      />
    );
  }
  return <FaUserCircle size={24} />;
};

export default Avatar;
