 // Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);
// PhoneGap is ready
function onDeviceReady() {
	// Do cool things here...
}
function takePicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI});
    };


    /**
* Select picture from library
*/
    function selectPicture() {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Success";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY});
    };
    
    /**
* Upload current picture
*/
    function uploadPicture() {
    
     // Get URI of picture to upload
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }
        
        // Verify server has been entered
        server = "http://airhorndesign.com/m_igotdibs/upload.php";
        if (server) {
        
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.jpg';
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                document.getElementById('camera_status').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded.";
            }, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;
            }, options);
        }
    }