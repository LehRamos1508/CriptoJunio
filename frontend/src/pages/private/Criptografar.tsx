import { useState } from "react";
import api from "../../services/api";

type EncryptResponse = {
  encrypted: string;
  hash: string;
};

export default function Criptografar() {
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<number>(3); // valor padrão
  const [encrypted, setEncrypted] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState("");

  async function handleEncrypt(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEncrypted("");
    setHash("");

    try {
      const response = await api.post<EncryptResponse>("/crypto/encrypt", {
        message,
        step,
      });

      setEncrypted(response.data.encrypted);
      setHash(response.data.hash);
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Erro ao criptografar";
      setError(msg);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Criptografar Mensagem</h2>
      <form onSubmit={handleEncrypt} style={styles.form}>
        <textarea
          placeholder="Digite a mensagem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="number"
          placeholder="Passo"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Criptografar
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {encrypted && (
        <div style={styles.result}>
          <p><strong>Mensagem Criptografada:</strong> {encrypted}</p>
          <p><strong>Hash (chave privada):</strong> {hash}</p>
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
    backgroundColor: "#28a745",
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
    color: "#000"
  },
};
