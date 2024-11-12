import { RedirectData } from './interface';
import { createObjectCsvStringifier } from 'csv-writer';

/**
 * Dump the redirects to a CSV string
 * @param redirects
 */
const dumpCsv = (redirects: RedirectData[]): string => {
    const csvStringifier = createObjectCsvStringifier({
        header: [
            { id: 'domain', title: 'domain' },
            { id: 'oldPath', title: 'oldPath' },
            { id: 'newPath', title: 'newPath' },
            { id: 'type', title: 'type' },
            { id: 'productId', title: 'productId' },
        ],
    });

    const data = redirects.map(
        ({ oldPath, newPath, productId, domain, siteId }) => {
            return {
                domain,
                oldPath,
                newPath,
                type: 'product',
                productId,
            };
        }
    );

    return csvStringifier.stringifyRecords(data);
};

export default dumpCsv;
