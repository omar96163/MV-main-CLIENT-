import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      fetch("https://mv-main-server.vercel.app/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            const user = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              points: 0,
              isAdmin: data.user.isAdmin,
              avatar: data.user.avatar || "",
            };
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/dashboard", { replace: true });
          } else {
            throw new Error("Invalid response");
          }
        })
        .catch((err) => {
          console.error("Google auth error:", err);
          navigate("/", { replace: true });
        });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      <p className="mt-2">Signing you in ...</p>
    </div>
  );
};

export default GoogleSuccess;
