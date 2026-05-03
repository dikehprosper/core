import { useContext, useEffect, useState } from "react";
import { X, ChevronDown} from "lucide-react";
import Modal from "./Modal";
import ApproveDeleteModal from "./ApproveDeleteModal";
import { LoaderContext } from "../../../context/loaderContext";
import { clearClientData } from "../../../redux/features/client";
import { useDeleteProfileMutation, userApi } from "../../../redux/services/queries";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme} from "../../../context/ThemeContext";
import { SelectThemeModal } from "./SelectThemeModal";

 const warnings = [
   "Deleting your account is permanent and cannot be undone.",
   "Deletion will prevent you from accessing All Services.",
   "You cannot create a new account using the same email address.",
   "Your data will be deleted within 30 days, except we may retain a limited set of data for longer where required or permitted by law.",
 ];

const SettingsModal = ({
  userData,
  setShowSettingsModal,
}) => {
  const { setIsLoadingState } = useContext(LoaderContext);
  const [showApproveDeleteModal, setShowApproveDeleteModal] = useState(false);
  const [showSelectThemeModal, setShowSelectThemeModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { theme } = useTheme();

  const [
    doDeleteProfile,
    {
      data: deleteProfileData,
      isSuccess: deleteProfileSuccessful,
      isError: isDeleteProfileError,
      error: deleteProfileError,
      isLoading: isDeleteProfileLoading,
    },
  ] = useDeleteProfileMutation();

  const handleDelete = async () => {
    try {
      await doDeleteProfile().unwrap(); 
      console.log("Profile deleted successfully");
    } catch (err) {
      console.error("Error deleting profile:", err);
    }
  };

  useEffect(() => {
    if (isDeleteProfileError) {
      const statusCode = (deleteProfileError)?.status;
      console.log("Error status code:", statusCode);
    }
    if (deleteProfileSuccessful) {
       setShowApproveDeleteModal(false);
       setShowSettingsModal(false);
       setIsLoadingState({
         loader: true,
         title: "Deleting your account ...",
         subject: "Please wait while we wrap things up",
       });

       setTimeout(() => {
         localStorage.removeItem("Tkn");
         dispatch(clearClientData());
         dispatch(userApi.util.resetApiState());
         googleLogout();
         localStorage.clear();
         navigate("/auth?mode=login", {replace: true});
       }, 1000);
    }
  }, [deleteProfileSuccessful, deleteProfileData, isDeleteProfileError]);


  return (
    <>
      {showApproveDeleteModal && (
        <Modal
          customClass='backdrop-blur-[5px] bg-black/5'
          closeModal={() =>
            !isDeleteProfileLoading && setShowApproveDeleteModal(false)
          }
        >
          <ApproveDeleteModal
            setShowApproveDeleteModal={() =>
              !isDeleteProfileLoading && setShowApproveDeleteModal(false)
            }
            handleDelete={handleDelete}
            isDeleteLoading={isDeleteProfileLoading}
            warnings={warnings}
            title='Delete Account - are you sure?'
          />
        </Modal>
      )}

      <div className='relative dark:bg-black flex sm:w-[490px] w-[95%] sm:h-[480px] h-[480px] rounded-2xl '>
        {showSelectThemeModal && (
          <>
            <SelectThemeModal
              setShowSelectThemeModal={() => setShowSelectThemeModal(false)}
            />
            <Modal
              customClass='backdrop-blur-[1px] bg-black/5'
              closeModal={() => setShowSelectThemeModal(false)}
            >
              .
            </Modal>
          </>
        )}
        <div className='flex flex-col p-4 w-full h-full items-center bg-white dark:bg-gray-300/20  rounded-2xl  shadow-lg border-[1px] border-gray-300 dark:border-gray-300/5 '>
          <div className={`flex items-center justify-between w-full mb-1`}>
            <p className={`text-[16px] font-[600] text-foreground`}>Settings</p>
            <p
              onClick={() => setShowSettingsModal(false)}
              className={`text-[12px] opacity-40 font-[600] text-foreground hover:opacity-80 cursor-pointer`}
            >
              <X size={19} strokeWidth={2} />
            </p>
          </div>

          <div className='mb-3 pt-3 w-full'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-[13px] font-[400] text-gray-900 dark:text-white/80'>
                Go Pro/Premium
              </h2>
              <button
                // onClick={handleSave}
                className='cursor-pointer hover:dark:bg-white/90 h-7 w-19 rounded-full font-[600] text-[12px] dark:bg-white bg-black hover:dark:bg-gray-100 hover:bg-black/80 dark:text-gray-900 text-white transition-all shadow-md'
              >
                Upgrade
              </button>
            </div>

            {/* Features Heading */}
            <h3 className='text-[11px] font-[600] text-foreground mb-3'>
              Get everything in Pro/Premium, and more.
            </h3>

          </div>

          <div className='flex items-center justify-between h-16 border-t-[.5px] border-gray-300/30 w-full'>
            <h2 className='text-[13px] font-[400] text-foreground'>Theme</h2>
            <button
              onClick={() => {
                setShowSelectThemeModal(true);
              }}
              className=' cursor-pointer flex items-center gap-2 text-black/90 dark:text-white/90 text-[13px] font-[500] hover:bg-gray-300/50 hover:dark:bg-gray-300/20 px-3 py-[6px] rounded-md transition'
            >
              {theme === "system"
                ? "System"
                : theme === "dark"
                  ? "Dark"
                  : "Light"}{" "}
              <ChevronDown size={19} />
            </button>
          </div>

          <div className='flex items-center justify-between h-16 border-t-[.5px] border-gray-300/30 w-full'>
            <h2 className='text-[13px] font-[400] text-foreground'>
              Delete account
            </h2>
            <button
              onClick={() => setShowApproveDeleteModal(true)}
              className={`py-1  px-3 bg-transparent text-[13px] text-red-600 border-1 border-red-600 rounded-full font-[500] hover:bg-red-300/10 transition-colors`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;


