// src/components/RantList.jsx
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const RantList = ({ type }) => {
  const [rants, setRants] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rants"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Handle filtering
      if (type === "trending") {
        data = data.filter((rant) => rant.likes >= 5); // example
      } else if (type === "following") {
        const followingIds = ["user1", "user2"]; // You’ll later replace this with actual following logic
        data = data.filter((rant) => followingIds.includes(rant.userId));
      }

      setRants(data);
    });

    return () => unsubscribe();
  }, [type]);

  return (
    <div className="space-y-4">
      {rants.length === 0 ? (
        <p className="text-center text-gray-500">No rants found.</p>
      ) : (
        rants.map((rant) => (
          <div
            key={rant.id}
            className="bg-white p-4 rounded shadow border"
          >
            <p className="font-semibold text-red-600">
              {rant.userName || "Anonymous"}
            </p>
            <p>{rant.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RantList;
