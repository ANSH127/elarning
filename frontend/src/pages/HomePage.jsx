import { useEffect, useState } from "react";
import { client } from "../api/SanityClient";

import Loadar from "../components/Loadar";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    // console.log(import.meta.env.VITE_SANITY_PROJECT_ID);
    if (!localStorage.getItem("user")) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }

    let category = JSON.parse(localStorage.getItem("user")).role;
    const query = `*[_type == "courses" && category =="${category}"]`;
    const courses = await client.fetch(query);
    // console.log(courses);
    setCourses(courses);
    setLoading(false);
  };
  useEffect(() => {
    fetchCourse();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="sm:w-4/5 w-full mx-auto  h-full my-4 shadow-lg  ">
      {loading ? (
        <Loadar />
      ) : (
        <>
          <div className="mb-4  p-4 flex flex-wrap gap-y-4  justify-around">
            {courses.length === 0 && (
              <h1 className="text-2xl  font-bold text-gray-800 p-y-4 text-center">
                No courses found
              </h1>
            )}

            {courses.map((course) => (
              <Card key={course._id} course={course} />
            ))}
          </div>
        </>
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
  );
}
