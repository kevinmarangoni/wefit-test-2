import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Item } from "src/types/Item.d";

import garbageIcon from "src/assets/images/garbageIcon.svg"
import minusIcon from "src/assets/images/minusIcon.svg"
import plusIcon from "src/assets/images/plusIcon.svg"

interface Props{
  item: Item
  handleItemQuantityChange:(id: number, quantity: number)=>void;
  handleDeleteItem:(id: number)=>void;
  num: number;
}

const CartItem:React.FC<Props> = ({item, handleItemQuantityChange, handleDeleteItem, num}) => {

  const increment = ()=>{
    let newValue = item.quantity + 1
    handleItemQuantityChange(item.id, newValue)
  }

  const decrement = ()=>{
    if(item.quantity == 1){
      return
    }
    let newValue = item.quantity - 1
    handleItemQuantityChange(item.id, newValue)
  }

  return (
    <Container>
      <Content>
        <Product>
          <Image src={item.image} alt={`${item.title} cover`} width={89} height={114} />
          <Title>
            <p>{item.title}</p>
            <span>R$ {item.price.toFixed(2).toString().replace(".", ",")}</span>
          </Title>
        </Product>
        <Quantity>
          <button type="button" onClick={decrement}>
            <Image src={minusIcon} alt={`minus`} width={18} height={18} />
          </button>
          <input value={item.quantity} />
          <button type="button" onClick={increment}>
            <Image src={plusIcon} alt={`plus`} width={18} height={18} />
          </button>
        </Quantity>
        <Subtotal>
          <p>R$ {(item.price*item.quantity).toFixed(2).toString().replace(".", ",")}</p>
        </Subtotal>
          <Delete onClick={()=>{handleDeleteItem(item.id)}}>
            <Image src={garbageIcon} alt={`garbage`} width={19} height={18} />
          </Delete>
      </Content>
    </Container>
  )
}

export default CartItem

const Container = styled.div`
  width: 100%;
  hr{
    opacity: 0.6;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 21px;
  margin-bottom: 21px;
`

const Product = styled.div`
  display: flex;
  min-width: 350px;
  height: 114px;
  gap: 52px;
`

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  p{
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  span{
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
`

const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 114px;
  width:122px;
  gap: 11px;
  
  button{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
  }
  input{
    display: flex;
    width: 62px;
    border-radius: 4px;
    height: 26px;
    border: 1px solid #D9D9D9;
    outline: none;
    padding-left: 16px;
  }
`

const Subtotal = styled.div`
  height: 114px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width:122px;
  p{
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
`

const Delete = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 114px;
  background-color: transparent;
  border: none;
  outline: none;
`