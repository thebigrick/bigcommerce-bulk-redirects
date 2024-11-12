import { CommandOptions, ProductData, RedirectData } from './interface';
import getChannelData from './get-channel-data';
import getProductIds from './get-product-ids';

interface MappedUrl {
    productId: number;
    oldPath: string;
}

/**
 * Get the redirects data
 * @param batch
 * @param options
 */
const getRedirects = async (
    batch: ProductData[],
    options: CommandOptions
): Promise<RedirectData[]> => {
    const channelData = await getChannelData(options);

    const skus = batch.map(({ sku }) => sku);
    const productsSkus = await getProductIds(skus, options);

    const mappedUrls: MappedUrl[] = Object.keys(productsSkus).map(
        (productId) => {
            const sku = productsSkus[productId];
            const oldPath = batch.find(({ sku: s }) => s === sku)
                ?.path as string;

            return {
                productId: parseInt(productId, 10),
                oldPath,
            };
        }
    );

    return mappedUrls.map((mappedUrl) => ({
        oldPath: mappedUrl.oldPath,
        productId: mappedUrl.productId,
        domain: channelData.domain,
        siteId: channelData.siteId,
    }));
};

export default getRedirects;
