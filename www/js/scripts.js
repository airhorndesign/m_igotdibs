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
			document.getElementById('itemlist').innerHTML += '<li><a href="#details" onClick="getOne(\'' + data.items[j].itemID + '\');" data-icon="arrow-r" data-transition="slide"><img src="http://airhorndesign.com/igotdibs/items/' + data.items[j].image + '" /><p>' + data.items[j].brand + '</p><p>' + data.items[j].model + '</p></a></li>';
		}
		for(var h=0;h<data.records.length;h++){
			document.getElementById('recordlist').innerHTML += '<li><a href="#details" onClick="getOneR(\'' + data.records[h].artistID + '\');" data-icon="arrow-r" data-transition="slide"><img src="http://airhorndesign.com/igotdibs/items/' + data.records[h].image + '" /><p>' + data.records[h].artist + '</p><p>' + data.records[h].album + '</p></a></li>';
		}
		$('#itemlist').listview('refresh');	
		$('#recordlist').listview('refresh');
	});
}

function getOne(itemID) {
	$.getJSON("http://www.airhorndesign.com/m_igotdibs/getOne.php?id="+itemID, function(data){ 
		document.getElementById('item-feedback').innerHTML = '';
		for(var j=0;j<data.items.length;j++){
			document.getElementById('item-feedback').innerHTML = '<h2>' + data.items[j].brand + ' - ' + data.items[j].model + '</h2><p><strong>Model Number: </strong>' + data.items[j].modelnum + '</p><p><strong>Year: </strong>' + data.items[j].year + '</p><p><strong>Additional: </strong>' + data.items[j].additional + '</p><p><strong>Price: </strong>' + data.items[j].price + '</p>';
		}
		for(var h=0;h<data.images.length;h++){
			document.getElementById('item-feedback').innerHTML += '<p><img src="http://airhorndesign.com/igotdibs/items/'  + data.images[h].imagesfull + '" /></p>';
		}
		for(var j=0;j<data.items.length;j++){
			document.getElementById('item-feedback').innerHTML += '<input type="button" id="takePic" onclick="takePicture();" value="Take Picture" /><br/>' +
        '<input type="button" id="selectPic" onclick="selectPicture(\'' + data.items[j].itemID + '\');" value="Select Picture from Library" /><br/>' +
        '<input type="button" id="upload_btn" disabled="disabled" onclick="uploadPicture(\'' + data.items[j].itemID + '\');" value="Upload Picture" />' +
        	'<div>' +
			'<h3>Camera:</h3>' +
			'<b>Status:</b><span id="camera_status"></span><br>' +
       		 '<b>Image:</b><img style="width:120px;visibility:hidden;display:none;" id="camera_image" src="" />' +
			'</div>';
		} 
		$('index.html#details').page('refresh');
	});
}

function getOneR(artistID) {
	$.getJSON("http://www.airhorndesign.com/m_igotdibs/getOne.php?rid="+artistID, function(data){ 
		document.getElementById('item-feedback').innerHTML = '';
		for(var i=0;i<data.records.length;i++){
			document.getElementById('item-feedback').innerHTML = '<h2>' + data.records[i].artist + ' - ' + data.records[i].album + '</h2><p><strong>Genre: </strong>' + data.records[i].genre + '</p><p><strong>Label: </strong>' + data.records[i].label + '</p><p><strong>Year: </strong>' + data.records[i].year + '</p><p><strong>Format: </strong>' + data.records[i].format + '</p><p><strong>Additional: </strong>' + data.records[i].additional + '</p><p><strong>Price: </strong>' + data.records[i].price + '</p>';
		}
		for(var g=0;g<data.images.length;g++){
			document.getElementById('item-feedback').innerHTML += '<p><img src="http://airhorndesign.com/igotdibs/items/'  + data.images[g].imagesfull + '" /></p>';
		}
		for(var i=0;i<data.records.length;i++){
			document.getElementById('item-feedback').innerHTML += '<input type="button" id="takePic" onclick="takeRecordPicture();" value="Take Picture" /><br/>' +
        '<input type="button" id="upload_btn" disabled="disabled" onclick="uploadRecordPicture(\'' + data.records[i].artistID + '\');" value="Upload Picture" />' +
        	'<div>' +
			'<h3>Camera:</h3>' +
			'<b>Status:</b><span id="camera_status"></span><br>' +
       		 '<b>Image:</b><img style="width:120px;visibility:hidden;display:none;" id="camera_image" src="" />' +
			'</div>';
		} 
		$('index.html#details').page('refresh');
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