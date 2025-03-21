import { TonProofItemReplySuccess } from "@tonconnect/ui-react";

export enum PrizeQualityEnum {
    common = 'Common',
    uncommon = 'Uncommon',
    rare = 'Rare',
    epic = 'Epic',
    legendary = 'Legendary'
}

export enum PrizeTypeEnum {
    TOKENS = 'Tokens',
    NFT = 'NFT'
}

export interface Prize {
    id: number;
    name: string;
    quality: PrizeQualityEnum;
    drop_chance: number;
    type: PrizeTypeEnum;
    tokens_amount: number;
}

export interface LootboxInfo {
    id: number;
    name: string;
    image_url: string;
    open_price: number;
    prizes: Array<Prize>;
}

export interface TonProofBody extends TonProofItemReplySuccess {
    address: string;
    publicKey?: string;
}