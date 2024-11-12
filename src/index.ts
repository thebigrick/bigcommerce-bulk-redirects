import readCsv from './get-csv-data';
import splitIntoBatches from './split-into-batches';
import getRedirects from './get-redirects';
import dumpCsv from './dump-csv';
import fs from 'node:fs';
import loadRedirects from './load-redirects';
import getCommandOptions from './get-command-options';
import ora from 'ora';
import chalk from 'chalk';

const commandOptions = getCommandOptions();

const spinner = ora('Importing from CSV').start();
const csvBatches: string[] = [
    'Domain,Old Path,Manual URL/Path,Dynamic Target Type,Dynamic Target ID',
];

(async () => {
    spinner.text = 'Reading CSV file';
    const csvData = await readCsv(commandOptions.sourceFile);

    spinner.text = 'Splitting CSV data into batches';
    const batches = splitIntoBatches(csvData, commandOptions);

    for (const batch of batches) {
        spinner.text = 'Fetching URLs by SKUs';
        const skus = batch.map(({ sku }) => sku);

        spinner.text = 'Getting redirects';
        const redirects = await getRedirects(batch, commandOptions);

        if (commandOptions.loadViaApi) {
            spinner.text = 'Loading redirects via API';
            await loadRedirects(redirects, commandOptions);
        }

        const res = dumpCsv(redirects);
        csvBatches.push(res);
    }

    if (commandOptions.destinationFile) {
        spinner.text = `Writing CSV file "${commandOptions.destinationFile}"...`;
        const csvOutput = csvBatches.join('\n');
        fs.writeFileSync(commandOptions.destinationFile, csvOutput);
    }
})();

spinner.succeed('Done!');

console.log();
if (commandOptions.destinationFile) {
    console.log(
        chalk.green(
            `All redirects have been exported to ${commandOptions.destinationFile}!`
        )
    );
}

if (commandOptions.loadViaApi) {
    console.log(chalk.green('All redirects have been loaded via API!'));
}

console.log();
