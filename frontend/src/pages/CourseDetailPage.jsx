import React from "react";
import { useParams } from "react-router-dom";
import { client } from "../api/SanityClient";

import PortableText from "react-portable-text";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Avatar from "../assets/images/Avatar1.jpg";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState(1);
  const [question, setQuestion] = React.useState("");
  const [questions, setQuestions] = React.useState([]);
  const [notesInput, setNotesInput] = React.useState("");
  const [notes, setNotes] = React.useState([]);
  const navigate = useNavigate();

  const fetchQuestions = async () => {

    if (!localStorage.getItem("user")) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:4000/api/comments?slug=${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const data = await response.data;
      setQuestions(data.comments);
      // console.log(data.comments);
    } catch (err) {
      alert(err.message);
    }
  };


  const fetchCourseDetail = async () => {
    if (!localStorage.getItem("user")) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }
    const query = `*[_type == "courses" && slug.current == "${courseId}"]{
            title,
            content,
            url,
            "notes": notes.asset->url,
            mcq
        }`;
    const course = await client.fetch(query);
    setCourse(course[0]);
    setLoading(false);
  };

  const handleSubmitQuestion = async () => {
    try{
      const response = await axios.post(`http://localhost:4000/api/addcomment`, {
        comment: question,
        slug: courseId,
      }, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      const data = await response.data;
      setQuestions([...questions, data.newComment]);
      setQuestion("");
    }
    catch(err){
      alert(err.message);
    }


  };


  const handleSubmitNotes = async () => {};

  React.useEffect(() => {
    fetchCourseDetail();
    fetchQuestions();

    // eslint-disable-next-line
  }, [courseId]);

  return (
    !loading && (
      <div className="w-4/5 mx-auto mb-5 my-4 shadow-lg ">
        <div
          className="mb-4  overflow-y-auto overflow-x-hidden p-4  gap-2"
          style={{
            scrollbarWidth: "none",
            height: "90vh",
          }}
        >
          <div>
            <iframe
              width="100%"
              height="400px"
              src={course && course.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex flex-row justify-start items-center p-4 gap-4">
            <button
              onClick={() => setActiveTab(1)}
              className={`p-2 text-lg font-bold ${
                activeTab === 1 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`p-2 text-lg font-bold ${
                activeTab === 2 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Q&A
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`p-2 text-lg font-bold ${
                activeTab === 3 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Download
            </button>
            <button
              onClick={() => setActiveTab(4)}
              className={`p-2 text-lg font-bold ${
                activeTab === 4 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Write Notes
            </button>
          </div>

          {activeTab === 1 && (
            <div className="p-4">
              <h1 className="text-2xl font-bold">{course && course.title}</h1>
              <PortableText
                content={course && course.content}
                projectId="ocpb00yf"
                dataset="production"
                className="text-gray-700 text-base font-sans"
                serializers={{
                  h2: (props) => (
                    <h1
                      className="text-3xl font-bold text-gray-800  space-x-2"
                      {...props}
                    />
                  ),
                  li: ({ children }) => (
                    <li
                      className="special-list-item"
                      style={{
                        listStyleType: "disc",
                      }}
                    >
                      {children}
                    </li>
                  ),
                }}
              />
            </div>
          )}

          {activeTab === 2 && (
            <div className="p-4">
              <h1 className="text-2xl font-bold">Q&A</h1>
              <div className="flex flex-row justify-start items-center p-4 gap-4">
                <input
                  type="text"
                  className="p-2 w-3/4 border-2 border-gray-300 rounded-lg"
                  placeholder="Ask a question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleSubmitQuestion}
                >
                  Ask
                </button>
              </div>
              <div className="p-4">
                {questions.map((q, i) => (
                  <div key={i} className="p-4 w-3/4 shadow rounded-lg mb-4">
                    <div className="flex flex-row justify-start items-center gap-4">
                      <img
                        src={Avatar}
                        alt="profile"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h1 className="text-lg font-bold">{q?.user?.name}</h1>
                        <p className="text-sm text-gray-500">{q?.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className="p-4">
              <div className="flex flex-row justify-start items-center gap-4">
                <a
                  target="_blank"
                  href={`${course.notes}?dl=`}
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  rel="noreferrer"
                >
                  Download Notes
                </a>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div className="p-4">
              <h1 className="text-2xl font-bold">Write Notes</h1>
              <div className="flex flex-row justify-start items-center gap-4">
                <textarea
                  className="p-2 w-3/4 border-2 border-gray-300 rounded-lg"
                  placeholder="Write notes"
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                />
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleSubmitNotes}
                >
                  Save
                </button>
              </div>

              <div className="p-4">
                {notes.map((n, i) => (
                  <div key={i} className="p-4 w-3/4 shadow rounded-lg mb-4">
                    <h1 className="text-lg font-bold">{n.title}</h1>
                    <p className="text-sm text-gray-500">{n.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
