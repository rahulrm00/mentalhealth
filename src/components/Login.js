import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token to local storage
      navigate("/checkin"); // Navigate to the check-in page
    } catch (error) {
      console.error("Login failed", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "200px",
        border: "2px solid black",
        padding: "20px",
        color: "#ddd",
        height: "350px",
        width: "400px",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h4" align="center" color="red" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
