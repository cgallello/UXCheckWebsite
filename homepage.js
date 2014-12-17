$(document).ready(function () {

	// If right arrow is clicked

		$('#right_arrow').click(function(){
			var initially_visible = $('#walkthrough_image > img:visible');
			var initially_hidden = initially_visible.next();
			var index = initially_hidden.index();
			if (initially_hidden.length){
				initially_hidden.fadeIn(200,function(){
					initially_visible.fadeOut();
					update_arrows(initially_hidden, index);
				});
			}
		});

	// If left arrow is clicked

		$('#left_arrow').click(function(){
			var initially_visible = $('#walkthrough_image > img:visible');
			var initially_hidden = initially_visible.prev();
			var index = initially_hidden.index();
			if (initially_hidden.length){
				initially_hidden.fadeIn(200,function(){
					initially_visible.fadeOut();
					update_arrows(initially_hidden, index);
				});
				
			}
		});

	// On click of label

		$('.label').click(function(){
			if ($(this).attr('class') == 'label'){
				var index = $(this).index();
				var initially_visible = $('#walkthrough_image > img:visible');
				var initially_hidden = $('#walkthrough_image > img:nth-child('+(index+1)+')');
				$(this).siblings().css('background-color','');
				initially_hidden.fadeIn(200,function(){
					initially_visible.fadeOut();
					update_arrows(initially_hidden, index);
				});
			}
		});

	// On hover of label

		$('.label').hover(function(){
			if ($(this).attr('class') == 'label'){
				$(this).css('background-color','rgb(255, 255, 255, 0.1)');
			} 
		}, function(){
			if ($(this).attr('class') == 'label'){
				$(this).css('background-color','');
			}
		});

	// On hover of right arrow

		$('#right_arrow').hover(function(){
			// if active
			if($(this).css('border-left') == '20px solid rgb(168, 168, 168)'){
				window.right_arrow_active = true;
				$(this).css({'border-left':'20px solid rgb(220, 220, 220)','cursor':'pointer'});	
			} else {
				window.right_arrow_active = false;
			}
		}, function(){
			if (window.right_arrow_active){
				$(this).css({'border-left':'20px solid rgb(168, 168, 168)','cursor':'default'});
			}
		});

	// On hover of left arrow
		
		$('#left_arrow').hover(function(){
			// if active
			if($(this).css('border-right') == '20px solid rgb(168, 168, 168)'){
				window.left_arrow_active = true;
				$(this).css({'border-right':'20px solid rgb(220, 220, 220)','cursor':'pointer'});	
			} else {
				window.left_arrow_active = true;
			}
		}, function(){
			if (window.right_arrow_active){
				$(this).css({'border-right':'20px solid rgb(168, 168, 168)','cursor':'default'});
			}
		});

	$('#heuristics_container div').hover(function(){
		$('#heuristics_container div').css('background-color', 'rgba(0,0,0,0)');
		$(this).css('background-color', 'rgba(255,255,255,0.2)');
		var heuristic_number = $(this).index();
		$('#hover_instruction_text div').fadeOut(0);
		$('#hover_instruction_text div:nth-child('+(heuristic_number+2)+')').fadeIn(0);
	}, function(){});
});

// Based on new position, update arrows as disabled if necessary
// Also update circles

	function update_arrows(new_img, index){

		if (new_img.next().length){
			//right arrow is active
			$('#right_arrow').css('border-left','20px solid rgb(168,168,168)');
		} else {
			//right arrow is inactive
			$('#right_arrow').css('border-left','20px solid rgb(68,68,68)');
		}

		if (new_img.prev().length){
			//left arrow is active
			$('#left_arrow').css('border-right','20px solid rgb(168,168,168)');
		} else {
			//left arrow is inactive
			$('#left_arrow').css('border-right','20px solid rgb(68,68,68)');
		}

		// Update description
		var all_descriptions = $("#walkthrough_description > span");
		var new_description = $("#walkthrough_description > span:nth-child("+(index+1)+")");
		console.log(all_descriptions);
		console.log(new_description);
		all_descriptions.fadeOut(100);
		new_description.fadeIn(100);

		// Update circles
		$("#progress > div").attr('class', 'label');
		$("#progress > div:nth-child("+(index+1)+")").attr('class', 'label selected');
		
	}