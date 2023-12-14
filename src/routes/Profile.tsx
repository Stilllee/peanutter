import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import React, { useEffect, useState } from "react";
import { TbCameraPlus } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Unsubscribe, updateProfile } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { INut } from "../components/Timeline";
import Nut from "../components/Nut";

const Wrapper = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
const EditIcon = styled.div<IIsEdit>`
  cursor: pointer;
  font-size: 14px;
  display: ${(props) => (props.isEdit ? "block" : "none")};
  padding-top: 10px;
`;
const NameBox = styled.div`
  height: 26px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  &:hover ${EditIcon} {
    display: block;
  }
`;
const Name = styled.span`
  cursor: pointer;
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.brown};
  &:hover {
    text-decoration: underline;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const NameInput = styled.input`
  margin: 0 4px;
`;

const Email = styled.span`
  display: block;
  font-size: 15px;
  color: ${({ theme }) => theme.darkGray};
`;

const Nuts = styled.div`
  width: 100%;
  height: 100px;
`;

interface IIsEdit {
  isEdit: boolean;
}

const Profile = () => {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [nuts, setNuts] = useState<INut[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState<string>(user?.displayName ?? "");

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchNuts = async () => {
      const nutsQuery = query(
        collection(db, "nuts"),
        where("userid", "==", user?.uid),
        orderBy("createdAt", "desc"),
        limit(8)
      );
      unsubscribe = await onSnapshot(nutsQuery, (snapshot) => {
        const fetchedNuts = snapshot.docs.map((doc) => {
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
        setNuts(fetchedNuts);
      });
    };
    fetchNuts();
    return () => {
      unsubscribe && unsubscribe();
    };
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
      await updateProfileInfo();
    }
  };

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const updateProfileInfo = async () => {
    if (!user) return;

    const nutQuery = query(
      collection(db, "nuts"),
      where("userid", "==", user.uid)
    );
    const nutsSnapshot = await getDocs(nutQuery);

    const batch = writeBatch(db);

    nutsSnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        username: user.displayName,
        authorPhotoURL: avatar,
      });
    });
    await batch.commit();
  };

  const handleEditProfile = async () => {
    if (!user) return;
    await updateProfile(user, {
      displayName: editedName,
    });
    setIsEdit(false);
    await updateProfileInfo();
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
          <NameBox>
            <Name onClick={onClickEdit}>
              {user?.displayName ?? "익명의 사용자"}
            </Name>
            <Form>
              {isEdit && (
                <NameInput
                  onChange={handleNameInputChange}
                  placeholder={editedName}
                  type="text"
                />
              )}
              <EditIcon isEdit={isEdit} onClick={handleEditProfile}>
                <AiOutlineEdit />
              </EditIcon>
            </Form>
          </NameBox>
          <Email>{user?.email}</Email>
        </ProfileBox>
      </PforileContainer>
      <Nuts>
        {nuts.map((nut) => (
          <Nut key={nut.id} {...nut} authorPhotoURL={avatar} />
        ))}
      </Nuts>
    </Wrapper>
  );
};

export default Profile;
