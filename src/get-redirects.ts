import { ProductUrl } from './get-urls-by-skus';
import { CommandOptions, ProductData, RedirectData } from './interface';
import getChannelData from './get-channel-data';

interface MappedUrl {
    productId: number;
    oldPath: string;
    newPath: string;
}

/**
 * Get the redirects data
 * @param batch
 * @param urls
 * @param options
 */
const getRedirects = async (
    batch: ProductData[],
    urls: Record<string, ProductUrl>,
    options: CommandOptions
): Promise<RedirectData[]> => {
    const channelData = await getChannelData(options);

    const mappedUrls: MappedUrl[] = Object.keys(urls).map((sku) => {
        const productId = urls[sku].productId;
        const newPath = urls[sku].path as string;
        const oldPath = batch.find(({ sku: s }) => s === sku)?.path as string;

        return {
            productId,
            oldPath,
            newPath,
        };
    });

    return mappedUrls.map((mappedUrl) => ({
        oldPath: mappedUrl.oldPath,
        newPath: mappedUrl.newPath,
        productId: mappedUrl.productId,
        domain: channelData.domain,
        siteId: channelData.siteId,
    }));
};

export default getRedirects;
