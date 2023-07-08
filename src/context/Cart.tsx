import React, { useState, useEffect, createContext } from "react";
import ApiRequests, {Requests} from "src/utils/api"

export const CartContext = createContext({});

interface CartProps {
  children?: React.ReactNode
}

interface Items {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

const CartProvider: React.FC<CartProps> = ({ children }) => {
  const [cart, setCart] = useState<Array<any>>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [subTotals, setSubTotals] = useState<Array<Object>>([]);
  const [total, setTotal] = useState<number>(0);
  
  useEffect(() => {
    const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (shoppingCart) {
      setCart(shoppingCart.cart);
      setTotalItems(shoppingCart.totalItems);
      setSubTotals(shoppingCart.subTotals);
      setTotal(shoppingCart.total);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify({ cart, totalItems, subTotals, total }));
  }, [cart, totalItems, subTotals, total]);

  async function handleItemQuantityChange(id: number, quantity: number) {
    let exists:boolean = false;
    let newItem = cart.map((item) => {
      if (item.id === id) {
        exists = true;
        return { id: item.id, quantity: quantity };
      }
      return item;
    });
    if (!exists && quantity > 0) {
      newItem = [...newItem, { id: id, quantity: quantity }];
    }
    setCart(newItem);
  }

  async function sumAllItems() {
    const value = cart.reduce((sum, item:any) => sum + item.quantity, 0);
    setTotalItems(value);
  }

  async function calculateCartTotal() {
    const uniqueIds = [...new Set(cart.map((item) => item.id))];
    let subtotals = [];
    let total = 0;
    for (const id of uniqueIds) {
      const item = await ApiRequests.getItemsById(id);
      const itemTotal =
        item.price * cart.find((item) => item.id === id).quantity;
      subtotals.push({ id: item.id, subtotal: itemTotal });
      total += itemTotal;
    }
    return { subtotals, total };
  }

  async function updateCart(id: number, quantity: number) {
    let newItem:any = [...cart];
    const index = newItem.findIndex((item) => item.id === id);
    if (index === -1) {
      newItem.push({ id, quantity });
    } else {
      if (newItem[index].quantity + quantity === 0) {
        newItem = newItem.filter((item) => item.id !== id);
      } else {
        newItem[index].quantity += quantity;
      }
    }
    setCart(newItem);
    const { subtotals, total } = await calculateCartTotal();
    setSubTotals(subtotals);
    setTotal(total);
  }

  async function handleDeleteItem(id: number) {
    setCart(cart.filter((item) => item.id !== id));
  }

  async function clearLocalStorage() {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("subTotals");
    localStorage.removeItem("total");
  }

  const cartState = {
    cart,
    setCart,
    totalItems,
    setTotalItems,
    subTotals,
    setSubTotals,
    total,
    setTotal,
    sumAllItems,
    updateCart,
    calculateCartTotal,
    handleItemQuantityChange,
    handleDeleteItem,
    clearLocalStorage,
  };

  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
};

export default CartProvider;
