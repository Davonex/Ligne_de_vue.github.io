// Buttons









$(function(){
	
	var version = "0.1.0";
	
	// var CheminImg ="assets/images/spawn/";
	var debug = false;
	var CheminImg ="https://patrickgalbraith.github.io/zombicide-card-database/img/cards/spawn/";
	
	// Ecran start
	let EspaceStart = $("#espace-start");
	let ButtonStartInvasion = $("#start-invasion");
	let ButtonStartCartes = $("#start-cartes");
	let StartMessage = $("#start-message");
	let ButtonStartSelect = 	$("#start-select");	
	ButtonStartSelect.chosen({width: "100%"});
	
	// Ecran Invasion
	let EspaceJeux = $("#espace-jeux");
	let InvasionMessage = $("#invasion-message");
	let ButtonCarteSuivante = $("#invasion-carte-suivante");
	let InputCartesRestantes = $("#cartes-restantes");
	let InputCartesTotales = $("#cartes-totales");
	let DivInvasionPioche = $("#invasion-pioche");
	let DivInvasionDefausse = $("#invasion-defausse");
	let DivInvasionResultat = $("#resultat");
	let DivInvasionAnimation = $("#Animation");
	
	let DivBackCard = $(".back");


////----------------------------------------------------------	
//// Objet Carte
	function  ObjCard (obj) {
		// Proriete
		this.id = obj.attr("id")
		this.source = obj.attr("src")
		this.class = obj.attr("class")
		
	}

	
	
	function ObjPioche() {
		// propriete
		this.version = 1.0;
		this.retantes = 0;
		this.totales = 0;
		this.index = [42,54,66,78,120,132,138,144,192,204,210,222,234,246];
		this.IdCard = null;
		this.AnnimationRunning = false;
		
		
	function constructor() {
			
	}
		
	/*
	 Methode dans la phase Start 
	 
	*/
		// Ajouter un deck dans la pioche 
		//Desk = numero de desk
		this.AddOneDesk = function (Desk) {				
			iFin = this.index[Desk];
			if (Desk == 0) { iDebut = 1} else {iDebut = this.index[Desk-1]+1;} 
				if (debug) {console.log("Ajouter la Saison [" + iDebut + "," + iFin + "]")};
			for (let i = iDebut; i <= iFin; i++) {	
				// if (debug) {console.log('<img  id="carte_' + i + '" class="carte_m" src="' + CheminImg + i + '.jpg">')};
				DivInvasionPioche.append('<img  id="carte_' + i + '" class="carte_m" src="' + CheminImg + i + '.jpg">');
			}
			this.totales = DivInvasionPioche.children("img").length;
			this.ChangeButtonStartCartes ();
		};// End Add
		
		
		// Enlever un Deck de la pioche 
		// Desk = numero de desk
		this.RemoveOnedesk = function (Desk) {
				iFin = this.index[Desk];
			if (Desk == 0) { iDebut = 1} else {iDebut = this.index[Desk-1]+1;}
			for (let i = iDebut; i <= iFin; i++) {	
				$("#carte_"+i).remove();
			}	
			this.totales = DivInvasionPioche.children("img").length;
			this.ChangeButtonStartCartes ();
		}; // End Remove
		
		
		// mettre à jour le text du button liste de carte
		this.ChangeButtonStartCartes = function() {
			ButtonStartCartes.text(this.totales + " de cartes");	
		}; // End ChangeButtonStartCartes
		
		// deplacer la carte dans la pioche
		this.MoveDansLaDefausse = function () {
			if ( this.retantes != 0 ) {
				this.MoveOneCard(Pioche.IdCard,DivInvasionDefausse);
				console.log (Pioche.IdCard);
				// Ajouter la class .carte_s
				$("#"+Pioche.IdCard).addClass( "carte_s" );
				$("#"+Pioche.IdCard).removeClass( "carte_m" );
				
				
			}
		};
		
		
		/*
			Piocher une nouvelle carte spawn
		
		*/
		
		this.PiocherCard = function ()	{
			if (this.AnnimationRunning) {
				if (debug) {console.log("PiocherCarte: Une pioche est deja en cours !!");}
			} else {
				if (debug) {console.log("PiocherCarte: On y va!!");}
				this.AnnimationRunning = true;
				// Deplacer la Carte de Resultat vers Defausse
				this.MoveDansLaDefausse ();
				// Choisir une carte 
					this.IdCard  = this.GetOneCardRamdom();
				// Placer la carte dans l'annimation 
					this.MoveOneCard(this.IdCard ,DivBackCard);	
					
					this.retantes = DivInvasionPioche.children("img").length;
					this.ShowRetantes ();
						// Effacer Dos du paquet si pioche vide 
					if (this.retantes == 0 ) {
						$("#dos img").hide();
					}						
					// start Animation
					this.StartAnimation ();	
			}
		}
		

		this.StartAnimation = function () {
			DivInvasionAnimation.css({'animation': 'spin 0.5s'});	
			if (debug) {console.log("StartAnimation: Animation lancé !!");}
		}			
		
		this.EndAnimation = function () {
			if (debug) {console.log("EndAnimation: Animation terminé !!");}
			this.MoveOneCard(this.IdCard,DivInvasionResultat);
			DivInvasionAnimation.css({'animation': 'none'});
			if (this.retantes == 0 ) {
					DivInvasionAnimation.hide();
			}	
			this.AnnimationRunning = false;	
		}
		
		
		
		
		// 
		this.ShowRetantes = function () {			
			InputCartesRestantes.val(this.retantes);
			InputCartesTotales.val(this.totales);
				
		}
		
		this.MoveOneCard = function (idcard,selector_cible) {
			Card = $("#"+idcard);
			Card.clone().prependTo(selector_cible);
			Card.remove();
		}	

		
		
		this.GetOneCardRamdom = function() {	

			SelectorImg = DivInvasionPioche.children("img");
			Aleatoire =   (Math.floor(Math.random() * Math.floor(SelectorImg.length)));	
			if (debug) {console.log("GetOneCardRamdom.Aleatoire : " +Aleatoire);}
			Card = SelectorImg.eq(Aleatoire);
			if (debug) {console.log("GetOneCardRamdom.IDCard : " +Card.attr("id"));}
			return (Card.attr("id"));			
		} 
		

		
		this.DisabledButton = function (selector) {
			$(selector).prop("disabled", true );	
			
		}
		
		this.EnabledButton = function (selector) {
			$(selector).prop("disabled", false);	
		}
		
	} // END function ObjPioche(Contain) {
	

	



	function ObjInvasion (PiocheInvasion){
				// propriete
		this.version = 1.0;
		var InvasionDemarre = false;
		
		this.StartInvasion = function () {
			if (this.InvasionDemarre) {
				// le jeux est deja demarrer
				InvasionMessage.text("L'invasion a déja démarrer");
			} else {
				if ( PiocheInvasion.totales == 0 ) {
					StartMessage.text("Selectionner de(s) desk(s) avant de démarrer l'invasion").fadeIn(1000, function() {
					// ,'slow', function() {
						// c'est le callback, l'animation est terminée
						$(this).fadeOut(4000);
					});
				} else { 
					StartMessage.text("L'invasion démarre ...");
					this.ImvasionDemarre = true;
					PiocheInvasion.retantes = PiocheInvasion.totales
					PiocheInvasion.ShowRetantes ();
					EspaceStart.hide();
					EspaceJeux.show();
				}
			}
			
		}
	}

	////----------------------------------------------------------		






	var Pioche = new ObjPioche(DivInvasionPioche);
	
	DivInvasionAnimation.bind("animationend", jQuery.proxy( Pioche, "EndAnimation" ));
	

	
	
	var Invasion = new ObjInvasion (Pioche);
	
	//initialise avec le pacquet 0
	// Pioche.AddOneDesk(0);

			  
	ButtonStartSelect.on('change', function(evt, params) {
		if(params.selected || "") {
			console.log("On charge la liste " + params.selected);
			Pioche.AddOneDesk(params.selected);
		} else if(params.deselected || "") {
			console.log("On dé-charge la liste " + params.deselected);
			Pioche.RemoveOnedesk(params.deselected);	
		}

	});
	
	
	ButtonStartInvasion.click(function(){
		Invasion.StartInvasion ();	
	});
	

	$(".front img").dblclick(function (){
		Pioche.PiocherCard ();
	});
	
	//// Clique sur suivant
	ButtonCarteSuivante.click(function(){
		Pioche.PiocherCard ();	
	});
	

	
});
