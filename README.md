# ClubeUPF Discord Bot

## Introduction
* Work in progress


## Configuration

### Environment variables
Environment variables necessary to configure the Discord Bot API.
```
TOKEN="<BOT_TOKEN>"
CLIENT_ID="<BOT_CLIENT_ID>"
GUILD_ID="<SERVER_ID>"
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