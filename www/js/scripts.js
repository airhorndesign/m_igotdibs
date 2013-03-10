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
		alert (xmlHttp.responseText);
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
			document.getElementById('feedback').innerHTML =  '<h3>Welcome back ' + data.user[i].fname + ' ' + data.user[i].lname + '</h3>';
		}
	});
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