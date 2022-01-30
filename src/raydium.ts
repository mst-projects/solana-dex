// exchange sol to usdc
import {
  BigNumberish, Liquidity, LiquidityPoolKeys, Spl, SPL_ACCOUNT_LAYOUT, SplAccount, SwapInstructionParams, SwapSide,
  SwapTransactionParams, TokenAccount,
} from "@raydium-io/raydium-sdk";
import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Connection, Keypair, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, Transaction,
} from "@solana/web3.js";
import { BN } from "bn.js";
import { readFile } from "mz/fs.js";
import os from "os";

import { getKeypair } from "./utilities";

const main = async () => {
  const connection = new Connection("https://solana-api.projectserum.com", "confirmed");

  const version = 4;
  const ownerKeypair = await getKeypair();
  const owner = ownerKeypair.publicKey;
  console.log(owner.toString());
  // const marketId = new PublicKey("9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT"); // Serum market address of SOL/USDC
  // const marketId = new PublicKey("7dLVkUfBVfCGkFhSXDCq1ukM9usathSgS716t643iFGF"); // Serum market ETH/USDC
  // const marketId = new PublicKey("teE55QrL4a4QSfydR9dnHF97jgCfptpuigbb53Lo95g"); // RAY/USDT
  // const marketId = new PublicKey("C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4"); // BTC/USDC
  // const marketId = new PublicKey("E14BKBhDWD4EuTkWj1ooZezesGxMW8LPCps4W5PuzZJo"); //FIDA/USDC
  const marketId = new PublicKey("77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS"); //USDT/USDC
  const programId = Liquidity.getProgramId(version); // Raydium V4 Program Id
  const id = await Liquidity.getAssociatedId({ programId, marketId }); // Id is Raydium pool id
  const authority = await Liquidity.getAssociatedAuthority({ programId });
  console.log("id: ", id.toString());
  console.log("authority: ", authority.publicKey.toString());

  const allPoolKeys = await Liquidity.fetchAllPoolKeys(connection);
  // console.log(allPoolKeys);
  let poolKeys: any = "default";
  // console.log(allPoolKeys[100].id.toString());
  for (const keys of allPoolKeys) {
    if (keys.id.toString() == id.toString()) {
      poolKeys = keys;
      console.log("id: ", poolKeys.id.toString());
    }
  }
  const baseMint: PublicKey = await poolKeys.baseMint;
  const quoteMint: PublicKey = await poolKeys.quoteMint;
  console.log(baseMint, quoteMint);
  const tokenAccountIn = await Spl.getAssociatedTokenAccount({
    mint: baseMint,
    owner,
  });
  const tokenAccountOut = await Spl.getAssociatedTokenAccount({
    mint: quoteMint,
    owner,
  });

  const userKeys = {
    tokenAccountIn,
    tokenAccountOut,
    owner,
  };

  const amountIn: BigNumberish = 100;
  const amountOut: BigNumberish = 1;
  const fixedSide: SwapSide = "in";
  const params: SwapInstructionParams = {
    poolKeys,
    userKeys,
    amountIn,
    amountOut,
    fixedSide,
  };

  const swapInstruction = Liquidity.makeSwapInstruction(params);

  const transferTransaction = new Transaction().add(swapInstruction);

  await sendAndConfirmTransaction(connection, transferTransaction, [ownerKeypair]);

  // console.log(params);

  // const lpmint = params.poolKeys.lpMint;

  // const info = await connection.getAccountInfo(lpmint);
  // console.log(info);

  // const tokenIn = new Token(connection, baseMint, TOKEN_PROGRAM_ID, ownerKeypair);
  // const tokenOut = new Token(connection, quoteMint, TOKEN_PROGRAM_ID, ownerKeypair);
  // console.log(owner.toString());

  // const accountInInfo = await tokenIn.getOrCreateAssociatedAccountInfo(owner);
  // const accountOutInfo = await tokenOut.getOrCreateAssociatedAccountInfo(owner);

  // console.log(accountInInfo);
  // const info = await connection.getAccountInfo();
  // const a = SPL_ACCOUNT_LAYOUT.decode();

  // const tokenInAccount: TokenAccount = {
  //   pubkey: owner,

  //   accountInInfo,
  // };

  // const raydiumAccountInInfo: SplAccount = {
  //   mint: baseMint,
  //   owner,
  //   amount: accountInInfo.amount,
  //   delegateOption: 0,
  //   delegate: accountInInfo.delegate,
  //   state: 1,
  //   isNativeOption: 1,
  //   isNative: new BN(Number(accountInInfo.isNative)),
  //   delegatedAmount: accountInInfo.delegatedAmount,
  //   closeAuthorityOption: 0,
  //   closeAuthority: accountInInfo.closeAuthority,
  // };
  // console.log(raydiumAccountInInfo);
  // const swapTransactionParams: SwapTransactionParams = {
  //   connection,
  //   poolKeys,
  //   userKeys,
  // };

  // export interface SwapTransactionParams {
  //   connection: Connection;
  //   poolKeys: LiquidityPoolKeys;
  //   userKeys: {
  //     tokenAccounts: TokenAccount[];
  //     owner: PublicKey;
  //     payer?: PublicKey;
  //   };
  //   currencyAmountIn: CurrencyAmount | TokenAmount;
  //   currencyAmountOut: CurrencyAmount | TokenAmount;
  //   fixedSide: SwapSide;
  //   config?: {
  //     bypassAssociatedCheck?: boolean;
  //   };

  // Liquidity.makeSwapTransaction(
  //   params: swapTransactionParams
  // )

  // const txid = await connection.sendTransaction(transaction, [wallet, ...signers]);

  //   console.log(txid);
};

// main()
//   .then(() => {
//     console.log("Done");
//   })
//   .catch((e) => {
//     console.error(e);
//   });
