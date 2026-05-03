import React, {useState, useRef, useEffect, useContext} from "react";
import Logo from "../atoms/Logo";
import SideBarTab from "../molecules/SideBarTab";
import {NavLink, useNavigate} from "react-router-dom";
import LogoIcon from "../../favicon.ico";
import {BsBoxArrowInDown} from "react-icons/bs";
import {
  BookImage,
  Cog,
  House,
  LayoutTemplate,
  LogOut,
  X,
  Zap,
} from "lucide-react";
import {BiMenuAltLeft} from "react-icons/bi";
import {useDispatch} from "react-redux";
import { LoaderContext } from "../../context/loaderContext";
import { APP_PAGES } from "../../utils/navigationRoutes";
import TextElipse from "../atoms/textElipse";
// import GenerateLogo from "../molecules/GenerateLogo";


const items = [
  {
    title: "Home",
    icon: <House size={16} strokeWidth={2} />,
    route: "/dashboard/overview",
  },
  {
    title: "Templates",
    icon: <LayoutTemplate size={16} strokeWidth={2} />,
    route: "/dashboard/templates",
  },
  {
    title: "Your Assets",
    icon: <BookImage size={16} strokeWidth={2} />,
    route: "/dashboard/assets",
  },
];

const SideBar = ({
  setShowLogoutModal,
  setShowProfileModal,
  userData,
  setShowSettingsModal,
  sidebarIsOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSidebarStatus, setShowSidebarStatus] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [iconDisplay, setIconDisplay] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState({outer: false, inner: false});
  const {setIsLoadingState} = useContext(LoaderContext);
 

  const openSidebar = () => {
    setIconDisplay(true);
    setIsAnimating(true);
    setSidebarOpen(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const closeSidebar = () => {
    setShowSidebarStatus(false);
    setSidebarOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  function handleIconDisplay(value) {
    if (value === "enter") {
      if (!sidebarIsOpen) {
        setIconDisplay(false);
      }
    }
    if (value === "leave") {
      if (!sidebarIsOpen) {
        setIconDisplay(true);
      } else {
        setIconDisplay(true);
      }
    }
  }

  return (
    <>
      {profileMenuOpen && (
        <div
          className={`fixed inset-0 z-31`} // Adjust z-index for smaller screens
          onClick={() => {
            console.log("Overlay clicked"); // Debugging log
            setProfileMenuOpen(false);
          }}
        />
      )}
      {/* Mobile menu button (top-left, visible only on mobile) */}
      <div className='md:hidden fixed top-4 left-4 z-40'>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className='p-2 rounded-md bg-gray-300/20 hover:bg-gray-300/40 dark:hover:bg-gray-300/10'
        >
          <BiMenuAltLeft />
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {mobileMenuOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 md:hidden'
          onClick={closeMobileMenu}
        />
      )}

      {/* Desktop sidebar (hidden on mobile) */}
      <div
        className={`hidden md:flex relative
    bg-gray-300/10 pt-4 pb-2 border-r border-foreground/5
    flex flex-col items-start
    transition-all duration-300 ease-in-out
    ${sidebarIsOpen ? "w-[230px]" : "!w-[47px]"}
    h-[100vh]
  `}
      >
        <div
          className={`flex w-full items-center ${
            sidebarIsOpen ? "pl-2 pr-2 justify-end" : " flex-col justify-center"
          }   transition-opacity duration-300
   `}
        >
          <NavLink
            to={APP_PAGES.dashboard}
            onMouseEnter={() => handleIconDisplay("enter")}
            onMouseLeave={() => handleIconDisplay("leave")}
            onClick={openSidebar}
            className={({isActive}) =>
              `h-[32px] w-[32px] flex justify-center items-center absolute left-[6px] rounded-[6px] no-underline hover:bg-gray-300/40 hover:dark:bg-gray-300/10`
            }
          >
            <span className='relative'>
              {!iconDisplay && (
                <span className='absolute fadeInUp z-5000 fadeInUp opacity-0 animate-fadeInSlow top-[-2px] left-[38px] shadow-md bg-black dark:bg-white text-white dark:text-black text-[12px] font-[500] py-[3px] px-[6px] rounded-[8px] whitespace-nowrap'>
                  Open sidebar
                </span>
              )}

              {iconDisplay ? (
                <Logo
                  LogoIcon={LogoIcon}
                  className='  h-[23px] w-[23px] rounded-[3px] align-start'
                />
              ) : (
                <BsBoxArrowInDown
                  className={`text-black ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }  dark:text-white text-[16px] font-[600] rotate-270`}
                  size={19}
                />
              )}
            </span>
          </NavLink>

          <div
            className={` ${
              sidebarIsOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } relative p-2 hover:bg-gray-300/40 hover:dark:bg-gray-300/10 rounded-[6px] cursor-pointer`}
            onMouseEnter={() => setShowSidebarStatus(true)}
            onMouseLeave={() => setShowSidebarStatus(false)}
            onClick={closeSidebar}
          >
            <BsBoxArrowInDown
              className={`text-black ${
                isAnimating ? "opacity-0" : "opacity-100"
              }  dark:text-white text-[16px] font-[600] rotate-90`}
              size={19}
            />

            {sidebarIsOpen && !isAnimating && showSidebarStatus && (
              <span className='absolute z-5000 fadeInUp opacity-0 animate-fadeInSlow top-[6px] left-[45px] shadow-md bg-black dark:bg-white text-white dark:text-black text-[12px] font-[500] py-[3px] px-[6px] rounded-[8px] whitespace-nowrap'>
                Close sidebar
              </span>
            )}
          </div>
        </div>
        <div
          className={` mt-[40px] flex flex-col gap-[8px] items-start w-full  ${
            sidebarIsOpen ? "pr-2 pl-2" : "pr-[6px] pl-[6px]"
          }`}
        >
          {items.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.route}
              className={({isActive}) =>
                `   ${sidebarIsOpen ? "px-2" : "h-[33px]"} w-full no-underline rounded-md  ${
                  isActive
                    ? "bg-gray-300/60 hover:bg-gray-300/90 hover:dark:bg-gray-300/30 dark:bg-gray-300/10"
                    : "hover:bg-gray-300/30 hover:dark:bg-gray-300/10"
                }`
              }
            >
              <SideBarTab
                title={sidebarIsOpen ? item.title : ""}
                icon={item.icon}
                sidebarIsOpen={sidebarIsOpen}
                isAnimating={isAnimating}
              />
            </NavLink>
          ))}
        </div>

        <div
          onClick={() => {
            if (!sidebarIsOpen) {
              openSidebar();
            }
          }}
          className={`flex-1 flex-col gap-[8px] items-start w-full ${
            sidebarIsOpen ? "pr-2 pl-2" : "pr-[6px] pl-[6px] arrow-right"
          }`}
        ></div>

        {/* Profile Section with Dropdown - Desktop */}
        <div className='relative w-full'>
          <button
            onMouseEnter={() => setIsHovering({outer: true, inner: false})}
            onMouseLeave={() => setIsHovering({outer: false, inner: false})}
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className={`focus:none cursor-pointer flex items-center justify-between rounded-md mx-auto transition-all ${
              sidebarIsOpen
                ? "pr-1 pl-[4px] w-[93%] h-[43px]"
                : "h-[40px] p-1 w-[88%]"
            } ${isHovering.outer ? "hover:bg-gray-300/40 hover:dark:bg-gray-300/10" : ""}`}
          >
            <div
              className={`h-[32px] gap-[6px] w-[32px] flex  ${
                sidebarIsOpen ? "justify-start flex-1" : "justify-center"
              } items-center left-[6px] rounded-[6px] no-underline `}
            >
              {/* <Logo
                LogoIcon={LogoIcon}
                className='  h-[25px] w-[25px] rounded-full align-center'
              /> */}

              <div
                className={`h-[25px] relative w-[25px] flex items-center justify-center rounded-full`}
                // style={{
                //   backgroundColor: userData?.profilePicBg,
                // }}
              >
                <span className='text-white font-bold text-[16px]'>
                  {userData?.letter}
                </span>
                {userData?.profilePicture && userData?.profilePicture !== "" && (
                  <img
                    src={userData?.profilePicture}
                    alt='Profile'
                    className='h-[25px] w-[25px] rounded-full absolute top-0 left-0 object-cover'
                  />
                )}
              </div>

              {sidebarIsOpen && !isAnimating && (
                <div className='flex flex-col justify-center items-start'>
                  <p className='text-[11.5px] font-[500]'>
                    <TextElipse
                      number={13}
                      value={userData?.name || userData?.email?.split("@")[0]}
                    />
                  </p>
                  <p className='text-[10px] font-[500] opacity-50'>Free</p>
                </div>
              )}
            </div>
            {sidebarIsOpen && !isAnimating && (
              <div
                onMouseEnter={() => setIsHovering({outer: false, inner: true})}
                onMouseLeave={() => setIsHovering({outer: true, inner: false})}
                className={`bg-white dark:bg-black rounded-full w-14 h-5 text-[10px] font-[500] border-[1px] border-gray-300/80 ${isHovering.inner ? "hover:bg-gray-300/10 hover:dark:bg-gray-300/10" : ""} flex items-center justify-center`}
              >
                upgrade
              </div>
            )}
          </button>

          {profileMenuOpen && (
            <div
              className={`absolute bottom-12 ${
                sidebarIsOpen
                  ? "left-1 right-1 w-[223px]"
                  : "left-29 -translate-x-1/2 w-[223px]"
              } dark:bg-black bottom-[50px] rounded-2xl  shadow-xl z-61`}
            >
              <div className='flex bg-background dark:bg-gray-300/15 border border-foreground/10  rounded-2xl  p-[6px] flex-col'>
                <div
                  onClick={() => {
                    setShowProfileModal();
                    setProfileMenuOpen(false);
                  }}
                  className='flex rounded-[10px] py-1 items-center gap-[6px] px-2 hover:bg-foreground/5 dark:hover:bg-gray-300/10 cursor-pointer'
                >
                  <div
                    className={`h-[25px] relative w-[25px] flex items-center justify-center rounded-full`}
                    // style={{
                    //   backgroundColor: userData?.profilePicBg,
                    // }}
                  >
                    <span className='text-white font-bold text-[16px]'>
                      {userData?.letter}
                    </span>
                    {userData?.profilePicture &&
                      userData?.profilePicture !== "" && (
                        <img
                          src={userData?.profilePicture}
                          alt='Profile'
                          className='h-[25px] w-[25px] rounded-full absolute top-0 left-0 object-cover'
                        />
                      )}
                  </div>

                  <div>
                    <p className='text-sm font-semibold text-foreground/90'>
                      <TextElipse
                        number={19}
                        value={
                          userData?.firstName || userData?.email?.split("@")[0]
                        }
                      />
                    </p>
                    <p className='text-[12px]  text-foreground/50'>
                      <TextElipse
                        number={23}
                        value={
                          userData?.username
                            ? `@${userData?.username}`
                            : userData?.email
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className=' border-b border-foreground/10 pb-1 w-[92%] mx-auto'></div>

                {/* Menu Items */}
                <div className='pt-1 gap-1 flex flex-col items-center'>
                  <button className='w-full focus:none flex py-2 px-2 rounded-[10px] items-center gap-2 text-foreground hover:bg-foreground/5 dark:hover:bg-gray-300/10 transition text-black/80 dark:text-white/80 text-[13px] font-[500] cursor-pointer'>
                    <span className='text-xl'>
                      <Zap
                        size={15}
                        className='text-black/70 dark:text-white/80'
                      />
                    </span>{" "}
                    Upgrade plan
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setShowSettingsModal();
                    }}
                    className='w-full focus:none flex py-2 px-2 rounded-[10px] items-center gap-2 text-foreground hover:bg-foreground/5 dark:hover:bg-gray-300/10 transition text-black/80 dark:text-white/80 text-[13px] font-[500] cursor-pointer'
                  >
                    <span className='text-xl'>
                      <Cog
                        size={15}
                        className='text-black/70 dark:text-white/80'
                      />
                    </span>{" "}
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setShowLogoutModal();
                    }}
                    className='w-full flex items-center rounded-[10px] py-2 px-2 gap-2 hover:bg-foreground/5 dark:hover:bg-gray-300/10 transition text-black/80 dark:text-white/80 text-[13px] font-[500] cursor-pointer focus:none'
                  >
                    <span className='text-xl'>
                      <LogOut
                        size={15}
                        className='text-black/70 dark:text-white/80'
                      />
                    </span>{" "}
                    Log out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sidebar (fixed overlay) */}
      {/* Mobile sidebar (fixed overlay) */}
      <div
        className={`fixed top-0 left-0 z-40 md:hidden bg-white dark:bg-black h-full w-[240px] transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {profileMenuOpen && (
          <div
            className={`fixed inset-0 z-39
          } bg-black/10`} // Adjust z-index for smaller screens
            onClick={() => {
              console.log("Overlay clicked"); // Debugging log
              setProfileMenuOpen(false);
            }}
          />
        )}

        <div
          className={`bg-gray-300/10 border-r border-foreground/5 flex flex-col items-start h-full pt-4 pb-2`}
        >
          {/* Logo */}
          <div className='px-2 w-full mb-4 flex items-center justify-between'>
            <NavLink to={APP_PAGES.dashboard} onClick={closeMobileMenu}>
              <Logo
                LogoIcon={LogoIcon}
                className='h-[23px] w-[23px] rounded-[3px]'
              />
            </NavLink>
            <button
              onClick={closeMobileMenu}
              className='p-1 focus:none rounded-md hover:bg-gray-300/40 dark:hover:bg-gray-300/10'
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation items */}
          <div className='flex flex-col gap-[8px] items-start w-full px-2'>
            {items.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.route}
                onClick={closeMobileMenu}
                className={({isActive}) =>
                  `px-2 w-full no-underline rounded-md ${
                    isActive
                      ? "bg-gray-300/60 dark:bg-gray-300/10"
                      : "hover:bg-gray-300/30 dark:hover:bg-gray-300/10"
                  }`
                }
              >
                <SideBarTab
                  title={item.title}
                  icon={item.icon}
                  sidebarIsOpen={true}
                  isAnimating={false}
                />
              </NavLink>
            ))}
          </div>

          {/* User section with Profile Menu - Mobile */}
          <div className='relative mt-auto w-full'>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className={`cursor-pointer flex items-center justify-between rounded-md mx-auto transition-all ${
                sidebarIsOpen
                  ? "pr-1 pl-[4px] w-[93%] h-[40px]"
                  : "h-[40px] p-1 w-[88%]"
              } hover:bg-gray-300/40 hover:dark:bg-gray-300/10`}
            >
              <div
                className={`h-[32px] gap-[6px] w-[32px] flex  ${
                  sidebarIsOpen ? "justify-start flex-1" : "justify-center"
                } items-center left-[6px] rounded-[6px] no-underline `}
              >
                <div
                  className={`h-[25px] relative w-[25px] flex items-center justify-center rounded-full`}
                  // style={{
                  //   backgroundColor: userData.profilePicBg,
                  // }}
                >
                  <span className='text-white font-bold text-[16px]'>
                    {userData?.letter}
                  </span>
                  {userData?.profilePicture &&
                    userData?.profilePicture !== "" && (
                      <img
                        src={userData?.profilePicture}
                        alt='Profile'
                        className='h-[25px] w-[25px] rounded-full absolute top-0 left-0 object-cover'
                      />
                    )}
                </div>

                {sidebarIsOpen && !isAnimating && (
                  <div className='flex flex-col justify-center items-start'>
                    <p className='text-[11.5px] font-[500]'>
                      <TextElipse
                        number={17}
                        value={
                          userData?.firstName || userData?.email?.split("@")[0]
                        }
                      />
                    </p>
                    <p className='text-[10px] font-[500] opacity-50'>Free</p>
                  </div>
                )}
              </div>
              {sidebarIsOpen && !isAnimating && (
                <div className='bg-white dark:bg-black rounded-full w-14 h-5 text-[10px] font-[500] border-[1px] border-gray-300/20 flex items-center justify-center'>
                  upgrade
                </div>
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div
                className={`absolute bottom-12 ${
                  sidebarIsOpen
                    ? "left-1 right-1 w-[233px]"
                    : "left-1/2 -translate-x-1/2 w-56"
                } bg-background p-[6px] z-61 bottom-[50px] dark:bg-gray-300/10 border border-foreground/10 rounded-2xl shadow-xl`}
              >
                <div
                  onClick={() => {
                    setShowProfileModal();
                    setProfileMenuOpen(false);
                  }}
                  className='flex rounded-[10px] py-1 items-center gap-[6px] px-2 hover:bg-foreground/5 dark:hover:bg-gray-300/10 cursor-pointer'
                >
                  <div
                    className={`h-[25px] relative w-[25px] flex items-center justify-center rounded-full`}
                    // style={{
                    //   backgroundColor: userData.profilePicBg,
                    // }}
                  >
                    <span className='text-white font-bold text-[16px]'>
                      {userData?.letter}
                    </span>
                    {userData.profilePicture &&
                      userData.profilePicture !== "" && (
                        <img
                          src={userData.profilePicture}
                          alt='Profile'
                          className='h-[25px] w-[25px] rounded-full absolute top-0 left-0 object-cover'
                        />
                      )}
                  </div>

                  <div>
                    <p className='text-sm font-semibold text-foreground/90'>
                      <TextElipse
                        number={21}
                        value={
                          userData?.firstName || userData?.email?.split("@")[0]
                        }
                      />
                    </p>
                    <p className='text-[12px]  text-foreground/50'>
                      <TextElipse
                        number={26}
                        value={
                          userData?.username
                            ? `@${userData?.username}`
                            : userData?.email
                        }
                      />
                    </p>
                  </div>
                </div>
                <div className=' border-b border-foreground/10 pb-1 w-[92%] mx-auto'></div>

                {/* Menu Items */}
                <div className='pt-1  gap-1 flex flex-col items-center'>
                  <button className='w-full flex py-2 px-2 rounded-[10px] items-center gap-2 text-foreground hover:bg-foreground/5 dark:hover:bg-gray-300/10 transition text-black/80 dark:text-white/80 text-[13px] font-[500] cursor-pointer'>
                    <span className='text-xl'>
                      <Zap
                        size={15}
                        className='text-black/70 dark:text-white/80'
                      />
                    </span>{" "}
                    Upgrade plan
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setShowSettingsModal();
                    }}
                    className='w-full flex py-2 px-2 rounded-[10px] items-center gap-2 text-foreground hover:bg-foreground/5 dark:hover:bg-gray-300/10 transition text-black/80 dark:text-white/80 text-[13px] font-[500] cursor-pointer'
                  >
                    <span className='text-xl'>
                      <Cog
                        size={15}
                        className='text-black/70 dark:text-white/80'
                      />
                    </span>{" "}
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setShowLogoutModal();
                    }}
                    className='w-full flex items-center rounded-[10px] py-2 px-2 gap-2 hover:bg-foreground/5 dark:hover:bg-gray-300/10 transition text-black/80 dark:text-white/80 text-[13px] font-[500] cursor-pointer'
                  >
                    <span className='text-xl'>
                      <LogOut
                        size={15}
                        className='text-black/70 dark:text-white/80'
                      />
                    </span>{" "}
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
