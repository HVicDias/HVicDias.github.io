function JogoXadrez() {
	// Identificador de cada peça!
	const W_KING   = 1;  // "&#9812" ♔
	const W_QUEEN  = 2;  // "&#9813" ♕
	const W_ROOK   = 3;  // "&#9814" ♖
	const W_BISHOP = 4;  // "&#9815" ♗
	const W_KNIGHT = 5;  // "&#9816" ♘
	const W_PAWN   = 6;  // "&#9817" ♙
	const B_KING   = 7;  // "&#9818" ♚
	const B_QUEEN  = 8;  // "&#9819" ♛
	const B_ROOK   = 9;  // "&#9820" ♜
	const B_BISHOP = 10; // "&#9821" ♝
	const B_KNIGHT = 11; // "&#9822" ♞
	const B_PAWN   = 12; // "&#9823" ♟


	this.tabuleiro = new Tabuleiro;
	this.tabuleiro.initializeTab();
	this.vez = 0;
	this.xeque = false;
	this.pecaXeque = null;

	for (var i = 0; i < 8; i++) {
		if(i == 0 || i == 7){
			this.tabuleiro.addPeca(new Torre(W_ROOK,i,0,0));
			this.tabuleiro.addPeca(new Torre(B_ROOK,i,7,1));
		}
		if(i == 1 || i == 6){
			this.tabuleiro.addPeca(new Cavalo(W_KNIGHT,i,0,0));
			this.tabuleiro.addPeca(new Cavalo(B_KNIGHT,i,7,1));
		}
		if(i == 2 || i == 5){
			this.tabuleiro.addPeca(new Bispo(W_BISHOP,i,0,0));
			this.tabuleiro.addPeca(new Bispo(B_BISHOP,i,7,1));
		}
		this.tabuleiro.addPeca(new Peao(W_PAWN,i,1,0));
		this.tabuleiro.addPeca(new Peao(B_PAWN,i,6,1));
	}
	this.tabuleiro.addPeca(new Rei(W_KING,3,0,0));
	this.tabuleiro.addPeca(new Rei(B_KING,3,7,1));
	this.tabuleiro.addPeca(new Dama(W_QUEEN,4,0,0));
	this.tabuleiro.addPeca(new Dama(B_QUEEN,4,7,1));

	
	
	
	this.moverPeca = function(peca, i, j){
		// Não pode mover uma peça para fora do tabuleiro.
		if (i > 7 || i < 0 || j > 7 || j < 0)
			return false;
		// Não pode mover uma peça para o mesmo lugar.
		if (this.posI == i && this.posJ == j){
			return false;
		}

		var prevj = peca.posJ;
		var previ = peca.posI;

		if(peca.mover(this.tabuleiro, i, j)){
			peca.movimento(this.tabuleiro, i, j);

			if(this.xeque && this.pecaXeque.id != this.vez){
				if(peca.id != B_KING && peca.id != W_KING){
					var rei  = this.getRei();
					if(this.pecaXeque.id != B_PAWN && this.pecaXeque.id != W_PAWN){	
						if(this.pecaXeque.mover(this.tabuleiro, rei.posI, rei.posJ)){
							peca.movimento(this.tabuleiro, previ, prevj);
							return false;
						}
					}else{
						if(this.pecaXeque.atacar(this.tabuleiro, rei.posI, rei.posJ)){
							peca.movimento(this.tabuleiro, previ, prevj);
							return false;
						}
					}
				}else{
					var tabuleiro = this.tabuleiro.getRepresentacao();

					for(var iaux = 0; iaux < 8; iaux++) {
						for(var jaux = 0; jaux < 8; jaux++){
							if(tabuleiro[iaux][jaux] != B_KING && tabuleiro[iaux][jaux] != W_KING ){
								if(tabuleiro[iaux][jaux] != 0){
									let pecatemp = this.getPeca(iaux,jaux);
									if(pecatemp.id != this.vez){
										if(pecatemp.id != B_PAWN && pecatemp.id != W_PAWN){	
											if(pecatemp.mover(this.tabuleiro, peca.posI, peca.posJ)){
												peca.movimento(this.tabuleiro, previ, prevj);
												return false;
											}
										}else{
											if(pecatemp.atacar(this.tabuleiro,peca.posI, peca.posJ)){
												peca.movimento(this.tabuleiro, previ, prevj);
												return false;
											}
										}		
									}
								}
							}
						}
					}
				}

			}
			this.pecaXeque = null;
			var reiOposto = this.getReiOposto();

			if(peca.id != B_PAWN && peca.id != W_PAWN){
				if(peca.mover(this.tabuleiro, reiOposto.posI, reiOposto.posJ)){
					if(peca.id != B_KING && peca.id != W_KING){
						alert("xeque");
						this.xeque = true;
						this.pecaXeque = peca;
					}else{
						peca.movimento(this.tabuleiro, previ, prevj);
						return false;
					}
				}
			}else{
				this.promovePeao(peca);

				peca = this.tabuleiro.getPeca(i,j);
				if(peca.id != B_PAWN && peca.id != W_PAWN){
					
					if(peca.mover(this.tabuleiro, reiOposto.posI, reiOposto.posJ)){
						if(peca.id != B_KING && peca.id != W_KING){
							alert("xeque");
							this.xeque = true;
							this.pecaXeque = peca;
						}else{
							peca.movimento(this.tabuleiro, previ, prevj);
							return false;
						}
					}
				}else{
					if(peca.atacar(this.tabuleiro, reiOposto.posI, reiOposto.posJ)){
						alert("xeque");
						this.xeque = true;
						this.pecaXeque = peca;
					}
				}
			}
			return true;
		}
		return false;
	}

	this.verificaChequeMate = function(){
		var peca;
		var rei  = this.getRei();
	

		for(var i = 0; i < 8; i++) {
			for(var j = 0; j < 8; j++){
				if(	this.tabuleiro.tabuleiro[i][j] != 0){
					peca = this.tabuleiro.tabuleiro[i][j];
					if(peca.tipo == this.vez){
						var prevj = peca.posJ;
						var previ = peca.posI;
						if(peca.id != B_KING && peca.id != W_KING){
							for(var iaux = 0; iaux < 8; iaux++) {
								for(var jaux = 0; jaux < 8; jaux++){
									if(peca.mover(this.tabuleiro, iaux, jaux)){
										peca.movimento(this.tabuleiro, iaux, jaux);
										this.pecaXeque = this.tabuleiro.getPeca(this.pecaXeque.posI,this.pecaXeque.posJ);
										if(this.pecaXeque.id != B_PAWN && this.pecaXeque.id != W_PAWN){	
											if(!this.pecaXeque.mover(this.tabuleiro, rei.posI, rei.posJ)){
												peca.movimento(this.tabuleiro, previ, prevj);
												return false;
											}
										}else{
											if(!this.pecaXeque.atacar(this.tabuleiro, rei.posI, rei.posJ)){
												peca.movimento(this.tabuleiro, previ, prevj);
												return false;
											}
										}
									}
									peca.movimento(this.tabuleiro, previ, prevj);
								}
								
							}
						}
					}	
				}
			}
		}

		for(var i = rei.posI-1; i < 3; i++) {
			for(var j = rei.posJ-1; j < 3; j++){
				if(this.tabuleiro.tabuleiro[i][j]==0 || this.tabuleiro.tabuleiro[i][j].tipo != this.vez){
					peca = rei;
					if(peca.mover(this.tabuleiro, i, j)){
						peca.movimento(this.tabuleiro, i, j);
						this.pecaXeque = this.tabuleiro.getPeca(this.pecaXeque.posI,this.pecaXeque.posJ);

						var tabuleiro = this.tabuleiro.getRepresentacao();
						for(var iaux = 0; iaux < 8; iaux++) {
							for(var jaux = 0; jaux < 8; jaux++){
								if(tabuleiro[iaux][jaux] != B_KING && tabuleiro[iaux][jaux] != W_KING ){
									if(tabuleiro[iaux][jaux] != 0){
										let pecatemp = this.getPeca(iaux,jaux);
										if(pecatemp.id != this.vez){
											if(pecatemp.id != B_PAWN && pecatemp.id != W_PAWN){	
												if(!pecatemp.mover(this.tabuleiro, peca.posI, peca.posJ)){
													peca.movimento(this.tabuleiro, rei.posI, rei.posI);
													return false;
												}
											}else{
												if(!pecatemp.atacar(this.tabuleiro,peca.posI, peca.posJ)){
													peca.movimento(this.tabuleiro, previ, prevj);
													return false;
												}
											}		
										}
									}
								}
							}
						}
						peca.movimento(this.tabuleiro, previ, prevj);
					}
				}
			}
		}
		return true;
		
	}

	this.promovePeao = function(peca){
		if(peca.posJ == 7 && peca.tipo == 0){
			
			let tipoPeca = window.prompt("Digite 1 - para Cavalo\r\nDigite 2 - para Bispo\r\nDigite 3 - para Torre\r\nDigite 4 - para Dama");
			switch(tipoPeca){
				case '1':
					this.tabuleiro.addPeca(new Cavalo(W_KNIGHT,peca.posI,peca.posJ,0));
					break;
				case '2':
					this.tabuleiro.addPeca(new Bispo(W_BISHOP,peca.posI,peca.posJ,0));
					break;
				case '3':
					this.tabuleiro.addPeca(new Torre(W_ROOK,peca.posI,peca.posJ,0));
					break;
				case '4':
					this.tabuleiro.addPeca(new Dama(W_QUEEN,peca.posI,peca.posJ,0));
					break;
				default: 
					this.tabuleiro.addPeca(new Dama(W_QUEEN,peca.posI,peca.posJ,0));
					break;
			}
		}else if(peca.posJ == 0 && peca.tipo == 1){
				let tipoPeca = window.prompt("Digite 1 - para Cavalo\r\nDigite 2 - para Bispo\r\nDigite 3 - para Torre\r\nDigite 4 - para Dama");
				
			switch(tipoPeca){
				case '1':
					this.tabuleiro.addPeca(new Cavalo(B_KNIGHT,peca.posI,peca.posJ,1));
					break;
				case '2':
					this.tabuleiro.addPeca(new Bispo(B_BISHOP,peca.posI,peca.posJ,1));
					break;
				case '3':
					this.tabuleiro.addPeca(new Torre(B_ROOK,peca.posI,peca.posJ,1));
					break;
				case '4':
					this.tabuleiro.addPeca(new Dama(B_QUEEN,peca.posI,peca.posJ,1));
					break;
				default:
					this.tabuleiro.addPeca(new Dama(B_QUEEN,peca.posI,peca.posJ,1));
					break;
				
			}
		
		}
	}

	this.getTabuleiro = function() {
		return tabuleiro.getRepresentacao();
	}

	// Esse método reinicia o jogo.
	this.reiniciar = function() {
		this.tabuleiro.reinitializeTab();
		this.vez = 0;

		for (var i = 0; i < 8; i++) {
			if(i == 0 || i == 7){
				this.tabuleiro.addPeca(new Torre(W_ROOK,i,0,0));
				this.tabuleiro.addPeca(new Torre(B_ROOK,i,7,1));
			}
			if(i == 1 || i == 6){
				this.tabuleiro.addPeca(new Cavalo(W_KNIGHT,i,0,0));
				this.tabuleiro.addPeca(new Cavalo(B_KNIGHT,i,7,1));
			}
			if(i == 2 || i == 5){
				this.tabuleiro.addPeca(new Bispo(W_BISHOP,i,0,0));
				this.tabuleiro.addPeca(new Bispo(B_BISHOP,i,7,1));
			}
			this.tabuleiro.addPeca(new Peao(W_PAWN,i,1,0));
			this.tabuleiro.addPeca(new Peao(B_PAWN,i,6,1));
		}
		this.tabuleiro.addPeca(new Rei(W_KING,3,0,0));
		this.tabuleiro.addPeca(new Rei(B_KING,3,7,1));
		this.tabuleiro.addPeca(new Dama(W_QUEEN,4,0,0));
		this.tabuleiro.addPeca(new Dama(B_QUEEN,4,7,1));
	}
	

	this.getPeca = function(i, j) {
		return this.tabuleiro.getPeca(i,j);
	}

	this.getReiOposto = function() {
		var tabuleiro = this.tabuleiro.getRepresentacao();

		for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++)
				if(tabuleiro[i][j] == B_KING && this.vez == 0){
					return this.tabuleiro.getPeca(i,j);
				}else if(tabuleiro[i][j] == W_KING && this.vez == 1){
					return this.tabuleiro.getPeca(i,j);
				}
        }
	}

	this.getRei = function() {
		var tabuleiro = this.tabuleiro.getRepresentacao();

		for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++)
				if(tabuleiro[i][j] == W_KING && this.vez == 0){
					return this.tabuleiro.getPeca(i,j);
				}else if(tabuleiro[i][j] == B_KING && this.vez == 1){
					return this.tabuleiro.getPeca(i,j);
				}
        }
	}
}
