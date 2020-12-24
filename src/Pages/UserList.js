import React, { useState, useEffect } from "react";
import api from "../utils/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const listOfUsers = async () => {
    const res = await api.get("/users");
    console.log(res);
    setUsers(res.data);
  };

  useEffect(() => {
    listOfUsers();
  }, []);

  return <div>{JSON.stringify(users)}</div>;
};

export default UserList;
