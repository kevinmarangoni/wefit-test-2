import React from 'react'
import styled from 'styled-components'

import CartButton from 'src/components/common/layout/buttons/CartButton'

interface HeaderProps {
  children?: React.ReactNode;
}

const Header:React.FC<HeaderProps> = () => {
  return (
    <Container>
      <Content>
        <Logo>
          <h1>WeMovies</h1>
        </Logo>
        <CartButton/>
      </Content>
    </Container>
  )
}

export default Header

const Container = styled.div`
  height: 63px;
  padding: 12px;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
`

const Logo = styled.div`
  h1{
    font-size: ${props=> props.theme.color.font.size.xl};
  }
`

const Cart = styled.div``