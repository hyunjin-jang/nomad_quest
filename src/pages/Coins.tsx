import { styled } from "@mui/material"
import { theme } from "../theme";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoins } from "../api";
import { ICoin } from "../styled";


const Container = styled('div')({
  padding: '0px 20px'
});

const Header = styled('header')({
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const CoinList = styled('ul')({
  listStyle: 'none',
});

const Coin = styled('li')({
  backgroundColor: theme.bgColor,
  color: theme.textColor,
  borderRadius: '15px',
  marginBottom: '10px',
  '& > a': {
    transition: 'color 0.2s ease-in',
    padding: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  '&:hover': {
    color: theme.accentColor
  }
});

const Title = styled('h1')({
  fontSize: '48px',
  color: 'white',
});

const Loader = styled('div')({
  textAlign: 'center',
  color: 'white'
});

const Img = styled('img')({
  width: '35px',
  height: '35px',
  marginRight: '10px',
});



function Coins() {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = (await getCoins()).data.slice(0, 100)
      
      setCoins(response);
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins.map(coin => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {
                  name:coin.name,
                }
              }}>
                <Img src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  )
}
export default Coins