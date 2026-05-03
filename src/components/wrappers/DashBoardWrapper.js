import React, {ReactNode, useState, createContext, useContext, useEffect} from "react";
import SideBar from "../organisms/SideBar";
import Loader from "../../assets/loader";
import Modal from "../molecules/modals/Modal";
import LogoutModal from "../molecules/modals/LogoutModal";
import {useDispatch, useSelector} from "react-redux";
import {clearClientData} from "../../redux/features/client";
import {googleLogout} from "@react-oauth/google";
import {userApi} from "../../redux/services/queries";
import {useNavigate} from "react-router-dom";
import ProfileModal from "../molecules/modals/ProfileModal";
import {useLocation} from "react-router-dom";
import { LoaderContext } from "../../context/loaderContext";
import { PanelOpenProvider } from "../../context/PanelOpenContext";
import SettingsModal from "../molecules/modals/SettingsModal";


const SidebarContext = createContext(null);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within DashboardWrapper");
  return ctx;
};

const DashboardWrapper = ({children}) => {

  const {userData} = useSelector((state) => state.client);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const [loadingState, setIsLoadingState] = useState({
    loader: false,
    title: "",
    subject: "",
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleLogout = () => {
    setIsLoadingState({
      loader: true,
      title: "Signing you out ...",
      subject: "Please wait while we wrap things up",
    });
    setTimeout(() => {
      localStorage.removeItem("Tkn");
      dispatch(clearClientData());
      dispatch(userApi.util.resetApiState());
      googleLogout();
      navigate("/auth?mode=login", {replace: true});
    }, 1000);
  };

  const renderModals = () => (
    <>
      {showLogoutModal && (
        <Modal
          customClass='backdrop-blur-[5px] bg-black/5'
          closeModal={() => setShowLogoutModal(false)}
        >
          <LogoutModal
            email={userData?.email}
            setShowLogoutModal={() => setShowLogoutModal(false)}
            handleLogout={handleLogout}
          />
        </Modal>
      )}

      {showProfileModal && (
        <Modal
          customClass='backdrop-blur-[5px] bg-black/5'
          closeModal={() => setShowProfileModal(false)}
        >
          <ProfileModal
            userData={userData}
            setShowProfileModal={() => setShowProfileModal(false)}
          />
        </Modal>
      )}

      {showSettingsModal && (
        <Modal
          customClass='backdrop-blur-[5px] bg-black/5'
          closeModal={() => setShowSettingsModal(false)}
        >
          <SettingsModal
            userData={userData}
            setShowSettingsModal={() => setShowSettingsModal(false)}
          />
        </Modal>
      )}
    </>
  );
  
 const [contentNode, setContentNode] = useState(null);
 const [isContentScrolled, setIsContentScrolled] = useState(false);

 useEffect(() => {
   if (!contentNode) return;
   const handleScroll = () => {
     setIsContentScrolled(contentNode.scrollTop > 0);
   };

   contentNode.addEventListener("scroll", handleScroll);
   handleScroll();

   return () => {
     contentNode.removeEventListener("scroll", handleScroll);
   };
 }, [contentNode]);


 // Force header border on specific routes
 const location = useLocation();
 const forceHeaderBorder = location.pathname.includes(
   "/dashboard"
 );



  return (
    <LoaderContext.Provider value={{setIsLoadingState}}>
      <PanelOpenProvider>
      <SidebarContext.Provider
        value={{sidebarIsOpen, setSidebarOpen}}>
        {renderModals()}
        {loadingState.loader ? (
          <div className='flex h-screen w-full flex-col items-center justify-center'>
            <Loader size={30} className='text-black dark:text-white' />
            <h2 className='text-[17px] font-[700] text-black dark:text-white'>
              {loadingState.title}
            </h2>
            <p className='text-[12px] font-[500] text-black opacity-70 dark:text-white'>
              {loadingState.subject}
            </p>
          </div>
        ) : (
          <div className='flex h-screen w-full overflow-hidden bg-white dark:bg-black z-10'>
  
              <SideBar
                setShowLogoutModal={() => setShowLogoutModal(true)}
                setShowProfileModal={() => setShowProfileModal(true)}
                setShowSettingsModal={() => setShowSettingsModal(true)}
                userData={userData}
                sidebarIsOpen={sidebarIsOpen}
                setSidebarOpen={setSidebarOpen}
              />
 

            <div className='flex flex-1 flex-col'>
              <div ref={setContentNode} className='flex-1 overflow-y-auto '>
                {children}
              </div>
            </div>
          </div>
        )}
      </SidebarContext.Provider>
          </PanelOpenProvider>
    </LoaderContext.Provider>
  );
};

export default DashboardWrapper;
