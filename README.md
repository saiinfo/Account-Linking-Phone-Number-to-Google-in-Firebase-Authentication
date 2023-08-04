# Project Name
Account Linking: Phone Number to Google in Firebase Authentication

## Project Description
This project demonstrates how to implement phone number authentication and link it to a Google account with email using Firebase Authentication in a React application. The implementation allows users to sign in with their Google account, and if they haven't linked their phone number, they can do so during the sign-in process.


 ### Prerequisites
Before getting started, make sure you have the following set up:

Step 1: Set Up Firebase Project:
Go to the Firebase Console.
Go to the Firebase console (https://console.firebase.google.com/).
Enable the "Authentication" service from the left-hand side menu.
Under the "Sign-in method" tab, enable "Phone" as a sign-in provider.

Step 2: Enable Firebase Authentication:
In the Firebase console, navigate to "Authentication" from the left sidebar. Under the "Sign-in method" tab, choose the authentication methods you want to enable, such as Phone and gmail with google, etc. Enable the desired methods and save your changes.

Step 3: Install Firebase SDK:
To use Firebase Authentication in your application, you need to integrate the Firebase SDK into your project. Refer to the official Firebase documentation for instructions on how to install the SDK for your specific platform.

## Dependencies

    "bootstrap": "^5.1.3",
    "firebase": "^10.0.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.8.0",
    "react-dom": "^18.2.0",
    "react-google-button": "^0.7.2",
    "react-phone-number-input": "^3.3.0",
    "react-router-dom": "^6.14.2",
    "react-scripts": "5.0.1"

## Running the Project in Vs Code
a. Build the project: Open The terminal and used command 'npm start'.
b. Access the project:

   - Open a web browser.
   - Enter the URL (e.g., `http://localhost:3000/`).

c.User clicks "Get Started" and enters their phone number in the registration form.
Firebase sends an OTP to the provided phone number for verification.

The user enters the OTP received via SMS, and Firebase confirms the verification.

If the user is already signed in with a Google account, the Google provider is linked to the phone number account.

Once the phone number is successfully linked, the user is signed in with their Google account and redirected to the desired route.


Successful Authentication: Once authenticated, you will be redirected back to the application and shown a welcome page.

## Conclusion:
With Firebase Authentication set up and integrated into your application, you can easily add user login functionality, protect specific routes or content, and personalize user experiences based on their authentication status. Always ensure you handle authentication securely, and refer to the official Firebase documentation for detailed information on additional features and best practices.

## Project Priview
![20230803_160639](https://github.com/saiinfo/Account-Linking-Phone-Number-to-Google-in-Firebase-Authentication/assets/26924010/834590a5-3b55-4c45-b10a-e6722f8c2155)




