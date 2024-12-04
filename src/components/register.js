import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        email,
        password,
      });

      // If registration is successful, navigate to login page
      if (response.status === 201) {
        alert("Registration successful");
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (err) {
      console.error("Registration failed", err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px", padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "8px" }}>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Register
      </Typography>

      {error && <Typography color="error" align="center">{error}</Typography>}

      <form onSubmit={handleRegister}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: "20px" }}>
          Register
        </Button>
      </form>

      <Typography variant="body2" align="center" style={{ marginTop: "10px" }}>
        Already have an account? <a href="/login">Login</a>
      </Typography>
    </Container>
  );
};

export default Register;
