import { program } from 'commander';
import { CommandOptions } from './interface';
import dotenv from 'dotenv';
import chalk from 'chalk';

/**
 * Get command options from the command line arguments
 */
const getCommandOptions = (): CommandOptions => {
    dotenv.config({
        path: '.env',
    });

    program
        .name('bulk-redirects')
        .description('Bulk redirects management tool for BigCommerce')
        .option('--load', 'Load redirects via API', false)
        .option(
            '-s, --source <file>',
            'Specify a CSV source file',
            'redirects.csv'
        )
        .option(
            '-o, --output <file>',
            'Specify a CSV output file',
            'output.csv'
        )
        .option('-b, --batch <batchSize>', 'Batch size', '50')
        .option('-c, --channel <channel>', 'BigCommerce channel id', '1')
        .option(
            '-t, --token <token>',
            'BigCommerce access token',
            process.env.ACCESS_TOKEN
        )
        .option(
            '-h, --hash <hash>',
            'BigCommerce store hash',
            process.env.STORE_HASH
        );

    program.parse();

    const options = program.opts();
    if (!options.token || !options.hash) {
        console.error(
            chalk.bgRed(
                'Missing access token or store hash. You can provide them via --token and --hash options or ACCESS_TOKEN and STORE_HASH environment variables.'
            )
        );
        process.exit(-1);
    }

    return {
        channelId: options.channel,
        accessToken: options.token,
        storeHash: options.hash,
        batchSize: parseInt(options.batch),
        loadViaApi: options.load,
        sourceFile: options.source,
        destinationFile: options.output,
    };
};

export default getCommandOptions;
