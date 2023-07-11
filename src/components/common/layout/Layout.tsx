import React from 'react'
import styled from 'styled-components'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <Container>
      <Content>
        {children}
      </Content>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  width: 960px;
  display: flex;
  flex-direction: column;
`