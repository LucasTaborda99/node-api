const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const porta = 3000

let cors = require('cors')

// constante para guardar dados de um usuario
const usuarios = []

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './views')
app.set('view engine', 'ejs')

// Chama a página index
app.get('', (req, res) => {
    res.render('index', { text: 'EJS' })
})

// Chama a página about
app.get('/about', (req, res) => {
    res.render('about', { text: 'About' })
})

// Cria um usuário
app.post('/usuarios', (req, res) => {
    console.log(JSON.stringify(req.body.id))
    try {
        const {id, nome} = req.body
        const usuario = { id, nome }
        usuarios.push(usuario)
        return res.status(201).json(usuario)

    } catch (error) {
        console.log(error)
        res.write(error)
        return res.end()
    }
})

// Seleciona todos os usuários
app.get('/usuarios', (req, res) => {
    try {
        const todosUsuarios = usuarios
        return res.status(200).json(todosUsuarios)

    } catch (error) {
        console.log(error)
        res.write(error)
        return res.end()
    }
})

// Seleciona um usuário
app.get('/usuarios/:usuario_id', (req, res) => {
    try {
        const { usuario_id } = req.params
        const usuario = usuarios.find((usuario) => usuario.id === usuario_id)
        if (!usuario) res.status(404).json('not found')
        return res.status(200).json(usuario)

    } catch (error) {
        console.log(error)
        res.write(error)
        return res.end()
    }
})

// Deleta um usuário
app.delete('/usuarios/:usuario_id', (req, res) => {
    try {
        const { usuario_id } = req.params
        let usuariosFiltrado = usuarios.filter((usuario) => usuario.id != usuario_id)
        usuarios = usuariosFiltrado
        return res.status(204).json('deleted')

    } catch (error) {
        console.log(error)
        res.send(error)
        return res.end()
    }
})

// Atualiza um usuário
app.patch('/usuarios/:usuario_id', (req, res) => {
    try {
        const { nome } = req.body
        const { usuario_id } = req.params
        const usuario = usuarios.find( usuario => usuario.id === usuario_id)
        usuario.id = usuario.id
        usuario.nome = nome ? nome : usuario.nome
        return res.status(200).json(usuario)

    } catch (error) {
        console.log(error)
        res.send(error)
        return res.end()
    }
})

app.listen(porta, () => console.info(`Ouvindo na porta ${porta}`))