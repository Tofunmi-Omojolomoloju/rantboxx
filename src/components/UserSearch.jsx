import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, startAt, endAt, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { setDoc, doc } from "firebase/firestore";

export default function UserSearch() {
  const [term, setTerm] = useState("");
  const [list, setList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!term) return setList([]);
    const q = query(collection(db, "users"), orderBy("username"), startAt(term), endAt(term+"\uf8ff"));
    const unsub = onSnapshot(q, snap => {
      setList(snap.docs.map(d => d.data()));
    });
    return () => unsub();
  }, [term]);

  const follow = async (target) => {
    await setDoc(doc(db, "follows", `${user.uid}_${target.uid}`), {
      follower: user.uid,
      following: target.uid
    });
  };

  return (
    <div>
      <input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search username" />
      {list.map(u => (
        <div key={u.uid} className="flex justify-between">
          <span>@{u.username}</span>
          {u.uid !== user.uid && <button onClick={() => follow(u)}>Follow</button>}
        </div>
      ))}
    </div>
  );
}
