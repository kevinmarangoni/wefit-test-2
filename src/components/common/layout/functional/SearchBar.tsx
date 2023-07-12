import React from 'react'
import { useState } from "react";
import searchIcon from "src/assets/images/search.svg";
import Image from "next/image";
import {useRouter} from "next/router";
import styled from "styled-components";
import { Item } from "src/types/Item.d";

interface Props {
    data?: Array<Item>
    setData?(response: Array<Item>): void
    setHasFetch?(fetch: boolean): void
    hasFetch?: boolean
}

const SearchBar: React.FC<Props> = ({data, setData, setHasFetch, hasFetch}) => {
    const router = useRouter()
    const [searchField, setSearchField] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);

    const handleSearch = async () => {
        if (searchField == ""){
            router.push(`/`)
        }
        else{
            router.push(`/search?query=${searchField}`)
        }
      }

  const executeEnterKeySearch = async(e:any)=>{
    if(e.key === "Enter" && focused){
      await handleSearch()
    }
  }

  return (
    <Container>
    <Content>
      <input
        type={"text"}
        placeholder="Buscar filme pelo nome"
        onChange={(e) => {
          setSearchField(e.target.value);
        }}
        onKeyDown={(e)=>{executeEnterKeySearch(e)}}
        onFocus={()=>{setFocused(true)}}
        onBlur={()=>{setFocused(false)}}
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