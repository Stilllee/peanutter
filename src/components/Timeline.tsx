import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Nut from "./Nut";
import { Unsubscribe } from "firebase/auth";

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

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchNuts = async () => {
      const nutsQuery = query(
        collection(db, "nuts"),
        orderBy("createdAt", "desc"),
        limit(8)
      );
      unsubscribe = await onSnapshot(nutsQuery, (snapshot) => {
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
      });
    };
    fetchNuts();
    return () => {
      unsubscribe && unsubscribe();
    };
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
