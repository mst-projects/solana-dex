import { OrcaU64 } from "@orca-so/sdk";
import { Market } from "@project-serum/serum";
import { u64 } from "@project-serum/serum/lib/layout";
import { Connection, PublicKey } from "@solana/web3.js";
import axios from "axios";
import Decimal from "decimal.js";

import { getKeypair, swap } from "./";
import * as config from "./config/arb_serum_orca.json";
import { getOrcaPool, getSwapInfo } from "./orca";
import { getPayer, placeOrder } from "./serum";
import { sendMessage } from "./utilities";

// Constants
const BASE_TOKEN = "USDC";
const START_AMOUNT = config.START_AMOUNT;
const USDC_PAIR_TOKEN_LIST = config.USDC_PAIR_TOKEN_LIST; //"wETH" //"wstETH", "AURY"
const SERUM_PROGRAM_ADDRESS = config.SERUM_PROGRAM_ADDRESS;

// const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed"); //どれが一番早いか。
const connection = new Connection(" https://solana-api.projectserum.com ", "confirmed");
const getSerumMarket = async (connection: Connection, tokenA: string, tokenB: string): Promise<Market> => {
  // const marketName = tokenA + "/" + tokenB;
  // const market = await getMarket(marketName);
  const res = await axios.get("https://api.dexlab.space/v1/pairs");
  const res_json = await res.data;
  const pairs = res_json["data"];

  const defaultMarketId = new PublicKey("GcoKtAmTy5QyuijXSmJKBtFdt99e6Buza18Js7j9AJ6e");
  const defaultProgramId = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin");
  let market = await Market.load(connection, defaultMarketId, {}, defaultProgramId);
  for (const pair of pairs) {
    if (pair["coin"] == tokenA && pair["priceCurrency"] == tokenB) {
      console.log(`${tokenA}: ${pair["address"]}`);
      const marketAddress = pair["address"];
      const marketId = new PublicKey(marketAddress);
      const programId = new PublicKey(SERUM_PROGRAM_ADDRESS);
      market = await Market.load(connection, marketId, {}, programId);
    }
  }
  return market;
};

const serumHandler = async (connection: Connection, tokenA: string, tokenB: string) => {
  const market = await getSerumMarket(connection, tokenA, tokenB);

  // Fetching orderbooks
  const bids = await market.loadBids(connection);
  const asks = await market.loadAsks(connection);

  // Fetching best_bid
  const [bestBidPrice, bestBidSize, , ,] = bids.getL2(1)[0];

  // Fetching best_ask
  const [bestAskPrice, bestAskSize, , ,] = asks.getL2(1)[0];

  // Create Tuple
  const orderData = { bestBidPrice, bestBidSize, bestAskPrice, bestAskSize };
  const purchasedAmount = START_AMOUNT / (orderData.bestAskPrice * 1.002);
  const purchaseData = { market, purchasedAmount, bestAskPrice, bestAskSize };
  return purchaseData;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  try {
    for (const token of USDC_PAIR_TOKEN_LIST) {
      const { market, purchasedAmount, bestAskSize, bestAskPrice } = await serumHandler(connection, token, BASE_TOKEN);
      console.log("purchasedAmount: ", purchasedAmount, "bestAskSize: ", bestAskSize);
      const targetPool = getOrcaPool(connection, token, BASE_TOKEN);
      const swapInfo = await getSwapInfo(targetPool, "A", purchasedAmount);

      const outputAmountInNumber = swapInfo.outputAmount.toNumber();
      if (outputAmountInNumber > 10) {
        console.log("##### Over 100 ######");
        const message =
          token +
          "/" +
          BASE_TOKEN +
          ": " +
          outputAmountInNumber.toString() +
          "| bestAskSize: " +
          bestAskSize.toString();
        console.log(message);
        sendMessage(message);
        const owner = await getKeypair();
        const payer = await getPayer("USDC");
        const side = "buy";
        const price = bestAskPrice;
        const size = Math.min(purchasedAmount, bestAskSize);
        const orderType = "ioc";
        console.log("serum done");

        await placeOrder(connection, market, owner, payer, side, price, size, orderType);
        const inputToken = swapInfo.inputToken;
        const inputAmount = new Decimal(Math.min(purchasedAmount, bestAskSize));
        const outputAmount = swapInfo.outputAmount;
        await swap(owner, targetPool, inputToken, inputAmount, outputAmount);
        console.log("orca done");
        sendMessage("swapped");
      }
      await sleep(3000);
    }
  } catch (error) {
    console.warn(error);
  }
};

const loop = async () => {
  while (true) {
    await main();
  }
};

loop()
  .then(() => {
    console.log("Done");
  })
  .catch((e) => {
    console.error(e);
  });
