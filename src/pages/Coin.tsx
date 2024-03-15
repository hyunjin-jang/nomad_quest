import { Link, Route, Switch, useLocation, useParams, useRouteMatch } from "react-router-dom"
import { useEffect, useState } from "react";
import { styled } from "@mui/material"
import { theme } from "../theme"
import axios from "axios";
import Price from "./Price";
import Chart from "./Chart";
import { IInfoData, IPriceData } from "../styled";

const Container = styled('div')({
  padding: '0px 20px'
});

const Header = styled('header')({
  height: '10vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Title = styled('h1')({
  fontSize: '48px',
  color: theme.accentColor,
});

const Loader = styled('div')({
  textAlign: 'center',
  color: 'white'
})

const Overview = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.bgColor,
  padding: '10px 20px',
  borderRadius: '10px',
  color: theme.textColor,
})

const OverviewItem = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '& > span:first-child': {
    fontSize: '10px',
    fontWeight: 400,
    textTransform: 'uppercase',
    marginBottom: '5px'
  }
})

const Description = styled('p')({
  margin: '20px 0px',
  color: 'white'
})

const Tabs = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'Repeat(2, 1fr)',
  margin: '25px 0px',
  gap: '10px'
})

const Tab = styled('span') <{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  background-color: ${theme.bgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${({ isActive }) => (isActive ? theme.accentColor : theme.textColor)};
  & > a {
    display: block;
  }
`;

interface ParamsProps {
  coinId: string,
}

interface RouteState {
  name: string,
}

function Coin() {
  const [loading, setLoading] = useState(true);
  const { coinId } = useParams<ParamsProps>()
  const { state } = useLocation<RouteState>();
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');

  useEffect(() => {
    (
      async () => {
        const infoData = (await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`)).data;
        const priceData = (await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).data;
        setInfo(infoData);
        setPriceInfo(priceData);
        setLoading(false)
      }
    )()
  }, [])

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? 'Loading...' : info?.name}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? 'Yes' : 'No'}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}
export default Coin;