import express from 'express'
import { runCaseBuilder } from './config/init'

const app = express()
const port = 3000

runCaseBuilder();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})