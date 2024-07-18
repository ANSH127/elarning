import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "../assets/images/Avatar1.jpg";
import SadFace from "../assets/images/sad-face.png";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    if (!localStorage.getItem("user")) {
      toast.warning("You are not logged in");
      navigate("/login");

      return;
    }

    try {
      const response = await axios.get(
        "https://elarning.onrender.com/api/userdetails",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const data = await response.data;

      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchUserDetails();

    // eslint-disable-next-line
  }, []);

  return (
    // <div>ProfilePage</div>
    <>
      <div className="sm:w-4/5 w-full mx-auto py-4 h-screen shadow-lg">
        {/* // main content */}

        {/* // user profile */}
        <div className="items-center justify-center flex flex-col py-4">
          <img
            src={user ? Avatar : SadFace}
            alt="profile"
            className="rounded-full hover:border-2 border-blue-500"
            width="150"
            height="150"
          />

          <h1 className="text-2xl py-2 font-bold">
            {user?.name ? user?.name : "You Haven't Logged In"}
          </h1>
        </div>
        {/* // email address */}
        <div className="flex flex-col justify-center gap-2 items-start space-1 ml-10">
          <label className=" justify-start align-baseline font-semibold pt-2">
            Email
          </label>

          <input
            type="email"
            className={`border border-gray-300 rounded-lg p-2`}
            placeholder="Email Address"
            defaultValue={user?.email}
            style={{ width: "90%" }}
            disabled
          />
        </div>

        <div className="flex flex-col mt-2  justify-start gap-2 items-start space-1 ml-10">
          <label className=" justify-start align-baseline font-semibold pt-2">
            Role
          </label>
          <input
            type="text"
            className={`border border-gray-300 rounded-lg p-2`}
            placeholder="Role"
            defaultValue={user?.role}
            style={{ width: "90%" }}
            disabled
          />
        </div>
        {/* // logout button */}
        {user && (
          <div className="flex justify-center mt-4">
            <button
              onClick={logout}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        )}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
          limit={1}
        />
      </div>
    </>
  );
}
