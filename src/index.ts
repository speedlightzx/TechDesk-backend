import dotenv from 'dotenv'
import express from 'express'
import { cadastrarEmpresaController } from './controllers/empresaController'

dotenv.config()
const app = express()

app.use(express.json())

app.post('/cadastrarEmpresa', cadastrarEmpresaController)

app.listen(8000, () => {
    console.log('Servidor aberto')
})