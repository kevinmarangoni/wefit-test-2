import { useEffect, useState } from "react";
import ItemCard from "src/components/common/layout/cards/Item";
import styled from "styled-components";
import SearchBar from "src/components/common/layout/functional/SearchBar"
import ApiRequests from "src/utils/api";
import { Item } from "src/types/Item.d";

import Spinner from "src/components/common/layout/Spinner";


const Body: React.FC = () => {
  const [data, setData] = useState<Array<Item>>([]);
  const [hasFetch, setHasFetch] = useState<boolean>(false);

  const getInitialList = async () => {
    const response = await ApiRequests.getAllItems();
    setData(response);
    if (data) {
      setHasFetch(true);
    }
  };

  useEffect(() => {
    if (!hasFetch) {
      getInitialList();
    }
  }, [hasFetch]);

  return (
    <>
      <Container>
        <Content>
          <SearchContainer>
            <SearchBar data={data} setData={setData} hasFetch={hasFetch} setHasFetch={setHasFetch}/>
          </SearchContainer>
          <ItemList>
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

const Content = styled.div``;

const SearchContainer = styled.div`
margin-top: 24px;
margin-bottom: 24px;
`

const ItemList = styled.div`
  height: 630px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
`;
