import React from "react";
import styled from "styled-components";
import Image from "next/image"
import CartIcon from "src/assets/images/cartIcon.svg"



export const CartButton: React.FC = () => {


    return (
      <Element>
        <Left>
          <Up>

          </Up>
          <Down>

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
  *{
    border: 1px dashed red;
  }
  background-color: transparent;
  width: 140px;
  height: 40px;
  border-radius: 4px;
  outline: none;
  border: 1px solid red;
  transition: all ease-in-out 0.2s;
  color: ${(props) => props.theme.color.font.primary};
  font-weight: 700;

  display:flex;
  justify-content: center;
  align-items: center;
  gap:12px;

  span{
    font-size: ${(props) => props.theme.color.font.size.s};
    display:flex;
    gap: 5px;
    justify-content: center;
    align-items: center;
    span{
        font-weight: 400;
    }
  }

  :hover {
    background-color: ${(props) => props.theme.color.highlight.lighter};
  }
  :active {
    background-color: ${(props) => props.theme.color.highlight.darker};
  }
`;

const Left = styled.div`

`

const Up = styled.div`

`

const Down = styled.div`

`

const Right = styled.div`

`

//${(props) => props.theme.color.highlight.darker}