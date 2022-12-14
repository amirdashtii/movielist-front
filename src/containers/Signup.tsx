import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import axios from "axios";

const Signup = ({
  signup,
  isAuthenticated,
}: {
  signup: any;
  isAuthenticated: any;
}) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { username, email, password, re_password } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (password === re_password) {
      signup(username, email, password, re_password);
      setAccountCreated(true);
    }
  };
  const continueWithGoogle = async () => {
    try {
    
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}`
      );

      window.location.replace(res.data.authorization_url);
    } catch (err) {}
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  if (accountCreated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container mt-5">
      <h1>Sign Up</h1>
      <p>Create your Account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Username*"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="email"
            placeholder="Email*"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Password*"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            // minLength='6'
            required
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password*"
            name="re_password"
            value={re_password}
            onChange={(e) => onChange(e)}
            // minLength='6'
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
      <button className=" btn btn-danger mt-3" onClick={continueWithGoogle}>
        Continue With Google
      </button>
      <p className="mt-3">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Signup);
