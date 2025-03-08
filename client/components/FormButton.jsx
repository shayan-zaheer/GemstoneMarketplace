const FormButton = ({ text, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="relative px-6 py-2 font-semibold text-white bg-transparent border border-white hover:border-transparent overflow-hidden group rounded-sm  mx-auto w-full"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] transition-all duration-300 ease-out transform scale-x-0 origin-left group-hover:scale-x-100"></span>
      <div className="flex items-center justify-center gap-x-2">
        <span className="relative z-10 text-white">{text}</span>
      </div>
    </button>
  );
};

export default FormButton;
