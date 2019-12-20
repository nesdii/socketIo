import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";


let ssn_module = require('./ssn/ssn.js');
//ssn_module = ssn_module.Ssn;
const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
    res.sendFile(path.join(__dirname,'index.html'))
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on('connection', function(socket){

    let ssn_test;

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.emit('hi');

    socket.on('message', function(result) {
        socket.emit('cool', result);
        //socket.emit('ssn', 'Coucou '+result);
        socket.emit('ssn', result+", quel est ton nom ?");
});


    /*socket.on('message', function(message){
        let msg = ['Prenom ?', 'SSN ?'];

        ssn_test  = new ssn_module(message);
        socket.person = {
            nom: "s",
            prenom: "s",
            ssn: ""
        }


        console.log(message);
        socket.emit('ssn', message);
        //socket.emit('cool', message + "socket");
        socket.emit('ssn', ssn_test.isValid());
    });*/



});

const server = http.listen(3000, function() {
    console.log("listening on *:3000");
});