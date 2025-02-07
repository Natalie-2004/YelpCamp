const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send("hello from yelp camp!")
})

app.listen(3000, () => {
    console.log('Servering on port 3000')
})