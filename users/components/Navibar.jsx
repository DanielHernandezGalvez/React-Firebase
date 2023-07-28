import React from "react";
import Link from "next/link";

export default function Navibar() {
  return (
    <>
      {" "}
      <h2>Navigation</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/services">Services</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </>
  );
}
