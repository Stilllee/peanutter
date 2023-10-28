import { useRecoilState } from "recoil";
import { ModalType, modalState } from "../state/modalState";
import React from "react";

export const useModal = () => {
  const [currentModal, setCurrentModal] = useRecoilState(modalState);

  const openModal = (modalType: ModalType) => {
    return (e: React.MouseEvent | React.KeyboardEvent) => {
      if ("key" in e && e.key !== "Enter") return;
      setCurrentModal(modalType);
    };
  };

  const closeModal = (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e && "key" in e && e.key !== "Enter") return;
    setCurrentModal(null);
  };

  return { currentModal, openModal, closeModal };
};
