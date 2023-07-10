import { BiSearch } from 'react-icons/bi';

const Navigation = () => {
  return (
    <ul className="flex items-center justify-between text-sm border-1 md:w-auto py-2 shadow-sm rounded-full hover:shadow-md transition">
      <li className="font-semibold border-r-1 px-3">
        <button>Any Where</button>
      </li>
      <li className="hidden sm:block font-semibold px-3 border-r-1">
        <button className="flex items-center px-3 gap-3">Any Week</button>
      </li>
      <li>
        <button className="flex items-center px-3 gap-3">
          <span className="text-gray-600 hidden sm:block">Add Guests</span>
          <div className="rounded-full bg-rose-500 font-bold text-white p-1">
            <BiSearch size={18} />
          </div>
        </button>
      </li>
    </ul>
  );
};
export default Navigation;
