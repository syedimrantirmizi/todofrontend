import { useEffect, useState } from "react";
import { base_URL } from "./config";
import axios from "axios";

function App() {
  const [value, setValue] = useState();
  const [post, setPost] = useState();
  const addPost = async () => {
    try {
      const obj = {
        value: value,
        userID: "101",
      };
      const addPost = await axios.post(`${base_URL}/createpost`, obj);
      fetchData();
      console.log("Post Created");
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  const deletePost = async (id) => {
    try {
      const url = `${base_URL}/deletepost/${id}`;
      await axios.delete(url);
      fetchData();
      console.log("Post Deleted");
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  const editPost = async (id) => {
    try {
      const value = prompt("Enter Value");
      const editPost = await axios.put(`${base_URL}/updatepost/${id}`, {
        value: value,
      });
      fetchData();
      console.log("Post Updated");
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  const fetchData = async () => {
    const post = await axios.get(`${base_URL}/getpost`);
    const allPost = post.data.data;
    setPost(allPost);
    console.log(allPost);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen p-10 bg-green-600/70">
        <div className="bg-white p-10 rounded-3xl">
          <p className="pb-5 text-center font-semibold text-xl">TODO APP</p>
          <div className="w-[500px] flex flex-col gap-10 items-center">
            <input
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="py-5 px-4 outline-none focus:text-white hover:text-white text-black text-lg font-semibold border-green-600/70 border hover:bg-green-600/70 focus:bg-green-600/70  transition-all duration-[0.4s] rounded-xl w-full"
            />
            <button onClick={() => addPost()} className="py-4 text-white font-semibold rounded-xl bg-green-600/70 w-[250px] shadow-lg shadow-green-500/70 hover:shadow-green-400/70 hover:bg-green-500/70 transition-all duration-[0.4s]">
              Create Post
            </button>
            {post?.map((value) => {
              return (
                <div
                  key={value._id}
                  className="w-full flex  justify-between bg-green-600/70 p-5 rounded-2xl"
                >
                  <p className="text-lg font-semibold text-white">
                    {value.value}
                  </p>
                  <div className="flex justify-between w-[100px]">
                    <button
                      onClick={() => {
                        editPost(value._id);
                      }}
                    >
                      <img src="/edit.png" alt="" width={32} />
                    </button>
                    <button
                      onClick={() => {
                        deletePost(value._id);
                      }}
                    >
                      <img src="/delete.png" alt="" width={32} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
