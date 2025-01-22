export enum PrizeQualityEnum {
    common = 'Common',
    uncommon = 'Uncommon',
    rare = 'Rare',
    epic = 'Epic',
    legendary = 'Legendary'
}

export interface Prize {
    id: number;
    name: string;
    quality: PrizeQualityEnum;
    drop_chance: number;
}

export interface LootboxInfo {
    id: number;
    name: string;
    image_url: string;
    open_price: number;
    prizes: Array<Prize>;
}