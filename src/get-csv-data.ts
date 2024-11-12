import fs from 'node:fs';
import csv from 'csv-parser';
import { ProductData } from './interface';

/**
 * Read CSV file and return the data as an array of objects
 * @param filePath
 */
const readCsv = async (filePath: string): Promise<ProductData[]> => {
    return new Promise((resolve, reject) => {
        const results: ProductData[] = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                if (data.sku && data.path) {
                    results.push({ sku: data.sku, path: data.path });
                }
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

export default readCsv;
