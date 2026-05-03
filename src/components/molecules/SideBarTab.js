

const SideBarTab = ({
  title,
  icon,
  sidebarIsOpen,
  isAnimating
}) => {
  return (
    <div
      className={` w-[100%]  w-full flex items-center ${sidebarIsOpen ? "justify-start py-[18px] gap-[10px] h-[28px]" : "justify-center h-full"}`}
    >
      {icon}
      <p
        className={`text-black/80 dark:text-white/80 text-[13px] font-[500]  ${isAnimating ? "opacity-0" : "opacity-100"}`}
      >
        {title}
      </p>
    </div>
  );
};

export default SideBarTab;
