import { CartContext, CartContextTypes } from "src/context/Cart";
import styled from "styled-components";
import { useContext } from "react";
import { Item } from "src/types/Item.d";
import Image from "next/image";
import Button from "src/components/common/layout/buttons/Button";
import reloadLottie from "src/assets/images/reloadLottie.svg";
import {useRouter} from "next/router";

import CartItem from "src/components/common/layout/cards/CartItem";

const Body: React.FC = () => {
  const router = useRouter()
  const {
    cart,
    totalItems,
    subTotals,
    total,
    handleItemQuantityChange,
    handleDeleteItem,
    clearLocalStorage,
    clearContext,
  } = useContext<CartContextTypes | any>(CartContext);
  
  
  const handleFinish = ()=>{
    clearContext()
    clearLocalStorage()
    router.push(`/confirmation`)
  }

  return (
    <Container>
      <Content style={{minHeight: `${totalItems > 0 && `fit-content`}`}}>
        {totalItems > 0 ? (
          <>
            <CartContainer>
              <Head>
                <p style={{minWidth: `350px`}}>PRODUTOS</p>
                <p style={{minWidth: `125px`}}>QTD</p>
                <p style={{minWidth: `142px`}}>SUBTOTAL</p>
                <p></p>
              </Head>
              {cart.length > 0 &&
                cart.map((item: Item, index: number) => {
                  return (
                    <CartItem
                      key={item.id}
                      num={index}
                      item={item}
                      handleDeleteItem={handleDeleteItem}
                      handleItemQuantityChange={handleItemQuantityChange}
                    />
                  );
                })}
                <CartEnd>
                  <div>
                    <p>TOTAL</p>
                    <span>{total.toFixed(2).toString().replace(".", ",")}</span>
                  </div>
                  <div>
                    <Button onClick={handleFinish}><p>FINALIZAR PEDIDO</p></Button>
                  </div>
                </CartEnd>
            </CartContainer>
          </>
        ) : (
          <ErrorContainer>
            <h1>{"Parece que não há nada por aqui :( "}</h1>
            <div>
              <Image
                src={reloadLottie}
                alt={`reload image`}
                width={295}
                height={307}
              />
              <hr />
            </div>
            <Button onClick={()=>{router.push(`/`)}}>
              <p>VOLTAR</p>
            </Button>
          </ErrorContainer>
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
  * {
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
  width: 100%;
  padding: 20px;
`;

const Head = styled.div`
    display:flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    p{
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      color: #999;
    }
`

const CartEnd = styled.div`
  width: 100%;
  display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 21px;
  div{
    display:flex;
    align-items: flex-end;
    gap: 16px;
  }

  p{
    color: #999;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
  }

  span{
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  }

  button{
    width: 245px;
    *{
      color: white;
    }
  }
`

const ErrorContainer = styled.div`
  height: fit-content;
  min-height: 630px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  h1 {
    color: #2f2e41;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    hr {
      width: 447px;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
  }
`;
