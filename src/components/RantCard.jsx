// src/components/RantCard.jsx
const RantCard = ({ rant }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold">@{rant.username}</h4>
        <span className="text-xl">{rant.mood}</span>
      </div>
      <p className="mb-3">{rant.content}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>❤️ {rant.likes}</span>
        <span>🔁 {rant.reshares}</span>
        <span className="cursor-pointer">💬 Reply</span>
      </div>
    </div>
  );
};

export default RantCard;
