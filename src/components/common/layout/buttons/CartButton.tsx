import React,{useContext} from "react";
import styled from "styled-components";
import Image from "next/image"
import CartIcon from "src/assets/images/cartIcon.svg"
import {useRouter} from "next/router";
import {useWindowSize} from 'usehooks-ts'

import {CartContext, CartContextTypes} from "src/context/Cart"



export const CartButton: React.FC = () => {
  const {width} = useWindowSize()
  const {totalItems} = useContext<CartContextTypes | any>(CartContext)
  const router = useRouter()

  const handleRedirect = () =>{
    router.push(`/cart`)
  }

    return (
      <Element onClick={handleRedirect}>
        <Left>
          {width > 768 &&
            <Up>Meu Carrinho</Up>
          }
          <Down>
            {totalItems} {totalItems == 1 ? `item` : `items`}
          </Down>
        </Left>
        <Right>
          <Image src={CartIcon} alt={`icon`} height={32} width={32} />
        </Right>
      </Element>
    );
  };

  export default CartButton;

  const Element = styled.button`
  background-color: transparent;
  width: fit-content;
  height: 50px;
  border-radius: 4px;
  outline: none;
  border: none;
  padding: 5px;
  transition: all ease-in-out 0.2s;
  color: ${(props) => props.theme.color.font.primary};
  font-weight: 700;
  display:flex;
  justify-content: center;
  align-items: center;
  gap:8px;

  :hover {
    background-color: ${(props) => props.theme.color.highlight.darker};
  }
  :active {
    background-color: ${(props) => props.theme.color.highlight.selected};
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  *{
  text-align: right;
}
`

const Up = styled.div`
font-size: 14px;
font-style: normal;
font-weight: 600;
width: 95px;
`

const Down = styled.div`
font-size: 12px;
font-style: normal;
font-weight: 600;
color: #999;
`

const Right = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`

//${(props) => props.theme.color.highlight.darker}