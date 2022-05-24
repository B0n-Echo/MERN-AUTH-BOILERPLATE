const express = require('express');

const app = express();

app.get('/api/signup', (req, res) => {
    res.json({
        data: `you have hit the signup endpoint`
    });
});

const port = process.env.PORT || 8000;
app.listen(port, ()=> {
    console.log(`API is Up and running on port ${port}`);
})