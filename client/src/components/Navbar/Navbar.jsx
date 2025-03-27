import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/Theme";
import { Sun, Moon } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/Userslice";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "#" },
  { name: "Chat", path: "/chat" },
  { name: "Profile", path: "/profile" },
  { name: "Experts", path: "/experts" },
  { name: "Admin", path: "/admin" },
  { name: "News", path: "/news" },
  { name: "Market", path: "/market-visualtization" },
  // Removed VideoCall from navItems since we'll handle it differently
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    dispatch(logout());
    navigate("/login");
  };

  const handleVideoCall = () => {
    // Generate random room ID (6-digit alphanumeric)
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/video/${roomId}`);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="w-full bg-background/80 backdrop-blur-md border-b sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent"
        >
          CodeCommandos
        </motion.div>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link
                  to={item.path}
                  className={`relative group px-4 py-2 rounded-full transition-colors ${
                    isActive
                      ? "text-black dark:text-primary"
                      : "hover:text-orange-500"
                  }`}
                >
                  {item.name}
                  {!isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all group-hover:w-full"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}

          {/* Video Call Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: navItems.length * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <button
              onClick={handleVideoCall}
              className="relative group px-4 py-2 rounded-full transition-colors hover:text-orange-500"
            >
              Video Call
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all group-hover:w-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </button>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (navItems.length + 1) * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <button
              onClick={handleLogout}
              className="relative group px-4 py-2 rounded-full transition-colors hover:text-orange-500"
            >
              Logout
            </button>
          </motion.div>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-primary" />
            ) : (
              <Sun className="w-5 h-5 text-primary" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;