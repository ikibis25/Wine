/*
Copyright (c) 2016 solar_energy
------------------------------------------------------------------
[Master Javascript]

Project:	solar_energy

-------------------------------------------------------------------*/

(function ($) {
	"use strict";
	var solar_energy = {
		initialised: false,
		version: 1.0,
		mobile: false,
		init: function () {

			if(!this.initialised) {
				this.initialised = true;
			} else {
				return;
			}

			/*-------------- solar_energy Functions Calling ---------------------------------------------------
			------------------------------------------------------------------------------------------------*/
			this.navToggle();
			this.Main_slider();
			this.profile_slider();
			this.Map_function();
			this.mail_function();
			this.scroll_menu();
			this.wow();
			
		},
		
		/*-------------- solar_energy Functions definition ---------------------------------------------------
		---------------------------------------------------------------------------------------------------*/
		navToggle: function () {
			$('.nav_toggle').on('click', function(){
				$('body').toggleClass('nav_open');
			});

			//dropdown
			$('.st_dropdown_link').append('<span class="dd_cart"><i class="fa fa-angle-down" aria-hidden="true"></i></span>');

			$('.dd_cart').on('click', function(){
				$(this).prev('.st_dropdown').slideToggle(200);
			});

		},
		Main_slider: function () {
			$('.rw_main_slider').slick({
				dots: true,
				boolean: true,
  				cssEase: 'linear',
				speed: 1000,
				autoplay: true,
  				autoplaySpeed: 2000,
  				responsive: [
					{
					breakpoint: 768,
					settings: {
						boolean: false
					}
					}
				]
			});
		},
		profile_slider: function () {
			$('.profile_slider_wrapper').slick({
				boolean: true
			});
		},
		Map_function: function () {
		   if($(".rw_map").length){
			  $( ".rw_map" ).each(function( index ) {
			  var id = $(this).attr("id");
			  var address = $(this).attr("data-address");
			  $(this).googleMap({
			   scrollwheel:true
			  });
			  $(this).addMarker({
				//coords: [22.9622672, 76.05079490000003] // for using lat long for marker
				address:address
			  });
			}); 
		   }
		  },
		  mail_function: function(){
				$("#submit").click(function(){
					var fname = $('#name').val();
					var phone = $('#phone').val();
					var email = $('#email').val();
					var message = $('#message').val();
					var letters = /^[A-Za-z]+$/;
					var number = /^[0-9]+$/;
					var mail_letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
					
					if (fname != "" && phone != "" && email != "" && message != "") {
						if(fname.match(letters)) { 
							if(phone.match(number) && phone.length <= 10) {
								if(email.match(mail_letters)){
									$.ajax({
									method : 'post',
									url : 'ajax_mail.php',
									data :  {'first_name' : fname ,
											  'phone_number' : phone,
											  'email' : email,
											  'message' : message,
											  },
								   }).done(function(resp){ 
								   		console.log(resp);
									   if( resp == 1){
											document.getElementById("error").style.color = "green";
										   document.getElementById("error").innerHTML = "Mail Send Successfully";
											$('#name').val('');
										   $('#phone').val('');
										   $('#email').val('');
										   $('#message').val('');
									   }else{
											document.getElementById("error").style.color = "red";
										    document.getElementById("error").innerHTML = "Mail not Send";
									   }});
								}else{
									document.getElementById("error").style.color = "red";
									document.getElementById("error").innerHTML = "Please Fill The  Correct Mail Id";
								}
							}else{
								document.getElementById("error").style.color = "red";
								document.getElementById("error").innerHTML = "Please Fill The  Correct Number";
							}
						}else
						{	document.getElementById("error").style.color = "red";
							document.getElementById("error").innerHTML = "Please Fill The Correct Name";
						}   
					}else{
						document.getElementById("error").style.color = "red";
						document.getElementById("error").innerHTML = "Please Fill All Detail";
					}
				});
			},
			scroll_menu: function(){
				  $.scrollIt();
			},
			wow: function(){
				 new WOW().init();
			},

		 
	};

	

	// Load Event
	$(window).on('load', function() {
		/* Trigger side menu scrollbar */
		//solar_energy.menuScrollbar();

		$(".rw_loader_wrapper").hide();

	});

	// Scroll Event
	$(window).on('scroll', function () {
		if (document.body.scrollTop > 50) {
			$(".rw_top").css('display','block');
		}else{
			$(".rw_top").css('display','none');
		}
	});
	
	// ready function
	$(document).ready(function() {
		solar_energy.init();
		$('.selectpicker').selectpicker({
			  size: 4
		});

	});
	

})(jQuery);