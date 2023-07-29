const ListingCategory = ({ label, Icon, description }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon
          size={40}
          className="text-neutral-600"
        />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{label}</span>
          <span className="text-neutral-500 font-light">{description}</span>
        </div>
      </div>
    </div>
  );
};
export default ListingCategory;
