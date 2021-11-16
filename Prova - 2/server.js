const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 8080
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname,"public")))

server.listen(PORT)

const connections = [null, null]

io.on('connection', socket => {
    let jogador
    if(connections[0] == null){
        jogador = 1;
    }else if(connections[1] == null){
        jogador = 2;
    }else{
        jogador = 3
    }


    socket.emit('numero-jogador', jogador)

    if(jogador == 3) return

    connections[jogador-1] = false

    socket.broadcast.emit('jogadores-conectados', jogador)

    socket.on('disconnect', () =>{
        if(jogador<3)
            connections[jogador-1] = null
        socket.broadcast.emit('jogadores-conectados', jogador)
        socket.broadcast.emit('cancela-pronto', jogador)
    })
    
    socket.on('jogador-pronto', () =>{
        connections[jogador-1] = true
        socket.broadcast.emit('oponente-pronto', jogador)
    })

    socket.on('verifica-jogadores', () =>{
        const jogadores = []
        for(let i = 0; i < 2; i++){
            connections[i] == null ? jogadores.push({connected: false, ready: false}) : jogadores.push({connected: true, ready: connections[i]}) 
        }
        socket.emit('verifica-jogadores', jogadores)
    })

    socket.on('envia-lista', elements =>{
        socket.broadcast.emit('envia-lista', elements)
    })

    socket.on('ataque-navio', elements =>{
        socket.broadcast.emit('ataque-navio', elements)
    })

    socket.on('ataque-agua', elements =>{
        socket.broadcast.emit('ataque-agua', elements)
    })

    socket.on('fim-de-jogo', elements =>{
        socket.broadcast.emit('fim-de-jogo', elements)
    })
})