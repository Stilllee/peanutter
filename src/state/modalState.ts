import { atom } from "recoil";

export type ModalType = "createAccount" | "logIn" | "passwordReset" | null;

export const modalState = atom<ModalType>({
  key: "modalState",
  default: null,
});
