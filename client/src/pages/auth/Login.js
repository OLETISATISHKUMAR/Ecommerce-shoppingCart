import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      if (response.ok) {
        console.log("Login successful!");
        navigate("/");
      } else {
        const data = await response.json();
        console.log("Error message:", data.message);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setFormdata({
      email: "",
      password: "",
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl  shadow-md w-[450px]">
        <h2 className="text-3xl font-semibold text-center text-blue-500 mb-6">
          Log In
        </h2>
        <form>
        <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              onChange={handleChange}
              value={formdata.email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <Link to="/forgotpassword"
            className="text-blue-500 text-sm font-medium hover:underline mb-4 block"
          >
            Forgot Password?
          </Link>
          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 font-medium hover:underline">
            Register here
          </Link>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
