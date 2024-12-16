import dotenv from 'dotenv'
import express  from 'express'
import mongoose from 'mongoose'
import recipeRoutes from './routes/recipeRoutes'

dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI!)
    .then(() => console.log('Conectado ao Mongo'))
    .catch((error) => console.error('Erro ao se conectar ao Mongo', error))

app.use('/api', recipeRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})



