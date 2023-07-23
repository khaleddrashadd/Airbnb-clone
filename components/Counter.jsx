import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { AdjustButton } from '.';

const Counter = ({ title, subtitle, value, onChange }) => {
  const handleIncreaseGuests = () => {
    onChange(value + 1);
  };
  const handleDecreaseGuests = () => {
    if (value === 1) return;
    onChange(value - 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="font-medium">{title}</h3>
        <h4 className="text-gray-600 font-light">{subtitle}</h4>
      </div>
      <div className="flex items-center gap-4">
        <AdjustButton onClick={handleDecreaseGuests}>
          {<AiOutlineMinus />}
        </AdjustButton>
        <div className="text-xl text-neutral-600 font-light">{value}</div>
        <AdjustButton onClick={handleIncreaseGuests}>
          {<AiOutlinePlus />}
        </AdjustButton>
      </div>
    </div>
  );
};
export default Counter;
