import UserProfile from "@/components/UserProfile";
import React from "react";



const User = async({params}) => {
  const {userID} = await params;
  

  return (
    <>
    <UserProfile userid={userID} />
    </>
  );
};

export default User;
