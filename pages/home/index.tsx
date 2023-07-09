import React from 'react'
import Header from 'src/components/common/header/Header'
import Body from 'src/components/pages/home/Body'
import Layout from 'src/components/common/layout/Layout'

const Home:React.FC = () => {

  return (
    <Layout>
      <Header />
      <Body />
    </Layout>
  )
}

export default Home