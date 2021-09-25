class Veiculo{
    constructor(id, placa, marca, cor, nomeDoProprietário){
        var _id = id;
        var _placa = placa; 
        var _marca = marca; 
        var _cor = cor;
        var _nomeDoProprietário = nomeDoProprietário;

        this.set = function(id, placa, marca, cor, nomeDoProprietário) { 
            _id = id;
            _placa = placa; 
            _marca = marca; 
            _cor = cor;
            _nomeDoProprietário = nomeDoProprietário;
        }
        this.get = function() { return { "ID": _id, "Placa": _placa, "Marca": _marca, "Cor": _cor, "NomeDoProprietario": _nomeDoProprietário }; }
        this.getId = function(){ return _id; }
        this.getCor = function(){ return _cor; }
        this.getPlaca = function(){ return _placa; }
        this.getMarca = function(){ return _marca; }
        this.getNomeProp = function(){ return _nomeDoProprietário; }
    }
}

class Moto extends Veiculo{
    setEntrada(horaEntrada){
        this.horaEntrada = horaEntrada;
    }

    setSaida(horaSaida){
        this.horaSaida = horaSaida;
    }

    calcularValorPago(horaEntrada, horaSaida){
        let tempo = horaEntrada.getMinutes()+horaEntrada.getHours()*60 - (horaSaida.getMinutes()+horaSaida.getHours()*60) ;
        if(tempo<=30){
            return 0;
        }else if(tempo<=60){
            return 2;
        }else if(tempo<=240){
            return 10;
        }
    }
}

class Carro extends Veiculo{
    constructor(horaEntrada, horaSaida){
        this.horaEntrada = horaEntrada;
        this.horaSaida = horaSaida;
    }

    calcularValorPago(horaEntrada, horaSaida){
        let tempo = horaEntrada.getMinutes()+horaEntrada.getHours()*60 - (horaSaida.getMinutes()+horaSaida.getHours()*60) ;
        if(tempo<=15){
            return 0;
        }else if(tempo<=60){
            return 4;
        }else if(tempo<=240){
            return 20;
        }
    }
}

class Vaga {
    constructor(veiculo, horaEntrada){
        this.veiculo = veiculo;
        this.horaEntrada = horaEntrada;
        this.horaSaida = undefined;
        this.valor = 0;
    }
}

class Estacionamento {
    constructor(numerosDeVagas){
        this.numerosDeVagas = numerosDeVagas;
        this.vagasOcupadas = 0;
        this.vagas = [];
        this.relatorios = [];
        this.caixa = 0;
    }
    estacionar(veículo, horaEntrada){
        this.vagasOcupadas += 1;
        var vaga = new Vaga(veículo, horaEntrada);
        this.vagas.push(vaga);
    }
    
    liberar(idVeículo, horaSaída){
        var i = 0;
        vagas.forEach(vaga => {
            if(vaga.veiculo.getId() === idVeículo){
                break;
            }
            i++;
        });
        if(i === this.vagasOcupadas){
            return -1;
        }else{
            vaga.valor = vaga.veiculo.calcularValorPago(vaga.horaEntrada,horaSaída);
            this.caixa += vaga.valor;
            vaga.horaSaida = horaSaída;
            this.relatorios.push(vaga);
            vagas.splice(i, 1);
        }
    }
    
    gerarRelatório(){
        this.vagas.forEach(this.imprimir);
        this.relatorios.forEach(this.imprimir);
           
    }

    imprimir(vaga) {
        console.log(vaga);
    }
    
    getSaldo(){
        return this.caixa;
    }
}

var estacionamento = new Estacionamento(20);

function onFormSubmit(td) {

    inserir(td.value);

}

function inserir(tipo) {
    let id = document.getElementById("id").value;
    let nome = document.getElementById("nome_prop").value;
    let placa = document.getElementById("placa").value;
    let cor = document.getElementById("cor").value;
    let marca = document.getElementById("marca").value;
    var veiculo
    if(tipo === "Cadastrar Moto"){
        veiculo = new Moto(id, placa, marca, cor, nome);
    }else{
        veiculo = new Carro(id, placa, marca, cor, nome);
    }

    veiculo.horaEntrada = new Date();



    var table = document.getElementById("veiculos").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell2 = newRow.insertCell(1);
    cell3 = newRow.insertCell(2);
    cell4 = newRow.insertCell(3);
    cell5 = newRow.insertCell(4);


    contatos.forEach(element => {
        cell1.innerHTML = veiculo.id;
        cell2.innerHTML = veiculo.nome;
        cell3.innerHTML = veiculo.telefone;
        cell4.innerHTML = veiculo.horaEntrada.getHours() + ":" + veiculo.horaEntrada.getMinutes();
        cell5.innerHTML = '<button onClick="removeForm()">Sair da vags</button>';
    });
}

function removeForm(td) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
}
