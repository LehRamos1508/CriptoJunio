import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

// Define o tipo esperado da resposta do backend
type LoginResponse = {
  message: string;
  userId: number;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      // Armazena o userId no localStorage
      localStorage.setItem("userId", response.data.userId.toString());

      // Redireciona para a próxima página
      navigate("/criptografar");
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao fazer login";
      setError(msg);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

// Estilos básicos
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "100px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "12px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#1e90ff",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};
