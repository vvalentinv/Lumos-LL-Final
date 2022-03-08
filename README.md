# Lumos

Lumos is a flash card web app to make studying for tests and interviews easier!

## Demo

https://lumos-frontend.herokuapp.com/

## Creating a Deck

![me](https://github.com/sarisssa/Lumos-LL-Final/blob/main/client/src/assets/create-deck.gif)

## Cycling Through Deck

![me](https://github.com/sarisssa/Lumos-LL-Final/blob/main/client/src/assets/cycle-deck.gif)


## Deleting Flash Card

![me](https://github.com/sarisssa/Lumos-LL-Final/blob/main/client/src/assets/delete-card.gif)

## Deleting Deck

![me](https://github.com/sarisssa/Lumos-LL-Final/blob/main/client/src/assets/delete-deck.gif)

## Search Bar

![me](https://github.com/sarisssa/Lumos-LL-Final/blob/main/client/src/assets/search-deck.gif)

# Stack

- Built using React, Redux, NodeJS, Express and ElephantSQL.
- React-beautiful-DND used for drag and drop on the View Deck Page.
- Material UI for pre-made components.
- Styled with Material UI overrides and CSS/SASS.

## Client Setup

Install dependencies with `npm install`

Please kindly make an account with Auth0 and populate the two environment variables within the .env.example file
within the client folder.

After this, rename the file to .env.

## Server Setup

Install dependencies with `npm install`

You will notice that certain fields within the .env.example file have already been pre-populated.

Please populate the rest of the environmental variables with the relevant information as supplied by your
database of choice.

Finally, rename the file to .env.

## Creating the DB

In our case, we chose to utilize ElephantSQL as our database provider.

## Dependencies

- React
- React-Router-DOM
- Redux
- Redux-Thunk
- React Beautiful-DND
- Material UI
- Bootstrap
- SASS
- NodeJS
- Axios
- Express
- Morgan
- ElephantSQL
- Nodemon
