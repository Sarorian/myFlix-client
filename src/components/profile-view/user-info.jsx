import React from "react";

function UserInfo({ email, name }) {
  return (
    <>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
    </>
  );
}

export default UserInfo;
