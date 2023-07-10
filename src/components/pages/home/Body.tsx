import {useEffect, useState} from "react";
import ItemCard from "src/components/common/layout/cards/Item";
import styled from "styled-components";

import Spinner from "src/components/common/layout/Spinner";

import ApiRequests from "src/utils/api"

interface Items {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

const Body:React.FC = () => {
  const [data, setData] = useState<Array<Items>>([])
  const [hasFetch, setHasFetch] = useState<Boolean>(false)


  const getInitialList = async () => {
    const response = await ApiRequests.getAllItems()
    setData(response)
    if(data){
      setHasFetch(true)
    }
  }

  const getFilteredList = async () => {
    const response = await ApiRequests.getItemByTitle()
    setData(response)
    if(data){
      setHasFetch(true)
    }
  }

  useEffect(()=>{
    console.log(hasFetch, data)
  },[hasFetch, data])
  
  useEffect(()=>{
    if(!hasFetch){
      getInitialList()
    }
  },[hasFetch])

  return (
    <>
      <Container>
          <Content>
           <SearchContainer>
              <SearchBar>
                <input type={"text"} placeholder="Buscar filme pelo nome" ></input>
                <button></button>
              </SearchBar>
           </SearchContainer>
            <ItemList>
          {(hasFetch && data.length > 0) ?
          <>
            {data.length > 0 &&

              data.map((item, index)=>{
                return(
                  <ItemCard item={item} key={item.id} />
                )
              })
              
            }
          </>
          :
          <>
            <Spinner />
          </>
          }
          </ItemList>
        </Content>
      </Container>
    </>
  );
};

export default Body;

const Container = styled.div`
  padding: 10px;
`;

const Content = styled.div`

`
const SearchContainer = styled.div`
padding: 3px;
`

const SearchBar = styled.div`
  border-radius: 8px;
  background-color: ${(props)=> props.theme.color.secondary.main};
  height: 56px;
  display:flex
  input{

  }
  button{

  }
`

const ItemList = styled.div`
height: 630px;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap:11px;
`