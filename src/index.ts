import dotenv from 'dotenv'
import express from 'express'
import { getEmpresaStatusController, registerEmpresaController } from './controllers/empresaController'
import { validateLoginController } from './controllers/authController'
import isAuthenticated from './middlewares/isAuthenticated'
import { createFuncionarioController, deleteFuncionarioController, getFuncionariosController, getMyAccountController, putMyAccountController, updateFuncionarioController } from './controllers/userController'
import isAdmin from './middlewares/isAdmin'
import cors from "cors"
import cookieparser from 'cookie-parser'
import { createChamadoController, getAllChamadosController, getMyChamadosController } from './controllers/chamadoController'
import isTecnicoOrHigher from './middlewares/isTecnicoOrHigher'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieparser())


app.post('/createEmpresa', registerEmpresaController)
app.get('/empresaStatus', isAuthenticated, getEmpresaStatusController) 

app.post('/login', validateLoginController)
app.post('/createFuncionario', isAuthenticated, isAdmin, createFuncionarioController)
app.put('/updateFuncionario', isAuthenticated, isAdmin, updateFuncionarioController) 
app.delete('/deleteFuncionario', isAuthenticated, isAdmin, deleteFuncionarioController)
app.get('/getFuncionarios', isAuthenticated, getFuncionariosController)

app.get('/myAccount', isAuthenticated, getMyAccountController)
app.put('/myAccount', isAuthenticated, putMyAccountController)
app.delete('/myAccount', isAuthenticated, deleteFuncionarioController)

app.post('/createChamado', isAuthenticated, createChamadoController)
app.get('/myChamados', isAuthenticated, getMyChamadosController)
app.get('/allChamados', isAuthenticated, isTecnicoOrHigher, getAllChamadosController)

app.listen(8000, () => {
    console.log('Servidor aberto')
})