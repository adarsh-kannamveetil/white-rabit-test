import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { userCreationFields, initialValues } from "./helper";
import "./users.scss";

const AddUser = ({ history }) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleOnChange = (value, field) => {
    const fieldValues = { ...formValues };
    fieldValues[field] = value;
    setFormValues(fieldValues);
  };

  const handleSubmit = () => {
    console.log("handleSubmit ", formValues);
    let isNull = Object.values(formValues).some((value) => !value);
    console.log("isNull ", isNull);
    if (!isNull) {
      console.log("success");
      const userDetatils = {
        gender: formValues.Gender,
        name: {
          title: formValues.Title,
          first: formValues["First Name"],
          last: formValues["Last Name"],
        },
        email: formValues.Email,
        username: formValues.Username,
        password: formValues.Password,
        dob: formValues.DOB,
        phone: formValues.Phone,
      };
      let usersList = [];
      if (localStorage.getItem("usersList")) {
        usersList = JSON.parse(localStorage.getItem("usersList"));
      }
      usersList.push(userDetatils);
      localStorage.setItem("usersList", JSON.stringify(usersList));
      NotificationManager.success("user created successfully", "", 3000);
      history.push("/user/list");
    } else {
      NotificationManager.success("please fill all fields", "", 3000);
    }
  };

  return (
    <div className="user-list-container">
      <p className="title">Add User</p>
      <div className="user-form row">
        {userCreationFields.map((field) => (
          <div className="col-md-6" key={field.name}>
            <label className="field-label">{field.name}</label>
            <input
              type={field.type}
              autoComplete="off"
              value={formValues[field.name]}
              onChange={(e) => handleOnChange(e.target.value, field.name)}
              className="form-control mb-3"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleSubmit} className="btn btn-default">
          Cancel
        </button>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </div>
    </div>
  );
};

export default withRouter(AddUser);
