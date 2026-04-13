import cors from 'cors'
import express from 'express'
import router from './router'
import errorHandler from './middlewares/errorHandler'

export const app = express()
export default app

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use("/api", router)
app.use(errorHandler)

const PORT = Number(process.env['PORT']) || 3000

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server iniciado na porta ${PORT}`)
  })
}
