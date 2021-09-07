class Contato {
    constructor(){
        this.id = document.getElementById("id").value;
        this.nome = document.getElementById("nome").value;
        this.telefone = document.getElementById("tel").value;
    }
}

var contatos = []

function onFormSubmit(td) {
    if(td.value == "Submit"){
        const cont = new Contato(); 
        contatos.push(cont);
        inserir(cont);
    }else{
        buscar(document.getElementById("id").value);
    }
}

function inserir(cont) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell2 = newRow.insertCell(1);
    cell3 = newRow.insertCell(2);
    cell4 = newRow.insertCell(3);


    contatos.forEach(element => {
        cell1.innerHTML = cont.id;
        cell2.innerHTML = cont.nome;
        cell3.innerHTML = cont.telefone;
        cell4.innerHTML = '<button onClick="removeForm(this)">Delete</button>';
    });
}

function buscar(id){
    this.contatos.forEach(element => {
        if(element.id == id){
            alert("Nome: "+element.nome+"\nTelefone: "+element.telefone);
        }
        c++;
    });
}

function removeForm(td, id) {
    row = td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex);
}
    
function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

function remover(id){
    let c = 0;
    contatos.forEach(element => {
        if(element.id == id){
            delete contatos[c];
            arrayRemove(contatos, undefined);
        }
        c++;
    });
}