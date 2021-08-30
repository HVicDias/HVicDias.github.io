class Calculator {
  constructor(anterior, atual) {
    this.anterior = anterior
    this.atual = atual
    this.limpa()
  }

  limpa() {
    this.opAtual = ''
    this.opAnterior = ''
    this.op = undefined
  }

  deleta() {
    this.opAtual = this.opAtual.toString().slice(0, -1)
  }

  juntaNumeros(numero) {
    if (numero === '.' && this.opAtual.includes('.')) return
    this.opAtual = this.opAtual.toString() + numero.toString()
  }

  escolheOp(op) {
    if (this.opAtual === '') return
    const current = parseFloat(this.opAtual)
    let res
    if (this.opAnterior !== '') {
      this.calcula()
    }
    
    switch (op) {
      case "1/x":
        res = 1/current
        this.opAtual = res
        break
      case "x²":
        res = current*current
        this.opAtual = res
        break
      case "√x":
        res = Math.sqrt(current)
        this.opAtual = res
        break
      case "+/-":
        res = current*-1
        this.opAtual = res
        break
      default:
        this.op = op
        this.opAnterior = this.opAtual
        this.opAtual = ''
        break
    }
  }

  calcula() {
    let res
    const prev = parseFloat(this.opAnterior)
    const current = parseFloat(this.opAtual)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.op) {
      case '+':
        res = prev + current
        break
      case '-':
        res = prev - current
        break
      case 'x':
        res = prev * current
        break
      case '÷':
        res = prev / current
        break
      default:
        return
    }
    this.opAtual = res
    this.op = undefined
    this.opAnterior = ''
  }

  porcentagem(){
    const prev = parseFloat(this.opAnterior)
    if(prev=='') return
    const current = parseFloat(this.opAtual)
    this.opAtual = current*(prev/100);
    this.calcula();
  }

  getNumeroDoVisor(numero) {
    const string = numero.toString()
    const inteiro = parseFloat(string.split('.')[0])
    const decimal = string.split('.')[1]
    
    let visor
    if (isNaN(inteiro)) {
      visor = ''
    } else {
      visor = inteiro.toLocaleString('pt', { maximumFractionDigits: 0 })
    }
    if (decimal != null) {
      return `${visor}.${decimal}`
    } else {
      return visor
    }
  }

  atualizaVisor() {
    this.atual.innerText =
      this.getNumeroDoVisor(this.opAtual)
    if (this.op != null) {
      this.anterior.innerText =
        `${this.getNumeroDoVisor(this.opAnterior)} ${this.op}`
    } else {
      this.anterior.innerText = ''
    }
  }
}

//declaração de vars e objetos
const numeros = document.querySelectorAll('[numero]')
const operacoes = document.querySelectorAll('[operacao]')
const iguais = document.querySelector('[igual]')
const del = document.querySelector('[del]')
const limpa = document.querySelector('[clear]')
const anterior = document.querySelector('[ultimo]')
const atual = document.querySelector('[atual]')
const porcentagem = document.querySelector('[porcentagem]')
const menos = document.querySelector('[menos]')

const calculator = new Calculator(anterior, atual)


//Construtores dos eventos para os buttons
numeros.forEach(button => {
  button.addEventListener('click', () => {
    calculator.juntaNumeros(button.innerText)
    calculator.atualizaVisor()
  })
})

operacoes.forEach(button => {
  button.addEventListener('click', () => {
    calculator.escolheOp(button.innerText)
    calculator.atualizaVisor()
  })
})

iguais.addEventListener('click', button => {
  calculator.calcula()
  calculator.atualizaVisor()
})

limpa.addEventListener('click', button => {
  calculator.limpa()
  calculator.atualizaVisor()
})

del.addEventListener('click', button => {
  calculator.deleta()
  calculator.atualizaVisor()
})

porcentagem.addEventListener('click', button => {
  calculator.porcentagem()
  calculator.atualizaVisor()
})

menos.addEventListener('click', button => {
  calculator.deleta()
  calculator.atualizaVisor()
})
