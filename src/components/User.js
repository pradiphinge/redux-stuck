import React from "react";
import { Link } from "react-router-dom";
const User = (props) => {
  return (
    <Link to={`users/${props._id}`} className="pet">
      <div className="info">
        <h1>{props.name}</h1>
        <h2>{`${props.email} - ${props.phone} - ${props.address}`}</h2>
      </div>
    </Link>
  );
};

export default User;
