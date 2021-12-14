# mb-chatting-time
A real-time chat app built by react-native and socket.io from backend and connect frontend by the socket. io-client. The main library used is Gifted chat UI

## Technologies used:

React Native (Hook), Socket.IO, Socket.IO-Cliend, Nodejs, Nodemon, and Gifted Chat UI.

## Installation:
Please see the instructions in the documentations below:

* [Expo](https://docs.expo.dev/get-started/installation/) and init the mobile project
* [socket.io](https://socket.io/get-started/chat/) in backend server and in App.js install [socket.io-client](https://socket.io/docs/v4/client-installation/) by npm install or yarn add
* [Nodemon](https://www.npmjs.com/package/nodemon) for automatically showing what changed in the server
* [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## Get started

#### Clone the project:

```python
# clone the project to your local computer
$ git clone git@github.com:windyinmay/mb-chatting-time.git
```

#### Change the local IP addres:

```python
# Open terminal and check for the IP address
$ ifconfig (MacOs)
$ ipconfig (Windows)

# In chatting-time/HomeScreen.js/, change the IP you found above, and add to the link below, remember add the port 3030 (...:3030)
socket.current = io("local_IP_address:3030");
```

#### Start running backend:

```python
# opend terminal in the repository backend-socket.io/server.js, a log will print "a socket connected" and random id
$ nodemon server.js
```

#### Start running frontend:

```python
# opend terminal in the repository chatting-time/App.js
$ yarn start or expo start
```
