import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';

const Signout = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    sessionStorage.clear();
    navigate('/login');

    handleCloseModal();
  };

  useEffect(() => {
    handleOpenModal();
  }, [navigate]);

  return (
    <>
      {isModalOpen && (
        <ConfirmationModal
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default Signout;
