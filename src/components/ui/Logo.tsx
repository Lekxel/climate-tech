import { useNavigate } from "react-router-dom";
import routes from "routes/routes";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => navigate(routes.home)}
      className="text-3xl font-bold cursor-pointer"
    >
      <span className="text-blue-400">Weather</span>
      <span>ly</span>
    </h1>
  );
};

export default Logo;
