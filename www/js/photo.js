 // Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
function onDeviceReady() {
	// Do cool things here...
}
function getImage() {
// Retrieve image file location from specified source
navigator.camera.getPicture(uploadPhoto, function(message) {
	alert('get picture failed');
	},{
	quality: 20,
	destinationType: navigator.camera.DestinationType.FILE_URI,
	sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
	}
	);
}
function takePic() {
// Retrieve image file location from specified source
navigator.camera.getPicture(uploadPhoto, function(message) {
	alert('get picture failed');
	},{
	quality: 20,
	destinationType: navigator.camera.DestinationType.FILE_URI,
	sourceType: navigator.camera.PictureSourceType.CAMERA
	}
	);
}
function uploadPhoto(imageURI) {
	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.jpg';
	options.mimeType="image/jpeg";
	var params = new Object();

	options.params = params;
	options.chunkedMode = false;
	var ft = new FileTransfer();
	ft.upload(imageURI, encodeURI("http://airhorndesign.com/m_igotdibs/upload.php"), win, fail, options);
}
function win(r) {
	console.log("Code = " + r.responseCode);
	console.log("Response = " + r.response);
	console.log("Sent = " + r.bytesSent);
	alert(r.response);
}
function fail(error) {
	alert("An error has occurred: Code = " + error.code);
}