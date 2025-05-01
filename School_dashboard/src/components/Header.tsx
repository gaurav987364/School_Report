import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import {  useRef, } from "react";
import { useTheme } from "../context/ThemeContext";
import { UserButton } from "@clerk/clerk-react";


const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const {mode,setMode} = useTheme()
  const dropdownRef = useRef(null);


  const handleToggle = ()=>{
    setMode(!mode);
  };

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
        <h1 className="text-2xl font-bold text-blue-500 dark:text-blue-400">
         Arcadia University
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
      <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  </header>
  );
};

export default Header;