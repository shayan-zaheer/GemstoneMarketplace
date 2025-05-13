const FormButton = ({ disabled = false, text, type, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`relative px-6 py-2 font-semibold bg-transparent border border-white text-gray-500  ${!disabled && 'hover:border-transparent  text-white'} overflow-hidden group rounded-sm  mx-auto w-full`}
    >
      <span
        className={`absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transform scale-x-0 origin-left ${
          disabled
            ? "transition-none border " 
            : "transition-all duration-300 ease-out group-hover:scale-x-100"
        }`}
      ></span>
      <div className="flex items-center justify-center gap-x-2">
        <span className={`relative z-10 ${!disabled && 'text-white'} text-gray-400`}>{text}</span>
      </div>
    </button>
  );
};

export default FormButton;
