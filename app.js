const express   = require("express");
const app       = express();
const path      = require("path");
const mongoose  = require("mongoose");
const Url       = require("./model/url.js");

mongoose.connect('mongodb://localhost/url');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/new/:url*', (req, res) => {
    // Get the url and get it formatted
    const inputUrl = (req.url).split("").splice(5).join("");
    // Check for the validity of the URL
    function urlIsValid(url) {
        const urlPattern = /(http(s)?:\/\/)?(www\.)[a-z0-9]*\.(.)*/i;
        return urlPattern.test(url);
    }
    const responseObj = {};
    // If the url is valid --
    if (urlIsValid(inputUrl)) {
        responseObj.original_url = inputUrl;
        // Find if the URL is there in the database and return the short URL
        Url.findOne({url: inputUrl}, function(error, url) {
            // If it's not present, then count the database and add a new number
            if (!url) {
             
                Url.count({}, function(error, count) {
                    let newUrlEntry = {
                        number: count,
                        url: inputUrl
                    }
                    Url.create(newUrlEntry, function(error, urlEntry){
                        responseObj.short_url = req.headers.host + '/' + urlEntry.number;
                        res.send(JSON.stringify(responseObj));
                        return;
                    });
            });
             
            // If present, send the number  
            } else {
                responseObj.short_url = req.headers.host + '/' + url.number;
                res.send(JSON.stringify(responseObj));
                return;
            }
        });
        
    } else {
        responseObj.error = "Wrong url format"
        res.send(JSON.stringify(responseObj));
    }
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log('The app is running!'); 
});