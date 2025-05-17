import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Criptografar from "./pages/private/Criptografar";
import Decriptografar from "./pages/private/Decriptografar";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Page from "./pages/private/Page";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Page />
              </PrivateRoute>
            }
          >
            <Route path="criptografar" element={<Criptografar />} />
            <Route path="decriptografar" element={<Decriptografar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
