
$(function(){
	
	var version = "0.0.1"
	


////----------------------------------------------------------		
	
	function ObjPioche(Contain) {
		// propriete
		this.version = 1.0;
		this.Contain = $(Contain);
		this.index = [42,54,66,78];
		
		this.Add = function (index) {
				
			iFin = this.index[index];
			if (index == 0) { iDebut = 1} else {iDebut = this.index[index-1]+1;} 
			//alert ("Ajouter la Saison [" + iDebut + "," + iFin + "]");
			for (let i = iDebut; i <= iFin; i++) {	
				this.Contain.children().append('<li><img  id="carte_' + i + '" class="carte" src="img/spawn/' + i + '.jpg"></li>');
			}
		};// End Add
		
		this.Remove = function (index) {
				iFin = this.index[index];
			if (index == 0) { iDebut = 1} else {iDebut = this.index[index-1]+1;}
			for (let i = iDebut; i <= iFin; i++) {	
				$("#carte_"+i).parent().remove();
			}
		}; // End Remove
		
	}
	
////----------------------------------------------------------		

	var Pioche = new ObjPioche("#Pioche");
	
	$options = $("#options input[type='checkbox']"); // on cible les  checkbox
	
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
			$("#reste").val($("#Pioche ul li").length-1);
		});
		// console.log($options.eq(i));
	};
	
	//console.log($options);

	
});
