import React, { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode; 
  isGrid: boolean;
}

const AddTravelFormModal: React.FC<ModalProps> = ({ children, onClose, isGrid }) => {
  return (
    
      <div className={isGrid ? "modal-content_grid" : "modal-content_flex" } onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
  );
};

export default AddTravelFormModal;