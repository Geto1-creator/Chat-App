const express = require('express');
const cors = require('cors');
const connect = require('./common/db/mongodb');
const { userRoutes } = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8001

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('Welcome Home')
})

connect()

app.use(userRoutes)


app.listen(port, (req, res) => {
    console.log('Server running on port: http://localhost:' + port)
});