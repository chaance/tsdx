# Contributing to TSDX

Thanks for your interest in TSDX! You are very welcome to contribute. If you are proposing a new feature, make sure to [open an issue](https://github.com/palmerhq/tsdx/issues/new/choose) to make sure it is inline with the project goals.

## Setup

0. First, remove any existing `tsdx` global installations that may conflict.

   ```
   npm uninstall -g tsdx # or yarn global remove tsdx
   ```

1. Fork this repository to your own GitHub account and clone it to your local device:

   ```
   git clone https://github.com/your-name/tsdx.git
   cd tsdx
   ```

1. Install the dependencies and build the TypeScript files to JavaScript:

   ```
   npm i && npm run build
   ```

   > **Note:** you'll need to run `npm run build` any time you want to see your changes, or run `npm run watch` to leave it in watch mode.

1. Make it so running `tsdx` anywhere will run your local dev version:

   ```
   npm link
   ```

4) To use your local version when running `npm run build`/`npm run start`/`npm run test` in a TSDX project, run this in the project:

   ```
   npm link tsdx
   ```

   You should see a success message: `success Using linked package for "tsdx".` The project will now use the locally linked version instead of a copy from `node_modules`.

## Submitting a PR

Be sure to run `npm run test` before you make your PR to make sure you haven't broken anything.
