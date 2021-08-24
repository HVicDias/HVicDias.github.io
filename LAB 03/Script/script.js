var operacao = undefined

function onLoad() {
    
}

function onClick(button) {
    document.calc.visor2.value = button;
}

function limpa() {
    document.calc.ultimo_resultado.value = ''
    document.calc.visor2.value = ''
    this.operacao = undefined
}

function juntaNumeros(){
}

function calcula() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

function defineOperacao(button) {
    this.operacao = operacao
}