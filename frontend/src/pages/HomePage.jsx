import { useEffect, useState } from "react";
import { client } from "../api/SanityClient";

import Loadar from "../components/Loadar";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {

    if(!localStorage.getItem('user')){
      alert('Please login to continue')
      navigate('/login')
      return;
    }


    let category = JSON.parse(localStorage.getItem('user')).role;
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
          <div
            className="mb-4  p-4 flex flex-wrap gap-y-4  justify-around"
            
          >
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
    </div>
  );
}
