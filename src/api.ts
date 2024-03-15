import axios from "axios";

export function getCoins() {
  return axios('https://api.coinpaprika.com/v1/coins')
}

export function getCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7; // 60s 60m 24h 7d
  return axios(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
}