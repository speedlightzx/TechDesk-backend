import dotenv from 'dotenv'
import express from 'express'
import { registerEmpresaController } from './controllers/empresaController'
import { validateLoginController } from './controllers/authController'
import isAuthenticated from './middlewares/isAuthenticated'
import { createFuncionarioController, deleteFuncionarioController, getFuncionariosController, myAccountController, updateFuncionarioController } from './controllers/userController'
import isAdmin from './middlewares/isAdmin'
import cors from "cors"
import cookieparser from 'cookie-parser'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieparser())


app.post('/createEmpresa', registerEmpresaController)
//app.get('/empresaStatus', isAuthenticated) 

app.post('/login', validateLoginController)
app.post('/createFuncionario', isAuthenticated, isAdmin, createFuncionarioController)
app.put('/updateFuncionario', isAuthenticated, isAdmin, updateFuncionarioController) 
app.delete('/deleteFuncionario', isAuthenticated, isAdmin, deleteFuncionarioController)
app.get('/getFuncionarios', isAuthenticated, getFuncionariosController)

app.get('/myAccount', isAuthenticated, myAccountController)

app.listen(8000, () => {
    console.log('Servidor aberto')
})