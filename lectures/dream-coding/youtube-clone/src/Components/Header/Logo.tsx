import React from "react";
import { AiFillYoutube } from "react-icons/ai";

import { Link } from "react-router-dom";

export default function Logo({ resetKeyword }: { resetKeyword: () => void }) {
  return (
    <Link to={"/videos"} onClick={resetKeyword}>
      <span>
        <AiFillYoutube />
      </span>
      <h1>Youtube</h1>
    </Link>
  );
}
