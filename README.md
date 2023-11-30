# News Aggregator API

## Features

Using this API, the user can:

-   Register into the application
-   Login into the application.
-   Retrive all the preferences set by the user.
-   Update all the preferences.
-   Get the news based on preferences.'

|           Endpoint | Description                                                    |
| -----------------: | :------------------------------------------------------------- |
|   `POST /register` | Register a new user.                                           |
|      `POST /login` | Log in a user.                                                 |
| `GET /preferences` | Retrieve the news preferences for the logged-in user.          |
| `PUT /preferences` | Update the news preferences for the logged-in user.            |
|        `GET /news` | Fetch news articles based on the logged-in user's preferences. |

### Schema

```js
[
    {
        id: "string",
        username: "string",
        password: "string",
        preferences: { categories: [Array], sources: [Array] },
        // "createdAt": Date.now() // a.k.a Unix epoch // TODO
    },
];
```

## Installation

To expose the endpoints into local, run the following commands.

```sh
npm install
node /src/app.js
```

## License

Free ! enjoy :)
