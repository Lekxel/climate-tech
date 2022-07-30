import { Link } from "react-router-dom";
import routes from "routes/routes";
import Logo from "../ui/Logo";

const Navbar = () => (
  <header className="py-5">
    <nav className="flex justify-between">
      <Logo />
      <ul className="flex gap-5">
        <li className="font-bold text-blue-500">
          <Link to={routes.login}>Sign In</Link>
        </li>
        <li className="hidden md:inline">
          <Link to="/">About Us</Link>
        </li>
        <li className="hidden md:inline">
          <Link to="/">Contact Us</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
