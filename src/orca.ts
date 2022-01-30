import { getOrca, OrcaPool, OrcaPoolConfig, OrcaPoolToken, OrcaU64 } from "@orca-so/sdk";
import { Connection, Keypair } from "@solana/web3.js";
import Decimal from "decimal.js";

export const getOrcaPool = (connection: Connection, tokenA: string, tokenB: string): OrcaPool => {
  const orca = getOrca(connection);
  if (tokenA === "SOL" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
    return orcaPool;
  } else if (tokenA === "ATLAS" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ATLAS_USDC);
    return orcaPool;
  } else if (tokenA === "ETH" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ETH_USDC);
    return orcaPool;
  } else if (tokenA === "ORCA" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ORCA_USDC);
    return orcaPool;
  } else if (tokenA === "LIQ" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.LIQ_USDC);
    return orcaPool;
  } else if (tokenA === "USDC" && tokenB === "LIQ") {
    const orcaPool = orca.getPool(OrcaPoolConfig.LIQ_USDC);
    return orcaPool;
  } else if (tokenA === "SNY" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SNY_USDC);
    return orcaPool;
  } else if (tokenA === "mSOL" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.mSOL_USDC);
    return orcaPool;
  } else if (tokenA === "PORT" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.PORT_USDC);
    return orcaPool;
  } else if (tokenA === "SLRS" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SLRS_USDC);
    return orcaPool;
  } else if (tokenA === "SAMO" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SAMO_USDC);
    return orcaPool;
  } else if (tokenA === "POLIS" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.POLIS_USDC);
    return orcaPool;
  } else if (tokenA === "SLND" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SLND_USDC);
    return orcaPool;
  } else if (tokenA === "whETH" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.whETH_USDC);
    return orcaPool;
  } else if (tokenA === "ABR" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ABR_USDC);
    return orcaPool;
  } else if (tokenA === "GOFX" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.GOFX_USDC);
    return orcaPool;
  } else if (tokenA === "FTT" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.FTT_USDC);
    return orcaPool;
  } else if (tokenA === "SUNNY" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SUNNY_USDC);
    return orcaPool;
  } else if (tokenA === "AURY" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.AURY_USDC);
    return orcaPool;
  } else if (tokenA === "LARIX" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.LARIX_USDC);
    return orcaPool;
  } else if (tokenA === "COPE" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.COPE_USDC);
    return orcaPool;
  } else if (tokenA === "MNGO" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.MNGO_USDC);
    return orcaPool;
  } else if (tokenA === "scnSOL" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.scnSOL_USDC);
    return orcaPool;
  } else if (tokenA === "BOP" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.BOP_USDC);
    return orcaPool;
  } else if (tokenA === "SLIM" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SLIM_USDC);
    return orcaPool;
  } else if (tokenA === "TULIP" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.TULIP_USDC);
    return orcaPool;
  } else if (tokenA === "SYP" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SYP_USDC);
    return orcaPool;
  } else if (tokenA === "JET" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.JET_USDC);
    return orcaPool;
  } else if (tokenA === "wHAPI" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.wHAPI_USDC);
    return orcaPool;
  } else if (tokenA === "RAY" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.RAY_USDC);
    return orcaPool;
  } else if (tokenA === "KURO" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.KURO_USDC);
    return orcaPool;
  } else if (tokenA === "GRAPE" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.GRAPE_USDC);
    return orcaPool;
  } else if (tokenA === "MEDIA" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.MEDIA_USDC);
    return orcaPool;
  } else if (tokenA === "AVAX" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.AVAX_USDC);
    return orcaPool;
  } else if (tokenA === "PRT" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.PRT_USDC);
    return orcaPool;
  } else if (tokenA === "pSOL" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.pSOL_USDC);
    return orcaPool;
  } else if (tokenA === "WAG" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.WAG_USDC);
    return orcaPool;
  } else if (tokenA === "stSOL" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.stSOL_USDC);
    return orcaPool;
  } else if (tokenA === "wstETH" && tokenB === "USDC") {
    const orcaPool = orca.getPool(OrcaPoolConfig.wstETH_USDC);
    return orcaPool;
  } else if (tokenA === "ORCA" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ORCA_SOL);
    return orcaPool;
  } else if (tokenA === "ETH" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ETH_SOL);
    return orcaPool;
  } else if (tokenA === "NINJA" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.NINJA_SOL);
    return orcaPool;
  } else if (tokenA === "RAY" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.RAY_SOL);
    return orcaPool;
  } else if (tokenA === "KIN" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.KIN_SOL);
    return orcaPool;
  } else if (tokenA === "FIDA" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.FIDA_SOL);
    return orcaPool;
  } else if (tokenA === "SRM" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SRM_SOL);
    return orcaPool;
  } else if (tokenA === "IVN" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.IVN_SOL);
    return orcaPool;
  } else if (tokenA === "OXY" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.OXY_SOL);
    return orcaPool;
  } else if (tokenA === "COPE" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.COPE_SOL);
    return orcaPool;
  } else if (tokenA === "MAPS" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.MAPS_SOL);
    return orcaPool;
  } else if (tokenA === "SAMO" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.SAMO_SOL);
    return orcaPool;
  } else if (tokenA === "STEP" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.STEP_SOL);
    return orcaPool;
  } else if (tokenA === "FTT" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.FTT_SOL);
    return orcaPool;
  } else if (tokenA === "ROPE" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.ROPE_SOL);
    return orcaPool;
  } else if (tokenA === "MER" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.MER_SOL);
    return orcaPool;
  } else if (tokenA === "BTC" && tokenB === "SOL") {
    const orcaPool = orca.getPool(OrcaPoolConfig.BTC_SOL);
    return orcaPool;
  } else {
    const err = "Error No Orca Market";
    console.log(err);
    throw err;
  }
};

export const getSwapInfo = async (
  targetPool: OrcaPool,
  inputTokenChoice: "A" | "B",
  inputAmountNumber: number,
): Promise<{
  targetPool: OrcaPool;
  inputToken: OrcaPoolToken;
  outputToken: OrcaPoolToken;
  inputAmount: Decimal;
  outputAmount: OrcaU64;
}> => {
  /*** Swap ***/
  // 3. We will be swapping 0.01 SOL for some ORCA
  let inputToken = targetPool.getTokenA();
  let outputToken = targetPool.getTokenB();
  if (inputTokenChoice == "A") {
    inputToken = targetPool.getTokenA();
    outputToken = targetPool.getTokenB();
  } else {
    inputToken = targetPool.getTokenB();
    outputToken = targetPool.getTokenB();
  }
  const inputAmount = new Decimal(inputAmountNumber);
  const quote = await targetPool.getQuote(inputToken, inputAmount);
  const outputAmount = quote.getMinOutputAmount();
  console.log(
    `Input: ${inputAmount.toString()} ${inputToken.name}| Minimum Output: ${outputAmount.toNumber()} ${
      outputToken.name
    }`,
  );
  return { targetPool, inputToken, outputToken, inputAmount, outputAmount };
};

export const swap = async (
  owner: Keypair,
  targetPool: OrcaPool,
  inputToken: OrcaPoolToken,
  inputAmount: Decimal,
  outputAmount: OrcaU64,
) => {
  const swapPayload = await targetPool.swap(owner, inputToken, inputAmount, outputAmount);
  const swapTxId = await swapPayload.execute();
  console.log("Swapped:", swapTxId, "\n");
};
