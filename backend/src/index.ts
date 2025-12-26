import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import { yoga } from './graphql/yoga';
import { routerApi } from './router/router';
const PORT = process.env.PORT || 8002
const app = express()

//For GraphQL
app.use('/graphql', yoga)

//For rest apis
app.use('/api', routerApi)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})
