import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useToast } from "../common/Toast";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const User = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const history = useHistory();
  const { addToast } = useToast();

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [id]);

  const loadUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/${id}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error loading user:", error);
      addToast("Failed to load user data", "error");
      history.push("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-3">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {user.name}</li>
        <li className="list-group-item">user name: {user.username}</li>
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">phone: {user.phone}</li>
        <li className="list-group-item">website: {user.website}</li>
      </ul>
    </div>
  );
};

export default User;
