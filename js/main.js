jQuery(document).ready(function($){


	$("#displayMail").click(function(){
		$("#mail").html("guillaume.besset.pro@gmail.com");
		$("#displayMail").remove();
	});

	$("#displayPhone").click(function(){
		$("#phone").html("06 17 45 63 95");
		$("#displayPhone").remove();
	});


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
			    class:"modal container-fluid",
			}).appendTo(target);


		var divTitle = $('<div/>', {
			    text: xp.title,
			    class:"xp-modal-title",
			}).appendTo(divModal);


		var row = $('<div/>', {
			class:"row"
		}).appendTo(divModal);
		
		var colLeft = $('<div/>', {
			class:"col-md-4"
		}).appendTo(row);
		
		var colRight = $('<div/>', {
			class:"col-md-8"
		}).appendTo(row);


		$('<img/>', {
		    class:"xp-modal-img",
		    src: 'resources/img/trier/'+xp.img
		}).appendTo(colLeft);

		var divInfo = $('<div/>', {
				class:"xp-modal-info",
			}).appendTo(colRight);

		var spanType = $('<div/>', {
			    text: xp.type,
			    class:"xp-modal-type",
			}).appendTo(divInfo);


		var spanTime = $('<div/>', {
			    text: xp.from+ ' - '+xp.to,
			    class:"xp-modal-time",
			}).appendTo(divInfo);

		var divDesc = $('<div/>', {
			    class:"xp-modal-desc",
			}).appendTo(divModal);


		for (var i = 0; i<xp.longDescription.length; i++) {
			$('<p/>', {
				 text: xp.longDescription[i].p,
				}).appendTo(divDesc);
		}


		var divClose = $('<div/>', {
				class:"xp-modal-close",
			}).appendTo(divModal);

		$('<a/>', {
			 href: '#',
			 rel: 'modal:close',
			 text: 'close',
			 class: "x-modal-close"
			}).appendTo(divClose);
	}

});