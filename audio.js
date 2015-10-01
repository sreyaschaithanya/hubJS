function updateseek(){
	var audio  = document.getElementsByTagName("audio")[0];
	var seek = document.getElementsByClassName("doneSeek")[0];
	var tot = audio.duration;
	var cur = audio.currentTime;
	var perc = (cur * 100.0) / tot;
	// console.log("'" +(Math.round(perc)*350).toString()+"'");
	seek.style.width = perc.toString()+"%";
}
function Play (x) {
	var audio  = document.getElementsByTagName("audio")[0];
	var albumart = document.getElementsByClassName("albumart")[0];
	var seek = document.getElementsByClassName("doneSeek")[0];
	// seek.style.width = "100%";
	seek.style.background="#f92672";
	if(x.src.search("pause.png") != -1){
		//Pause is pressed
		x.src = "play.png";
		albumart.style.background = "#f92672 url('albumart.png') no-repeat center center";
		document.body.style.background = "#000000 url('albumart.png') no-repeat center center";
		albumart.style.backgroundSize = "100% 100%";
		// document.body.style.backgroundSize = "100% 100%";
		// infobar.innerHTML = "<center>IDLE</center>"
		audio.pause();
		return;
	}
	if(x.src.search("play.png") != -1){
		//Play is pressed
		console.log(audio.duration,audio.currentTime);
		x.src = "pause.png";
		var img = audio.src.replace(".mp3",".png");
		albumart.style.background = "#f92672 url('"+img+"') no-repeat center center";
		document.body.style.background = "#000000 url('"+img+"') no-repeat center center";
		audio.play();
		albumart.style.backgroundSize = "100% 100%";
		// document.body.style.backgroundSize = "100% 100%";
		return;
	}
}

function seekat (e) {
	var parent = document.getElementsByClassName("audio")[0];
	var x = e.clientX-parent.offsetLeft;
	// console.log(parent.offsetWidth);
	var seek = document.getElementsByClassName("doneSeek")[0];
	var percent = (x)/parent.offsetWidth;
	var audio  = document.getElementsByTagName("audio")[0];
	audio.currentTime = percent*audio.duration;
	audio.play();
}

function startPlay (aurl) {
	var url = aurl.getAttribute("data");
	var infono = aurl.id.replace('btn','');
	titlei = 'title'+infono;
	albumi = 'album'+infono;
	artisti = 'artist'+infono;
	yeari = 'year'+infono;
	var infobar = document.getElementById("infobar");
	var title = document.getElementById(titlei).innerHTML;
	var album = document.getElementById(albumi).innerHTML;
	var artist = document.getElementById(artisti).innerHTML;
	var year = document.getElementById(yeari).innerHTML;
	infobar.innerHTML = "<center><font size=\"2\">"+title+"</font><br><font size=\"2\">"+album+"&nbsp&nbsp-&nbsp&nbsp"+artist+"<br>"+year+"</font></center>";
	var imf = document.getElementsByTagName("img")[0];
	var audio = document.getElementsByTagName("audio")[0];
	document.title = title + " - Now Playing"
	audio.src = url;
	audio.pause();
	Play(imf);
}

function getAPI(){
	var invocation = new XMLHttpRequest();
	var keyword = document.getElementsByTagName('input')[0].value;
	var based = document.getElementsByTagName('select')[0].value;
	var workarea = document.getElementsByClassName('table')[0].innerHTML="<table><tbody>";
	// console.log(keyword);
	function callOtherDomain() {
    	if(invocation) {   
			invocation.open('GET', url, true);
			invocation.onreadystatechange = function() {
			    	if (invocation.readyState == 4 && invocation.status == 200) {
					var myArr = JSON.parse(invocation.responseText);
					// console.log(myArr.songs.song.length);
					var content = myArr.songs.song;
					var i;
					for (i in content) {
						workarea = workarea +"<tr><td id=\"title"+i+"\">" + content[i].title+"</td><td id=\"album"+i+"\">";
						workarea = workarea + content[i].album+"</td><td id=\"artist"+i+"\">";
						workarea = workarea + content[i].artist+"</td><td  id=\"year"+i+"\">";
						workarea = workarea + content[i].year+"</td><td><button  id='btn"+i+"' data='";
						workarea = workarea +"http://192.168.0.100/" +content[i].url+"' onclick='startPlay(this);'>Play</button></td></tr>";
					}
					document.getElementsByClassName('table')[0].innerHTML = workarea+"</tbody></table>";
			    	}
				}
			invocation.send(); 
	    }
	}
	var url = 'http://192.168.0.100/api/search?query='+keyword+'&based='+based+'&mode=json';
	callOtherDomain();
}