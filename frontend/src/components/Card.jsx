import { builder } from "../api/SanityClient";
import { Link } from "react-router-dom";

export default function Card({ course }) {
  return (
    // make scrollable

    <div className="max-w-sm border shadow-md border-gray-200 overflow-hidden  rounded-lg">
      <img
        className="w-full bg-cover"
        src={builder.image(course.image).width(300).height(200).url()}
        alt="Course"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.title}</div>
        <p className="text-gray-700 text-base">{course.description}</p>
      </div>
      <div className="px-6 py-4">
        <Link
          to={`/course/${course.slug.current}`}
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
