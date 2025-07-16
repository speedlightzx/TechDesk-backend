import dotenv from 'dotenv'
import express from 'express'
import { registerEmpresaController } from './controllers/empresaController'
import { validateLoginController } from './controllers/authController'
import isAuthenticated from './middlewares/isAuthenticated'
import { createFuncionarioController } from './controllers/userController'

dotenv.config()
const app = express()
app.use(express.json())

app.post('/cadastrarEmpresa', registerEmpresaController)
app.post('/login', validateLoginController)
app.post('/createFuncionario', isAuthenticated, createFuncionarioController)

app.listen(8000, () => {
    console.log('Servidor aberto')
})