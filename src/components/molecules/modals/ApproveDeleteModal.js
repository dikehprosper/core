import {X} from "lucide-react";
import Loader from "../../../assets/loader";


const ApproveDeleteModal = ({
  setShowApproveDeleteModal,
  handleDelete,
  isDeleteLoading,
  warnings,
  title
}) => {
  return (
    <div className='dark:bg-black flex sm:w-[370px] w-[90%]  rounded-2xl '>
      <div className='flex flex-col p-4 w-full h-full items-center bg-white dark:bg-gray-300/20  rounded-2xl  shadow-lg border-[1px] border-gray-300 dark:border-gray-300/5 '>
        <div className={`flex items-center justify-between w-full mb-1`}>
          <p className={`text-[16px] font-[600] text-foreground`}>
     
            {title}
          </p>
          <p
            onClick={() => setShowApproveDeleteModal(false)}
            className={`text-[12px] opacity-40 font-[600] text-foreground hover:opacity-80 cursor-pointer`}
          >
            <X size={19} strokeWidth={2} />
          </p>
        </div>
        <div className='flex flex-col w-full flex-1 justify-between mt-4 gap-6'>
          <div className='mb-3 w-full gap-1 flex flex-col'>
            {Array.isArray(warnings) ? (
              warnings.map((warning, index) => (
                <h3
                  key={index}
                  className={`flex gap-3 text-[12px] font-[500] text-foreground`}
                >
                  <span className=' flex-shrink-0'>•</span>
                  <span>{warning}</span>
                </h3>
              ))
            ) : (
              <h3
                className={`flex gap-3 text-center text-[13px] font-[500] text-foreground opacity-70`}
              >
                <span>{warnings}</span>
              </h3>
            )}
          </div>

          <button
            onClick={handleDelete}
            className={` ${isDeleteLoading ? "hover:cursor-not-allowed opacity-80" : "cursor-pointer"} h-9 cursor-pointer w-full px-3 bg-red-600 text-[13px] text-white flex justify-center items-center rounded-full font-[600] hover:bg-red-600/70 transition-colors`}
          >
            {isDeleteLoading ? <Loader className='h-6' /> : "Delete Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDeleteModal;



