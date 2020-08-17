import React, { useRef, useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
function Login() {
  const API_URL = "https://api-na3dzd5ri.vercel.app/api";
  const history = useHistory();
  const [Notifier, setNotifier] = useState({
    status: null,
    message: null,
  });

  const username = useRef("");
  const password = useRef("");

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      history.push("/");
    }
    return () => {
      //none
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    var user = `${username.current.value}`;
    var pass = `${password.current.value}`;
    const resp_ = await axios.post(`${API_URL}/authentication`, {
      name: user,
      password: pass,
    });
    let resp = resp_.data;
    if (resp.success) {
      localStorage.setItem("username", user);
      localStorage.setItem("isAdmin", resp.isAdmin);
      localStorage.setItem("isAuthenticated", true);
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } else {
      setNotifier({
        status: false,
        message: "Invalid Details",
      });
    }
  };
  return (
    <div className="root">
      {Notifier.status === false ? (
        <Alert key="1" variant="danger">
          {Notifier.message}
        </Alert>
      ) : (
        ""
      )}
      <form>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            ref={username}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            ref={password}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={handleLogin}
        >
          Submit
        </button>
        <p className="forgot-password text-right">
          No account ? create a new account <a href="#">here</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
