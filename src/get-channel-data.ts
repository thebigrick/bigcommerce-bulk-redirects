import { ChannelData, CommandOptions } from './interface';
import chalk from 'chalk';

let channelData: ChannelData | undefined = undefined;

/**
 * Get channel data via API
 * @param options
 */
const getChannelData = async (
    options: CommandOptions
): Promise<ChannelData> => {
    if (channelData === undefined) {
        const { storeHash, accessToken, channelId } = options;
        const apiUrl = `https://api.bigcommerce.com/stores/${storeHash}/graphql`;

        const query = `
            query {
                store {
                    channels {
                        edges {
                            node {
                                id
                                site {
                                    id
                                    urls {
                                        primaryUrl {
                                            url
                                        }
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
                chalk.bgRed.white(
                    'An error occurred while fetching the channel data'
                )
            );
            process.exit(-1);
        }

        const channel = data.data.store.channels.edges.find(
            (edge: any) => edge.node.id === `bc/store/channel/${channelId}`
        );
        if (!channel) {
            console.error(
                chalk.bgRed.white(
                    'Channel not found. Please provide a valid channel ID'
                )
            );
            process.exit(-1);
        }

        const domain = new URL(channel.node.site.urls.primaryUrl.url).hostname;

        channelData = {
            siteId: parseInt(channel.node.site.id.split('/').pop(), 10),
            channelId: channelId,
            domain,
        };
    }

    return channelData;
};

export default getChannelData;
