
$(function(){
	
	var version = "0.1.0";
	let StatutJeu = false;
	var CheminImg ="img/spawn/";
	var debug = true;
	//var CheminImg ="https://patrickgalbraith.github.io/zombicide-card-database/img/cards/spawn/";
	


////----------------------------------------------------------	

	function  ObjCard (obj) {
		// Proriete
		this.id = obj.attr("id")
		this.source = obj.attr("src")
		this.class = obj.attr("class")
		
	}

	
	
	function ObjPioche(Selector) {
		// propriete
		this.version = 1.0;
		this.contain = Selector;
		this.current = 0;
		this.max = 0;
		this.index = [42,54,66,78,120,132,138,144,192,204,210,222,234,246];
		
		// Ajouter un deck dans la pioche 
		//Desk = numero de desk
		this.AddOneDesk = function (Desk) {
				
			iFin = this.index[Desk];
			if (Desk == 0) { iDebut = 1} else {iDebut = this.index[Desk-1]+1;} 
			//alert ("Ajouter la Saison [" + iDebut + "," + iFin + "]");
			for (let i = iDebut; i <= iFin; i++) {	
				//this.Contain.children().append('<li><img  id="carte_' + i + '" class="carte" src="img/spawn/' + i + '.jpg"></li>');
				OneCardTxt = '<img  id="carte_' + i + '" class="carte" src="' + CheminImg + i + '.jpg">'
				this.AddOneCard (OneCardTxt,$(this.contain));
			}
		};// End Add
		
		
		// Enlever un Deck de la pioche 
		// Desk = numero de desk
		this.RemoveOnedesk = function (Desk) {
				iFin = this.index[Desk];
			if (Desk == 0) { iDebut = 1} else {iDebut = this.index[Desk-1]+1;}
			for (let i = iDebut; i <= iFin; i++) {	
				this.RemoveOneCard ("#carte_"+i)
			}			
		}; // End Remove
		
		
		
		// Supprimmer une carte de la pioche 
		// OneCard ID de la carte
		this.RemoveOneCard = function (OneCard) {
				$(OneCard).remove();
				this.current = 	$(this.contain + " img").length	
				this.AffNbrDeCard ();
		}
		
		// Ajouter une carte de la pioche 
		// OneCard ID de la carte				
		this.AddOneCard = function (OneCardTxt,Contain) {
				Contain.append(OneCardTxt);
				this.current = 	$(this.contain + " img").length
				this.AffNbrDeCard ();
		}
		
		
		// 
		this.AffNbrDeCard = function () {
			
			$("#current").val(this.current);
			$("#max").val(this.max);
				
		}
		
		this.MoveOneCard = function (idcard,selector_cible) {
			if (debug) {console.log("MoveOneCard.SelectorCible: " +  selector_cible);}
			Card = $("#"+idcard);
			Card.clone().appendTo($(selector_cible));
			this.RemoveOneCard (Card);
			this.AffNbrDeCard ();
			//if (debug) {console.log("MoveOneCard.IdcardClone: " +  Card.clone().Attr("id"));}
		}		
		
		this.GetOneCardRamdom = function() {	

			SelectorImg = $(this.contain + " img");
			//console.log("Nombre de carte dans la pioche : " +NbrCards);
			Aleatoire =   (Math.floor(Math.random() * Math.floor(SelectorImg.length)));	
			if (debug) {console.log("GetOneCardRamdom.Aleatoire : " +Aleatoire);}
			Card = SelectorImg.eq(Aleatoire);
			if (debug) {console.log("GetOneCardRamdom.IDCard : " +Card.attr("id"));}
			return (Card.attr("id"));			
		} 
		
		// Piocher une carte dans la pioche
		// Selecteur jQuery pour l'annimation
	
		this.DrawOnecard = function (selector_cible) {
			IdCard = this.GetOneCardRamdom();
			this.MoveOneCard(IdCard,selector_cible);
		}
		
		
	} // END function ObjPioche(Contain) {
	
////----------------------------------------------------------		

	var Pioche = new ObjPioche("#Pioche");
	
	$options = $("#options input[type='checkbox']"); // on cible les  checkbox
	
	$(".chosen-select").chosen({
				disable_search_threshold: 10,
				width: "50%"
			  });
	 $('.chosen-select').on('change', function(evt, params) {
		if(params.selected || "") {
			console.log("On charge la liste " + params.selected);
			Pioche.AddOneDesk(params.selected);
		} else if(params.deselected || "") {
			console.log("On dé-charge la liste " + params.deselected);
			Pioche.RemoveOnedesk(params.deselected);	
		}
		Pioche.max = Pioche.current ;
		Pioche.AffNbrDeCard();
	});
	
	

	
	// INIT
	//1. charger le 1er deck 
		Pioche.AddOneDesk(0);
	// 2. Compteur
		Pioche.max = Pioche.current ;
		Pioche.AffNbrDeCard();
	//console.log($options);
	


//// Clique sur Start 

$("#start").click(function(){
	if (StatutJeu)	{
		// / StatutJeu == True 
		StatutJeu=false;
		console.log("Le jeux va s'arreter")
		$( "#options  input[type='checkbox']" ).prop({disabled: false});
		$( "#navigation  [type='button']" ).prop({disabled: true});
		$(this).text("Start");
		
	} else { /// StatutJeu == false

		StatutJeu=true;
			console.log("Le jeux va Démarrer")
			
		// Bloque les options 
		$( "#options input[type='checkbox']" ).prop({disabled: true});
		$( "#navigation  [type='button']" ).prop({disabled: false});
		$(this).text("Reset");
		Pioche.max = Pioche.current ;
	
	}
	$(this).prop({disabled: false});
});


	
	//// Clique sur suivant
	$("#sui").click(function(){
		// Bloque le bouton Suivant 
		boutton = $(this)
		boutton.prop( "disabled", true );
		
		Pioche.DrawOnecard(".back");
		if (Pioche.current == 0 ) {
			$(".dos img.carte").hide();
		} else {
			$(".dos img.carte").show();
		}
		$("#Animation").css({'animation': 'spin 2s'});
		setTimeout(function(){ 
			Pioche.MoveOneCard(IdCard,"#Defausse");
			$("#Animation").css({'animation': 'none'});
		}, 2000);
		
		
		boutton.prop( "disabled", false );
		
	});
	

	
});
