// Global Variables 
var pagewidth = window.innerWidth;
var pageheight = window.innerHeight;
var usefulheight = pageheight - 200;
var words = ["yes", "no", "how", "why", "cake", "paper", "party", "peak", "plain", "power", "song", "beat", "guitar", "prove", "prime", "polar", "integer", "odd", "even", "subtract", "add", "multiply", "divide", "alter", "change", "come", "go", "drive", "bike", "car", "train", "picture", "image", "prowl", "lion", "tiger", "cheetah", "elephant", "giraffe", "zebra", "mouse", "deformation", "lattice", "junction", "transistor", "diode", "transport", "amazing", "kharagpur"];
var speed = 10000;
var delay = 2000;
var condition = true;
var wordsonscreen = [""];
var wordcount = 0;
var mystring = "";
var finalpos = pagewidth + "px";
// To decide win or loose
var hasreachedend = [""];
var hasbeendefeated = [""];
var explodecount = 0;

// Resize when browser height changes 
$( window ).resize(function() {
    pageheight = window.innerHeight;
    usefulheight = pageheight - 200;
});



// Chooses a Random Word
function getnextword(arr) { "use strict";
    var len = arr.length, index = Math.random() * len;
    return (arr[Math.floor(index)]);
    }
            
// Chooses an entry position for the new word
function getposition(height) { "use strict";
    var index = Math.random() * height;
    return (Math.floor(index));
    }
            
// Adds the Word Along with the Animation
function addword() { "use strict";
    wordcount++;
    var nextword = getnextword(words);
    var position = getposition(usefulheight)+100;
    wordsonscreen[wordcount]=nextword.toUpperCase();
    document.getElementById(wordcount).innerHTML=nextword;
    document.getElementById(wordcount).style.left="-100px";
    document.getElementById(wordcount).style.bottom=position.toString()+"px";
    var elementid = "#"+wordcount;
    $(elementid).animate({left: finalpos }, speed, 'linear', function(){theend(this.wordcount);});
    speed=speed-100; // Alter for change in hardness
    delay=delay-20;  // Alter for change in hardness            
    window.setTimeout(function(){ addword();}, delay);            
    }
            
// Exploding function
function letsexplode( str ) { "use strict";   
    var str1="";
    for( var l=0;l<str.length; l++) {
        if(str.charAt(l)!=' ')
        str1=str1+str.charAt(l);
        }
    str=str1;
    if(str!=undefined)
    str=str.toUpperCase();
    var eraseold=false;
    for( var i=1; i<= wordcount; i++ ) {
        if( str==wordsonscreen[i]) {
            var tempstring = "#"+i;
            $(tempstring).hide();
            if(hasbeendefeated[i]!=true)
                explodecount++;
            hasbeendefeated[i]=true;
            eraseold=true;
            document.getElementById("score").innerHTML="<p class=\"scoring\">"+explodecount+"</p>";
            }
        }
    if(eraseold) {
        document.getElementById("input").reset();
        }
    }
            
// Let The Games Begin
function gamebegins() { "use strict";
    var mystring="";
    for( var i=0; i<1000; i++ )
        mystring=mystring+"<p id=\""+i+"\"></p>";
    document.getElementById("yippee").innerHTML=mystring;
    document.getElementById("gameinteractive").innerHTML="<div class=\"typing\"><form id=\"input\"><input type=\"text\" id=\"letsfocusonthis\" onkeyup=\"letsexplode(this.value)\"></input></form><div id=\"score\"><p class=\"scoring\">0</p></div></div>";
    $( "#letsfocusonthis" ).focus();
    window.setTimeout(function(){ addword();}, 2000);
    }
            
// You Lose 
function theend( num ) { "use strict";
    for(var k=1;k<wordcount;k++) {
        if(!hasbeendefeated[k]) {
            var myidhere=k;
            console.log("Step1");
            console.log(window.getComputedStyle(document.getElementById(myidhere)).getPropertyValue('left'));
            if(window.getComputedStyle(document.getElementById(myidhere)).getPropertyValue('left')==finalpos) {
                console.log("Half workss");
                $.post("compute.php",{result: explodecount}, function(result) {document.write(result);}, "html" );
                }
            }
        }
    }
            
$(document).ready(function() {
    $('html').bind('keypress', function(e){if(e.keyCode == 13){return false;}});
});