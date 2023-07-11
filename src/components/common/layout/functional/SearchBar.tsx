import React from 'react'
import { useEffect, useState } from "react";
import closeIcon from "src/assets/images/close.svg";
import searchIcon from "src/assets/images/search.svg";
import Image from "next/image";
import {useRouter} from "next/router";
import styled from "styled-components";
import { Item } from "src/types/Item.d";

import ApiRequests from "src/utils/api";

interface Props {
    data?: Array<Item>
    setData?(response: Array<Item>): void
    setHasFetch?(fetch: boolean): void
    hasFetch?: boolean
}

const SearchBar: React.FC<Props> = ({data, setData, setHasFetch, hasFetch}) => {
    const router = useRouter()
    const [searchField, setSearchField] = useState<string>("");
    const [filteredItemsQuantity, setFilteredItemsQuantity] = useState<number>(0);

    const handleSearch = async () => {
        if (searchField == ""){
            router.push(`/`)
        }
        else{
            router.push(`/search?query=${searchField}`)
        }
      }

      const calculateFilteredArraySize = () => {
        if (data) {
          const size = data.length;
          setFilteredItemsQuantity(size);
        } else {
          setFilteredItemsQuantity(0);
        }
      };

      
  const getFilteredList = async () => {
    const response = await ApiRequests.getItemByTitle(searchField);
    setData(response);
    if (data) {
      setHasFetch(true);
    }
  };

  return (
    <Container>
    <Content>
      <input
        type={"text"}
        placeholder="Buscar filme pelo nome"
        onChange={(e) => {
          setSearchField(e.target.value);
        }}
      ></input>
      <button
        onClick={handleSearch}
        >
        <Image
          alt={"search icon"}
          src={searchIcon} //searchField.length >= 1 ? closeIcon : searchIcon
          width={24}
          height={24}
        />
      </button>
    </Content>
  </Container>
  )
}

export default SearchBar

const Container = styled.div`
`;

const Content = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.secondary.main};
  overflow: hidden;
  height: 56px;
  display: flex;
  padding: 16px;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: #2F2E41;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;