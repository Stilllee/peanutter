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
  nut?: string;
  userid: string;
  username?: string;
  createdAt?: number;
  email: string;
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
        setNut(fetchedNuts);
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
