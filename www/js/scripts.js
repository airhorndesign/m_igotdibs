// JavaScript Document
var xmlHttp;

function loginForm(thisform) {
	xmlHttp=GetXmlHttpObject();
	if (xmlHttp==null) {
 alert ("Browser does not support HTTP Request");
 return;
 }
	var formdata = "";
	formdata = "username=" + thisform.elements['username'].value + "&password=" + thisform.elements['password'].value;
	xmlHttp.onreadystatechange=Login;
	xmlHttp.open("POST", "http://www.airhorndesign.com/m_igotdibs/login.php",true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", formdata.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(formdata);
	return false;
}

function Login() { 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
	if (xmlHttp.responseText != "sorry"){
		//alert (xmlHttp.responseText);
		localStorage.setItem('UserID',xmlHttp.responseText);
		$.mobile.changePage('index.html#main', { transition: 'none'} );
		getUser();
	} else {
		alert (xmlHttp.responseText);
	}
}
}

function getUser() {
	var userId = localStorage.getItem('UserID');
	$.getJSON("http://www.airhorndesign.com/m_igotdibs/getUser.php?id="+userId, function(data){ 
		for(var i=0;i<data.user.length;i++){
			document.getElementById('feedback').innerHTML =  '<h3>Welcome back ' + data.user[i].uname + '</h3>';
		}
		for(var j=0;j<data.items.length;j++){
			document.getElementById('itemlist').innerHTML += '<li><a href="#details" onClick="getOne(\'' + data.items[j].itemID + '\');" data-icon="arrow-r" data-transition="slide"><img src="http://airhorndesign.com/igotdibs/items/' + data.items[j].image + '" /><p>' + data.items[j].brand + ' - ' + data.items[j].model + '</p></a></li>';
		}
		for(var h=0;h<data.records.length;h++){
			document.getElementById('recordlist').innerHTML += '<li><a href="#details" onClick="getOne(\'' + data.records[h].artistID + '\');" data-icon="arrow-r" data-transition="slide"><p>' + data.records[h].artist + ' - ' + data.records[h].album + '</p></a></li>';
		}
		$('#itemlist').listview('refresh');	
		$('#recordlist').listview('refresh');
	});
}

function getOne() {
}


function GetXmlHttpObject() {
xmlHttp=null;
try
 {
 xmlHttp=new XMLHttpRequest();
 }
catch (e)
 {
 try
  {
  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  }
 catch (e)
  {
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 }
return xmlHttp;
}