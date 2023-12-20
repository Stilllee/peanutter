import { atom } from "recoil";

export const userAvatarState = atom<string>({
  key: "userAvatarState",
  default: "",
});
