import React from "react";
import { Link } from "react-router-dom";
import LoginImage from "../assets/images/LoginImage.jpg";
import GoogleIcon from "../assets/images/googleIcon.png";
import Loadar from "../components/Loadar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(`http://localhost:4000/api/login`, {
        email,
        password,
      });
      const data = await response.data;
      // console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="sm:w-4/5 w-full mx-auto  h-full shadow-lg py-4 ">
      <div
        className=" overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: "none",
          height: "100vh",
          paddingBottom: "150px",
        }}
      >
        <div className="flex justify-center">
          <img
            src={LoginImage}
            alt="confession"
            className="rounded-lg mx-auto"
            width="400px"
            height="400px"
          />
        </div>
        <div className="flex flex-col gap-4 p-4">
          {/* // signin form */}

          <input
            type="text"
            placeholder="Email"
            className={`w-full  p-4 border-2 border-gray-300 rounded-lg`}
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
          <input
            type="password"
            placeholder="Password"
            className={`w-full p-4 border-2 border-gray-300 rounded-lg`}
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />

          <p className="text-center">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-500">
              {" "}
              Sign Up
            </Link>
          </p>

          {loading ? (
            <Loadar />
          ) : (
            <button
              className="p-2 bg-blue-500 text-white rounded-lg"
              onClick={handleLogin}
            >
              Sign In
            </button>
          )}

          <h3 className="text-center">Or</h3>
          <div className="flex justify-center gap-4">
            <img
              src={GoogleIcon}
              alt="google"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
