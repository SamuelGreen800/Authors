const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors({ origin: 'http://localhost:3000'} ))
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');    
require('./routes/author.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );
