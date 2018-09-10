# Friends Management API Server
SP Digital Friends API with Node, Express &amp; Mongoose, with Mocha and Chai for testing. 

This API server is hosted on https://sp.builtforfifty.com

Repository for SP Digital Full Stack Engineer Assignment
========================================================

Tools
-----

- [Node JS](http://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Mocha](https://mochajs.org/)
- [Chai](http://www.chaijs.com/)
- [Heroku](https://www.heroku.com)
- [Travis](https://travis-ci.com)
- [Visual Studio Code](https://code.visualstudio.com/)

Tools considered
----------------

- [GraphQL](https://graphql.org/)

A basic REST solution was sufficient for the requirements of this assignment. The opportunity to implement GraphQL was exciting, but I might not have been able to complete the assignment within the time constraint. 

- [Go](https://golang.org/)

As Go is something I wish to be working with at some point in the future, I attempt a Go version of this implementation [here](https://github.com/abuuzayr/sp-friends-api-go).

Endpoints
---------

The below endpoints assume that basic validation is done on the front-end for: 

- email address validation
- text provided in JSON body are escaped

### 1. `/friends/new`

User story: **As a user, I need an API to create a new friend.**

#### Request body: 

```
{
  email: 'andy@example.com'
}
```

#### Responses:

**Success**

```
{
  "success": true
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- Duplicate email - this user already exists
- Invalid JSON body sent 

### 2. `/friends/link`

User story: **As a user, I need an API to create a friend connection between two email addresses.**

#### Request body: 

```
{
  friends:
    [
      'andy@example.com',
      'john@example.com'
    ]
}
```

#### Responses:

**Success**

```
{
  "success": true
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- These two email addresses are already friends. 
- There are more than two email addresses provided. 
- One of the email addresses has blocked the other from connecting as friends. 
- Invalid JSON body sent 

### 3. `/friends/:id`

User story: **2. As a user, I need an API to retrieve the friends list for an email address.**

#### Request body: 

```
{
  email: 'andy@example.com'
}
```

#### Responses:

**Success**

```
{
  "success": true,
  "friends" :
    [
      'john@example.com'
    ],
  "count" : 1   
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- This email address does not exist. 
- Invalid JSON body sent 

### 4. `/friends/common`

User story: **3. As a user, I need an API to retrieve the common friends list between two email addresses.**

#### Request body: 

```
{
  friends:
    [
      'andy@example.com',
      'john@example.com'
    ]
}
```

#### Responses:

**Success**

```
{
  "success": true,
  "friends" :
    [
      'common@example.com'
    ],
  "count" : 1   
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- One or both the email addresses do not exist. 
- Invalid JSON body sent 

### 5. `/friends/subscribe`

User story: **4. As a user, I need an API to subscribe to updates from an email address.**

#### Request body: 

```
{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
```

#### Responses:

**Success**

```
{
  "success": true
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- The requestor email addresses does not exist. 
- The target email addresses does not exist. 
- The requestor email address has been blocked from subscribing to the target email address. 
- Invalid JSON body sent 

### 6. `/friends/block`

User story: **5. As a user, I need an API to block updates from an email address.**

Suppose "andy@example.com" blocks "john@example.com":

- if they are connected as friends, then "andy" will no longer receive notifications from "john"
- if they are not connected as friends, then no new friends connection can be added

#### Request body: 

```
{
  "requestor": "andy@example.com",
  "target": "john@example.com"
}
```

#### Responses:

**Success**

```
{
  "success": true
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- The requestor email addresses does not exist. 
- The target email addresses does not exist. 
- Invalid JSON body sent 

### 7. `/friends/recipients`

User story: **6. As a user, I need an API to retrieve all email addresses that can receive updates from an email address.**

Eligibility for receiving updates from i.e. "john@example.com":
- has not blocked updates from "john@example.com", and
- at least one of the following:
  - has a friend connection with "john@example.com"
  - has subscribed to updates from "john@example.com"
  - has been @mentioned in the update

#### Request body: 

```
{
  "sender":  "john@example.com",
  "text": "Hello World! kate@example.com"
}
```

#### Responses:

**Success**

```
{
  "success": true
  "recipients":
    [
      "lisa@example.com",
      "kate@example.com"
    ]
}
```

**Errors**

```
{
  "error": true,
  "error_msg": ""
}
```

Caught errors:

- The sender email addresses does not exist. 
- Invalid JSON body sent 

Deployment
----------

A sample of this server is deployed to Heroku automatically using Travis. Deployment is automatically triggered via `git push` to this repository. 

You may also clone this repository to your machine and run:

`npm install && node server.js`

Testing API endpoints
---------------------

Tests run on Mocha and Chai and are run using `npm test`. 

Also, you may test the API endpoints using Postman. 