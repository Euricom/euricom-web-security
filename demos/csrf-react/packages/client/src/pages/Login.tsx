/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Logging in...", { userName, password });
    const result = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf": 1,
      } as any,
      body: JSON.stringify({ userName, password }),
    }).then((res) => res.json());
    console.log("Login result", result);
    window.location.href = "/";
  };

  const handleInput = (event: any) => {
    const { name, value } = event.target;
    if (name === "userName") setUserName(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <h1 className="text-2xl"> Login</h1>
      <form className="space-y-2 w-1/2 min-w-[250px]" method="post" action="/api/auth/login">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            className="grow"
            name="userName"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleInput}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="grow"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleInput}
          />
        </label>
        <button type="button" onClick={handleLogin} className="btn btn-sm btn-primary">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
