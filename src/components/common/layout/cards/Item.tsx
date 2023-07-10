import React,{useContext, useEffect, useState} from "react";
import styled,{ThemeContext} from "styled-components";
import Image from "next/image";
import {CartContext, CartContextTypes, Item as ItemInterface} from "src/context/Cart"

import {Theme} from "src/theme/theme"

import AddToCart from "src/components/common/layout/buttons/AddToCart";

export const Item = ({ item }) => {
  const theme = useContext(ThemeContext)
  const context = useContext<any>(CartContext)
  const [quantity, setQuantity] = useState<number>(0)

  const {cart, updateCart} = context

  function getItemQuantityById(id: number): number {
    const item = cart.find((cartItem: ItemInterface) => cartItem.id === id);
    return item ? item.quantity : 0;
  }
  console.log(theme)

  useEffect(()=>{
    let value = getItemQuantityById(item.id)
    setQuantity(value)
  },[cart])

  return (
    <Container>
      <Content>
        <MovieDetailes>
          <Image
            src={item.image}
            alt={`${item.title} movie cover`}
            height={188}
            width={147}
            priority
          />
          <p>{item.title}</p>
        </MovieDetailes>
        <PriceDetails>
          <p>R$ {item.price.toFixed(2).toString().replace(".", ",")}</p>
          <AddToCart onClick={()=>updateCart(item, 1)} quantitytInCart={quantity} backgroundColor={quantity >= 1 ? theme.color.highlight.selected : theme.color.highlight.main}>{quantity >= 1 ? "ITEM ADICIONADO" : "ADICIONAR AO CARRINHO"}</AddToCart> 
        </PriceDetails>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${(props) =>
    props.backgroundColor ?? props.theme.color.secondary.main};
  width: ${(props) => props.width ?? "230px"};
  height: ${(props) => props.height ?? "300px"};
  border-radius: 4px;
  padding: 10px;
  p {
    color: ${(props) => props.theme.color.font.secondary};
    font-weight: 700;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MovieDetailes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7;
  p {
    text-align: center;
    font-weight: 700;
  }
`;

const PriceDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default Item;
