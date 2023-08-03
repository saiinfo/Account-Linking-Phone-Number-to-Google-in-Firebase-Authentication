import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form, Alert } from "react-bootstrap";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import './App.css';
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const Home1 = () => {
  const [error, setError] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);

  const handleGetStarted = () => {
    setIsStarted(true);
  };


  const firebaseConfig = {
    apiKey: "AIzaSyCxyifRcx8IAgOUEx162g5WA9XI1286Mq4",
  authDomain: "reactapp-b156b.firebaseapp.com",
  projectId: "reactapp-b156b",
  storageBucket: "reactapp-b156b.appspot.com",
  messagingSenderId: "684206022296",
  appId: "1:684206022296:web:e3d785daf85647e09b7aed"
  };

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [firebaseConfig]);

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    if (isUserSignedInWithPhoneNumber()) {
      // If the user is already signed in with the phone number, link the Google provider to the account.
      linkGoogleToPhoneNumber();
    } else {
      // If the user is not signed in with the phone number, proceed with the regular Google sign-in.
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // Handle the successful sign-in result and navigate to the desired route.
          handleSignInResult(result);

        })
        .catch((error) => {
          console.error("Error signing in with Google:", error);
        });
    }
  };

  const isUserSignedInWithPhoneNumber = () => {
    const user = firebase.auth().currentUser;
    return user && user.providerData.some((provider) => provider.providerId === "phone");
  };

  const linkGoogleToPhoneNumber = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then((result) => {
        // Handle the successful linking and navigate to the desired route.
        handleSignInResult(result);
      })
      .catch((error) => {
        console.error("Error linking with Google:", error);
      });
  };


  const handleSignInResult = (result) => {
    // This gives you the user's ID token and other information.
    const { user, credential } = result;

    // Here, you can access the user's UID, and you can store both the Google UID and phone UID in the database.
    const googleUID = user.uid;
    const phoneNumberUID = credential?.providerId === "firebase" ? credential?.signInMethod : null;

    // Store both the Google UID and phone UID in the Firebase Realtime Database.
    if (googleUID && phoneNumberUID) {
      const database = firebase.database();
      database.ref("users/" + googleUID).set({
         googleUID,
        phoneNumberUID,
        // Add any other user data you want to store.
      });
    }

    console.log("User signed in:", user);
    setFlag2(true);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setMobile(value);
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptcha verified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    configureCaptcha(); // Directly call the function here
    const phoneNumber = "+91" + mobile;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        alert("OTP has been sent");
        setFlag(true);
      })
      .catch((error) => {
        console.log("SMS not sent");
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        setFlag1(true);
        alert("User is verified");
        navigate("/signup");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
      });
  };

  return (
    <>
     
      <hr />
      {error && <Alert variant="danger">{error}</Alert>}
      <Form style={{ display: !flag && !flag1 && !flag2 ? "block" : "none" }}>
        <div className="registration-form">
          <h2>Registration Form</h2>
          <div>
            <div id="sign-in-button"></div>
            <label htmlFor="username">
              <b>Phone Number:</b> &nbsp;
            </label>
            <input type="number" name="mobile" placeholder="Mobile number" required onChange={handleChange} />
          </div>
          <br />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={onSignInSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form style={{ display: flag && !flag1 && !flag2 ? "block" : "none" }}>
        <div className="p-4 box">
          <h2 className="mb-3">Enter OTP</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <input type="number" name="otp" placeholder="OTP Number" required onChange={handleChange} />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={onSubmitOTP}>
              Send
            </Button>
          </div>
        </div>
      </Form>

   
      <Form style={{ display: flag1 && !flag2 ? "block" : "none" }}>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        </div>
        </Form>

        <Form style={{ display: flag2 ? "block" : "none" }}>
        <div className="welcome-container">
      <h2>Welcome to Our Website</h2>
      <p>This is an example of an attractive welcome page in React.</p>
      {isStarted ? (
        <p>Great! You have started. Happy exploring!</p>
      ) : (
        <button onClick={handleGetStarted}>Get Started</button>
      )}
    </div>

        </Form>
        <hr/>
    </>
  );
};

export default Home1;