import { CommandOptions, RedirectData } from './interface';
import chalk from 'chalk';

/**
 * Load redirects via BigCommerce API.
 * @param redirects
 * @param options
 */
const loadRedirects = async (
    redirects: RedirectData[],
    options: CommandOptions
) => {
    const { accessToken, storeHash } = options;

    // TODO: When GraphQL redirects are supported by GraphQL API, implement this function
    const restApiEndpoint = `https://api.bigcommerce.com/stores/${storeHash}/v3/storefront/redirects`;

    const data = redirects.map((redirect) => ({
        from_path: redirect.oldPath,
        site_id: redirect.siteId,
        to: {
            type: 'product',
            entity_id: redirect.productId,
        },
    }));

    const response = await fetch(restApiEndpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Auth-Token': accessToken,
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.status !== 200) {
        console.error(
            chalk.bgRed.white(
                `Failed to load redirects: ${JSON.stringify(responseData)}`
            )
        );
        process.exit(-1);
    }
};

export default loadRedirects;
