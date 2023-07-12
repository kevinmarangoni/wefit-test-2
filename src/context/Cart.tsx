import React, { useState, useEffect, createContext } from "react";
import ApiRequests, {Requests} from "src/utils/api"

export const CartContext: React.Context<Object> = createContext<CartContextTypes>({} as CartContextTypes)

interface CartProps {
  children?: React.ReactNode
}
export interface CartContextTypes{
  cart: Array<any>;
  setCart: React.Dispatch<React.SetStateAction<Array<any>>>;
  totalItems: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  subTotals: Array<Object>;
  setSubTotals: React.Dispatch<React.SetStateAction<Array<Object>>>;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  sumAllItems: () => void;
  updateCart: (id: number, quantity: number) => void;
  calculateCartTotal: () => Promise<{ subtotals: Array<any>, total: number }>; // Ajuste na assinatura
  handleItemQuantityChange: (id: number, quantity: number) => void;
  handleDeleteItem: (id: number) => void;
  clearLocalStorage: () => void;
  clearContext(): () => void;
}

export interface Item {
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
  const [allow, setAllow] = useState<boolean>(false);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  
    if (existingCart) {
      setCart(existingCart.cart);
      setTotalItems(existingCart.totalItems);
      setSubTotals(existingCart.subTotals);
      setTotal(existingCart.total);
    } else {
      const initialData = {
        cart: [],
        totalItems: 0,
        subTotals: [],
        total: 0
      };
      localStorage.setItem("shoppingCart", JSON.stringify(initialData));
      setCart(initialData.cart);
      setTotalItems(initialData.totalItems);
      setSubTotals(initialData.subTotals);
      setTotal(initialData.total);
    }
    setAllow(true)
  }, []);
  
  useEffect(() => {
    if(allow){
      localStorage.setItem("shoppingCart", JSON.stringify({ cart, totalItems, subTotals, total }));
    }
  }, [cart, totalItems, subTotals, total]);

  function handleItemQuantityChange(id: number, quantity: number) {
    let exists: boolean = false;
    let newItem = cart.map((item) => {
      if (item.id === id) {
        exists = true;
        return { ...item, quantity, price: item.price };
      }
      return item;
    });
    if (!exists && quantity > 0) {
      const item = cart.find((item) => item.id === id);
      if (item) {
        newItem = [...newItem, { ...item, quantity }];
      }
    }
    setCart(newItem);
  }

  function sumAllItems() {
    const value = cart.reduce((sum, item:any) => sum + item.quantity, 0);
    setTotalItems(value);
  }

  function calculateCartTotal(cart:Array<Item>) {
    let subtotals = [];
    let total = 0;
  
    for (const item of cart) {
      const itemTotal = item.price * item.quantity;
      subtotals.push({ id: item.id, subtotal: itemTotal });
      total += itemTotal;
    }
  
    return { subtotals, total };
  }

  function updateCart(item: Item, quantity: number) {
    const id = item.id;
    const existingItem = cart.find((cartItem: Item) => cartItem.id === id);
  
    if (existingItem) {
      const updatedCart = cart.map((cartItem: Item) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + quantity };
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      const newItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  }

  useEffect(()=>{
    const { subtotals, total } = calculateCartTotal(cart)
    setSubTotals(subtotals)
    setTotal(total)
    sumAllItems()
  },[cart])

  function handleDeleteItem(id: number) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function clearLocalStorage() {
    localStorage.removeItem("cart");
    localStorage.removeItem("totalItems");
    localStorage.removeItem("subTotals");
    localStorage.removeItem("total");
    localStorage.removeItem("shoppingCart")
  }

  function clearContext(){
    setCart([])
    setTotalItems(0)
    setSubTotals([])
    setTotal(0)
    setAllow(false)
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
    clearContext
  };

  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
};

export default CartProvider;
