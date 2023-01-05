# Connect Four

A NPM package that contains the core game logic for the game Connect Four.

## Installation

```bash
# npm
npm install -E @devshareacademy/connect-four

# yarn
yarn add -E @devshareacademy/connect-four
```

## Usage

```typescript
import { ConnectFour } from '@devshareacademy/connect-four';

const connectFour = new ConnectFour();

// first player adds their checker to the 1st column
connectFour.makeMove(0);
```

For more details on the library and the available methods, please see the documentation and examples below.

## API Documentation

The game of Connect Four is represented by a 2D array that is made up of 7 columns and 6 rows. Each cell in the table will have one of the following values:

* `0` - Represents an empty space
* `1` - Represents the space is occupied by the first player
* `2` - Represents the space is occupied by the second player

At this time, the constructor of the `ConnectFour` class does not take any configuration options.

### Methods

#### .makeMove(column)

Allows the current player to drop a checker into one of the columns in the game board. This method will throw an error in the following scenarios:

* A column index that is not within boundary of the game board, example `20`
* The column is already full
* The game is over

##### Parameters

| Name | Type | Description |
|---|---|---|
| column | number | The index of the column the player game piece should be added to. Valid values are `0 - 6` |

#### .resetGame()

Allows the player to reset the game, and start a brand new game. Once this method is called, it will be the first players turn again.

### Properties

| Property | Description | Type |
|---|---|---|
| board | A 2D array that represents the current board state.  | number[][] |
| playersTurn | A string that represents the current players turn. Possible values are: `ONE` and `TWO`. | string |
| isGameOver | A boolean flag that represents if the current game instance is finished. The game is considered finished when a player has won the game by getting a Connect Four, or when the game ends in a `DRAW` if no more spaces are left on the board. | boolean |
| gameWinner | A string that represents the player that one the game. Possible values are `ONE` and `TWO`.  If the game is not over, or if the game ends in a `DRAW`, then this property will return `undefined`. | string \| undefined |
| winningCells | An array of objects that represent the coordinates of the winning cells that make up the winning combination. Each object has two properties, `col` and `row` which are numbers representing the indexes of the cell row  and column. Example: `[{"row":0,"col":0}]`  If the game is not over, or if the game ends in a `DRAW`, then this property will return an empty array. | {   col: number;   row: number; }[] |

## Examples

### Simple Game

```typescript
import { ConnectFour } from '@devshareacademy/connect-four';

const connectFour = new ConnectFour();
connectFour.makeMove(0);
connectFour.makeMove(0);

console.log(connectFour.playersTurn); // "ONE"
console.log(connectFour.isGameOver); // false
console.log(connectFour.gameWinner); // undefined
console.log(connectFour.winningCells); // []
console.log(connectFour.board);
/*
[
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [2, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0]
]
*/
```

### More Complex Game

```typescript
import { ConnectFour } from '@devshareacademy/connect-four';

const connectFour = new ConnectFour();
connectFour.makeMove(2);
connectFour.makeMove(1);
connectFour.makeMove(2);
connectFour.makeMove(1);
connectFour.makeMove(2);
connectFour.makeMove(1);
connectFour.makeMove(3);
connectFour.makeMove(1);

console.log(connectFour.playersTurn); // "TWO"
console.log(connectFour.isGameOver); // true
console.log(connectFour.gameWinner); // "TWO"
console.log(connectFour.winningCells);
/*
[
  { col: 1, row: 2 },
  { col: 1, row: 3 },
  { col: 1, row: 4 },
  { col: 1, row: 5 },
]
*/
console.log(connectFour.board);
/*
[
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0],
  [0, 2, 1, 1, 0, 0, 0]
]
*/
```

## Local Development

This project uses [Yarn](https://yarnpkg.com/) as a package manager, however you can use `NPM` to run this project locally.

### Install Project Dependencies

```bash
yarn install --frozen-lockfile
```

If you are using `npm`, run the following command:

```bash
npm install
```

### Run Tests

```bash
yarn test
```

If you are using `npm`, run the following command:

```bash
npm run test
```

### Testing Changes Locally

#### NPM Link

In order to test changes locally, you can can create a symlink to this npm package folder and then reference this folder in another project locally.

To create a symlink:

```bash
# run the following command from this projects directory
npm link
# change to the directory of the project you want to use this package in
cd ../../../some-other-project
# link-install the package
npm link @devshareacademy/connect-four
```

Please see the official documentation on [npm link](https://docs.npmjs.com/cli/v8/commands/npm-link) for more information.

#### Verdaccio

Another option for testing changes locally is to use [Verdaccio](https://verdaccio.org/), which is a lightweight private proxy registry. With Verdaccio, you can publish this npm package to a local registry and then in another project you can install this package by pointing to the local registry.

There are a variety of ways to run Verdaccio, but in the following example we will be using [Docker](https://www.docker.com/).

##### Instructions

To setup and run Verdaccio:

```bash
docker run -it --rm --name verdaccio -p 4873:4873 verdaccio/verdaccio
```

To create a user and login:

```bash
npm adduser --registry http://localhost:4873
```

To publish a package:

```bash
npm publish --registry http://localhost:4873
```

To install the local package in another project:

```bash
NPM_CONFIG_REGISTRY=http://localhost:4873 npm install @devshareacademy/connect-four
```
