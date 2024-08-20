import { ICartProduct } from "../productDetail/ProductDetail.data";

interface ISetQuantityProps {
  cartCounter?: boolean,
  cartProduct:  ICartProduct
  handleQtyIncrease: () => void
  handleQtyDecrease: () => void
}

const SetQuantity: React.FC<ISetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? (
        <div className="flex gap-4 items-center text-base">
          <button
            onClick={handleQtyDecrease}
            className="w-8 h-8 border rounded-md flex items-center justify-center text-slate-700"
          >
            -
          </button>
          <div>{cartProduct.quantity}</div>
          <button
            onClick={handleQtyIncrease}
            className="w-8 h-8 border rounded-md flex items-center justify-center text-slate-700"
          >
            +
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center text-base">
          <div>QUANTITY</div>
          <div className="flex gap-4 items-center border rounded-md p-2">
            <button onClick={handleQtyDecrease}>-</button>
            <div>{cartProduct.quantity}</div>
            <button onClick={handleQtyIncrease}>+</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetQuantity;