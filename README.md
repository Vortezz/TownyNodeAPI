# Towny Node API

This API is created to help players retrieve Towny data from their favorite Minecraft server without accessing to any database on client side !

> The flatfile storage mode is not yet supported !

#### ⚠️ I'm not affiliated with Towny ⚠️
<br>

# Summary :
* ## [Installation](#installation)
* ## [Basic Configuration](#basic-config)
* ## [See more](#see-more)
* ## [Contribute](#contribute)

# Installation

The installation is very simple ! Just make sure you have [Node.JS](https://nodejs.org/en/download/) installed on the device !

 1. Download the repository or use ```git clone https://github.com/Vortezz/TownyPublicAPI.git``` and extract it if you need
 2. Run ```npm install express colors mysql2``` in the current directory
 3. Edit the `config.json` at your own [(See more here)](#basic-config)
 4. Run ```node index.js```
 5. Enjoy !
<br>

# Basic Config

The config is simple ! You will see a quickstart config !

```json
{
    "database": {
        "host": "localhost",
        "user": "root",
        "pass": "root",
        "name": "towny"
    },
    "port": 7000,
    "baseURL": "api",
    "residentURL": "resident",
    "townURL": "town",
    "nationURL": "nation",
    "welcomePhrase": "Welcome on servername Towny Data API !",
    "logConnections": true,
    "maxSize": 5000
}
```

Just edit the database informations, and others if you want [(See more here)](#see-more)

Then you can execute `node index.js` !

# See more

You have any questions about our API ? Check our [docs](https://towny.vortezz.fr) or open an [issue]() !

# Contribute

You want to help the project ? Or you have find a bug [(Report here please)]() ? Please open an issue that we can fix it !
