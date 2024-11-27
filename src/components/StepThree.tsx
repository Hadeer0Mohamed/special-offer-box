import React, { useState } from 'react';
import { AiOutlineClose, AiOutlinePlus, AiOutlinePicture } from 'react-icons/ai';
// import './StepThree.css';

const StepThree: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 500 * 1024) {
        setError('Only images with a size lower than 500 KB are allowed.');
        setImage(null);
      } else {
        setImage(file);
        setError(null);
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    setError(null);
  };

  return (
    <form>
      <div className="step-three-container">
        <div className="upload-circle">
          {image ? (
            <>
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded Preview"
                className="uploaded-image"
              />
              <button className="toggle-button" onClick={removeImage} type="button">
                <AiOutlineClose />
              </button>
            </>
          ) : (
            <>
              <label htmlFor="image-upload" className="toggle-button">
                <AiOutlinePlus />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              <AiOutlinePicture className="gallery-icon" />

            </>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
        <p className="info-message mt-3">Only images with a size lower than 500 KB are allowed.</p>

      </div>
    </form>
  );
};

export default StepThree;