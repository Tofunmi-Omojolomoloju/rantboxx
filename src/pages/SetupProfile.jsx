import { useState } from "react";
import { db, auth } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SetupProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  console.log("Current user:", user); // debug

  if (!user) {
    alert("No user logged in!");
    return;
  }

  try {
    await setDoc(doc(db, "users", user.uid), {
      name,
      bio,
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });

    alert("Profile saved!");
    navigate("/");
  } catch (err) {
    console.error("Firestore error", err);
    alert("Error saving profile: " + err.message);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-red-600 text-center">Set Up Profile</h2>

        <input
          type="text"
          placeholder="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-red-300 p-3 rounded focus:ring-2 focus:ring-red-500"
          required
        />

        <textarea
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-red-300 p-3 rounded focus:ring-2 focus:ring-red-500"
          rows="4"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition duration-200"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default SetupProfile;
