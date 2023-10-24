import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Nut from "./Nut";

const Wrapper = styled.div`
  width: 100%;
`;

export interface INut {
  id: string;
  photo?: string;
  nut: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Timeline = () => {
  const [nuts, setNut] = useState<INut[]>([]);

  const fetchNuts = async () => {
    const nutsQuery = query(
      collection(db, "nuts"),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(nutsQuery);
    const nuts = snapshot.docs.map((doc) => {
      const { nut, createdAt, userId, username, photo } = doc.data();
      return {
        nut,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setNut(nuts);
  };
  useEffect(() => {
    fetchNuts();
  }, []);

  return (
    <Wrapper>
      {nuts.map((nut) => (
        <Nut key={nut.id} {...nut}></Nut>
      ))}
    </Wrapper>
  );
};

export default Timeline;
