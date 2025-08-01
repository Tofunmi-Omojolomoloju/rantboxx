// src/components/RantList.jsx
import { useEffect, useState } from "react";
import RantCard from "./RantCard";

// Temporary dummy rants
const dummyRants = [
  {
    id: "1",
    username: "ranter_1",
    mood: "😤",
    content: "Ughhh... Mondays!",
    likes: 5,
    reshares: 2,
  },
  {
    id: "2",
    username: "ranter_2",
    mood: "🤯",
    content: "Why is JavaScript like this?!",
    likes: 12,
    reshares: 4,
  },
];

const RantList = ({ type }) => {
  const [rants, setRants] = useState([]);

  useEffect(() => {
    if (type === "following") {
      setRants([dummyRants[0]]);
    } else {
      setRants(dummyRants);
    }
  }, [type]);

  return (
    <div className="space-y-4">
      {rants.map((rant) => (
        <RantCard key={rant.id} rant={rant} />
      ))}
    </div>
  );
};

export default RantList;
