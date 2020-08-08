import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchUsers } from "./actions";
import { userCreationFields } from "./helper";

const UsersList = ({ history, list, fetchUsers }) => {
  const [usersList, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const users = [];
    if (list.length > 0) {
      list.forEach((user) => {
        users.push(user.user);
      });
    }
    if (localStorage.getItem("usersList")) {
      const userList = JSON.parse(localStorage.getItem("usersList"));
      userList.forEach((user) => {
        users.push(user);
      });
    }
    setList(users);
    setFilteredList(users);
  }, [list]);

  const filterUserList = (e) => {
    const filterValue = e.target.value;
    setFilterValue(filterValue);
    const newList = [];
    if (filterValue) {
      usersList.forEach((user) => {
        const { title, first, last } = user.name;
        if (
          title.includes(filterValue) ||
          first.includes(filterValue) ||
          last.includes(filterValue)
        ) {
          newList.push(user);
        }
      });
      setFilteredList(newList);
    } else {
      setFilteredList(usersList);
    }
  };

  const getFieldValue = (user, field) => {
    switch (field) {
      case "Gender":
        return user.gender;
      case "Title":
        return user.name.title;
      case "First Name":
        return user.name.first;
      case "Last Name":
        return user.name.last;
      case "Email":
        return user.email;
      case "Username":
        return user.username;
      case "Password":
        return user.password;
      case "DOB":
        return user.dob;
      case "Phone":
        return user.phone;
      default:
        return "";
    }
  };

  return (
    <div className="user-list-container">
      <div className="d-flex top-section mb-4">
        <p className="title mr-5 mb-0">Users List</p>
        <input
          type="text"
          className="form-control mr-3"
          value={filterValue}
          onChange={(e) => filterUserList(e)}
          placeholder="search"
        />
        <button
          className="btn btn-primary"
          onClick={() => history.push("/user/create")}
        >
          Add user
        </button>
      </div>
      <div className="users-list">
        <table>
          <thead>
            <tr>
              {userCreationFields.map((field) => (
                <th key={field.name}>{field.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredList.map((user) => (
              <tr key={user.username}>
                {userCreationFields.map((field) => (
                  <td key={field.name}>{getFieldValue(user, field.name)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  list: state.users.list,
});

const mapDispatchToProps = {
  fetchUsers,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UsersList)
);
