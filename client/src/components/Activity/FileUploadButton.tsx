import { useState, ChangeEvent } from 'react';

import { uploadPhoto } from '../../services/apiService';

const FileUploadButton = () => {
  const [pictureFilename, setPictureFilename] = useState('');

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const filename = event.target.files![0].name;
    console.log('FILENAME ', filename);

    uploadPhoto(event.target.files);
  };

  //   const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files && event.target.files[0]) {
  //       const file = event.target.files[0];
  //       const filename = file.name;
  //       console.log('FILENAME', filename);
  //       uploadPhoto(file);
  //     }
  //   };

  return (
    <div>
      <input
        id='file-upload'
        type='file'
        accept='image/png, image/jpeg'
        name='displayPicSrc'
        required={true}
        onChange={handlePhotoUpload}
        className='image-upload'
      />
      {pictureFilename}
    </div>
  );
};

export default FileUploadButton;
