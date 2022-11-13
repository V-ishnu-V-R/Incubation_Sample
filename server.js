const express= require('express')
const app= express()
require('dotenv').config()
app.use(express.json()) 
const dbConfig=require('./config/dbConfig')
const userRoute=require('./routes/userRoute')

app.use('/api/user',userRoute) //whenever api call is coming with keyword api/user it should go and check api endPoints on the userRouter
//to destructure the user entred format 
const port= process.env.PORT || 5000;

app.listen(port,()=>{console.log(`listening on the ports:${port}`);})

