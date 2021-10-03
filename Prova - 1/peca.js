class Peca {
    constructor(id, i ,j, tipo){
        this.id = id;
        this.posI = i;
        this.posJ = j;
        this.tipo = tipo;
    }

    movimento(tabuleiro, i, j){
        tabuleiro.tabuleiro[i][j] = tabuleiro.tabuleiro[this.posI][this.posJ];
        tabuleiro.tabuleiro[this.posI][this.posJ] = 0;
        this.posI = i;
        this.posJ = j;
    }
}

Peca.prototype.mover = function(tabuleiro, i, j) {
    // Não pode mover uma peça para fora do tabuleiro.
    if (i > 7 || i < 0 || j > 7 || j < 0)
        return false;
    // Não pode mover uma peça para o mesmo lugar.
    if (this.posI == i && this.posJ == j)
        return false;
    this.movimento(tabuleiro, i, j);
    return true;
}

class Peao extends Peca {
    constructor(id, i ,j, tipo){
        super(id, i ,j, tipo);
    }

    mover(tabuleiro, i, j) {
        if(this.tipo == 1){
            //movimento peao preto
            if(this.posI == i && this.posJ-1 == j && tabuleiro.tabuleiro[i][j] == 0 ||
                this.posI == i && this.posJ-2 == j && tabuleiro.tabuleiro[i][j] == 0 && this.posJ == 6){
                
                this.movimento(tabuleiro, i, j);

                if(j == 0){
                    //vira dama 
                }
                return true;
            }
            //captura peao preto
            if(this.posI>0){
                if(this.posI-1 == i && this.posJ-1 == j && tabuleiro.tabuleiro[i][j] != 0 && 
                   tabuleiro.tabuleiro[i][j].tipo == 0){
                    
                    this.movimento(tabuleiro, i, j);
                    
                    if(j == 0){
                        //vira dama 
                    }
                    return true;

                }
            }
            if(this.posI<7){
                if(this.posI+1 == i && this.posJ-1 == j && tabuleiro.tabuleiro[i][j] != 0 && 
                    tabuleiro.tabuleiro[i][j].tipo == 0){
                     
                    this.movimento(tabuleiro, i, j);

                    if(j == 0){
                        //vira dama 
                    }
                    return true;
 
                 }
            }
        }
        else{
            //movimento peao branco
            if(this.posI == i && this.posJ+1 == j && tabuleiro.tabuleiro[i][j] == 0 ||
                this.posI == i && this.posJ+2 == j && tabuleiro.tabuleiro[i][j] == 0 && this.posJ == 1){
                
                this.movimento(tabuleiro, i, j);

                if(j == 7){
                    //vira dama 
                }
                return true;
            }
            //captura peao branco
            if(this.posI>0){
                if(this.posI-1 == i && this.posJ+1 == j && tabuleiro.tabuleiro[i][j] != 0 && 
                   tabuleiro.tabuleiro[i][j].tipo == 1){
                    
                    this.movimento(tabuleiro, i, j);

                    if(j == 7){
                        //vira dama 
                    }
                    return true;

                }
            }
            if(this.posI<7){
                if(this.posI+1 == i && this.posJ+1 == j && tabuleiro.tabuleiro[i][j] != 0 && 
                    tabuleiro.tabuleiro[i][j].tipo == 1){
                     
                    this.movimento(tabuleiro, i, j);
                    
                    if(j == 7){
                         //vira dama 
                    }
                    return true;
 
                }
            }
        }
        return false
    }
}

class Torre extends Peca {
    constructor(id, i ,j, tipo){
        super(id, i ,j, tipo);
    }

    mover(tabuleiro, i, j) {
        let iAux, jAux

        for(iAux = this.posI+1; iAux < 8; iAux++) {
            if(iAux == i && this.posJ == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][j] != 0){
                break;
            }    
            
        }
        for(iAux = this.posI-1; iAux >= 0; --iAux) {
            if(iAux == i && this.posJ == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][j] != 0){
                break;
            }    
        }

        for(jAux = this.posJ+1; jAux < 8; jAux++) {
            if(jAux == j && this.posI == i){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[i][jAux] != 0){
                break;
            }    
        }
        for(jAux = this.posJ-1; jAux >= 0; jAux--) {
            if(jAux == j && this.posI == i){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[i][jAux] != 0){
                break;
            }    
        }
       return false;
    }
}

class Bispo extends Peca {
    constructor(id, i ,j, tipo){
        super(id, i ,j, tipo);
    }

    mover(tabuleiro, i, j) {
        let iAux, jAux

        for(iAux = this.posI+1, jAux = this.posJ+1; iAux < 8 || jAux < 8; iAux++,jAux++) {
            if(iAux == 8 || jAux == 8)
                break;
            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux] != 0){
                break;
            }    
            
        }
        
        for(iAux = this.posI-1, jAux = this.posJ-1; iAux >= 0 ||  jAux>=0; iAux--,jAux--) {
            if(iAux == -1 || jAux == -1)
                break;
            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux] != 0){
                break;
            }    
        }
        
        for(iAux = this.posI-1, jAux = this.posJ+1; iAux >= 0 || jAux < 8; iAux--,jAux++) {
            if(iAux == -1 || jAux == 8)
                break;
            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux] != 0){
                break;
            }    
        }
        
        for(iAux = this.posI+1, jAux = this.posJ-1; iAux <8 || jAux >= 0 ; iAux++,jAux--) {
            if(iAux == 8 || jAux == -1)
                break;

            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux]!= 0){
                break;
            }    
        }
       return false;
    }
}

class Cavalo extends Peca {
    constructor(id, i ,j, tipo){
        super(id, i ,j, tipo);
    }

    mover(tabuleiro, i, j) {
        if(this.posI+2 == i && this.posJ+1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI+2 == i && this.posJ-1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-2 == i && this.posJ+1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-2 == i && this.posJ-1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI+1 == i && this.posJ+2 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI+1 == i && this.posJ-2 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-1 == i && this.posJ+2 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-1 == i && this.posJ-2 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
}

class Rei extends Peca {
    constructor(id, i ,j, tipo){
        super(id, i ,j, tipo);
    }

    mover(tabuleiro, i, j) {
        if(this.posI+1 == i && this.posJ == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI+1 == i && this.posJ+1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI+1 == i && this.posJ-1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-1 == i && this.posJ == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-1 == i && this.posJ+1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI-1 == i && this.posJ-1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI == i && this.posJ+1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        if(this.posI == i && this.posJ-1 == j){
            if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                this.movimento(tabuleiro, i, j);
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
}

class Dama extends Peca {
    constructor(id, i ,j, tipo){
        super(id, i ,j, tipo);
    }

    mover(tabuleiro, i, j){
        let iAux, jAux

        for(iAux = this.posI+1, jAux = this.posJ+1; iAux < 8 || jAux < 8; iAux++,jAux++) {
            if(iAux == 8 || jAux == 8)
                break;
            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux] != 0){
                break;
            }    
            
        }
        
        for(iAux = this.posI-1, jAux = this.posJ-1; iAux >= 0 ||  jAux>=0; iAux--,jAux--) {
            if(iAux == -1 || jAux == -1)
                break;
            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux] != 0){
                break;
            }    
        }
        
        for(iAux = this.posI-1, jAux = this.posJ+1; iAux >= 0 || jAux < 8; iAux--,jAux++) {
            if(iAux == -1 || jAux == 8)
                break;
            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux] != 0){
                break;
            }    
        }
        
        for(iAux = this.posI+1, jAux = this.posJ-1; iAux <8 || jAux >= 0 ; iAux++,jAux--) {
            if(iAux == 8 || jAux == -1)
                break;

            if(iAux == i && jAux == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][jAux]!= 0){
                break;
            }    
        }

        for(iAux = this.posI+1; iAux < 8; iAux++) {
            if(iAux == i && this.posJ == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][j] != 0){
                break;
            }    
            
        }
        for(iAux = this.posI-1; iAux >= 0; --iAux) {
            if(iAux == i && this.posJ == j){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[iAux][j] != 0){
                break;
            }    
        }

        for(jAux = this.posJ+1; jAux < 8; jAux++) {
            if(jAux == j && this.posI == i){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[i][jAux] != 0){
                break;
            }    
        }
        for(jAux = this.posJ-1; jAux >= 0; jAux--) {
            if(jAux == j && this.posI == i){
                if(tabuleiro.tabuleiro[i][j] == 0 || tabuleiro.tabuleiro[i][j].tipo == !this.tipo){
                    this.movimento(tabuleiro, i, j);
                    return true;
                }else{
                    return false;
                }
            }
            if(tabuleiro.tabuleiro[i][jAux] != 0){
                break;
            }    
        }
       return false;
    }
}