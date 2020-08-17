import React from "react";

function SendCommand() {
  return (
    <div className="root">
      <form>
        <h3>Send a Command</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Your Username"
            disabled
          />
        </div>

        <div className="form-group">
          <label>Command</label>
          <input
            type="text"
            className="form-control"
            placeholder="Please follow the structure"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          style={{ fontFamily: "Fira Sans" }}
        >
          Publish Command
        </button>
      </form>
    </div>
  );
}

export default SendCommand;
