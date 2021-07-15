const nomgoose = require('mongoose');
const axios = require('axios');
var express = require("express");
const app = express();

app.use(express.json())
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    return res.redirect('html/Foodmenu.html');
})
app.post('/foodmenu', (req, res) => {
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.type;
    const imageURL = req.body.imageURL
    console.log(`Got $(name), $(type), $(price), $(imageURL)`)
})
const server = app.listen(3000, () => {
    console.log("Listening on port %s", server.address().port)
        ; (async () => {
            axios.post('html/Foodmenu.html')
            axios({
                url: 'html/Foodmenu.html',
                method: 'post'
            })
        })
})
