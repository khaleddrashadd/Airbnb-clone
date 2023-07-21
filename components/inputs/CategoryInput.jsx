const CategoryInput = ({ label, selected, onClick, icon }) => {

  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 basis-5/12 hover:border-black transition cursor-pointer ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}>
      {icon}
      <div className="font-semibold">{label}</div>
    </div>
  );
};
export default CategoryInput;
