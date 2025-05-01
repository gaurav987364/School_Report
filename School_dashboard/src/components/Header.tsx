import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { MdOutlineLogout, MdOutlineAccountCircle } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";


const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const {mode,setMode} = useTheme()
  const dropdownRef = useRef(null);


  const handleToggle = ()=>{
    setMode(!mode);
  };

  //handle outside click;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm dark:shadow-md">
    <div className="flex items-center justify-between h-[60px] px-7 border-b border-gray-200 dark:border-gray-700 gap-0.5">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="block md:hidden text-gray-700 dark:text-gray-300 text-2xl"
        >
          <FiMenu />
        </button>
        <h1 className="text-2xl font-bold text-purple-500 dark:text-purple-400">
          University
        </h1>
      </div>


      <div ref={dropdownRef} className="flex items-center gap-3">
      <button 
            type='button' 
            role='button'
            onClick={handleToggle}
            className=' w-6 h-6 flex justify-center items-center rounded-full dark:text-gray-50  cursor-pointer'
        >
            {mode ? <FiSun  size={24}/> : <FiMoon  size={24}/>}
      </button>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <button className=" dark:text-gray-50">Sign In</button>
      </SignedIn>
        {dropdownOpen && (
            <div className="absolute right-28 mt-32 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-50 transition-colors duration-200">
              <Link
                to="/profile"
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
              >
                <MdOutlineAccountCircle className="text-lg" /> Profile
              </Link>
              <button
                role="button"
                type="button"
                className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-b-lg transition-colors duration-200"
              >
                <MdOutlineLogout className="text-lg" /> Sign Out
              </button>
            </div>
          )}
      </div>
    </div>
  </header>
  );
};

export default Header;