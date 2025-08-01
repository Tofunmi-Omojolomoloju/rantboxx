// src/pages/CreateRant.jsx
import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const moods = ["😤", "🤯", "😩", "😎", "🤬", "🥲"];

const CreateRant = () => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addDoc(collection(db, "rants"), {
        userId: user.uid,
        username: user.email.split("@")[0],
        content,
        mood,
        createdAt: serverTimestamp(),
        likes: 0,
        reshares: 0,
      });

      navigate("/feed");
    } catch (err) {
      alert("Error posting rant: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">New Rant</h2>

        <textarea
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex gap-2 text-2xl">
          {moods.map((m) => (
            <span
              key={m}
              onClick={() => setMood(m)}
              className={`cursor-pointer ${m === mood ? "scale-125" : "opacity-60"}`}
            >
              {m}
            </span>
          ))}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Rant
        </button>
      </form>
    </div>
  );
};

export default CreateRant;
