```
                                                
                                                
EEEEEEEEEEEEEEEEEEEEEE     XXXXXXX       XXXXXXX
E::::::::::::::::::::E     X:::::X       X:::::X
E::::::::::::::::::::E     X:::::X       X:::::X
EE::::::EEEEEEEEE::::E     X::::::X     X::::::X
  E:::::E       EEEEEE     XXX:::::X   X:::::XXX
  E:::::E                     X:::::X X:::::X   
  E::::::EEEEEEEEEE            X:::::X:::::X    
  E:::::::::::::::E             X:::::::::X     
  E:::::::::::::::E             X:::::::::X     
  E::::::EEEEEEEEEE            X:::::X:::::X    
  E:::::E                     X:::::X X:::::X   
  E:::::E       EEEEEE     XXX:::::X   X:::::XXX
EE::::::EEEEEEEE:::::E     X::::::X     X::::::X
E::::::::::::::::::::E     X:::::X       X:::::X
E::::::::::::::::::::E     X:::::X       X:::::X
EEEEEEEEEEEEEEEEEEEEEE     XXXXXXX       XXXXXXX
                                             
                                                
```

EX is the newest client and user-facing application for GroovePacker, replacing the
older Angular based web interface.

The goal of the project is to power the web, ios, and android versions of Groove Packer
and talking via API to the Rails-backend.

##Setup

The Project uses Expo+NPM+Node for development
and if you want to learn more about how to develop
and setup Expo, check out the [Expo Getting Started Guide](https://docs.expo.dev/index.html)
#### Install Expo-Cli
 
`npm install -g expo-cli`

After this, make sure to `npm install` as you would
a normal node project

For developing locally, you want to run the local
environment:

`expo start`

## Deployment

We use CI to ensure the builds pass before merging in PR's.

`expo build:android`

`expo build:ios`
