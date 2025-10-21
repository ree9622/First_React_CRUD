import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { useToast } from "../common/Toast";
import UserForm from "./UserForm";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      setLoadingUser(true);
      try {
        const result = await axios.get(`${API_URL}/users/${id}`);
        setUser(result.data);
      } catch (error) {
        console.error("Error loading user:", error);
        addToast("Failed to load user data", "error");
        history.push("/");
      } finally {
        setLoadingUser(false);
      }
    };
    loadUser();
  }, [id, history, addToast]);

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
      await axios.put(`${API_URL}/users/${id}`, user);
      addToast("User updated successfully!", "success");
      history.push("/");
    } catch (error) {
      console.error("Error updating user:", error);
      addToast("Failed to update user. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="container">
        <div className="w-75 mx-auto shadow p-5 text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-3">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        {loading && <div className="alert alert-info">Updating user...</div>}
        <UserForm
          user={user}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          submitText={loading ? "Updating..." : "Update User"}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default EditUser;
