const AdjustButton = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="w-10 h-10 rounded-full border-1 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
      onClick={onClick}>
      {children}
    </button>
  );
};
export default AdjustButton;
