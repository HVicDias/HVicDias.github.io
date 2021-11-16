document.addEventListener('DOMContentLoaded', () => {
    //Variables start
    const tabelaUsuario = document.querySelector('.tabela-usuario')
    const tabelaOponente = document.querySelector('.tabela-oponente')
    const ships = document.querySelectorAll('.ship')
    const player = document.querySelector('#player')
    const conexao = document.querySelector('#player2Connection')
    const startBtn = document.querySelector('#comecar')
    const vez = document.querySelector('#vez')
    const info = document.querySelector('#info')
    const navioAleatorioBtn = document.querySelector('#navioAleatorio')
    const matrizUsuario = []
    const matrizOponente = []

    let shipMask
    let celulaMapa
    let iMask = null
    let jMask = null
    let canDrop = false
    let currentShip
    let dblClickShip
    let haveMask = false
    let start = false
    let userPoints = 0
    let opponentPoints = 0
    let fimDeJogo = false
    let vezUsuario = false
    let iAtaque = -1
    let jAtaque = -1
    let celula

    let numJogador
    let pronto = false
    let oponentePronto = false

    const socket = io();

    let shipsUser = [{
        name: 'one-one',
        orientation: '',
        length: 1,
        position: [{ x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'one-two',
        orientation: '',
        length: 1,
        position: [{ x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'one-three',
        orientation: '',
        length: 1,
        position: [{ x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'one-four',
        orientation: '',
        length: 1,
        position: [{ x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'two-one',
        orientation: '',
        length: 2,
        position: [{ x: -1, y: -1 }, { x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'two-two',
        orientation: '',
        length: 2,
        position: [{ x: -1, y: -1 }, { x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'two-three',
        orientation: '',
        length: 2,
        position: [{ x: -1, y: -1 }, { x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'three-one',
        orientation: '',
        length: 3,
        position: [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'three-two',
        orientation: '',
        length: 3,
        position: [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }],
        ships: []
    },
    {
        name: 'four',
        orientation: '',
        length: 4,
        position: [{ x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }, { x: -1, y: -1 }],
        ships: []
    }
    ]

    let shipsOponent 

    //variables end

    //server (listen and request) start
    socket.on('numero-jogador', num => {
        if (num == 3) {
            location.href = "/lotado.html";
        } else {
            if (num == 1) {
                vezUsuario = true
            }
            numJogador = num;
            player.innerHTML = "Jogador " + numJogador
            conexao.innerHTML = 'Conectando...'

            socket.emit('verifica-jogadores')
        }
    })

    socket.on('verifica-jogadores', jogadores =>{
        conexao.innerHTML == 'Conectando...'
        if(jogadores[(parseInt(numJogador)%2)].connected)
            conexao.innerHTML =  'Jogador '+ ((parseInt(numJogador)%2) + 1)+ ' Conectado'
        
        if(jogadores[(parseInt(numJogador)%2)].ready)
            conexao.innerHTML = 'Jogador '+ ((parseInt(numJogador)%2)+1)+ ' Pronto'
    })

    socket.on('jogadores-conectados', num => {
        if (numJogador == 1 & parseInt(num) == 2) {
            if (conexao.innerHTML == 'Conectando...')
                conexao.innerHTML = 'Jogador 2 Conectado'
            else conexao.innerHTML = 'Conectando...'
        }
        else if (numJogador == 2 & parseInt(num) == 1) {
            if (conexao.innerHTML == 'Conectando...')
                conexao.innerHTML = 'Jogador 1 Conectado'
            else conexao.innerHTML = 'Conectando...'
        }

    })

    socket.on('oponente-pronto', jogador =>{
        if(jogador != numJogador){
            oponentePronto = true
            conexao.innerHTML = 'Jogador '+ ((parseInt(numJogador)%2)+1)+ ' Pronto'
        }
    })

    socket.on('cancela-pronto', jogador =>{
        if(jogador != numJogador){
            oponentePronto = false
        }
    } )

    socket.on('envia-lista', element =>{
        if(element.jogador != numJogador){
            shipsOponent = element.lista
        }
    } )
    
    //server end

    //events start
    navioAleatorioBtn.addEventListener('click', () => {
        limparNavios(shipsUser, matrizUsuario)
        shipsUser.forEach(ship => {
            generate(ship, matrizUsuario, shipsUser, true)
        })
    })
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))

    matrizUsuario.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('dragstart', dragStart)))

    matrizUsuario.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('dragenter', dragEnter)))

    matrizUsuario.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('drop', drop)))

    matrizUsuario.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('dragend', dragEnd)))

    matrizUsuario.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('dblclick', dblClick)))

    matrizUsuario.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('dragover', dragOver)))

    startBtn.addEventListener('click', async  () => {
        startBtn.disabled = true
        navioAleatorioBtn.disabled = true
        pronto = true
        start = true
        socket.emit('jogador-pronto')
        while(!(oponentePronto && pronto)){
            console.log("Aguardando outro jogador")
            await sleep(2000)
        }

        socket.emit('envia-lista', {lista: shipsUser, jogador: numJogador})

        matrizOponente.forEach(linha =>
            linha.forEach(celula => celula.addEventListener('click', ataqueOponente)))

        jogo()
    })
    //events end


    //drag and drop
    function criaTabuleiroUser() {
        for (let i = 0; i < 10; i++) {
            const linha = document.createElement('tr')
            tabelaUsuario.append(linha);
            let linhaMatriz = []
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('td')
                cell.className = "userCell"
                cell.id = 10 * i + j
                tabelaUsuario.append(cell);
                linhaMatriz.push(cell)
            }
            matrizUsuario.push(linhaMatriz)
        }
    }

    function criaTabuleiroOponent() {
        for (let i = 0; i < 10; i++) {
            let linhaMatriz = []
            const linha = document.createElement('tr')
            tabelaOponente.append(linha);
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('td')
                cell.className = "oponentCell"
                cell.id = 10 * i + j
                tabelaOponente.append(cell)
                linhaMatriz.push(cell)
            }
            matrizOponente.push(linhaMatriz)
        }
    }

    criaTabuleiroUser()
    criaTabuleiroOponent()

    function generate(element, matriz, shipList, visual) {
        let orient = ['vertical', 'horizontal']
        element.orientation = orient[Math.floor(Math.random() * 2)]
        let randomI
        let randomJ
        let validate
        do {
            validate = true
            if (element.orientation == 'vertical') {
                do {
                    randomI = Math.floor(Math.random() * 9)
                } while (randomI + (element.length - 1) > 9);
                randomJ = Math.floor(Math.random() * 9)

                shipList.forEach(ship => {
                    for (let i = 0; i < element.length; i++) {
                        ship.position.forEach(coordenada => {
                            if (coordenada.x == randomI + i && coordenada.y == randomJ) {
                                validate = false
                            }
                        })
                    }
                })
            } else {
                do {
                    randomJ = Math.floor(Math.random() * 9)
                } while (randomJ + element.length - 1 > 9);
                randomI = Math.floor(Math.random() * 9)

                shipList.forEach(ship => {
                    for (let i = 0; i < element.length; i++) {
                        ship.position.forEach(coordenada => {
                            if (coordenada.x == randomI && coordenada.y == randomJ + i) {
                                validate = false
                            }
                        })
                    }
                })
            }
        } while (!validate);


        if (element.orientation == 'vertical') {
            let i = 0
            element.position.forEach(coordenada => {
                if (visual) {
                    let ship = document.createElement('div')
                    ship.className = 'ship ' + element.name
                    ship.id = element.name
                    ship.draggable = 'true'
                    matriz[randomI + i][randomJ].append(ship)
                    element.ships.push(ship)
                }

                coordenada.x = randomI + i
                coordenada.y = randomJ
                i++
            })
        } else {
            let i = 0
            element.position.forEach(coordenada => {
                if (visual) {
                    let ship = document.createElement('div')
                    ship.className = 'ship ' + element.name
                    ship.id = element.name
                    ship.draggable = 'true'
                    matriz[randomI][randomJ + i].append(ship)
                    element.ships.push(ship)
                }

                coordenada.x = randomI
                coordenada.y = randomJ + i
                i++
            })
        }
    }

    function limparNavios(shipsUser, matriz) {
        shipsUser.forEach(ship => {
            let i = 0
            ship.position.forEach(coordenada => {
                matriz[coordenada.x][coordenada.y].removeChild(ship.ships[i])
                i++
                coordenada.x = -1
                coordenada.y = -1
            })
            for (let j = 0; j < i; j++) {
                ship.ships.pop()
            }
        })
    }

    shipsUser.forEach(ship => {
        generate(ship, matrizUsuario, shipsUser, true)
    })

    function dblClick() {
        if (start) return
        let jAux = this.id % 10
        let iAux = (this.id - jAux) / 10

        let k = 0

        shipsUser.forEach(ship => {
            ship.position.forEach(coordenada => {
                if (coordenada.x == iAux && coordenada.y == jAux) {
                    dblClickShip = ship
                }
                k++
            })
        })
        validate = true
        if (dblClickShip.orientation == 'horizontal') {

            shipsUser.forEach(ship => {
                for (let i = 1; i < dblClickShip.length; i++) {
                    ship.position.forEach(coordenada => {
                        if (coordenada.x == iAux + i && coordenada.y == jAux) {
                            validate = false
                        }
                        if (iAux + i > 9) validate = false
                    })
                }
            })
        } else {

            shipsUser.forEach(ship => {
                for (let i = 1; i < dblClickShip.length; i++) {
                    ship.position.forEach(coordenada => {
                        if (coordenada.x == iAux && coordenada.y == jAux + i) {
                            validate = false
                        }
                        if (jAux + i > 9) validate = false
                    })
                }
            })
        }
        if (haveMask) {
            celulaMapa.removeChild(shipMask)
            haveMask = false
        }



        if (validate) {
            shipsUser.forEach(ship => {
                if (ship.name == dblClickShip.name) {
                    ship.position.forEach(coordenada => {
                        if (coordenada.x == iAux && coordenada.y == jAux) {
                            if (ship.orientation == 'vertical') {
                                ship.orientation = 'horizontal'
                            } else {
                                ship.orientation = 'vertical'
                            }
                        }
                    })

                }
            })
            let i = 0
            dblClickShip.position.forEach(coordenada => {
                matrizUsuario[coordenada.x][coordenada.y].removeChild(dblClickShip.ships[i])
                i++
            })
            for (let j = 0; j < i; j++) {
                dblClickShip.ships.pop()
            }

            if (dblClickShip.orientation == 'vertical') {
                let i = 0
                dblClickShip.position.forEach(coordenada => {

                    let shipHtml = document.createElement('div')
                    shipHtml.className = 'ship ' + dblClickShip.name
                    shipHtml.id = dblClickShip.name
                    shipHtml.draggable = 'true'
                    matrizUsuario[iAux + i][jAux].append(shipHtml)
                    dblClickShip.ships.push(shipHtml)

                    coordenada.x = iAux + i
                    coordenada.y = jAux
                    i++
                })
            } else {
                let i = 0
                dblClickShip.position.forEach(coordenada => {

                    let shipHtml = document.createElement('div')
                    shipHtml.className = 'ship ' + dblClickShip.name
                    shipHtml.id = dblClickShip.name
                    shipHtml.draggable = 'true'
                    matrizUsuario[iAux][jAux + i].append(shipHtml)
                    dblClickShip.ships.push(shipHtml)

                    coordenada.x = iAux
                    coordenada.y = jAux + i
                    i++
                })
            }
        }
    }

    function dragStart() {
        if (start) return
        let jAux = this.id % 10
        let iAux = (this.id - jAux) / 10
        let k = 0

        shipsUser.forEach(ship => {
            ship.position.forEach(coordenada => {
                if (coordenada.x == iAux && coordenada.y == jAux) {
                    currentShip = ship
                }
                k++
            })
        })
    }
    function dragOver(e) {
        e.preventDefault()
    }

    function dragEnter(e) {
        e.preventDefault()
        if (start) return


        if (jMask != this.id % 10 || iMask != (this.id - jMask) / 10) {
            if (haveMask) {
                celulaMapa.removeChild(shipMask)
                haveMask = false
            }


            jMask = this.id % 10
            iMask = (this.id - jMask) / 10

            canDrop = true
            shipsUser.forEach(ship => {
                ship.position.forEach(coordenada => {
                    if (coordenada.x == iMask && coordenada.y == jMask) canDrop = false
                })
            })
            if (canDrop) {
                celulaMapa = this
                shipMask = document.createElement('div')
                shipMask.className = 'ship-mask'
                this.append(shipMask)
                haveMask = true
            }
        }
    }

    function drop() {
        if (start) return

        validate = true
        if (currentShip.orientation == 'vertical') {

            shipsUser.forEach(ship => {
                for (let i = 0; i < currentShip.length; i++) {
                    ship.position.forEach(coordenada => {
                        if (coordenada.x == iMask + i && coordenada.y == jMask) {
                            validate = false
                        }
                        if (iMask + i > 9) validate = false
                    })
                }
            })
        } else {

            shipsUser.forEach(ship => {
                for (let i = 0; i < currentShip.length; i++) {
                    ship.position.forEach(coordenada => {
                        if (coordenada.x == iMask && coordenada.y == jMask + i) {
                            validate = false
                        }
                        if (jMask + i > 9) validate = false
                    })
                }
            })
        }
        if (haveMask) {
            celulaMapa.removeChild(shipMask)
            haveMask = false
        }

        if (validate) {

            let i = 0
            currentShip.position.forEach(coordenada => {
                matrizUsuario[coordenada.x][coordenada.y].removeChild(currentShip.ships[i])
                i++
            })
            for (let j = 0; j < i; j++) {
                currentShip.ships.pop()
            }

            if (currentShip.orientation == 'vertical') {
                let i = 0
                currentShip.position.forEach(coordenada => {

                    let ship = document.createElement('div')
                    ship.className = 'ship ' + currentShip.name
                    ship.id = currentShip.name
                    ship.draggable = 'true'
                    matrizUsuario[iMask + i][jMask].append(ship)
                    currentShip.ships.push(ship)


                    coordenada.x = iMask + i
                    coordenada.y = jMask
                    i++
                })
            } else {
                let i = 0
                currentShip.position.forEach(coordenada => {

                    let ship = document.createElement('div')
                    ship.className = 'ship ' + currentShip.name
                    ship.id = currentShip.name
                    ship.draggable = 'true'
                    matrizUsuario[iMask][jMask + i].append(ship)
                    currentShip.ships.push(ship)


                    coordenada.x = iMask
                    coordenada.y = jMask + i
                    i++
                })
            }
        }
    }

    function dragEnd() {
        if (start) return
        if (haveMask) {
            celulaMapa.removeChild(shipMask)
            haveMask = false
        }
    }

    //drag and drop end

    //game logic

    //game server
    socket.on('ataque-navio', element =>{
        iAtaque = element.i
        jAtaque = element.j
        shipsUser.forEach(ship => {
            let k = 0
            ship.position.forEach(coordenada => {
                if (coordenada.x == iAtaque && coordenada.y == jAtaque) {
                    isShip = true
                    attackedShip = ship
                    ship.ships[k].className = 'your-sinked-ship'
                    coordenada.x = -1
                    coordenada.y = -1
                    opponentPoints++
                }
                k++
            })
        })

        let sinked = true
        attackedShip.position.forEach(coordenada => {
            if (coordenada.x != -1 || coordenada.y != -1) sinked = false
        })

        if (sinked) {
            info.innerHTML = 'navio destruido'
        } else {
            info.innerHTML = 'parte de navio destruido'
        }
    })

    socket.on('ataque-agua', element =>{
        iAtaque = element.i
        jAtaque = element.j
        let ocean = document.createElement('div')
        ocean.className = 'ocean'
        matrizUsuario[iAtaque][jAtaque].append(ocean)
        vezUsuario = !vezUsuario
        info.innerHTML = 'tiro na agua'

        jogo()
    })

    socket.on('fim-de-jogo', element =>{
        vez.innerHTML = element
        fimDeJogo = true
    })


    //game server end

    function ataqueOponente() {
        if (!start || !vezUsuario || fimDeJogo) return

        if (this.className === 'Atacado') return

        celula = this
        celula.className = "Atacado"
        let isShip = false
        let attackedShip

        jAtaque = this.id % 10
        iAtaque = (this.id - jAtaque) / 10


        shipsOponent.forEach(ship => {
            ship.position.forEach(coordenada => {
                if (coordenada.x == iAtaque && coordenada.y == jAtaque) {
                    isShip = true
                    attackedShip = ship
                    coordenada.x = -1
                    coordenada.y = -1
                    userPoints++
                    let sinked = document.createElement('div')
                    sinked.className = 'sinked-ship'
                    matrizOponente[iAtaque][jAtaque].append(sinked)

                    socket.emit('ataque-navio', {i: iAtaque, j: jAtaque})
                }
            })
        })

        if (!isShip) {
            let ocean = document.createElement('div')
            ocean.className = 'ocean'
            matrizOponente[iAtaque][jAtaque].append(ocean)
            vezUsuario = !vezUsuario
            info.innerHTML = 'tiro na agua'
            socket.emit('ataque-agua', {i:iAtaque,j:jAtaque})
        } else {
            let sinked = true
            attackedShip.position.forEach(coordenada => {
                if (coordenada.x != -1 || coordenada.y != -1) sinked = false
            })

            if (sinked) {
                info.innerHTML = 'navio destruido'
            } else {
                info.innerHTML = 'parte de navio destruido'
            }
        }
        jogo()
    }


    function jogo() {
        if(!(pronto && oponentePronto)) return

        if (userPoints == 20) {
            fimDeJogo = true
            vez.innerHTML = 'Jogador '+numJogador+' ganhou a partida'
            socket.emit('fim-de-jogo',('Jogador '+numJogador+' ganhou a partida'))
        } if (opponentPoints == 20) {
            fimDeJogo = true
            vez.innerHTML = 'Jogador '+((parseInt(numJogador)%2) + 1 )+' ganhou a partida'
            socket.emit('fim-de-jogo',('Jogador '+((parseInt(numJogador)%2) + 1 )+' ganhou a partida'))
        }

        if (fimDeJogo) return

        if (vezUsuario) {
            vez.innerHTML = 'Usuario'
        }else{
            vez.innerHTML = 'Oponente'
        }
    }
})