import { useRecoilState } from "recoil";
import { ModalType, modalState } from "../state/modalState";

export const useModal = () => {
  const [currentModal, setCurrentModal] = useRecoilState(modalState);

  const openModal = (modalType: ModalType) => setCurrentModal(modalType);
  const closeModal = () => setCurrentModal(null);

  return { currentModal, openModal, closeModal };
};
