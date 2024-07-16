/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({route, method}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setLoading] = useState(false);
  const navigate = useNavigate();

  const formTitle = method === "login" ? "Login" : "Register";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await api.post(route, {username, password});
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h1>{formTitle}</h1>
      <input
        className="form-input"
        type="text"
        name="username"
        value={username}
        placeholder="Username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        className="form-input"
        type="password"
        name="password"
        value={password}
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="form-button" type="submit">{formTitle}</button>
    </form>
  );
}

export default Form;