import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import Home from "./pages/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import "./styles/global.css";

const App = () => {
  const [session, setSession] = useState(undefined); // undefined = still loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Loading state while checking auth
  if (session === undefined) {
    return (
      <div style={{ minHeight: "100vh", background: "#f0f2f7", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="spinner" style={{ width: 36, height: 36, border: "3px solid #e2e8f0", borderTopColor: "#dc2626", borderRadius: "50%" }} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/admin/login"  element={session ? <Navigate to="/admin" replace /> : <Login />} />
        <Route path="/admin"        element={session ? <Dashboard session={session} /> : <Navigate to="/admin/login" replace />} />
        <Route path="*"             element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
