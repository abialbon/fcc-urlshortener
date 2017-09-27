const express   = require("express");
const app       = express();
const path      = require("path");

app.use(express.static(path.join(__dirname, 'public')));

app.get('/new/:url*', (req, res) => {
    const inputUrl = (req.url).split("").splice(5).join("");

    function urlIsValid(url) {
        const urlPattern = /(http(s)?:\/\/)?(www\.)[a-z0-9]*\.(.)*/i;
        return urlPattern.test(url);
    }
    const responseObj = {};
    if (urlIsValid(inputUrl)) {
        responseObj.original_url = inputUrl;
        responseObj.short_url = "To be updated";
    } else {
        responseObj.error = "Wrong url format"
    }
    res.send(JSON.stringify(responseObj));
});

app.listen(process.env.PORT, process.env.IP, () => {
   console.log('The app is running!'); 
});