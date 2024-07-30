import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { logout } from "../app/userSlice";
import { FaCartShopping } from "react-icons/fa6";
import Weather from "./Weather";
import { FaChartBar } from "react-icons/fa";

function local() {
  return localStorage.getItem("theme") || "winter";
}

function Navbar() {
  const [weatherCondition, setWeatherCondition] = useState("");
  const [theme, setTheme] = useState(local());
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { user } = useSelector((state) => state.user);

  const handleOut = async () => {
    try {
      await signOut(auth);
      toast.success("LogOut successfully ✔✋");
      dispatch(logout());
    } catch (error) {
      toast.error("LogOut failed ✋");
    }
  };

  const handleTheme = () => {
    const newTheme = theme === "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const getBackgroundImage = () => {
    switch (weatherCondition) {
      case "clear":
        return "url('https://example.com/clear-sky.jpg')";
      case "rain":
        return "url('https://example.com/rainy.jpg')";
      case "clouds":
        return "url('https://example.com/cloudy.jpg')";
      default:
        return "url('https://example.com/default-weather.jpg')";
    }
  };

  useEffect(() => {
    if (weatherCondition) {
      document.querySelector(".navbar").style.backgroundImage = getBackgroundImage();
    }
  }, [weatherCondition]);

  return (
    <div
      className="mx-auto"
      style={{ backgroundImage: getBackgroundImage(), backgroundSize: "cover" }}
    >
      <header className="bg-base-200">
        <nav className="navbar align-elements">
          <div className="navbar-start flex gap-3">
            <Link to="/">
              <h1 className="text-3xl font-bold font-serif">My Car</h1>
            </Link>
            <Weather
              className="font-medium w-96 justify-between"
              setWeatherCondition={setWeatherCondition}
            />
          </div>
          <div className="navbar-center flex gap-3">
            <NavLink className="btn" to="/">
              <FaHome />
              Home
            </NavLink>
            <NavLink className="btn" to="/cart">
              <IoCreate />
              Create Cart
            </NavLink>
            <NavLink className="btn" to="/chart">
              <FaChartBar />
              Chart
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="flex gap-4 items-center">
              <Link to="/carts">
                <div className="indicator">
                  <span className="indicator-item badge badge-secondary">
                    {cartItemCount}
                  </span>
                  <FaCartShopping className="w-7 h-7 cursor-pointer" />
                </div>
              </Link>
              <h4>hi ✋ {user.displayName}</h4>
              <div className="avatar">
                <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                  <img
                    src={
                      user.photoURL
                        ? user.photoURL
                        : `https://api.dicebear.com/9.x/initials/svg?seed=${user.displayName}`
                    }
                    alt=""
                  />
                </div>
              </div>
              <label className="swap swap-rotate">
                <input
                  onClick={handleTheme}
                  type="checkbox"
                  checked={theme === "dracula"}
                  readOnly
                />
                <IoMdSunny className="swap-on h-7 w-7 fill-current" />
                <IoMdMoon className="swap-off h-7 w-7 fill-current" />
              </label>
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById("my_modal_2").showModal()}
              >
                ✋
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box text-center">
                  <h1 className="text-2xl mb-4 font-bold">
                    Log Out Modal 🤷‍♂️✋😐
                  </h1>
                  <button
                    className="btn btn-primary text-center"
                    onClick={handleOut}
                  >
                    LogOut ✋😀
                  </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
