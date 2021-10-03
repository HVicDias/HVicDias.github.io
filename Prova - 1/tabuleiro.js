class Tabuleiro {
    constructor(){
        this.tabuleiro = [];
    }

    initializeTab(){
        var tabuleiro = new Array(8);
        for(var i = 0; i < 8; i++) {
            tabuleiro[i] = new Array(8);
            for(var j = 0; j < 8; j++)
                tabuleiro[i][j] = 0; // ID_1 = 0
        }

	    this.tabuleiro = tabuleiro;
    }

    reinitializeTab(){
        for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++)
                this.tabuleiro[i][j] = 0; // ID_1 = 0
        }
    }

    addPeca(peca){
        this.tabuleiro[peca.posI][peca.posJ] = peca;
    }

    rmPeca(i,j){
        peca = this.tabuleiro[i][j];
        this.tabuleiro[i][j] = 0;
        return peca;
    }
    
    getPeca(i,j){
        return this.tabuleiro[i][j];
    }
    
    getRepresentacao(){
        var tabuleiro = new Array(8);
        for(var i = 0; i < 8; i++) {
            tabuleiro[i] = new Array(8);
            for(var j = 0; j < 8; j++){
                if(this.tabuleiro[i][j] == 0){
                    tabuleiro[i][j] = 0;
                }else{
                    tabuleiro[i][j] = this.tabuleiro[i][j].id;
                }
                
            }
                 
        }
        return tabuleiro;
    }
}
