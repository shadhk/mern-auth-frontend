import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { token, error, status } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="App">
      {token ? (
        <div>
          <h2>Welcome!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {status === "loading" && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default App;
