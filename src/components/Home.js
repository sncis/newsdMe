import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="">
      <div>
        <h1>welcome to newsd</h1>
        <Link to="/register">register</Link>
				<Link to="/login">login</Link>
      </div>
    </div>
  );
}

export default Home;
