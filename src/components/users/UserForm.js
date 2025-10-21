import React from "react";

const UserForm = ({ user, onInputChange, onSubmit, submitText, errors }) => {
  const { name, username, email, phone, website } = user;

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="text"
          className={`form-control form-control-lg ${
            errors.name ? "is-invalid" : ""
          }`}
          placeholder="Enter Your Name"
          name="name"
          value={name}
          onChange={onInputChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="form-group">
        <input
          type="text"
          className={`form-control form-control-lg ${
            errors.username ? "is-invalid" : ""
          }`}
          placeholder="Enter Your Username"
          name="username"
          value={username}
          onChange={onInputChange}
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username}</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="email"
          className={`form-control form-control-lg ${
            errors.email ? "is-invalid" : ""
          }`}
          placeholder="Enter Your E-mail Address"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="text"
          className={`form-control form-control-lg ${
            errors.phone ? "is-invalid" : ""
          }`}
          placeholder="Enter Your Phone Number"
          name="phone"
          value={phone}
          onChange={onInputChange}
        />
        {errors.phone && (
          <div className="invalid-feedback">{errors.phone}</div>
        )}
      </div>
      <div className="form-group">
        <input
          type="text"
          className={`form-control form-control-lg ${
            errors.website ? "is-invalid" : ""
          }`}
          placeholder="Enter Your Website Name"
          name="website"
          value={website}
          onChange={onInputChange}
        />
        {errors.website && (
          <div className="invalid-feedback">{errors.website}</div>
        )}
      </div>
      <button className="btn btn-primary btn-block" type="submit">
        {submitText}
      </button>
    </form>
  );
};

export default UserForm;
