import getProductIds from './get-product-ids';
import { CommandOptions } from './interface';
import chalk from 'chalk';

export interface ProductUrl {
    productId: number;
    path: string;
}

/**
 * Get the URLs by the product SKUs
 * @param skus
 * @param options
 */
const getUrlsBySkus = async (
    skus: string[],
    options: CommandOptions
): Promise<Record<string, ProductUrl>> => {
    const { storeHash, accessToken, channelId, localeCode } = options;
    const productsSkus = await getProductIds(skus, options);

    const apiUrl = `https://api.bigcommerce.com/stores/${storeHash}/graphql`;

    const productIds = Object.keys(productsSkus)
        .map((id) => `"bc/store/product/${id}"`)
        .join(',');
    const query = `
        query {
            store {
                products(filters: {ids: [${productIds}]}) {
                    edges {
                        node {
                            id
                            urlPath {
                                path
                            }
                            
                            overridesForLocale (localeContext: { channelId: "bc/store/channel/${channelId}", locale: "${localeCode}" }) {
                                urlPath {
                                    path
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': accessToken,
        },
        body: JSON.stringify({ query }),
    });

    const data = await response.json();
    if (!data || !data.data) {
        console.error(
            chalk.bgRed(`Failed to get products: ${JSON.stringify(data)}`)
        );
        process.exit(-1);
    }

    return data.data.store.products.edges.reduce(
        (acc: Record<string, ProductUrl>, edge: any) => {
            const urlPath =
                edge.node.overridesForLocale?.urlPath?.path ||
                edge.node.urlPath.path;
            const productId = parseInt(edge.node.id.split('/').pop(), 10);

            acc[productsSkus[productId]] = {
                productId,
                path: urlPath,
            };

            return acc;
        },
        {}
    );
};

export default getUrlsBySkus;
