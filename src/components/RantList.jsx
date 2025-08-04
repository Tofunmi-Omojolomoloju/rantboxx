import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RantList = () => {
  const [rants, setRants] = useState([]);
  const [selectedRant, setSelectedRant] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "rants"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRants(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const handleLike = async (e, id) => {
    e.stopPropagation();
    const ref = doc(db, "rants", id);
    await updateDoc(ref, { likes: increment(1) });
  };

  const handleReshare = async (e, id) => {
    e.stopPropagation();
    const ref = doc(db, "rants", id);
    await updateDoc(ref, { reshares: increment(1) });
  };

  const handleCommentClick = (e, rant) => {
    e.stopPropagation();
    setSelectedRant(rant);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      {rants.map((rant) => (
        <div
          key={rant.id}
          className="border p-4 rounded mb-4 bg-white cursor-pointer"
          onClick={() => navigate(`/rant/${rant.id}`)}
        >
          <div className="flex justify-between">
            <span>@{rant.username}</span>
            <span>
              {rant.mood?.emoji} {rant.mood?.label}
            </span>
          </div>
          <p className="mt-2">{rant.content}</p>

          <div className="flex gap-4 mt-3 text-gray-600">
            <button onClick={(e) => handleLike(e, rant.id)}>
              ❤️ {rant.likes || 0}
            </button>
            <button onClick={(e) => handleCommentClick(e, rant)}>
              💬 {rant.comments?.length || 0}
            </button>
            <button onClick={(e) => handleReshare(e, rant.id)}>
              🔁 {rant.reshares || 0}
            </button>
          </div>
        </div>
      ))}

      
    </div>
  );
};

export default RantList;
