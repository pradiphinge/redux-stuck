import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import api from "../utils/api";
import User from "../components/User";

const UserList = ({ user, history }) => {
  const [users, setUsers] = useState([]);

  const listOfUsers = async () => {
    const res = await api.get("/users");
    console.log(res);
    setUsers(res.data);
  };

  useEffect(() => {
    listOfUsers();
  }, []);
  const addUser = () => {
    history.push("/userList/addUser");
  };

  return (
    <div className="search">
      {user && user.role === "admin" && (
        <button onClick={addUser}>Add User</button>
      )}
      {!users || users.length === 0 ? (
        <h1>No Users found</h1>
      ) : (
        users.map((user) => <User key={user._id} {...user} />)
      )}
    </div>
  );
};
UserList.propTypes = {
  user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(UserList);
