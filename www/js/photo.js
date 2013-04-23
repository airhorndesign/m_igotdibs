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
                document.getElementById('camera_status').innerHTML = "Photo ready for upload!";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI,encodingType: navigator.camera.EncodingType.JPEG,targetWidth: 500, targetHeight: 500
 });
    };


    /**
* Select picture from library
*/
    function selectPicture(pic) {
        navigator.camera.getPicture(
            function(uri) {
                var img = document.getElementById('camera_image');
                img.style.visibility = "visible";
                img.style.display = "block";
                img.src = uri;
                document.getElementById('camera_status').innerHTML = "Photo ready for upload!";
            },
            function(e) {
                console.log("Error getting picture: " + e);
                document.getElementById('camera_status').innerHTML = "Error getting picture.";
            },
            { quality: 50, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM, encodingType: navigator.camera.EncodingType.JPEG});
		$('#upload_btn').attr('onclick','uploadSelectedPicture(\''+pic+'\');');
    };
    
    /**
* Upload current picture
*/
    function uploadPicture(pic) {
    
     // Get URI of picture to upload
	 	$('#upload_btn').attr('disabled',false);
		$('#takePic').attr('disabled',true);
		$('#selectPic').attr('disabled',true);
	 	document.getElementById('camera_status').innerHTML = "Photo upload in progress...may take a bit...";
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }

        // Verify server has been entered
        server = encodeURI("http://airhorndesign.com/igotdibs/addimagesMobile.php?id="+pic);
        if (server) {
        
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                
            	$.mobile.changePage('index.html#main', { transition: 'none'} );
				document.getElementById('uploaded').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded";
			}, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;
            }, options);
        }
    }
	
	
	function uploadSelectedPicture(pic) {
    
     // Get URI of picture to upload
	 	$('#upload_btn').attr('disabled',true);
		$('#takePic').attr('disabled',true);
		$('#selectPic').attr('disabled',true);
		document.getElementById('camera_status').innerHTML = "Photo upload in progress...may take a bit...";
        var img = document.getElementById('camera_image');
        var imageURI = img.src;
        if (!imageURI || (img.style.display == "none")) {
            document.getElementById('camera_status').innerHTML = "Take picture or select picture from library first.";
            return;
        }

        // Verify server has been entered
        server = encodeURI("http://airhorndesign.com/igotdibs/addimagesMobile.php?id="+pic);
        if (server) {
        
            // Specify transfer options
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1) + '.jpg';
            options.mimeType="image/jpeg";
            options.chunkedMode = false;

            // Transfer picture to server
            var ft = new FileTransfer();
            ft.upload(imageURI, server, function(r) {
                
            	$.mobile.changePage('index.html#main', { transition: 'none'} );
				document.getElementById('uploaded').innerHTML = "Upload successful: "+r.bytesSent+" bytes uploaded." + server + imageURI;
			}, function(error) {
                document.getElementById('camera_status').innerHTML = "Upload failed: Code = "+error.code;
            }, options);
        }
    }