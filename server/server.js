const express = require('express');
const axios = require('axios');

const app = express();

const port=3000;

const api_url= "http://host.docker.internal:3001/api.xro/2.0/Reports/BalanceSheet";

app.get('/api/data', async(req,res)=>{

    try
    {
        const response = await axios.get(api_url);
        const data = response.data;
         // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.json(data);
    }catch(error)
    {
        console.error("Error fetching data",error.message);
    }
});

app.listen(port,()=>{

    console.log(`Backend is running on http://localhost:${port}`);
})