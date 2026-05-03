import {useEffect, useState} from "react";
import { Camera} from "lucide-react";
import { useChangeProfileMutation } from "../../../redux/services/queries";
import Loader from "../../../assets/loader";


const ProfileModal = ({
  userData,
  setShowProfileModal,
}) => {

  const [avatarPreview, setAvatarPreview] = useState("");
  const [displayName, setDisplayName] = useState(
    userData?.firstName || ""
  );
  const [username, setUsername] = useState(
    userData?.username || ""
  );
  const [error, setIsError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [
    doChangeProfileDetails,
    {
      data: changedProfileData,
      isSuccess: changedProfileSuccessful,
      isError: isChangedProfileError,
      error: changedProfileError,
      isLoading: isChangedProfileLoading,
    },
  ] = useChangeProfileMutation();


   useEffect(() => {
     if (isChangedProfileError) {
       const statusCode = (changedProfileError)?.status;
       console.log("Error status code:", statusCode);
       if (statusCode === 403) {
         setIsError("Username already taken, please choose another one.");
       } else {
         setIsError("Something went wrong, please try again");
       }
       return;
     }

     if (changedProfileSuccessful) {
    setIsError('Updated Successfully');
     }
   }, [changedProfileSuccessful, changedProfileData, isChangedProfileError]);
  

   const handleSave = async () => {
    setIsError("");
     if (
       displayName.trim() === userData?.firstName &&
       username.trim() === userData?.username
     ) {
         setIsError("No field changed.");
       return;
     }
    if (displayName.trim() === "" || username.trim() === "") {
      setIsError("Display name and Username cannot be empty.");
      return;
    }

     await doChangeProfileDetails({
       displayName,
        username
     });
   };


  return (
    <div className='dark:bg-black flex sm:w-[450px] w-[95%] max-w-[420px] sm:h-[480px] h-[480px] rounded-2xl '>
      <div className='flex flex-col p-4 text-center w-full h-full items-center justify-between bg-white dark:bg-gray-300/20  rounded-2xl  shadow-lg border-[1px] border-gray-300 dark:border-gray-300/5 '>
        <div className={`flex items-center justify-between w-full `}>
          <h2 className={`text-[15px] font-[500] text-foreground`}>
            Edit profile
          </h2>
        </div>

        {/* Content */}
        <div className='w-full'>
          {/* Avatar Section */}
          <div className='flex justify-center mb-3'>
            <div className='relative'>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt='Profile'
                  className='w-32 h-32 rounded-full object-cover'
                />
              ) : (
                <div>
                  <div className='w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center'>
                    <span className='text-5xl font-bold text-white'>
                        {userData?.letter}
                    </span>
                  </div>
                  {userData?.profilePicture &&
                    userData?.profilePicture !== "" && (
                      <img
                        src={userData.profilePicture}
                        alt='Profile'
                        className='w-32 h-32 rounded-full absolute top-0 left-0 object-cover'
                      />
                    )}
                </div>
              )}

              {/* Camera Button */}
              <label
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-2 p-1 rounded-full cursor-pointer transition-all  border-gray-200 dark:bg-black bg-white hover:bg-gray-300/80 hover:dark:bg-black/50 dark:border-1 dark:border-gray-300/50 hover:bg-gray-50 border-1  shadow-lg`}
              >
                <Camera className={`w-4 h-4 text-foreground`} />
                <input
                  id='avatar-upload'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload}
                  disabled={true}
                />
              </label>
            </div>
          </div>
          <div className='w-full flex justify-center text-[12px] text-black/50 dark:text-white/50 mb-6'>
            {userData?.email}
          </div>
          {/* Display Name Input */}
          <div className='relative mb-3'>
            <label
              className={`absolute left-4 top-[6px] text-[12px] font-[500] mb-2 text-black/60 dark:text-white/80`}
            >
              Display name
            </label>
            <input
              type='text'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className={`pt-6 w-full px-4 dark:placeholder-gray-300/40  placeholder-gray-400/70 py-2 rounded-xl text-[14px] border font-[500] bg-transparent dark:border-gray-300/10 border-gray-700/10 dark:text-white text-gray-900 dark:focus:border-white dark:focus:ring-white/20 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all`}
              placeholder={userData?.firstName || "Enter your display name"}
            />
          </div>

          {/* Username Input */}
          <div className='relative'>
            <label
              className={`absolute left-4 top-[6px] text-[12px] font-[500] mb-2 text-black/60 dark:text-white/80`}
            >
              Username
            </label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`pt-6 w-full  px-4 py-2 dark:placeholder-gray-300/40  placeholder-gray-400/70 rounded-xl border text-[14px] font-[500] bg-transparent dark:border-gray-300/10 border-gray-700/10 border-gray-300 dark:text-white text-gray-900 dark:focus:border-white dark:focus:ring-white/20 focus:border-black focus:ring-black/20 focus:outline-none focus:ring-2 transition-all `}
              placeholder={userData?.username || "Enter your username"}
            />
          </div>
         
          <p className='dark:text-white/80 text-black/80 font-[500] text-[11px] mt-1 h-5'> {error !== "" && error}</p>
   
          {/* Info Text */}
          <p
            className={`text-[11px] w-[95%] font-[400] mx-auto  text-center opacity-70 dark:text-gray-400 text-gray-600 mt-2`}
          >
            Your can change your Display name and Username here.
          </p>
        </div>

        {/* Footer */}
        <div className={`flex gap-3  w-full items-center justify-end `}>
          <button
            onClick={() => setShowProfileModal(false)}
            className={`cursor-pointer h-[33px] w-18 rounded-full font-[500] text-[14px] transition-all 
          text-foreground bg-transparent hover:dark:bg-gray-300/10 hover:bg-gray-300/40 text-gray-900 border dark:border-gray-300/10 border-gray-300/80 dark:text-white text-black
            `}
          >
            Cancel
          </button>
          <button
            disabled={isChangedProfileLoading}
            onClick={handleSave}
            className={`${isChangedProfileLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:dark:bg-white/90 hover:dark:bg-gray-100 hover:bg-black/80"} h-8 w-14 rounded-full font-[500] text-[14px] dark:bg-white bg-black  dark:text-gray-900 text-white transition-all shadow-md text-center flex items-center justify-center`}
          >
            {isChangedProfileLoading ? <Loader size={20} className='text-white dark:text-black' /> : "Save"}
           
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;