import { useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const moods = [
  { emoji: "", label: "No mood selected" },
  { label: 'Angry', emoji: '😡' },
  { label: 'Happy', emoji: '😊' },
  { label: 'Sad', emoji: '😢' },
  { label: 'Excited', emoji: '🤩' },
  { label: 'Tired', emoji: '🥱' },
  { label: 'Frustrated', emoji: '😣' },
  { label: 'Chill', emoji: '😎' },
  { label: 'In Love', emoji: '😍' },
  { label: 'Confused', emoji: '😵‍💫' },
  { label: 'Proud', emoji: '😌' },
  { label: 'Heartbroken', emoji: '💔' },
  { label: 'Mind Blown', emoji: '🤯' },
  { label: 'Laughing', emoji: '😂' },
  { label: 'Overthinking', emoji: '🧠' },
  { label: 'Speechless', emoji: '🤐' },
  { label: 'Triggered', emoji: '🚨' },
  { label: 'Low-key angry', emoji: '😠' },
  { label: 'Triggered', emoji: '🚨' },
  { label: 'Speechless', emoji: '🤐' },
  { label: 'Disgusted', emoji: '🤢' },          
  { label: 'Shocked', emoji: '😱' },            
  { label: 'Embarrassed', emoji: '😳' },       
  { label: 'Blank', emoji: '😐' },   
];

const CreateRant = () => {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addDoc(collection(db, "rants"), {
        userId: user.uid,
        username: isAnonymous ? "Anonymous" : user.email.split("@")[0],
        isAnonymous,
        content,
          mood: {
          emoji: mood.emoji,
          label: mood.label,
        },

        createdAt: serverTimestamp(),
        likes: 0,
        reshares: 0,
      });

      // ✅ Clear form
      setContent("");
      setMood(moods[0]);
      setIsAnonymous(false);

      // ✅ Redirect to feed
      navigate("/feed");
    } catch (err) {
      alert("Error posting rant: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">Let it out...</h2>

        <textarea
          rows="4"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded resize-none"
        />

        <div>
          <label className="block mb-1 font-medium">Select Mood</label>
          <select
            value={mood.label}
            onChange={(e) => {
              const selected = moods.find((m) => m.label === e.target.value);
              setMood(selected);
            }}
            className="w-full border rounded p-2"
          >
            {moods.map((m) => (
              <option key={m.label} value={m.label}>
                {m.emoji} {m.label}
              </option>
            ))}
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
          Post anonymously
        </label>

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Rant
        </button>
      </form>
    </div>
  );
};

export default CreateRant;
