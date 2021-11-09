class Conta {
    constructor(id, nome, saldoInicial){
        this.id = id;
        this.nome = nome;
        this.saldo = Number(saldoInicial);
    }

    sacar(valor){
        this.saldo -= (Number(valor));
    }

    depositar(valor){
        this.saldo += (Number(valor));
    }
}

class Banco {
    constructor(){
        this.contas = [];
    }

    transferir(contaEnvio,idDestino, valor){
        this.contas.forEach(conta => {
            if(conta.id === idDestino){
                conta.depositar(valor);
                contaEnvio.sacar(valor);
                return 1;
            }
        });
        return 0;
    }

    verificaId(id){
        let ret = 1;
        this.contas.forEach(conta => {
            if(conta.id == id) ret = 0;
        });
        return ret;
    }
}

var banco = new Banco();
banco.contas.push(new Conta(0, "Henrique Dias", 0));
var contaSelecionada = null;

const deposito = document.getElementById("deposito");
const btnDeposito = document.getElementById("btnDeposito");

const saque = document.getElementById("saque");
const btnSaque = document.getElementById("btnSaque");

const idCadastro = document.getElementById("idCadastro");
const nomeCadastro = document.getElementById("nomeCadastro");
const depositoCadastro = document.getElementById("depositoCadastro");
const btnCadastro = document.getElementById("btnCadastro");

const idTroca = document.getElementById("idTroca");
const btnTrocarConta = document.getElementById("btnTrocarConta");

const valorTransfere = document.getElementById("valorTransfere");
const idTransfere = document.getElementById("idTransfere");
const btnTransfere = document.getElementById("btnTransfere");


const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });

btnTransfere.addEventListener('click', () =>{
    banco.transferir(contaSelecionada, idTransfere.value, valorTransfere.value);
    let totalBalanceFormatted = formatter.format(contaSelecionada.saldo);
    document.getElementById("saldoAtual").innerHTML = "Saldo " +totalBalanceFormatted;
    document.getElementById("id").innerHTML = "ID " + contaSelecionada.id;
    document.getElementById("usuario").innerHTML = "Usuario: "+ contaSelecionada.nome;
});

btnTrocarConta.addEventListener('click', () =>{
    banco.contas.forEach(conta =>{
        if(conta.id == idTroca.value) contaSelecionada = conta;
    })
    let totalBalanceFormatted = formatter.format(contaSelecionada.saldo);
    document.getElementById("saldoAtual").innerHTML = "Saldo " +totalBalanceFormatted;
    document.getElementById("id").innerHTML = "ID " + contaSelecionada.id;
    document.getElementById("usuario").innerHTML = "Usuario: "+ contaSelecionada.nome;
});

btnCadastro.addEventListener('click', () =>{
    if(isNaN(idCadastro.value)){
        alert("ID invalido");
        return 0;
    }else if(isNaN(depositoCadastro.value) || Number(depositoCadastro.value)<0){
        alert("Deposito Inicial Invalido");
        return 0;
    }else if(banco.verificaId(idCadastro.value) === 0){
        alert("ID ja cadastrado");
        return 0;
    }else{
        contaSelecionada = new Conta(idCadastro.value, nomeCadastro.value, depositoCadastro.value);
        banco.contas.push(contaSelecionada);
        let totalBalanceFormatted = formatter.format(contaSelecionada.saldo);
        document.getElementById("saldoAtual").innerHTML = "Saldo " +totalBalanceFormatted;
        document.getElementById("id").innerHTML = "ID " + contaSelecionada.id;
        document.getElementById("usuario").innerHTML = "Usuario: "+ contaSelecionada.nome;
        return 1;
    }
});

btnDeposito.addEventListener('click', () => {
    if(contaSelecionada === null){
        alert("Selecione uma conta");
    }
    if (isNaN(deposito.value)) {
        alert("Coloque um numero valido.");
        return deposito.value = '';
    } else {
        if (deposito.value < 0.01 || deposito.value > 10000) {
            alert("Deposite entre R$0.01 e R$10,000.")
            return deposito.value = '';
        } else {
    
            contaSelecionada.depositar(deposito.value);

        let totalBalanceFormatted = formatter.format(contaSelecionada.saldo);
        document.getElementById("saldoAtual").innerHTML ="Saldo " + totalBalanceFormatted;
    }
}
    
});

// accept withdrawals from user, store withdrawals in array
btnSaque.addEventListener('click', () => {
    if(contaSelecionada === null){
        alert("Selecione uma conta");
    }
    // checks if withdrawal is a number
    if (isNaN(saque.value)) {
        alert("Coloque um numero valido.");
        return saque.value = '';
    } else {

        // checks if withdrawal meets parameters
        if (saque.value > contaSelecionada.saldo) {
            alert("Sua conta não pode ficar sem saldo");
            return saque.value = '';
        } else {

            contaSelecionada.sacar(saque.value);

            let totalBalanceFormatted = formatter.format(contaSelecionada.saldo);
            document.getElementById("saldoAtual").innerHTML = "Saldo " + totalBalanceFormatted;
    }
}
});
