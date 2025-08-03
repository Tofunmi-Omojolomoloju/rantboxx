import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setBio(data.bio || "");
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, {
      name,
      bio,
    });

    alert("Profile updated!");
  };

  if (loading) return <p className="text-center mt-10 text-red-600">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-red-600 text-center">Your Profile</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-red-300 p-3 rounded focus:ring-2 focus:ring-red-500"
          placeholder="Display Name"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border border-red-300 p-3 rounded focus:ring-2 focus:ring-red-500"
          placeholder="Bio"
          rows="4"
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
