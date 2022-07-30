import Navbar from "components/layout/Navbar";
import Button from "components/ui/Button";
import { useNavigate } from "react-router-dom";
import routes from "routes/routes";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="md:px-20 px-5">
      <Navbar />

      <div className="flex flex-col md:flex-row mt-8 justify-between">
        <div className="text-black text-opacity-60 md:w-5/12">
          <h2 className="font-bold text-3xl md:text-4xl mb-2">
            The Only Weather app <br /> you need to get weather data
          </h2>

          <img
            src={"/images/weather-forecast.png"}
            className="w-96 object-contain hidden md:inline"
            alt="weather"
          />
          <p className="my-4">
            Get Notified with latest weather updates and get real-time weather
            data for your location.
          </p>
          <div className="mt-5 text-center">
            <Button onClick={() => navigate(routes.register)}>
              Get Started
            </Button>
          </div>
        </div>
        <div className="md:w-7/12 pt-10">
          <img
            className="shadow-2xl rounded-lg drop-shadow-2xl md:rounded-bl-[250px]"
            src={"/images/woman-with-umbrella.jpg"}
            alt="weather"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
