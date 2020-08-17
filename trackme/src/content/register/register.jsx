import React from "react";
import "./register.css";
function Register() {
  return (
    <div className="root">
      <form>
        <h3>Sign Up</h3>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Username" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered ? <a href="#">sign in</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
