import React from "react";

const Profile = async ({ params }) => {
  const id = (await params).id;
  return (
    <div className="relative h-48 bg-slate-500">
      <h1>Profile</h1>
      <p>{id}</p>
    </div>
  );
};

export default Profile;
