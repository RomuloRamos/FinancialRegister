# FinancialRegister
It's a simple project API with Typescrip, Typeorm, Postgres, Docker Compose and NodeJs

# Introdução
This project register users and their financial transactions in a Postgres database.
Each user need be created to the database, and authenticate before register and find for transactions.
To authentication, there are tokens generated with #jsonwebtoken library. This tokens should be generated during the user password validation and should be maintained during request.

# Setup Instructions
- Clone Master repository;
- Install all packages with command: npm i
- Set docker compose with command: docker-compose up -d
- Check if database is running in Docker;
- Set a .env file like .env.example file, and pay attention to database variables, need be equal to pointed in docker-compose.yml file;
- Generate the tables to database with command: yarn typeorm migration:run
- Run the aplication with command: yarn dev

# Insomnia API Client To Test
- You can Import a Insomnia Json file to test the requests to API. It's in "InsomniaClientData" folder. 

# Endpoints

1. User Register: 
   - Path: Post -> /api/v1/user
   - Request body (JSON):
    * login (string, unic, not null) 
    * password (string, must contain at least eight characters, should contain at least one uppercase letter, at least once lower case, at least once number and once special character)
    * email (string, valid)
    * name (string, not null or empty)
    * birthDate (date, valid, +18)

2. User Authentication with JWT
    - Path: Post -> /api/v1/auth
    - Request body (JSON):
     * username
     * password
    - Response body (JSON):
     * token
    
3. User authentication check
    - Path: Get -> /api/v1/auth
    - Headers: 
     * Authorization: Bearer <token>
    - Response payload:
     * userId
     * name
     
4. New transaction 
    - Path: Post -> /api/v1/transaction
    - Headers: 
     * Authorization: Bearer <token>
    - Request body (JSON):
     * date (date, mandatory)
     * income (numeric, >=0, mandatory)
     * outflow (numeric, >=0, mandatory)
     * description (string, mandatory, not null or empty)
    - Response body (JSON)
     * id
     * date
     * income
     * outflow
     * description

5. Update Transaction 
    - Path: Put -> /api/v1/transaction/:transactionId
    - Headers: 
     * Authorization: Bearer <token>
    - Request body (JSON):
     * date (date, mandatory)
     * income (numeric, >=0, mandatory)
     * outflow (numeric, >=0, mandatory)
     * description  (string, mandatory, not null or empty)
    - Response body (JSON)
     * id
     * date
     * income
     * outflow
     * description

6. User transactions
    - Path: Get -> /api/v1/transaction
    - Query: 
     * description (opcional)
     * date (optional)
     * income (optional)
     * outflow (optional)
    - Headers: 
     * Authorization: Bearer <token>
    - Response body (JSON)
     * records (transactions array)
     * recordsTotal (number)
     * pageNumber (number)
     * pageSize (number)
     * balance (number --> Result of differece betwen incomes and outflow to all transactions)

7. Find one user transaction
    - Path: Get -> /api/v1/transaction/:transactionId
    - Headers: 
     * Authorization: Bearer <token>
    - Response body (JSON)
     * date
     * income
     * outflow
     * description

8. Delete a user transaction
    - Path: Get -> /api/v1/transaction/:transactionId
    - Headers: 
     * Authorization: Bearer <token>
