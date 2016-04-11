/*
Created 09/27/09										
Questions/Comments: jorenrapini@gmail.com						
COPYRIGHT NOTICE		
Copyright 2009 Joren Rapini
*/
$(document).ready(function(){
	required = ["name", "email", "message"]
	email = $("#email");
	errornotice = $("#error");
	emptyerror = "Пожалуйста заполните поле ФИО.";
	emailerror = "Пожалуйста введите настоящий e-mail.";
	$("#theform").submit(function(){
		for (i=0;i<required.length;i++) {
			var input = $('#'+required[i]);
			if ((input.val() == "") || (input.val() == emptyerror)) {
				input.addClass("needsfilled");
				input.val(emptyerror);
				errornotice.fadeIn(750);
			}
			else {
				input.removeClass("needsfilled");
			}
		}
		if (!/^([a-zA-а-zА-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-а-zА-Z0-9]{2,4})+$/.test(email.val())) {
			email.addClass("needsfilled");
			email.val(emailerror);
		}
		if ($(":input").hasClass("needsfilled")) {
			return false;
		} else {
			errornotice.hide();
			return true;
		}
	});
	$(":input").focus(function(){		
	   if ($(this).hasClass("needsfilled") ) {
			$(this).val("");
			$(this).removeClass("needsfilled");
	   }
	});
});