import { BrowserRouter, Route, Switch, Link } from "react-router-dom"
import Coin from "./pages/Coin";
import Coins from "./pages/Coins";
import { Button, styled } from "@mui/material";

const HomeBtn = styled('button')({
  backgroundColor: 'white',
  border: 'none',
  padding: '7px 14px',
  borderRadius: '10px',
  float: 'right',
  margin: '20px',
  marginLeft: '0px'
})

const Router = () => {
  return (
    <BrowserRouter>
      <HomeBtn>
        <span onClick={()=>{
          
        }}>Dark</span>
      </HomeBtn>
      <HomeBtn>
        <Link to={`/`}>Home</Link>
      </HomeBtn>
      <div style={{clear: 'both'}}/>
      <Switch>
        <Route path="/:coinId" component={Coin} />
        <Route path="/" component={Coins} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;