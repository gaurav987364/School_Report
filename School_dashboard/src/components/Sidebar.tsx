import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { FaHome, FaList } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // const user = true;
  const {user} =  useUser();
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 lg:w-20 xl:w-64 transform bg-white dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 shadow-lg transition-all duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:shadow-none`}
    >
      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 h-[60px] border-b border-gray-200 dark:border-gray-700 lg:hidden">
        <span className="font-semibold text-lg dark:text-white">University</span>
        <button onClick={onClose} className="text-xl text-gray-700 dark:text-white">
          <IoClose />
        </button>
      </div>

      <nav className="w-full h-full flex flex-col justify-between py-4 overflow-y-auto max-h-[calc(100vh-60px)] lg:max-h-screen">
        <div className="mt-4 space-y-3 px-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition hover:bg-purple-100 dark:hover:bg-purple-900
              ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`
            }
          >
            <FaHome size={22}/>
            <span className={`${isOpen ? 'inline' : 'hidden'} lg:hidden xl:inline`}>Home</span>
          </NavLink>

          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition hover:bg-purple-100 dark:hover:bg-purple-900
              ${isActive ? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`
            }
          >
            <FaList size={22}/>
            <span className={`${isOpen ? 'inline' : 'hidden'} lg:hidden xl:inline`}>Applications List</span>
          </NavLink>
        </div>

        <div className="px-2 pb-4">
          {user ? (
            <div className="flex items-center space-x-3 px-1 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-slate-900 dark:hover:bg-slate-950 transition-all duration-300 cursor-pointer">
              <div className="text-2xl w-9 h-9 rounded-full text-purple-500 dark:text-purple-400">
                <img src={user?.imageUrl || ""} alt="user" className=" w-full h-full object-cover" />
              </div>
              <div className={`flex flex-col gap-1 ${isOpen ? 'inline' : 'hidden'} lg:hidden xl:inline`}>
                <h1 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {user?.fullName || "John"}
                </h1>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px] xl:max-w-[200px]">
                  {user?.emailAddresses[0].emailAddress || "abc@gmail.com"}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
                <SignedIn>
                  <UserButton />
                </SignedIn>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;