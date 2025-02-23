import React, { useState, useRef } from 'react';
import { Camera, X, Check, Upload, Trash } from 'lucide-react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useAuthStore } from '../stores/authStore';

const ProfilePictureManager = () => {
  const { user, updateUser } = useAuthStore();
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [showCropper, setShowCropper] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1, // aspect ratio
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result as string);
      setShowCropper(true);
    };
    reader.onerror = () => {
      setError('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = () => {
    if (!imgRef.current || !crop) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    const pixelCrop = {
      x: crop.x * scaleX,
      y: crop.y * scaleY,
      width: crop.width * scaleX,
      height: crop.height * scaleY,
    };

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      imgRef.current,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    setProfileImage(base64Image);
    setShowCropper(false);
    setTempImage(null);
    updateUser({ profileImage: base64Image });
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setTempImage(null);
    setShowCropper(false);
    updateUser({ profileImage: null });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {error && (
        <div className="w-full p-4 bg-red-500/10 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      {showCropper && tempImage ? (
        <div className="w-full max-w-md bg-white/5 rounded-xl p-4">
          <div className="mb-4 text-center text-sm text-gray-300">
            Drag to adjust the crop area
          </div>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={1}
            circularCrop
          >
            <img
              ref={imgRef}
              src={tempImage}
              onLoad={onImageLoad}
              className="max-w-full rounded-lg"
              alt="Crop preview"
            />
          </ReactCrop>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => {
                setShowCropper(false);
                setTempImage(null);
              }}
              className="p-2 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <button
              onClick={handleCropComplete}
              className="p-2 text-[#D0FD3E] hover:text-white"
            >
              <Check size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border-2 border-[#D0FD3E]/20 hover:border-[#D0FD3E]/40 transition-colors">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="text-[#D0FD3E] w-12 h-12" />
            )}
          </div>
          
          <div className="absolute -bottom-2 right-0 flex space-x-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-[#D0FD3E] rounded-full text-[#0A1A2F] hover:opacity-90 transition-opacity"
              title="Upload new picture"
            >
              <Upload size={16} />
            </button>
            {profileImage && (
              <button
                onClick={handleRemoveImage}
                className="p-2 bg-red-500 rounded-full text-white hover:opacity-90 transition-opacity"
                title="Remove picture"
              >
                <Trash size={16} />
              </button>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePictureManager;