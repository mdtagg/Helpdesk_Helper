import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios';
import cors from 'cors'


const port = 3000;
const app = express(); 

app.use(express.json())
app.use(cors())

app.post('/',async (req,res) => {
  
  const data = await req.body
  const key = dotenv.config().parsed.VITE_MIKETESTING_KEY

  await fetch(key,{
    method:"POST",
    mode:"cors",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
  })
  console.log('200')
  res.sendStatus(200)
})

app.listen(port, () => {
  console.log("Listening on port 3000")
})