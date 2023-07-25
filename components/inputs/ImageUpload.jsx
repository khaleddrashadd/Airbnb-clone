'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

const ImageUpload = ({ value, onChange, isError }) => {
  console.log(value);
  const handleUpload = e => {
    onChange(e.info.secure_url);
  };
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="wqoqjnzp"
      options={{
        maxFiles: 1,
      }}>
      {({ open }) => {
        function handleOnClick(e) {
          e.preventDefault();
          open&&open();
        }
        return (
          <div
            onClick={handleOnClick}
            className={`relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 ${
              !isError ? 'border-neutral-300' : 'border-rose-400'
            } flex flex-col items-center justify-center gap-4 text-neutral-600`}>
            <TbPhotoPlus size={50} />
            <p className="text-lg font-semibold">Click To Upload</p>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  fill
                  style={{ objectFit: 'cover' }}
                  alt="Upload"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
export default ImageUpload;
