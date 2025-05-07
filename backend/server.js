const express = require("express")
const cors = require("cors")
const paymentRouter = require("./routes/paymentRoutes")
require('dotenv').config()


const port = process.env.PORT ||5000

const app = express()
app.use(express.json())
app.use(cors())



app.use('/api/payment',paymentRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', (req,res) => {
    res.send(`Server is running on port ${port}`)
})