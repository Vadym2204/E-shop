import { ICartProduct } from "@/app/product/[productId]/productDetail/ProductDetail.data";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type cartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: ICartProduct[] | null;
  handleAddProductToCart: (product: ICartProduct) => void;
  handleRemoveProductFromCart: (product: ICartProduct) => void;
  handleQtyIncrease: (product: ICartProduct) => void;
  handleQtyDecrease: (product: ICartProduct) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void
};

interface IProps {
  [propName: string]: any;
}

export const CartContext = createContext<cartContextType | null>(null);

export const CartContextProvider = (props: IProps) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0)
  const [cartProducts, setCartProducts] = useState<ICartProduct[] | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

  useEffect(() => {
    const cartItems: any = localStorage.getItem("eShopCartItems");
    const cProducts: ICartProduct[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem('eShopPaymentIntent')
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent)
  }, []);

  const handleAddProductToCart = useCallback((product: ICartProduct) => {
    setCartProducts((prev) => {
      let cartUpdate;

      if (prev) {
        cartUpdate = [...prev, product];
      } else {
        cartUpdate = [product];
      }

      toast.success("Product added to cart");
      localStorage.setItem("eShopCartItems", JSON.stringify(cartUpdate));
      return cartUpdate;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: ICartProduct) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter(
          (item) => item.id !== product.id
        );

        setCartProducts(filteredProducts);
        toast.error("Product Removed");
        localStorage.setItem(
          "eShopCartItems",
          JSON.stringify(filteredProducts)
        );
        return filteredProducts;
      }
    },
    [cartProducts]
  );

  const handleQtyIncrease = useCallback(
    (product: ICartProduct) => {
      if (!cartProducts) return;

      if (product.quantity === 99) {
        toast.error("OOOP! Maximum limit reached");
      }

      const cartUpdate = [...cartProducts];

      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        cartUpdate[existingIndex].quantity += 1;

        setCartProducts(cartUpdate);
        localStorage.setItem("eShopCartItems", JSON.stringify(cartUpdate));
      }
    },
    [cartProducts]
  );

  const handleQtyDecrease = useCallback(
    (product: ICartProduct) => {
      if (!cartProducts) return;

      if (product.quantity === 1) {
        return toast.error("OOOP! Minimum limit reached");
      }

      const cartUpdate = [...cartProducts];

      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex > -1) {
        cartUpdate[existingIndex].quantity -= 1;

        setCartProducts(cartUpdate);
        localStorage.setItem("eShopCartItems", JSON.stringify(cartUpdate));
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("eShopCartItems", JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback((val: string| null) => {
      setPaymentIntent(val)
      localStorage.setItem('eShopPaymentIntent', JSON.stringify(val))
  }, [paymentIntent])

  useEffect(() => {
    const getTotal = () => {
        if (cartProducts) {
          const { total, qty } = cartProducts?.reduce(
            (acc, item) => {
              const itemTotal = item.price * item.quantity;
    
              acc.total += itemTotal;
              acc.qty += item.quantity;
    
              return acc;
            },
            {
              total: 0,
              qty: 0,
            }
          );
          setCartTotalQty(qty)
          setCartTotalAmount(total)
        }
    };
    getTotal();
  }, [cartProducts])

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleQtyIncrease,
    handleQtyDecrease,
    handleClearCart,
    cartTotalAmount,
    paymentIntent,
    handleSetPaymentIntent
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("UseCart must be used within a CartContextProvider");
  }

  return context;
};
