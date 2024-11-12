# Bulk Redirects Updater Tool for BigCommerce

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
    - [Options](#options)
    - [Examples](#examples)
- [Environment Variables](#environment-variables)
- [Multi-Storefront Support](#multi-storefront-support)
- [Input CSV File Format](#input-csv-file-format)
- [Output](#output)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Bulk Redirects is a Node.js script designed to streamline the management of URL redirects for BigCommerce stores. It
reads a CSV file containing SKU and path information, queries BigCommerce to determine the new URLs, and then either
generates a CSV file for the redirects or uploads them directly via the BigCommerce API. The script supports
multi-storefront configurations, making it versatile for businesses with multiple online storefronts.

## Features

- **Bulk Processing**: Handle large volumes of redirects efficiently.
- **API Integration**: Interact with BigCommerce APIs to fetch updated URLs and upload redirects.
- **Customizable**: Configure the script using command-line options or environment variables.
- **Multi-Storefront Support**: Manage redirects across multiple storefronts seamlessly.
- **Flexible Output**: Choose between generating a CSV file or loading redirects via API.

## Getting strted

You can run the script directly using `npx` without installing it globally:

```bash
npx @thebigrick/bulk-redirects
```

## Usage

The script can be executed via the command line with various options to customize its behavior.

Options

- `--load`: (Optional) Load redirects directly into BigCommerce via API. Default: false.
- `-s`, `--source <file>`: (Optional) Specify the input CSV source file. Default: redirects.csv.
- `-o`, `--output <file>`: (Optional) Specify the output CSV file. Default: output.csv.
- `-b`, `--batch <batchSize>`: (Optional) Set the batch size for processing. Default: 50.
- `-c`, `--channel <channel>`: (**Required**) BigCommerce channel_id.
- `-t`, `--token <token>`: (Optional) BigCommerce access token. Can be set via the ACCESS_TOKEN environment variable.
- `-h`, `--hash <hash>`: (Optional) BigCommerce store hash. Can be set via the STORE_HASH environment variable.
- `-l`, `--locale <locale>`: (**Required**) BigCommerce locale (e.g., "en").

### Examples

#### Example 1: Generate a Redirects CSV File

Generate a CSV file for redirects without uploading them to BigCommerce:

```bash
npx @thebigrick/bulk-redirects --source my_redirects.csv --output redirects_output.csv --channel 123 --locale en --token YOUR_ACCESS_TOKEN --hash YOUR_STORE_HASH
```

#### Example 2: Load Redirects via API

Load redirects directly into BigCommerce using API credentials:

```bash
npx @thebigrick/bulk-redirects --load --source my_redirects.csv --channel 123 --locale en --token YOUR_ACCESS_TOKEN --hash YOUR_STORE_HASH
```

#### Example 3: Using Environment Variables

Set your API credentials in a .env file:

```bash
ACCESS_TOKEN=YOUR_ACCESS_TOKEN
STORE_HASH=YOUR_STORE_HASH
```

Run the script without specifying --token and --hash:

```bash
npx @thebigrick/bulk-redirects --load --source my_redirects.csv --channel 123 --locale en
```

## Environment Variables

The script can read the following environment variables, which can be set in a .env file or directly in your shell
environment:

- **ACCESS_TOKEN**: Your BigCommerce access token.
- **STORE_HASH**: Your BigCommerce store hash.

## Multi-Storefront Support

Specify the channel_id using the --channel option and the locale using the --locale option to manage redirects for
different storefronts:

```bash
npx @thebigrick/bulk-redirects --source my_redirects.csv --output redirects_output.csv --channel 123 --locale en --token YOUR_ACCESS_TOKEN --hash YOUR_STORE_HASH
```

## Input CSV File Format

The input CSV file should contain two columns: sku and path.

Example `my_redirects.csv`:

```csv
sku,path
SKU123,/old-product-page
SKU456,/another-old-page
```

## Output

Depending on the options used:

- Generate CSV: If `--load` is not specified, the script will generate a CSV file with the new redirects, specified by
  the `--output` option.
- Load via API: If `--load` is specified, the script will upload the redirects directly to your BigCommerce store via
  the API.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request on
GitHub.

## License

This project is licensed under the MIT License. See the LICENSE.md file for details.