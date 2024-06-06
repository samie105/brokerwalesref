import React from "react";
import Image from "next/image";
import imageuno from "@/public/assets/cards/cardtype1.png";
import imagedues from "@/public/assets/cards/cardtype2.png";
import imagetres from "@/public/assets/cards/cardtype3.png";

export default function ImageJuggler() {
  return (
    <div className="relative w-full h-full ">
      <div className="imageuno lg:-top-5 -top-2 left-0 absolute w-full h-full flex justify-center md:items-center z-30">
        <Image
          src={imageuno}
          alt=""
          width={1000}
          height={1000}
          className="lg:w-[400px] lg:h-[250px] w-[300px] h-[200px]"
        />
      </div>
      <div className="imagedues lg:top-4  top-1 left-0 absolute w-full h-full flex justify-center md:items-center z-20">
        <Image
          src={imagedues}
          alt=""
          width={1000}
          height={1000}
          className="lg:w-[350px] w-[250px] h-[200px]"
        />
      </div>
      <div className="imagetres lg:top-5 top-3 left-0 absolute w-full h-full flex justify-center md:items-center z-10">
        <Image
          src={imagetres}
          alt=""
          width={1000}
          height={1000}
          className="lg:w-[300px] w-[200px] h-[200px]"
        />
      </div>
    </div>
  );
}
