import { useEffect } from "react";
import { client } from "../api/SanityClient";

export default function HomePage() {
  
  const fetchCourse = async () => {
    let category="cse";
    const query = `*[_type == "courses" && category =="${category}"]`;
    const courses = await client.fetch(query);
    console.log(courses);

  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return <div>HomePage</div>;
}
