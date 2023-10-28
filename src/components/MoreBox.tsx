import styled from "styled-components";
import { PiTrash } from "react-icons/pi";
import { RiFlag2Line } from "react-icons/ri";
import { INut } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { forwardRef } from "react";

const Wrapper = styled.div`
  position: relative;
  font-size: 15px;
  font-weight: 600;
  color: tomato;
`;

const Content = styled.div`
  width: 325px;
  position: absolute;
  right: 0;
  top: -10px;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px,
    rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
  z-index: 1; /* 다른 요소 위에 표시되도록 설정 */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 12px 16px;
  border-radius: 15px;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`;

const MoreBox = forwardRef<HTMLDivElement, INut>(
  ({ userid, id, photo }, forwardedRef) => {
    const user = auth.currentUser;

    const handleDelete = async (e: React.MouseEvent | React.KeyboardEvent) => {
      if ("key" in e && e.key !== "Enter") return;

      const ok = confirm("넛을 삭제할까요?");
      if (!ok || user?.uid !== userid) return;
      try {
        await deleteDoc(doc(db, "nuts", id));
        if (photo) {
          const photoRef = ref(storage, `nuts/${user.uid}/${id}`);
          await deleteObject(photoRef);
        }
      } catch (error) {
        console.log(error);
      } finally {
        //
      }
    };

    return (
      <Wrapper ref={forwardedRef}>
        <Content>
          {user?.uid === userid ? (
            <Item tabIndex={0} onClick={handleDelete} onKeyDown={handleDelete}>
              <PiTrash />
              삭제하기
            </Item>
          ) : (
            <Item tabIndex={0}>
              <RiFlag2Line />
              게시 신고하기
            </Item>
          )}
        </Content>
      </Wrapper>
    );
  }
);

export default MoreBox;
