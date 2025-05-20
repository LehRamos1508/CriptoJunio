import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Page() {
  const {logout} = useAuth();
  const navigate = useNavigate();
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
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Sair
        </button>
      </div>
      <Outlet />
    </div>
  );
}
