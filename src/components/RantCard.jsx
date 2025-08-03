// src/components/RantCard.jsx
const RantCard = ({ rant }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">
          {rant.username || "Anonymous"}
        </span>
        <span className="text-2xl">{rant.mood}</span>
      </div>

      <p className="mb-3">{rant.content}</p>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>👍 {rant.likes}</span>
        <button className="hover:underline">💬 Comment</button>
        <button className="hover:underline">🔁 Reshare</button>
      </div>
    </div>
  );
};

export default RantCard;
