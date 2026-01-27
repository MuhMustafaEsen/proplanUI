import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403</h1>
      <h2>Yetkisiz Erişim</h2>
      <p>Bu sayfayı görüntüleme yetkiniz yok.</p>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate("/my-tasks")}>
          Ana Sayfaya Dön
        </button>
        <button
          style={styles.secondaryButton}
          onClick={() => navigate(-1)}
        >
          Geri Git
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "96px",
    margin: "0",
    color: "#ff4d4f",
  },
  buttonGroup: {
    marginTop: "24px",
    display: "flex",
    gap: "12px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#1890ff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "10px 16px",
    backgroundColor: "#ffffff",
    color: "#333",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Unauthorized;
