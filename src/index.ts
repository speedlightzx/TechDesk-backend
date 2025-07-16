import dotenv from 'dotenv'
import express from 'express'
import { registerEmpresaController } from './controllers/empresaController'
import { validateLoginController } from './controllers/authController'

dotenv.config()
const app = express()
app.use(express.json())

app.post('/cadastrarEmpresa', registerEmpresaController)
app.post('/login', validateLoginController)

app.listen(8000, () => {
    console.log('Servidor aberto')
})