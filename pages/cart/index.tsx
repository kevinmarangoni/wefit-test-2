import React from 'react'
import Header from 'src/components/common/header/Header'
import Body from 'src/components/pages/cart/body'
import Layout from 'src/components/common/layout/Layout'

const Cart:React.FC = () => {

  return (
    <Layout>
      <Header />
      <Body />
    </Layout>
  )
}

export default Cart