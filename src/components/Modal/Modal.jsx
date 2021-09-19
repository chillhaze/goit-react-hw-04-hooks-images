import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ src, tag, onClose }) => {
  useEffect(() => {
    // Вешаю слушателя
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // Снимаю слуашателя
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Метод закрытия модального окна по кнопке Esc
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  // Метод закрытия модального окна по бекдропу
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={src} alt={tag} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  src: PropTypes.string,
  tag: PropTypes.string,
};
