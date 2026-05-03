const LogoutModal = ({
  email,
  setShowLogoutModal,
  handleLogout,
}) => {
  return (
    <div className=' dark:bg-black flex sm:w-[380px] w-[320px]  sm:h-[300px] h-[250px] rounded-2xl '>
      <div className='flex flex-col px-7 text-center w-full h-full items-center justify-between py-7  bg-white dark:bg-gray-300/20  rounded-2xl  shadow-lg border-[1px] border-gray-300 dark:border-gray-300/5'>
        <div className='flex flex-col sm:gap-3 gap-1'>
          <h2 className='sm:text-[22px] text-[18px] tracking-tight leading-tight font-bold text-black dark:text-white'>
            Are you sure you want to <br />
            log out?
          </h2>
          <p className=' sm:text-[16px] text-[13px] font-[400] text-gray-600 dark:text-gray-400'>
            Log out of this App as <br />
            {email}
          </p>
        </div>
        <div className='flex sm:gap-4 gap-2 flex-col mt-4 w-full'>
          <button
            onClick={() => {
              setShowLogoutModal(false);
              handleLogout();
            }}
            className='px-4 focus:none py-2 w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 cursor-pointer rounded-full font-[600] text-[13px]'
          >
            Log out
          </button>
          <button
            onClick={() => setShowLogoutModal(false)}
            className='px-4 py-2 focus:none cursor-pointer w-full text-black dark:text-white rounded-full dark:bg-gray-300/10  hover:bg-gray-300/20 border-[1px] border-gray-300 dark:border-gray-300/5 font-[600] text-[13px]'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal