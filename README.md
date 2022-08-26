# Description

*Ethereum Api*

`AVAIBLE INTEGRATION`
* [ETHERSCAN.IO](https://etherscan.io/)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Example Envrionment Variables
*You have to create your .env file*
```
PORT=3000
ETHERSCAN_APIKEY=YOUR_ETHERSCAN_API_KEY
```


# API


## Base Reponse 
```ts
class ApiResponse <T>{
  error      : boolean;
  message    : string[] | string;
  statusCode : HttpStatus;
  errorCode  : string;
  data       : T | any;
  timestamp  : string;
}

```

## Ethereum Get Balances

`POST /ethereum/balance`

```ts
class RequestDTO {
  addresses: string[];
}

class DataDTO {
  address    : string;
  valid      : boolean;
  balance    : string;
  usdBalance : number
}

@returns ApiResponse<DataDTO[]>
```

`EXAMPLE`
```bash
$ curl --location --request POST 'http://localhost:3000/ethereum/balance' \
--header 'Content-Type: application/json' \
--data-raw '{
    "addresses":["0xB7e390864a90b7b923C9f9310C6F98aafE43F707","2tB7e390864a90b7b923C9f9310C6F98aafE43F707","0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d","0x63a9975ba31b0b9626b34300f7f627147df1f526"]
}'

- RESPONSE -
{
    "error": false,
    "message": "OK",
    "statusCode": 200,
    "errorCode": null,
    "data": [
        {
            "valid": true,
            "balance": "10.130901404127232515",
            "usdBalance": 16755.801759328155,
            "address": "0xB7e390864a90b7b923C9f9310C6F98aafE43F707"
        },
        {
            "valid": true,
            "balance": "332.567136222827062478",
            "usdBalance": 550042.7636130204,
            "address": "0x63a9975ba31b0b9626b34300f7f627147df1f526"
        },
        {
            "valid": false,
            "balance": null,
            "usdBalance": null,
            "address": "2tB7e390864a90b7b923C9f9310C6F98aafE43F707"
        },
        {
            "valid": false,
            "balance": null,
            "usdBalance": null,
            "address": "0xC1912fEE45d61C87Cc5EA59DaE31190FFFFf232d"
        }
    ],
    "timestamp": "2022-08-26T12:48:05.264Z"
}
```


## SWAGGER
You can find swagger api documentation at `/api-guide`