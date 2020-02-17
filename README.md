# Doeteca Backend (Conceptual)
⚠ Under in Progress...

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

## About <a name = "about"></a>

Doeteca is a project created by me, to facilitate the book giveaway for everyone who need. So, to participate, you ask for a specific book e await for givers. <br>
Inspired on [Winnieteca](https://twitter.com/WinnieTeca). <br>
Then, I decided make this conceptual backend project. Here, built on Express and using Sequelize ORM, you can send requests to ask for a book or for donate to anyone. I also used JWT token to build users sessions.

## Getting Started <a name = "getting_started"></a>

You can clone this project on your machine, typing:
```
git clone https://github.com/davigsousa/doeteca-backend.git
```

### Prerequisites

You will need NodeJS and Yarn (to make all easier) on your machine. <br>
- [NodeJS Official Website](https://nodejs.org/en/download/) <br>
- [Yarn Official Website](https://yarnpkg.com/getting-started/install)

### Installing

Open the project folder.
```
cd doeteca-backend
```
Then, type:
```
yarn
```
Now, you need to configure the Postgres database, <br>
so it can connect on your machine. You need to create a .env file <br>
like the .env-example in project root and modify the values as you want.


# Usage <a name = "usage"></a>

You can start the local server, typing:
```
yarn start
```
Below, these are all possible requests.

## Create User:
```
POST /users
```
Here, you can create an user, by sending on the body some information about it, example:
```json
{
	"name": "Example User",
	"email": "example@email.com",
	"twitter_username": "exampletwitter",
	"password": "passwordsample"
}
```

## Create Session for registered user:
```
POST /sessions
```
Send a body with user email and password to get his authorization token.
```json
{
	"email":"example@email.com",
	"password":"passwordsample"
}
```

## List all active books on platform:
```
GET /books?page=2
```
Return max of 18 books for the specified page on query params.
```json
[
  {
    "id": 2,
    "name": "João e o Pé de Feijão",
    "thumbnail": "A link to its thumbnail",
    "suggested_link": "Some optional link to buy it.",
    "owner": {
      "id": 2,
      "name": "Example 2",
      "twitter_username": "twitterexample2"
    }
  },
  {
    "id": 5,
    "name": "Alice no País das Maravilhas",
    "thumbnail": null,
    "suggested_link": null,
    "owner": {
      "id": 1,
      "name": "Example User",
      "twitter_username": "exampletwitter"
    }
  }
]
```

## Create a Book request for determined user:
```
POST /books
```
With the bearer authorization token on Header, create a book for that user id on token.
JSON Body:
```json
{
  "name": "Alice no País das Maravilhas",
  "author":"Lewis Carroll",
  "thumbnail":"Thumbnail link if found.",
  "suggested_link": "Some optional link to buy it."
}
```

## Toggle active status of specific book:
```
PUT /books/:id
```
Toogle a book to active or deactivated. Response:
```json
{
  "id": 5,
  "name": "Alice no País das Maravilhas",
  "author":"Lewis Carroll",
  "thumbnail": null,
  "suggested_link": null,
  "active": false,
  "createdAt": "2020-01-25T22:53:55.114Z",
  "updatedAt": "2020-01-26T12:54:01.631Z",
  "user_id": 1
}
```

## Delete specified book on url params:
```
DELETE /books/:id
```
Backend response:
```json
{
  "id": 4,
  "name": "Alice no País das Maravilhas",
  "author":"Lewis Carroll",
  "thumbnail": null,
  "suggested_link": null,
  "active": true,
  "createdAt": "2020-01-25T22:52:26.261Z",
  "updatedAt": "2020-01-25T22:52:26.261Z",
  "user_id": 1
}
```
