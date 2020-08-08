import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { loginFields, authCredentials } from "./helper";
import "./login.scss";

const Login = ({ history }) => {
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });

  const handleSubmit = () => {
    if (JSON.stringify(credentials) === JSON.stringify(authCredentials)) {
      history.push("/user/list");
      localStorage.setItem("auth", JSON.stringify(credentials));
      NotificationManager.success("Login successful!", "", 3000);
    } else {
      NotificationManager.error("Login failed", "", 3000);
    }
  };

  const handleOnChange = (value, field) => {
    const cred = { ...credentials };
    cred[field] = value;
    setCredentials(cred);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
      <div className="login-container">
        <p className="title">Login</p>
        <div className="form-group">
          {loginFields.map((field, index) => (
            <div key={field.name}>
              <label className="field-label">{field.name}</label>
              <input
                type={field.type}
                autoComplete="off"
                value={credentials[field.name]}
                onChange={(e) => handleOnChange(e.target.value, field.name)}
                className="form-control mb-3"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-center">
          <button
            onClick={handleSubmit}
            disabled={!credentials.Username || !credentials.Password}
            className="btn btn-primary login-btn mt-3"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
