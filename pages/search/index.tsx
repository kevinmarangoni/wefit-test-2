import React from 'react'
import Header from 'src/components/common/header/Header'
import Body from 'src/components/pages/search/Body'
import Layout from 'src/components/common/layout/Layout'

const Search:React.FC = () => {

  return (
    <Layout>
      <Header />
      <Body />
    </Layout>
  )
}

export default Search