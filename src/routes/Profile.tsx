import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { INut } from "../components/Timeline";
import Nut from "../components/Nut";

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const PforileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.lightGray};
`;

const ProfileBox = styled.div`
  width: 514px;
  padding: 20px 0;
`;
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
const Name = styled.span`
  display: block;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.brown};
`;
const Email = styled.span`
  display: block;
  margin-top: 6px;
  font-size: 15px;
  color: ${({ theme }) => theme.darkGray};
`;

const Nuts = styled.div`
  width: 100%;
  height: 100px;
`;

const Profile = () => {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [nuts, setNuts] = useState<INut[]>([]);

  const fetchNuts = async () => {
    const nutQurey = query(
      collection(db, "nuts"),
      where("userid", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(nutQurey);
    const nuts = snapshot.docs.map((doc) => {
      const { nut, createdAt, userid, username, photo, email } = doc.data();
      return {
        nut,
        createdAt,
        userid,
        username,
        photo,
        id: doc.id,
        email,
      };
    });
    setNuts(nuts);
  };

  useEffect(() => {
    fetchNuts();
  }, []);

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
      <PforileContainer>
        <ProfileBox>
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
          <Email>{user?.email}</Email>
        </ProfileBox>
      </PforileContainer>
      <Nuts>
        {nuts.map((nut) => (
          <Nut key={nut.id} {...nut} />
        ))}
      </Nuts>
    </Wrapper>
  );
};

export default Profile;
