import React, { useState, useEffect } from "react";

// import API from Amplify library
import { API } from "aws-amplify";

// import query definition
import { listPosts } from "./graphql/queries";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    try {
      const postData = await API.graphql({ query: listPosts });
      setPosts(postData.data.listPosts.items);
    } catch (err) {
      console.log({ err });
    }
  }
  return (
    <div className="App">
      <h2>Postagram Studio</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.name}</h3>
          <p>{post.location}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
