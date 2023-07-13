const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};
export default Heading;
