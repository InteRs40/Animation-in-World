// JavaScript Document

function getLeaf(url) {
 var splited=url.split('?');// remove all the parameter from url
 url=splited[0];
 return url.substring(url.lastIndexOf("/")+1);// return file name without domain and path
} 

jQuery.fn.extend({
 enter: function() {//plugins creation
     return this.each(function() {
       var pth = $(this).find("img")[0];
	   //alert($(this).children().attr("href"));
	    if($(this).children().attr("href")==getLeaf(document.location.href)){// check that the link url and document url is same
           $(pth).attr("src",pth.src.replace(/.gif/g, '_active.gif'));
		 } else{
               $(this).hover(function(){
                  $(pth).attr("src",pth.src.replace(/.gif/g, '_active.gif'));// mouse over Image
                  },function(){
                      $(pth).attr("src",pth.src.replace(/_active.gif/g, '.gif'));// mouse out image
                      });
               }
               });
     }
});
$(function(){  // Document is ready
 $("#menu ul#menu li").enter();// call the function
});