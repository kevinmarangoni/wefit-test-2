import { useEffect, useState } from "react";
import ItemCard from "src/components/common/layout/cards/Item";
import styled from "styled-components";
import SearchBar from "src/components/common/layout/functional/SearchBar"
import ApiRequests from "src/utils/api";
import { Item } from "src/types/Item.d";
import {useRouter} from "next/router";

import Spinner from "src/components/common/layout/Spinner";

const Body: React.FC = () => {
  const router = useRouter()
  const {query} = router.query
  const [data, setData] = useState<Array<Item>>([]);
  const [hasFetch, setHasFetch] = useState<Boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getInitialList = async () => {
    if (query == undefined){
      return
    }
    setSearchQuery(decodeURIComponent(query as string))
    const response = await ApiRequests.getItemByTitle(decodeURIComponent(query as string));
    setData(response);
    if (data) {
      setHasFetch(true);
    }
  };

  useEffect(() => {
  if (!hasFetch) {
      getInitialList();
    }
  }, [hasFetch, query, searchQuery]);

  return (
    <>
      <Container>
        <Content>
          <SearchContainer>
            <SearchBar data={data} setData={setData}/>
          </SearchContainer>
            {data.length > 0 &&  
              <ResultContainer>
                <p>Exibindo resultados para "{searchQuery}"</p>
                <div>{data.length} {data.length > 1 ? "resultados encontrados." : "resultado encontrado."}</div>
              </ResultContainer>
            }
          <ItemList dataFound={data.length > 0}>
            {hasFetch && data.length > 0 ? (
              <>
                {data.length > 0 &&
                  data.map((item, index) => {
                    return <ItemCard item={item} key={item.id} />;
                  })}
              </>
            ) : (
              <>
                <Spinner />
              </>
            )}
          </ItemList>
        </Content>
      </Container>
    </>
  );
};

export default Body;

const Container = styled.div`
  padding: 10px;
  padding-top: 0;
`;

const Content = styled.div`
`;

const SearchContainer = styled.div`
margin-top: 24px;
margin-bottom: 24px;
`

const ItemList = styled.div<any>`
  height: 630px;
  display: flex;
  justify-content: ${(props:any) => (props.dataFound ? 'flex-start' : 'center')};
  align-items: ${(props:any) => (props.dataFound ? 'flex-start' : 'center')};
  flex-wrap: wrap;
  gap: 11px;
`;

const ResultContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  p{
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }

  div{
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
`
