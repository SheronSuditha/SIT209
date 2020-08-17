import React from "react";
function RegDevice() {
  return (
    <div className="root">
      <form>
        <h3>Device Registeration</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
          />
        </div>

        <div className="form-group">
          <label>Device Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Device Name"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ fontFamily: "Fira Sans" }}
        >
          Register My Device
        </button>
      </form>
    </div>
  );
}

export default RegDevice;
