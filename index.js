const express = require('express')
const app = express()
const path = require('path')
const usuarios = require('./usuarios.json')


app.listen(8080, () => {
    console.log('Servidor encendido en http://localhost:8080')
})

app.use(express.static('assets'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/abracadabra/usuarios', (req, res) => {
    res.send(usuarios.usuarios)
})

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const nombreUsuario = req.params.usuario
    const usuariosJson = usuarios.usuarios
    const nameFind = usuariosJson.find((us) => us === nombreUsuario)
    if (nameFind) {
        next()
    } else {
        res.redirect('/assets/who.jpg')
    }
})

app.get('/abracadabra/juego/:usuario', (req, res, next) => {
    res.redirect('/')
})

app.get('/abracadabra/conejo/:n', (req, res) => {
    const n = Math.floor(Math.random() * (5 - 1) + 1)
    const number = parseInt(req.params.n)

    if (number === n) {
        res.redirect('/conejito.jpg')
    }else {
        res.redirect('/voldemort.jpg')
    }
})

app.get("*", (req, res) => {
    res.send('<h1>La pagina a la cual deseea acceder no existe, favor intente nuevamente</h1>')
})