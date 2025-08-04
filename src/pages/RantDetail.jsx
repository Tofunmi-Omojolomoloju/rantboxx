// src/pages/RantDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  increment,
} from "firebase/firestore";
import { TextField, Button, Typography, IconButton } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function RantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [rant, setRant] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const ref = doc(db, "rants", id);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() };
        setRant(data);
        setHasLiked(data.likedBy?.includes(user.uid));
      }
    });
    return () => unsub();
  }, [id, user.uid]);

  useEffect(() => {
    const q = query(collection(db, `rants/${id}/comments`), orderBy("createdAt"));
    const unsub = onSnapshot(q, (snap) => {
      setComments(snap.docs.map((d) => d.data()));
    });
    return () => unsub();
  }, [id]);

  const submit = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, `rants/${id}/comments`), {
      text,
      username: user.email.split("@")[0],
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  const toggleLike = async () => {
    const rantRef = doc(db, "rants", id);
    const update = hasLiked
      ? {
          likes: increment(-1),
          likedBy: rant.likedBy.filter((uid) => uid !== user.uid),
        }
      : {
          likes: increment(1),
          likedBy: [...(rant.likedBy || []), user.uid],
        };
    await updateDoc(rantRef, update);
  };

  const reshare = async () => {
    const rantRef = doc(db, "rants", id);
    await updateDoc(rantRef, {
      reshares: increment(1),
    });
  };

  if (!rant) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto text-red-700">
      <button
        className="text-red-600 font-semibold mb-4"
        onClick={() => navigate(-1)}
      >
        ← Go Back
      </button>

      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold">@{rant.username}</h2>
        <p className="mt-2">{rant.content}</p>
        <p className="text-sm text-gray-500 mt-1">
          {rant.mood?.emoji} {rant.mood?.label}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <IconButton onClick={toggleLike} sx={{ color: "#B91C1C" }}>
            {hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <span>{rant.likes || 0}</span>

          <IconButton sx={{ color: "#B91C1C" }}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <span>{comments.length}</span>

          <IconButton onClick={reshare} sx={{ color: "#B91C1C" }}>
            <ShareIcon />
          </IconButton>
          <span>{rant.reshares || 0}</span>
        </div>
      </div>

      <Typography variant="h6">Comments</Typography>
      <div className="flex gap-2 mt-2 mb-4">
        <TextField
          fullWidth
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
        />
        <Button
          variant="contained"
          onClick={submit}
          style={{ backgroundColor: "#B91C1C" }}
        >
          Post
        </Button>
      </div>

      <div>
        {comments.map((c, i) => (
          <div key={i} className="mb-2">
            <strong>@{c.username}</strong>: {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}
