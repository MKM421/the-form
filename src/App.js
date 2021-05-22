import { useState } from "react";
import './App.css';

function App() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      
      const user = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: password
      }
      console.log(JSON.stringify(user, null, 2));

    }

    return (
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <label>
          First Name:
          <input
            name="firstName"
            type="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required />
        </label>

        <label>
          Last Name:
          <input
            name="lastName"
            type="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required />
        </label>

        <label>
          Phone Number:
          <input
            name="phoneNumber"
            type="phoneNumber"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            required />
        </label>

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required />
        </label>

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required />
        </label>

        <button>Submit</button>
      </form>
    );
}

export default App;
