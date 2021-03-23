if(process.env.NODE_ENV === "development") {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const router = require('./routers')
const errorHandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})