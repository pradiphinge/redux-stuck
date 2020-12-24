import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { login } from "../redux/actionCreators/auth";

//import { Redirect } from "react-router-dom";

const Login = ({ loading, errors, login, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Both email and password are required");
      return;
    }

    login({ email, password }, history);
  };
  return (
    <div className="search-params">
      <form onSubmit={getin}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="minimum 6 characters"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={!email || !password || loading}>
          Submit
        </button>
      </form>
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="text-danger">
            {error.msg}
          </p>
        ))}
    </div>
  );
};

Login.propTypes = {
  email: PropTypes.string,
  user: PropTypes.object,
  password: PropTypes.string,
};
const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login })(Login);
