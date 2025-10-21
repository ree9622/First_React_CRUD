import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useToast } from "../common/Toast";
import UserForm from "./UserForm";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const AddUser = () => {
  let history = useHistory();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.username.trim()) newErrors.username = "Username is required";
    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!user.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      addToast("Please fix the form errors", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/users`, user);
      addToast("User added successfully!", "success");
      history.push("/");
    } catch (error) {
      console.error("Error adding user:", error);
      addToast("Failed to add user. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        {loading && <div className="alert alert-info">Adding user...</div>}
        <UserForm
          user={user}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          submitText={loading ? "Adding..." : "Add User"}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default AddUser;
