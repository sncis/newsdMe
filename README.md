# newsd

> For the sake of simplicity I left the repository private and populated some credentials.
> This was on purpose to make it simple to use the functionality without creating own apik key etc.:)


A simple news Website to get an overview of daily updated articles form all around the word. After registration users can store and bookmark articles for a later read. 
This Repository contains the frontend for the NewsdMe WebApplication. It is a stand alone application and can also be used without the backend which is contained in this [Git Repo](https://github.com/snzew/newsdAuthentication). 
The backend is needed for user Registration and Authentication as well as for all actions an authenticated user can perform.
In addition this project is used to shows some implemented measurements taken against common WebAppplication vulnerabilities. At the end of this Document a security sections explains the implemented measurements and shows which measurements could be taken to secure the webApplication even more. The security measures refer only to the Frontend. Backend measures are listed separably in the [Newsauthentication](https://github.com/snzew/newsdAuthentication) README file.

The Threat model for the project can be found on this [miro board](https://miro.com/app/board/o9J_lLlbh3Y=/) or as PDF file in the root folder.\n

A Live version of the project hosted on Heroku can be seen here --> [NewsdMe](https://newsdme.herokuapp.com/)  \n

TO test the app you can use 2 pre-registered accounts:
1. User credentials:
   - username: nantis
   - password: somePass1234! 


2. Admin credentials:
   - usernae: adminUser
   - password: adminPass1234! \n


# Getting Started
NewsdMe is a `ReactJs App` generated with creat-react-app and uses yarn to manage dependencies.
The articles displayde on the Homepage are fetched from Newscatcher for which you would need to create an own API Key on the [rapidApi website](https://rapidapi.com/newscatcher-api-newscatcher-api-default/api/newscatcher).

To run the app localy with https a self-signed certificate would be needed. You can also disable https which will be explained later in the Environment configurations section. 



## Prerequisites

Before you begin make sure to met the following requirements.

* having Node v14.x installed on your machine 
* you have a latest version of yarn/npm installed on your system. (I recommend to use yarn)


## Running NewsdMe locally
To run NewsdMe follow these steps:

(all commands are for Linux/macOs, for Windows please look up the corresponding commands by yourself) 



## Environment configurations

### Disabling HTTPS
HTTPS ins enabled by default. To disable HTTPS disable go to the `.env.development.local` file in the root directory of the project and disable the following three lines.
```
HTTPS=true
SSL_CRT_FILE=*/path/to/certificate/file/*
SSL_KEY_FILE=*/to/yout/certificate/key/file*
```

...go to your `static.json` file in your root directory and set https-only to false:

```
 "https-only": false,
```


### Enabling HTTPS (enabled by default) 
To use HTTPS locally you need a self-signed SSL-sertificate for development purposes. 
If you dont have already a self-signed certificate you can easly create one with [mkCert](https://github.com/FiloSottile/mkcert).

Once having a certificate replace the SSL_CERT_FILE and SSL_CERT_KEY variables in the `env.development.local` with the path to your certifcate.

To only allow HTTPS connection go to your `static.json` file in the root directory and set https-only to true:

```
 "https-only": true,
```



### Using your own Newscatcher API Key 
To fetch articles from Newscatcher you need to generate a Api Key and place it in the `.env.development.local` file.

```
REACT_APP_NEWSCRATCHER_API_KEY=<YOUR_API_KEY>
```



## Running the app

### Installing dependencies

From the root directory, run :

```
$ yarn install
```


### Starting NewsdMe

To start the app run:
```
$ yarn start
```
After starting the App you can open the app in the broser under [https://localhost:3000/] for secure apps or [http://localhost:3000/]

### Testing NewsdMe

To test the app run:
```
$ yarn test
```

## Security Implementation
To secure a Webapp certain security measurements can be taken. Not all of the possible measurements are listed here but the following list will give an overview of implemented security features for common webapp vulerabilities.


### List of implemented security features 

#### Transportation Layer Security 
* security headers
* HTTPS locally as well as on the application hosted on Heroku
* CSRF Token transmitted between backend and frontend 
* JWT Token generated form the backend to ensure user is authenticated and authorised to perform restricted actions

#### Application / Presentation Layer Security 
* User Registration with Email confirmation link
* Password Policy 
* Username and Password login (no 2 Factor Authentication yet) 
* Custom Form validators for Registration and Login Form to make sure user input is valid and not malicious
* Protected routes based on authentication and role based authentication
* Custom validators to valid Data fetched from Newscatcher API and backend before rendering into the DOM 
* Generic Error Messages

### Other measurements 
* using Environment Variables for sensitive Keys and Information
* only using up-to date and not vulnerable third party packages 


### Some other measurements could be  
* 2 Factor Authentication 
* more sophisticated validators
* credentials recovery 
* possibility to change username and password
* protecting against network flooding attacks 
* implementing a Firewall 


