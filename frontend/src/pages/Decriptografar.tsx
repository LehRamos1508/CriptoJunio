import { useState } from "react";
import api from "../services/api";

type DecryptResponse = {
  decrypted: string;
};

export default function Decriptografar() {
  const [message, setMessage] = useState("");
  const [hash, setHash] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [error, setError] = useState("");

  async function handleDecrypt(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setDecrypted("");

    try {
      const response = await api.post<DecryptResponse>("/crypto/decrypt", {
        message,
        hash,
      });

      setDecrypted(response.data.decrypted);
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao descriptografar";
      setError(msg);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Decriptografar Mensagem</h2>
      <form onSubmit={handleDecrypt} style={styles.form}>
        <textarea
          placeholder="Mensagem criptografada"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="text"
          placeholder="Hash (chave privada)"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Decriptografar
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {decrypted && (
        <div style={styles.result}>
          <p><strong>Mensagem Original:</strong> {decrypted}</p>
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    marginTop: "60px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  textarea: {
    minHeight: "100px",
    padding: "10px",
    fontSize: "16px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#6f42c1",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  result: {
    marginTop: "20px",
    backgroundColor: "#fff",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
};
