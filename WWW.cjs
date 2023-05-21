#!/usr/bin/env node
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
 
const app = express();

app.use(express.static("dist"));

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server listening on port", process.env.PORT || 3000)
})