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

	for (var i = 0; i < 8; i++) {
		if(i == 0 || i == 7){
			this.tabuleiro.addPeca(new Torre(W_ROOK,i,0,0));
			this.tabuleiro.addPeca(new Torre(B_ROOK,i,7,1));
		}
		if(i == 1 || i == 6){
			this.tabuleiro.addPeca(new Bispo(W_BISHOP,i,0,0));
			this.tabuleiro.addPeca(new Bispo(B_BISHOP,i,7,1));
		}
		if(i == 2 || i == 5){
			this.tabuleiro.addPeca(new Cavalo(W_KNIGHT,i,0,0));
			this.tabuleiro.addPeca(new Cavalo(B_KNIGHT,i,7,1));
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
		if (this.posI == i && this.posJ == j)
			return false;

		if(peca.mover(this.tabuleiro, i, j)){
			peca.movimento(this.tabuleiro, i, j);
			return true;
		}
		return false;
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
				this.tabuleiro.addPeca(new Bispo(W_BISHOP,i,0,0));
				this.tabuleiro.addPeca(new Bispo(B_BISHOP,i,7,1));
			}
			if(i == 2 || i == 5){
				this.tabuleiro.addPeca(new Cavalo(W_KNIGHT,i,0,0));
				this.tabuleiro.addPeca(new Cavalo(B_KNIGHT,i,7,1));
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

	this.getRei = function() {
		var tabuleiro = this.tabuleiro.getRepresentacao;
		for(var i = 0; i < 8; i++) {
            for(var j = 0; j < 8; j++)
				if(tabuleiro[i][j] != 0){
					if(this.vez == 0 && tabuleiro[i][j] == W_KING){
						return this.tabuleiro.getPeca(i,j);
					}
					if(this.vez == 1 && tabuleiro[i][j] == B_KING){
						return this.tabuleiro.getPeca(i,j);
					}
				}
        }
	}
}
