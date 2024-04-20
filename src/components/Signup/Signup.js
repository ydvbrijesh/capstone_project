import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import NavigationBar from "../NavigationBar/NavigationBar"

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState(false);

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   setFirstNameError(false);
  //   setLastNameError(false);
  //   setEmailError(false);
  //   setPasswordError(false);
  //   setContactNumberError(false);

  //   if (firstName === "") {
  //     setFirstName(true);
  //   }
  //   if (lastName === "") {
  //     setLastName(true);
  //   }
  //   if (email === "") {
  //     setEmailError(true);
  //   }
  //   if (password === "") {
  //     setPasswordError(true);
  //   }
  //   if (contactNumber === "") {
  //     setContactNumberError(true);
  //   }

  //   if (firstName && lastName && email && password && contactNumber) {
  //     axios
  //       .post("http://localhost:8080/api/auth/signup", {
  //         firstName: firstName,
  //         lastName: lastName,
  //         email: email,
  //         password: password,
  //         contactNumber: contactNumber,
  //       })
  //       .then(function (response) {
  //         alert(response.data.message);
  //         navigate("/login");
  //       })
  //       .catch(function (error) {
  //         alert(
  //           "Error: There was an issue in registering the user, please try again later."
  //         );
  //       });
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          contactNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Please try again.');
      }
      console.log(response);

      // Clear form fields after successful signup
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setContactNumber('');
      setConfirmPassword('');

      // Optionally, you can redirect the user to another page after successful signup
      // history.push('/dashboard');
    } catch (error) {
      console.log(error.message);
      // setError(error.message);
    }
  };


  return (
    <>
      <NavigationBar />
      <div className="signupBucket">
        <form autoComplete="off" onSubmit={onSubmit}>
          <Avatar className="avatarIcon">
            <LockIcon />
          </Avatar>
          <Typography gutterBottom variant="h5" component="p">
            Sign up
          </Typography>
          <TextField
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            variant="outlined"
            type="text"
            sx={{ mb: 4 }}
            fullWidth
            value={firstName}
            error={firstNameError}
          />
          <TextField
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            variant="outlined"
            type="text"
            sx={{ mb: 4 }}
            fullWidth
            value={lastName}
            error={lastNameError}
          />
          <TextField
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            type="email"
            sx={{ mb: 4 }}
            fullWidth
            value={email}
            error={emailError}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            type="password"
            value={password}
            error={passwordError}
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            type="password"
            value={confirmPassword}
            error={password.length > 0 && confirmPassword !== password}
            fullWidth
            sx={{ mb: 4 }}
          />
          <TextField
            label="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
            required
            variant="outlined"
            type="tel"
            sx={{ mb: 4 }}
            fullWidth
            value={contactNumber}
            error={contactNumberError}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, width: "100%" }}
            disabled={password.length > 0 && confirmPassword !== password}
          >
            Sign Up
          </Button>
          <div className="loginLink">
            <Link to="/signin">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
      <div className="signupFooter">
        Copyright &copy; <Link href="https://www.upgrad.com/">upGrad</Link> 2023
      </div>
    </>
  );
}

export default Signup;