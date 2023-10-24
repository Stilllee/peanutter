import styled from "styled-components";
import { auth, storage } from "../firebase";
import React, { useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

const Wrapper = styled.div``;
const CameraIcon = styled(TbCameraPlus)`
  position: absolute;
  width: 120px;
  height: 120px;
  top: 0;
  left: -4px;
  background-color: rgba(26, 26, 26, 0.15);
  padding: 40px;
  color: ${({ theme }) => theme.lightGray};
  opacity: 0;
  border-radius: 50%;
`;
const AvatarUpload = styled.label`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: block;
  border: 3px solid white;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.brown};
  }

  &:hover ${CameraIcon} {
    opacity: 1;
  }
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const AvatarInput = styled.input`
  display: none;
`;
const Name = styled.span``;

const Profile = () => {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);

  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        <AvatarImg src={avatar ?? "profile.webp"} />
        <CameraIcon />
      </AvatarUpload>
      <AvatarInput
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <Name>{user?.displayName ?? "익명의 사용자"}</Name>
    </Wrapper>
  );
};

export default Profile;
