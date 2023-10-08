import {TotalPriceProps} from "../interface/POS_interface"

const TotalPrice: React.FC<TotalPriceProps> = ({ total }) => {
    return (
      <div className="flex justify-between">
        <strong>Total</strong>
        <strong>{total}원</strong>
      </div>
    );
  };
export default TotalPrice