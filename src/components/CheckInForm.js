import React, { useState } from "react";
import { TextField, Slider, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const CheckInForm = () => {
  const [mood, setMood] = useState(5);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState("");
  const handleSubmit = async () => {
    try {
      // Check if token is available in localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in first.");
        return;
      }
  
      // Check if required data (mood, stress, notes) is present
      if (!mood || !stress) {
        alert("Please fill in all required fields.");
        return;
      }
  
      // Make the API request
      const response = await axios.post(
        "http://localhost:8080/api/checkin",
        { mood, stress, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // If request is successful
      alert("Check-in saved!");
      console.log("Check-in saved:", response.data);
  
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Server responded with an error
        console.error("Error saving check-in:", error.response.data);
        alert(`Error: ${error.response.data.error || "An error occurred"}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error saving check-in:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something else caused an error
        console.error("Error saving check-in:", error.message);
        alert("An error occurred while saving the check-in.");
      }
    }
  };
  

  return (
    <Container maxWidth="sm" style={{ marginTop: "100px",height:"500px",width:"500px",padding:"40px",backgroundColor:"#eee" }}>
      <Typography variant="h5" color="blue" align="center" gutterBottom>
        Daily Mental Health Check-In
      </Typography>
      <Typography>Rate Your Mood</Typography>
      <Slider
        value={mood}
        onChange={(e, value) => setMood(value)}
        step={1}
        marks
        min={1}
        max={10}
      />
      <Typography>Rate Your Stress Level</Typography>
      <Slider
        value={stress}
        onChange={(e, value) => setStress(value)}
        step={1}
        marks
        min={1}
        max={10}
      />
      <TextField
        label="Notes"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
    </Container>
  );
};

export default CheckInForm;
