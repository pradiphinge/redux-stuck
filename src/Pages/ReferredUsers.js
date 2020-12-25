import React, { useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { referRegister } from "../redux/actionCreators/referredUsers";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  role: "user",
};
const ReferredUsers = ({ errors, loading, referRegister }) => {
  const [formdata, setFormdata] = useState(initialState);
  //const [password, setPassword] = useState("");

  const onChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const { name, email, password, phone, address, role } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim() || !phone.trim() || !name.trim()) {
      toast.warning("name,email,password and phone are required");
      return;
    }

    referRegister(formdata);
  };
  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          required
          onChange={(e) => onChange(e)}
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={onChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="minimum 6 characters"
          onChange={(e) => onChange(e)}
          required
          minLength="6"
        />
        <label htmlFor="phone">phone</label>
        <input
          type="number"
          id="phome"
          name="phone"
          value={phone}
          required
          onChange={(e) => onChange(e)}
        />

        <label htmlFor="address">address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => onChange(e)}
        />

        <label htmlFor="role">role</label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onChange(e)}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>

        <button
          type="submit"
          disabled={!email || !password || !name || loading}
        >
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

ReferredUsers.propTypes = {
  email: PropTypes.string,
  user: PropTypes.object,
  password: PropTypes.string,
  register: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  errors: state.ref.errors,
  loading: state.ref.loading,
});
//const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, { referRegister })(ReferredUsers);
