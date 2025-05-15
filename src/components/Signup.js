import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {

  const [credentials, setcreadentials] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  let navigate = useNavigate();

  const handlesignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: credentials.Name,
          Email: credentials.Email,
          Password: credentials.Password,
        }),
      });

      const data = await response.json();

      console.log(data.authToken);

      if (response.ok) {
        localStorage.setItem("token", data.authToken);
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("error", error);
      console.log("error", error);
    }
  };

  return (
    <div
      className="container mt-5 rounded-5 p-3"
      style={{ backgroundColor: "white" }}
    >
      <form onSubmit={handlesignup}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setcreadentials({ ...credentials, Name: e.target.value });
            }}
            className="form-control"
            id="Name"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => {
              setcreadentials({ ...credentials, Email: e.target.value });
            }}
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => {
              setcreadentials({ ...credentials, Password: e.target.value });
            }}
            className="form-control"
            id="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
