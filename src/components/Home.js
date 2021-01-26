import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="">
      <div>
        <h1>welcome to newsd</h1>
        <h2> Top Headlines</h2>
        <p>articles loding when compoent mount</p>
        <Link to="/register" className="registerLink">register</Link>
        <Link to="/login" className="loginLink">login</Link>
      </div>
    </div>
  );
}


export default Home;
