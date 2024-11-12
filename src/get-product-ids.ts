import _ from 'lodash';
import { CommandOptions } from './interface';

/**
 * Get product IDs by SKU
 * @param skus
 * @param options
 */
const getProductIds = async (
    skus: string[],
    options: CommandOptions
): Promise<Record<string, string>> => {
    const { accessToken, storeHash } = options;

    // TODO: When GraphQL query by SKU is available, use it instead of REST API
    const restApiEndpoint = `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog/products`;

    const url = new URL(restApiEndpoint);
    url.searchParams.set('include_fields', 'sku');
    url.searchParams.set('sku:in', _.uniq(skus).join(','));

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Auth-Token': accessToken,
        },
    });

    const data = await response.json();
    return data.data.reduce(
        (acc: Record<string, string>, product: { id: string; sku: string }) => {
            acc[product.id] = product.sku;
            return acc;
        },
        {}
    );
};

export default getProductIds;
