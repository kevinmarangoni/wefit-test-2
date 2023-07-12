import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { Item } from "src/types/Item.d";

import garbageIcon from "src/assets/images/garbageIcon.svg";
import minusIcon from "src/assets/images/minusIcon.svg";
import plusIcon from "src/assets/images/plusIcon.svg";

interface Props {
  item: Item;
  handleItemQuantityChange: (id: number, quantity: number) => void;
  handleDeleteItem: (id: number) => void;
  num: number;
}

const CartItem: React.FC<Props> = ({
  item,
  handleItemQuantityChange,
  handleDeleteItem,
  num,
}) => {
  const increment = () => {
    let newValue = item.quantity + 1;
    handleItemQuantityChange(item.id, newValue);
  };

  const decrement = () => {
    if (item.quantity == 1) {
      return;
    }
    let newValue = item.quantity - 1;
    handleItemQuantityChange(item.id, newValue);
  };

  return (
    <Container>
      <Content>
        <Image
          src={item.image}
          alt={`${item.title} cover`}
          width={64}
          height={82}
        />
        <Product>
          <Title>
            <p>{item.title}</p>
            <span>R$ {item.price.toFixed(2).toString().replace(".", ",")}</span>
            <Delete
              onClick={() => {
                handleDeleteItem(item.id);
              }}
            >
              <Image src={garbageIcon} alt={`garbage`} width={19} height={18} />
            </Delete>
          </Title>
          <Quantity>
            <div>
              <button type="button" onClick={decrement}>
                <Image src={minusIcon} alt={`minus`} width={18} height={18} />
              </button>
              <input value={item.quantity} />
              <button type="button" onClick={increment}>
                <Image src={plusIcon} alt={`plus`} width={18} height={18} />
              </button>
            </div>
            <Subtotal>
              <span>SUBTOTAL</span>
              <p>
                R${" "}
                {(item.price * item.quantity)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}
              </p>
            </Subtotal>
          </Quantity>
        </Product>
      </Content>
    </Container>
  );
};

export default CartItem;

const Container = styled.div`
  width: 100%;
  hr {
    opacity: 0.6;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
  width: 100%;
  gap: 16px;
`;

const Product = styled.div`
  height: 82px;
  width: 100%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  p {
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }
  span {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 22px;
  gap: 8px;
`;

const Quantity = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    outline: none;
  }
  input {
    display: flex;
    width: 59px;
    height: 26px;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    outline: none;
    padding-left: 16px;
    margin-left:11px;
    margin-right:11px;
  }
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  height: 38px;
  width
  *{
    line-height: 5px;
  }
  p {
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  span {
    color: #999;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
  }
`;

const Delete = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
`;
