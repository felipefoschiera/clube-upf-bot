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
CONTESTS_CHANNEL_ID=<CHANNEL_TO_SEND_CODEFORCES_CONTESTS>
```

### Deploy commands
To deploy new commands, run `npm run commands`

### Permissions
Permissions are configured as a JSON array and deployed as the `PERMISSIONS` environment variable as a string. Expected format:
```json
[
    {
        "id": "<ROLE_ID>",
        "type": "ROLE",
        "permission": true
    }
]
```
You can transform the JSON object to a string with the `JSON.stringify(object)` function and set the variable.