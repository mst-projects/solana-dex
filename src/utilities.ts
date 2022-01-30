import { Keypair } from "@solana/web3.js";
import DiscordWebhook from "discord-webhook-ts";
import { readFile } from "mz/fs.js";
import os from "os";

import * as config from "./config/arb_serum_orca.json";

export const getKeypair = async (): Promise<Keypair> => {
  const secretKeyString = await readFile(os.homedir() + "/.config/solana/id.json", {
    encoding: "utf8",
  });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const owner = Keypair.fromSecretKey(secretKey);
  return owner;
};

export const sendMessage = async (message: string) => {
  const DISCORD_URL = config.DISCORD_URL;
  const discordClient = new DiscordWebhook(DISCORD_URL);
  const requestBody = {
    embeds: [
      {
        fields: [
          {
            name: "Serum-Orca bot",
            value: message,
          },
        ],
      },
    ],
  };
  await discordClient.execute(requestBody);
};
