import Link from 'next/link';
import Heading from './modals/Heading';
import Button from './Button';

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  label="Remove all filters",
  showReset,
}) => {
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        title={title}
        subtitle={subtitle}
        center
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Link
            href="/"
            replace>
            <Button
              outline
              label={label}
            />
          </Link>
        )}
      </div>
    </div>
  );
};
export default EmptyState;
