const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const port  = process.env.PORT || 5000
const authRoute = require('./routes/authRoute')
const propertyRoute = require('./routes/propertyRoute')

dotenv.config()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MONGO"))
  .catch((err) => console.log(err));
  
app.use("/auth", authRoute)
app.use("/property", propertyRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
