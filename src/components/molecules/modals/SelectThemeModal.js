import {Check} from "lucide-react";
import React from "react";
import {useTheme} from "../../../context/ThemeContext";

export const SelectThemeModal = ({setShowSelectThemeModal}) => {
  const {theme, setThemeMode} = useTheme();

  const [active, setActive] = React.useState(true);

  const handleThemeChange = (theme) => {
    setShowSelectThemeModal(false);
    setThemeMode(theme);
  };

  return (
    <div className='absolute md:bottom-[21px] bottom-[15px] md:right-[-125px] right-[5px] w-[223px] bg-white dark:bg-black border dark:border-foreground/30 border-foreground/20 flex rounded-2xl shadow-md z-66'>
      <div
        className={`
       bg-background p-[4px] dark:bg-gray-300/20 w-full h-full rounded-2xl shadow-xl z-61`}
      >
        <div
          onClick={() => handleThemeChange("system")}
          onMouseEnter={() => setActive(false)}
          className={`px-[10px] py-[6px] hover:dark:bg-gray-300/20 hover:bg-gray-300/50 ${theme === "system" && active && "dark:bg-gray-300/20 bg-gray-300/50"} rounded-xl text-[13px] font-[500] cursor-pointer flex justify-between items-center`}
        >
          System
          {theme === "system" && <Check size={17} />}
        </div>
        <div
          onMouseEnter={() => setActive(false)}
          onClick={() => handleThemeChange("light")}
          className={`px-[10px] py-[6px] hover:dark:bg-gray-300/20 hover:bg-gray-300/50 ${theme === "light" && active && "dark:bg-gray-300/20 bg-gray-300/50"} rounded-xl text-[13px] font-[500] cursor-pointer flex justify-between items-center`}
        >
          Light {theme === "light" && <Check size={17} />}
        </div>
        <div
          onMouseEnter={() => setActive(false)}
          onClick={() => handleThemeChange("dark")}
          className={`px-[10px] py-[6px] hover:dark:bg-gray-300/20 hover:bg-gray-300/50 ${theme === "dark" && active && "dark:bg-gray-300/20 bg-gray-300/50"} rounded-xl text-[13px] font-[500] cursor-pointer flex justify-between items-center`}
        >
          Dark {theme === "dark" && <Check size={17} />}
        </div>
      </div>
    </div>
  );
};
