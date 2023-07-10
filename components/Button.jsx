const Button = ({ label, onClick, disabled, outline, small, Icon }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${
          outline
            ? 'bg-white border-black text-black'
            : 'bg-rose-500 border-rose-500 text-white'
        }
        ${
          small
            ? 'text-sm py-1 font-light border-1'
            : 'text-md py-3 font-semibold border-2'
        }
      `}>
      {Icon && (
        <Icon
          size={24}
          className=" absolute left-4 top-3"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
