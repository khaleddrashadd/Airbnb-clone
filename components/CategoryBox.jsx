'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import queryString from 'query-string';

const CategoryBox = ({ label, icon }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSelected = searchParams.get('category') === label;

  const handleClick = () => {
    const currentQuery = searchParams
      ? queryString.parse(searchParams.toString())
      : {};
    const updatedQuery = {
      ...currentQuery,
      category: label,
    };
    if (searchParams.get('category') === label) delete updatedQuery.category;

    const url = queryString.stringifyUrl(
      { url: '/', query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        isSelected
          ? 'border-b-neutral-800 text-neutral-800'
          : 'border-transparent text-neutral-500'
      }`}>
      {icon}
      <p className="font-medium text-sm ">{label}</p>
    </div>
  );
};
export default CategoryBox;
