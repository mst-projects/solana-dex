import { Market } from "@project-serum/serum";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { readFile } from "mz/fs.js";

import { getAssociatedTokenAddress } from "./associated-token";
import { getKeypair } from "./utilities";

export const getSerumIdsFromMarketName = async (
  marketName: string,
): Promise<{ marketId: PublicKey; programId: PublicKey }> => {
  const markets_json = await readFile("../node_modules/@project-serum/serum/lib/markets.json", {
    encoding: "utf8",
  });
  const markets = JSON.parse(markets_json);
  let marketAddress = "default";
  let programAddress = "default";
  for await (const market of markets) {
    if (market["name"] == marketName) {
      marketAddress = market["address"];
      programAddress = market["programId"];
    }
  }
  const marketId = new PublicKey(marketAddress);

  // Serum V3 Program Address
  const programId = new PublicKey(programAddress);
  return { marketId, programId };
};

export const getMarket = async (marketName: string): Promise<Market> => {
  const serumIds = await getSerumIdsFromMarketName(marketName);
  const marketId = serumIds.marketId;
  const programId = serumIds.programId;
  const connection = new Connection(" https://solana-api.projectserum.com ");
  // const connection = new Connection('https://api.mainnet-beta.solana.com');
  const market = await Market.load(connection, marketId, {}, programId);

  // Fetching orderbooks
  // const bids = await market.loadBids(connection);
  // const asks = await market.loadAsks(connection);

  // L2 orderbook data
  // for (const [price, size] of bids.getL2(20)) {
  // console.log(price, size);
  // }
  // for (const [price, size] of asks.getL2(20)) {
  //   console.log(price, size);
  // }
  // //     // Full orderbook data
  //     for (const order of asks) {
  //     console.log(
  //         order.orderId,
  //         order.price,
  //         order.size,
  //         order.side, // 'buy' or 'sell'
  //     );
  //     }
  return market;
};

export const getPayer = async (tokenName: string): Promise<PublicKey> => {
  const tokenMintsJson = await readFile("../node_modules/@project-serum/serum/lib/token-mints.json", {
    encoding: "utf8",
  });
  const tokenMints = JSON.parse(tokenMintsJson);
  let mintAddress = "default";
  for await (const tokenMint of tokenMints) {
    if (tokenMint["name"] == tokenName) {
      mintAddress = tokenMint["address"];
    }
  }
  console.log("mint address of USDC", mintAddress);
  const mintId = new PublicKey(mintAddress);
  const owner = await getKeypair();
  const ownerPubkey = owner.publicKey;
  const associatedTokenAddress = await getAssociatedTokenAddress(ownerPubkey, mintId);
  const payerId = new PublicKey(associatedTokenAddress);
  return payerId;
};

export const placeOrder = async (
  connection: Connection,
  market: Market,
  owner: Keypair,
  payer: PublicKey,
  side: "buy" | "sell",
  price: number,
  size: number,
  orderType?: "limit" | "ioc" | "postOnly",
) => {
  await market.placeOrder(connection, {
    owner,
    payer,
    side, // 'buy' or 'sell'
    price,
    size,
    orderType, // 'limit', 'ioc', 'postOnly'
  });
};

export const cancelAllOrders = async (connection: Connection, market: Market, owner: Keypair) => {
  // Retrieving open orders by owner
  const myOrders = await market.loadOrdersForOwner(connection, owner.publicKey);
  for (const order of myOrders) {
    await market.cancelOrder(connection, owner, order);
  }
};
