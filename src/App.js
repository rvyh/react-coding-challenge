import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [showList, setShowList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => {
        let filteredComments = data.filter((comment) => post.id === comment.postId);
        setComments(filteredComments);
      });
  }, [post]);

  const onClickHandler = (id) => {
    let arr = posts.filter((post) => id === post.id);
    setPost(arr[0]);
    setShowList(false);
  };

  const backToList = () => {
    setShowList(true);
  };

  const searchHandler = (e) => {
    let searchString = e.target.value;
    let results = posts.filter((post) => post.title.includes(searchString));
    setSearchResults(results);
    setSearchTerm(searchString);
  };

  return (
    <div>
      {showList ? (
        <>
          <h1>List of posts</h1>
          <input
            type="text"
            id="posts-search"
            name="q"
            placeholder="Search"
            onKeyUp={searchHandler}
          ></input>
          <ul>
            {searchTerm === ""
              ? posts.map((post) => (
                  <li key={post.id}>
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => onClickHandler(post.id)}
                    >
                      {post.title}
                    </span>
                  </li>
                ))
              : searchResults.map((post) => (
                  <li key={post.id}>
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => onClickHandler(post.id)}
                    >
                      {post.title}
                    </span>
                  </li>
                ))}
          </ul>
        </>
      ) : (
        <>
          <p style={{ color: "blue", cursor: "pointer" }} onClick={backToList}>
            Back to list
          </p>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <h2>Comments</h2>
          {comments.map((comment) => (
              <div key={comment.id}>
                <p>
                  <strong>{comment.name}</strong>
                </p>
                <p>{comment.body}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default App;
