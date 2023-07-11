import { CartContext, CartContextTypes } from "src/context/Cart";
import styled from "styled-components";
import { useContext } from "react";
import { Item } from "src/types/Item.d";

import CartItem from "src/components/common/layout/cards/CartItem";

const Body:React.FC = () => {
  const {
    cart,
    totalItems,
    subTotals,
    total,
    handleItemQuantityChange,
    handleDeleteItem,
    clearLocalStorage,
  } = useContext<CartContextTypes | any>(CartContext)

  return (
    <Container>
      <Content>
        {totalItems > 0 ? (
            <></>
        ) : (
          <>Nao ha nada aqui...</>
        )}
      </Content>
    </Container>

  );
};

export default Body;

const Container = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.color.secondary.main};
  border-radius: 4px;
  margin: 10px;
  *{
    color: ${(props) => props.theme.color.font.secondary};
  }
`;

const Content = styled.div`
  height: fit-content;
  min-height: 630px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  h3 {

    margin-bottom: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #ddd;
    }
  }
  h4 {
    margin-top: 20px;
  }
`;