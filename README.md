# ClubeUPF Discord Bot

## Introduction
* Work in progress


## Configuration

### `config.json` file
This file is necessary to configure the Discord Bot API. Expected format:
```json
{
    "token": "<BOT_TOKEN>",
    "clientId": "<BOT_CLIENT_ID>",
    "guildId": "<SERVER_ID>"
}
```

### `permissions.json`
This file contains permissions that apply to all guild commands. Later, this can be command-specific. Expected format: 
```json
{
    "permissions": [
        {
            "id": "<ROLE_ID>",
            "type": "ROLE",
            "permission": true
        }
    ]
}
```