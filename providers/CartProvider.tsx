'use client'

import { CartContextProvider } from "@/hooks/useCart";
import React, { FC } from "react";

interface ICartProviderProps {
  children: React.ReactNode;
}

const CartProvider: FC<ICartProviderProps> = ({ children }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
