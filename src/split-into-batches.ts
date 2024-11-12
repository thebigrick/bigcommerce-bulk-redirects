import { CommandOptions, ProductData } from './interface';
import _ from 'lodash';

/**
 * Split the CSV data into batches
 * @param csvData
 * @param options
 */
const splitIntoBatches = (
    csvData: ProductData[],
    options: CommandOptions
): ProductData[][] => {
    return _.chunk(csvData, options.batchSize);
};

export default splitIntoBatches;
