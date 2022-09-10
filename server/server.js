// initiate express
const express = require('express');
const app = express();

// assign PORT
const PORT = 5000;

//Modules


// set up static file server
app.use(express.static('server/public'));

// turn on req.body
app.use(express.urlencoded({ extended: true }));




















// object coming in













// listen on PORT channel 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})



