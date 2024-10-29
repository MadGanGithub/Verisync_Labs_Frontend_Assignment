"use client";

import Image from "next/image.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import init, {
  generate_proof,
  get_pass_hash,
  verify_proof,
} from "../pkg/zk_wasm.js";

const Login = () => {
  const [wasm, setWasm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("reg");

  useEffect(() => {
    const initializeWasm = async () => {
      await init();
      setWasm(true);
    };

    initializeWasm();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const pregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
      if (!pregex.test(password)) {
        toast.error("Password must be at least 8 characters long, with uppercase, lowercase, number, and special character.");
        return;
      }
      const userId = Number(username);

      if (mode === "reg") {
        const checkUser = localStorage.getItem(`username:${userId}`);
        if(checkUser){
          toast.error("User already registered with this user id")
          return;
        }

        const passHash = get_pass_hash(password);
        localStorage.setItem(
          `username:${userId}`,
          JSON.stringify({ pass_hash: passHash })
        );
        toast.success("User registered successfully!");
        setMode("log");
      } else {
        const proof = await generate_proof(userId, password);
        const storedUser = localStorage.getItem(`username:${userId}`);

        if (storedUser) {
          const { pass_hash } = JSON.parse(storedUser);
          const isVerified = verify_proof(proof, pass_hash, userId);

          if (isVerified) {
            toast.success("Login successful!");
            window.location.href = "/question1";
          } else {
            toast.error("Invalid credentials.");
          }
        } else {
          toast.error("User not found.");
        }
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      toast.error("Login failed: Invalid credentials");
    }
  };

  return (
    <div
      className="bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('/background1.jpeg')" }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen w-screen sm:w-2/4 p-5 gap-2">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-3xl font-bold mb-8">
          {mode === "reg" ? (
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl font-bold mb-2">Join VeriSync Labs</div>
              <div className="text-lg">Register now to join!</div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center">
              <div className="text-2xl font-bold mb-2 flex sm:flex-row flex-col gap-1">
                Welcome back to <span> VeriSync Labs!</span>
              </div>
              <div className="text-lg">Log in to continue your journey</div>
            </div>
          )}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-formcolor p-5 rounded shadow-md border border-bordercolor w-screen sm:w-2/3"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-bordercolor"
            >
              Username
            </label>
            <input
              type="number"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-formcolor mt-1 block w-full border border-bordercolor rounded-md shadow-sm py-3 focus:outline-none focus:ring-1 focus:ring-buttons"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-bordercolor"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-formcolor mt-1 block w-full border border-bordercolor rounded-md shadow-sm py-3 focus:outline-none focus:ring-1 focus:ring-buttons"
            />
          </div>
          <button
            type="submit"
            disabled={!wasm}
            className="w-full py-2 mt-4 bg-buttons border border-buttons text-black rounded-md hover:text-white hover:border-white hover:bg-formcolor"
          >
            {mode === "reg" ? "Register" : "Login"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "reg" ? "log" : "reg")}
          className="mt-4 text-bordercolor hover:underline"
        >
          {mode === "reg"
            ? "Already have an account? Login"
            : "Don’t have an account? Signup"}
        </button>
      </div>
    </div>
  );
};

export default Login;