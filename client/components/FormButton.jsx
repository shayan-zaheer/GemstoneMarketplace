const FormButton = ({ disabled = false, text, type, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`relative px-6 py-2 font-semibold bg-transparent border border-gray-500    ${
        !disabled && "hover:border-gray-500 hover:bg-primary "
      } overflow-hidden group rounded-sm  mx-auto w-full group`}
    >
      {/* <span
        className={`absolute inset-0 bg-primary transform scale-x-0 origin-left ${
          disabled
            ? "transition-none border "
            : "transition-all duration-300 ease-out group-hover:scale-x-100"
        }`}
      ></span> */}
      <div className="flex items-center justify-center gap-x-2">
        <span className={"group-hover:text-white"}>{text}</span>
      </div>
    </button>
  );
};

export default FormButton;
