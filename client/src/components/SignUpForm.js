import React, { useState , useContext} from "react";
import { useHistory } from 'react-router-dom';
import { UserContext } from "../context/user";

function SignUpForm({ setLoggedIn, setSignedup }) {

  const {setCurrentUser} = useContext(UserContext);

  const history = useHistory()

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  

  function handleSignUp(e) {
    e.preventDefault();
    
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        email,
        username,
        password,
        password_confirmation
      }),
    }).then((response) => {
      if (response.ok) {
        console.log(        
          name,
          image,
          email,
          username,
          password,
          password_confirmation)
        response.json().then((user) => {
          setCurrentUser(user);
          setLoggedIn(true);
          
        });
      } else {
        response.json().then((e) => setErrors(e.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label>Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label>Photo</label>
        <input
          type="text"
          id="phoneNumber"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div>
        <label>Email Address</label>
        <input
          type="text"
          id="emailAddress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label>Password Confirmation</label>
        <input
          type="passwordConfirmation"
          id="passwordConfirmation"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
      </div>

      <div >
        <button variant="fill" color="primary" type="submit">
          Creat Account
        </button>
      </div>

      <div>
        { errors.length <= 0 ? ("") : (
                errors.map((err) => (
          <li key={err}>{err}</li>
        )))}
      </div>
      {/* <br></br>
          Already Have an Account?
        <button onClick={()=>setSignedup(true)} variant="fill" color="primary" >
          Login
        </button> */}

    </form>
  );
}

export default SignUpForm;