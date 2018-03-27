jQuery(document).ready(function($){


	function displayXP(data, cible){
		var result = $('#'+cible);

		var ul = $('<ul class="timeline"></ul>');
		ul.appendTo(result);

		data.xps.forEach(function(xp){
			//New XP into a li
			var li=$('<li/>');
			li.appendTo(ul);

			var divXp;
			if(xp.orientation=="right"){
				divXp = $('<div/>', {
				    class: 'direction-r',
				});
				divXp.appendTo(li);
			}
			else{
				divXp = $('<div/>', {
				    class: 'direction-l',
				});
				divXp.appendTo(li);
			}


			//XP Wrarpper (type, date, .....))
			var divWrapper = $('<div/>', {
			    class: 'flag-wrapper',
			});
			divWrapper.appendTo(divXp);

			$('<span/>', {
			    class: 'flag',
			    text: xp.company
			}).appendTo(divWrapper);

			
			var spanTime = $('<span/>', {
			    class: 'time-wrapper'			    
			});

			$('<span/>', {
			    class: 'time',
			    text: xp.from+' - '+xp.to
			}).appendTo(spanTime);

			spanTime.appendTo(divWrapper);


			$('<div/>', {
			    class: 'title',
			    text: xp.title
			}).appendTo(divXp);


			/*$('<span/>', {
			    class: 'type',
			    text: xp.type
			}).appendTo(divXp);*/

			//XP Description
			var divDescription=$('<div/>', {
			    class: 'desc',
			    text: xp.shortDescription
			});
			divDescription.appendTo(divXp);


			$('<a/>', {
			 href: '#modal-'+xp.id,
			 rel: 'modal:open',
			 class:'center',
			 text: 'Détails.....'
			}).appendTo($('<p/>').appendTo(divDescription));

			createModal('modal-'+xp.id, xp, divXp);
			//Long Description
			/*var divLongDescription=$('<div/>', {
			    class: 'LongDesc',
			    text: xp.longDescription
			});
			divLongDescription.appendTo(divXp);			
			*/

		});
		
	}

	function displayError(cible){
		var result = $('#'+cible);
		var error = $('<div class="alert alert-danger"><strong>Erreur</strong> lors du chargement des Experiences</div>');
		error.appendTo(result);

	}


	$.getJSON("resources/experience.json", function(data){
	   displayXP(data,"results");
	})
	.fail(function(){
		displayError("results");
	})
	.always(function(){
		$('#loader').hide();
	});

	function createModal(id, xp, target){
		var divModal = $('<div/>', {
			    id: id,
			    class:"modal",
			}).appendTo(target);

		$('<p/>', {
			 text: xp.longDescription
			}).appendTo(divModal);

		$('<a/>', {
			 href: '#',
			 rel: 'modal:close',
			 text: 'close'
			}).appendTo(divModal);
	}

});