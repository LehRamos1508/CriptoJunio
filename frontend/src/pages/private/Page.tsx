import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Page() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link to="/criptografar">Criptografar</Link>
        <Link to="/decriptografar">Decriptografar</Link>
      </div>
      <Outlet />
    </div>
  );
}
