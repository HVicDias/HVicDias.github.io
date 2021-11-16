document.addEventListener('DOMContentLoaded', () => {
    const tabelaUsuario = document.querySelector('.tabela-usuario')
    const tabelaOponente = document.querySelector('.tabela-oponente')
    const ships = document.querySelectorAll('.ship')
    const startBtn = document.querySelector('#comecar')
    const vez = document.querySelector('#vez')
    const info = document.querySelector('#info')
    const navioAleatorioBtn = document.querySelector('#navioAleatorio')
    const matrizUsuario = []
    const matrizOponente = []

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

    let shipsOponent = [{
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

    shipsOponent.forEach(ship => {
        generate(ship, matrizOponente, shipsOponent, false)
    })

    navioAleatorioBtn.addEventListener('click', () => {
        limparNavios(shipsUser, matrizUsuario)
        shipsUser.forEach(ship => {
            generate(ship, matrizUsuario, shipsUser, true)
        })
    })


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


    let shipMask
    let celulaMapa
    let iMask = null
    let jMask = null
    let canDrop = false

    let currentShip
    let dblClickShip
    let haveMask = false
    let start = false

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
        console.log(dblClickShip)
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

    let userPoints = 0
    let opponentPoints = 0
    let fimDeJogo = false
    let vezUsuario = true
    let iAtaque = -1
    let jAtaque = -1
    let celula

    matrizOponente.forEach(linha =>
        linha.forEach(celula => celula.addEventListener('click', ataqueOponente)))

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
                }
            })
        })

        if (!isShip) {
            let ocean = document.createElement('div')
            ocean.className = 'ocean'
            matrizOponente[iAtaque][jAtaque].append(ocean)
            vezUsuario = !vezUsuario
            info.innerHTML = 'tiro na agua'
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

    function ataqueUsuario() {
        if (!start || vezUsuario || fimDeJogo) return


        do {
            iAtaque = Math.floor(Math.random() * 10)
            jAtaque = Math.floor(Math.random() * 10)
            console.log(iAtaque + ':' + jAtaque)
        } while (matrizUsuario[iAtaque][jAtaque].className == 'Atacado');

        celula = matrizUsuario[iAtaque][jAtaque]
        celula.className = "Atacado"
        let isShip = false
        let attackedShip

        shipsUser.forEach(ship => {
            let k = 0
            ship.position.forEach(coordenada => {
                if (coordenada.x == iAtaque && coordenada.y == jAtaque) {
                    isShip = true
                    attackedShip = ship
                    celula.removeChild(ship.ships[k])
                    coordenada.x = -1
                    coordenada.y = -1
                    userPoints++
                    let sinked = document.createElement('div')
                    sinked.className = 'sinked-ship'
                    matrizUsuario[iAtaque][jAtaque].append(sinked)
                }
                k++
            })
        })

        if (!isShip) {
            let ocean = document.createElement('div')
            ocean.className = 'ocean'
            matrizUsuario[iAtaque][jAtaque].append(ocean)
            vezUsuario = !vezUsuario
            info.innerHTML = 'tiro na agua'
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
        if (userPoints == 20) {
            fimDeJogo = true
            vez.innerHTML = 'Usuario ganhou a partida'
        } if (opponentPoints == 20) {
            fimDeJogo = true
            vez.innerHTML = 'Oponente ganhou a partida'
        }

        if (fimDeJogo) return

        if (vezUsuario) {
            vez.innerHTML = 'Usuario'
        }
        if (!vezUsuario) {
            vez.innerHTML = 'Oponente'
            setTimeout(ataqueUsuario, 1000)
        }
    }

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true
        start = true
        jogo()
    })

})