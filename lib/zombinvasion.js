
$(function(){
	
	var version = "0.1.0";
	let StatutJeu = false;
	var CheminImg ="img/spawn/";
	//var CheminImg ="https://patrickgalbraith.github.io/zombicide-card-database/img/cards/spawn/";
	


////----------------------------------------------------------	

	function  ObjCard (obj) {
		// Proriete
		this.id = obj.attr("id")
		this.source = obj.attr("src")
		this.class = obj.attr("class")
		
	}

	
	
	function ObjPioche(Contain,Reste) {
		// propriete
		this.version = 1.0;
		this.contain = Contain;
		this.reste = Reste
		this.lenght = 0;
		this.index = [42,54,66,78,120,132,138,144,192,204,210,222,234,246];
		
		this.Add = function (index) {
				
			iFin = this.index[index];
			if (index == 0) { iDebut = 1} else {iDebut = this.index[index-1]+1;} 
			//alert ("Ajouter la Saison [" + iDebut + "," + iFin + "]");
			for (let i = iDebut; i <= iFin; i++) {	
				//this.Contain.children().append('<li><img  id="carte_' + i + '" class="carte" src="img/spawn/' + i + '.jpg"></li>');
				OneCardTxt = '<img  id="carte_' + i + '" class="carte" src="' + CheminImg + i + '.jpg">'
				this.AddOneCard (OneCardTxt,$(this.contain));
			}
			this.lenght = 	$(this.contain + " img").length
			this.AffNbrDeCard ();
		};// End Add
		
		this.Remove = function (index) {
				iFin = this.index[index];
			if (index == 0) { iDebut = 1} else {iDebut = this.index[index-1]+1;}
			for (let i = iDebut; i <= iFin; i++) {	
				this.RemoveOneCard ("#carte_"+i)
			}
			this.lenght = 	$(this.contain + " img").length
			this.AffNbrDeCard ();
		}; // End Remove
		
		
		this.RemoveOneCard = function (OneCard) {
				$(OneCard).remove();			
		}
		
		this.AddOneCard = function (OneCardTxt,Contain) {
				Contain.append(OneCardTxt);
		}
		
		this.AffNbrDeCard = function () {
			this.lenght = 	$(this.contain + " img").length
			if (this.lenght < 0) {
				$(this.reste).val(0);	
			} else {
				$(this.reste).val(this.lenght);
			}
		}
		
		
		this.MoveCard = function (idcard,cible) {
			Card = $("#"+idcard);
			Card.clone().appendTo($(cible));
			this.RemoveOneCard (Card);
			this.AffNbrDeCard ();
			//console.log(Card.clone().Attr("id"));
		}
		
		this.GetIdCardPioche = function (Aleatoire) {
			Card = $(this.contain + " img").eq(Aleatoire);
			return (Card.attr("id"));
		}
		
	}
	
////----------------------------------------------------------		

	var Pioche = new ObjPioche("#Pioche","#reste");
	
	$options = $("#options input[type='checkbox']"); // on cible les  checkbox
	
	$(".chosen-select").chosen({
				disable_search_threshold: 10,
				width: "50%"
			  });
	 $('.chosen-select').on('change', function(evt, params) {
		if(params.selected || "") {
			console.log("On charge la liste " + params.selected);
			Pioche.Add(params.selected);
		} else if(params.deselected || "") {
			console.log("On dé-charge la liste " + params.deselected);
			Pioche.Remove(params.deselected);	
		}
	});
	
	
	// Definir les boutons Option avec les events 
	for (let i = $options.length - 1; i >= 0; i--) {	
		$options.eq(i).click(function(){
			//alert ("on clique sur " + $options.eq(i).val() + " " + $options.eq(i).attr("checked") );
			if ( $options.eq(i).is(':checked') )
			{
				Pioche.Add(i);						
			} else {
				Pioche.Remove(i);				
			}
		// mettre à jour le compteur 
			Pioche.AffNbrDeCard();
		});
		// console.log($options.eq(i));
	};
	
	
	// INIT
	//1. charger le 1er deck 
		Pioche.Add(0);
	// 2. Compteur
		Pioche.AffNbrDeCard();
	//console.log($options);
	
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(Pioche.lenght+1));
}	

//// Clique sur Start 
$("#start").click(function(){
	if (StatutJeu)	{
		/// StatutJeu == True 
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
	}
	$(this).prop({disabled: false});
});


	
//// Clique sur suivant
$("#sui").click(function(){
	// Bloque le bouton Suivant 
	boutton = $(this)
	boutton.prop( "disabled", true );
	
	Aleatoire = getRandomInt()
	IdCard = Pioche.GetIdCardPioche(Aleatoire)

	Pioche.MoveCard(IdCard,".verso")

	setTimeout(function(){ 
		$("#rectoToverso .recto").css({'transform': 'rotateY(180deg)'});	
		$("#rectoToverso .verso").css({'transform': 'rotateY(360deg)'});
	}, 250);

	setTimeout(function(){ 
		$("#rectoToverso .verso").hide();$("#rectoToverso .recto").hide();
		Pioche.MoveCard(IdCard,"#Defausse");
		$("#rectoToverso .recto").css({'transform': 'rotateY(0deg)'});
		$("#rectoToverso .verso").css({'transform': 'rotateY(180deg)'});
	}, 3250);
	
	setTimeout(function(){ 
		$("#rectoToverso .verso").show();$("#rectoToverso .recto").show();
		// debloque le bouton
		boutton.prop( "disabled", false );
	}, 3300);
});
	

	
});
