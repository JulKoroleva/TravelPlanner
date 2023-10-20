// ImageModal.tsx

import React, { ChangeEvent, ReactElement } from 'react';

interface ImageModalProps {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onToggleModal: () => void;
}

const ImageModal = ({ imageUrl, setImageUrl, onSubmit, onToggleModal }: ImageModalProps): ReactElement => {
  return (
    
    <div className="form__add-plan_image">
        <button className='close__btn'
     onClick={onToggleModal}></button>
        <h3 style={{marginTop:'20px'}}>
            Вставьте ссылку
            </h3>
      <input
        type="text"
        className='form__input'
        style={{width:"90%", opacity: '0.6'}}
        placeholder='https://www.google.com/'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
      />
     
      <button onClick={onSubmit} className='add-image__btn'>Изменить</button>
    </div>
    
  );
};

export default ImageModal;
