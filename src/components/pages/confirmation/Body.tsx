import React from 'react'
import styled from "styled-components";
import Image from 'next/image'
import Button from 'src/components/common/layout/buttons/Button'
import sucessLottie from 'src/assets/images/sucessLottie.svg'
import {useRouter} from "next/router";

const Body:React.FC = () => {
  const router = useRouter()
  return (
    <Container>
      <Content>
        <h1>Compra Realizada com sucesso!</h1>
        <Image src={sucessLottie} alt={`success image`} width={295} height={307} />
        <Button onClick={()=>{router.push(`/`)}}><p>VOLTAR</p></Button>
      </Content>
    </Container>

  );
};

export default Body

const Container = styled.div`
  padding: 10px;
  background-color: ${(props) => props.theme.color.secondary.main};
  border-radius: 4px;
  margin: 10px;
  *{
    color: ${(props) => props.theme.color.font.secondary};
  }
`;

const Content = styled.div`
  height: fit-content;
  min-height: 630px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  h1{
    color: #2F2E41;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
  }
`;