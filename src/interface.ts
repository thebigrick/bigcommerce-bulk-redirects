export interface CommandOptions {
    channelId: number;
    batchSize: number;
    accessToken: string;
    storeHash: string;
    localeCode: string;
    loadViaApi: boolean;
    sourceFile: string;
    destinationFile: string;
}

export interface ProductData {
    sku: string;
    path: string;
}

export interface RedirectData {
    siteId: number;
    productId: number;
    domain: string;
    oldPath: string;
    newPath: string;
}

export interface ChannelData {
    channelId: number;
    siteId: number;
    domain: string;
}
