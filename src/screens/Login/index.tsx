import axios from "axios";
import Navbar from "components/layout/Navbar";
import Button from "components/ui/Button";
import {
  showDanger,
  showSuccess,
  validateEmail,
  validatePassword,
} from "helpers";
import { setCurrentUser, setCurrentUserAuthToken } from "helpers/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "routes/routes";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!validateEmail(email)) return showDanger("Email is invalid");
    if (!validatePassword(password))
      return showDanger("Password should be at least 6 chars");

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        if (data.user) {
          setCurrentUserAuthToken(data.accessToken);
          setCurrentUser(data.user);
          showSuccess(data.message);
          navigate(routes.weather);
        }
      })
      .catch(({ response }) => {
        showDanger(response.data.message);
      });
  };

  return (
    <div className="md:px-20 px-5">
      <Navbar />

      <div className="flex justify-center items-center">
        <div className="mt-20 md:w-2/3 drop-shadow-xl w-full shadow-lg rounded-lg flex flex-col px-5 py-10">
          <h2 className="font-medium text-center text-3xl mb-8">Sign In</h2>
          <div className="flex flex-col mb-5">
            <label className="text-lg pb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="py-3 px-2 rounded"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-lg pb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="py-3 px-2 rounded"
            />
          </div>
          <div className="my-5 text-center">
            <Button onClick={handleSubmit}>Sign In</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
