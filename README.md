## CareEasy Microservice Architecture

![Architecure](Architecture.png)
CaseEasy backend architecture has been completely planned on `microservice` as the core `API` exposer.

### Tech stack
- `Node` with `Express` as http server
- Amazon `DynamoDB` for `Master` data persistence `Users` and `Tenants`.
- `MongoDB` 64 bit for internal objects and attributes. 
- `PostGreSQL` was specifically selected due to its features such as `GEO Spatial` support `Transactional` data and `Audit Logs`.
- `Amazon S3` buckets will be used for media assets storage.
- `Redis | Memcache | Casandra` for caching.
- `ELB` Elastic Load Balancer to keep all `API` stateless. 




### Typical Lifecycle of Request

- User request the `api.careeasy.com` with login credentials as `JWT Token` payload. 
- Login route checks for `Authentication` inside dynamoDB users schema and provides a valid `Authorization` with `Auth_Token` and `Auth_Key` as a response to the `Login` request with encryption.

Request:
````
    POST: `api.careeasy.com/auth/login` 

    {
        username: 'demo@gmail.com',
        password: 'demo'
    }
````


JWT(Response):
````
    {
        Auth_key: `7WOPM08FGFJH7ZBDV7MA170HBEWII8RMHQ`,
        Auth_token:`NET91CNKCJ19IV7MA170HBEWII8RMHQ`,
        user: {
            fname: `Jack`,
            lname: `Smith`,
            email: `demo@gmail.com`
            others: {
                education: [],
                experiences: []
            }
            tenants_associated: {
                'logezycare': {
                    'TENANT_UUID': '7MA170H',
                    'DB_NAME': '',
                    'DB_PASSWORD': '',
                    'DB_PORT': '',
                    'DB_USER': '',
                    'Totat_users': 190
                },
                'avantacare': {
                    'TENANT_UUID': '7MA170G',
                    'DB_NAME': '',
                    'DB_PASSWORD': '',
                    'DB_PORT': '',
                    'DB_USER': '',
                    'Totat_users': 2000
                }
            }
        }
    }
````

- Now based out on the `success` of `Authorization` we start communicating with the server tenants only to the given `tenants_associated`. 

### After Authorization
1. Using the given `Auth_Key` and `Auth_Token` and `TENANT_UUID` start sending the request.
2. `ConnectionResolver` Middleware will understand the `Tenant_UUID` header and start establishing connection with the given Tenant. 
  
  
## Quick Start

Get started developing...

```shell
# install deps
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## How do I modify the example API and make it my own?

There are two key files:
1. `server/routes.js` - This references the implementation of all of your routes. Add as many routes as you like and point each route your express handler functions.
2. `server/common/api.yaml` - This file contains your [OpenAPI spec](https://swagger.io/specification/). Describe your API here. It's recommended that you to declare any and all validation logic in this YAML. 

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/examples` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/examples
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```


### Basic Architecture

````
  # User modules
  https://api.careazy.com/v1/users/
  https://api.careazy.com/v1/users/findInvalid
  https://api.careazy.com/v1/users/activeUsers
  https://api.careazy.com/v1/users/onlineUsersAllocated


  # Tenants modules
  https://api.careazy.com/v1/tenants/
  https://api.careazy.com/v1/tenants/newOrganization
  https://api.careazy.com/v1/tenants/activity_logs


  # Request headers 

  - https://api.careazy.com/v1/users/activeUsers
    - Auth_key: username hashed
    - Auth_token: everyday it refreshes and create a new hash
    - tsc_id: 'microsoft'

````


````

  https://slack.com
  https://accounts.slack.com/login





  ## Tenants
  https://logezy.slack.com
  https://careazy.slack.com

    - check for the domain slug {*}.slack.com
    - pick the first string 
    - search for the database name matching the give `string`
    - establish the connection to that database which has the name `string`
  
````


````
- Users 
- UsersOrganization
- Organizations

    Org1:
      - Profile: pk Users.id

    Org2:
      - Profile pk Users.id

    Org3:
      - Profile pk Users.id
````
  