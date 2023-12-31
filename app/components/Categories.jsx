import { categories } from '@/data';
import CategoryBox from './CategoryBox';

const Categories = () => {
  return (
    <div className="flex items-center justify-between border-b-1 overflow-y-hidden">
      {categories.map(category => (
        <CategoryBox
          key={category.label}
          label={category.label}
          description={category.description}
          icon={<category.icon size={26} />}
        />
      ))}
    </div>
  );
};
export default Categories;
