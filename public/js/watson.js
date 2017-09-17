var watson = require('watson-developer-cloud');
var fs = require('fs');

var optimalInfo;
var currentInfo;

var visual_recognition = watson.visual_recognition({
  api_key: '32d1645860b0dbe46788441095b7fd59ecd2fb58',
  version: 'v3',
  version_date: '2016-05-20'
});

var pictureOptimal= {
  images_file: fs.createReadStream('./optimal.jpg')
};


var pictureCurrent= {
  images_file: fs.createReadStream('./current.jpg')
};

var getFaceInfo = function(params) { 
	return new Promise((resolve, reject) => {
		var faceInfo;
		visual_recognition.detectFaces(params, function(err, res) {
		  	if (err) {
			    console.log(err);
				reject(err);
		 	 } else {
			  	var Height = res.images[0].faces[0].face_location.height;
			  	var Width = res.images[0].faces[0].face_location.width;
			  	var CentrePointX = res.images[0].faces[0].face_location.left + Width/2;
			  	var CentrePointY = res.images[0].faces[0].face_location.top - Height/2;
			  	faceInfo = {height:Height, width:Width, centreX:CentrePointX, centreY:CentrePointY};
			  	console.log(faceInfo.height, faceInfo.width);
				resolve(faceInfo)
			}
		});
	})
}

var setOptimal = function(pictureMiddle) {
	return getFaceInfo(pictureOptimal).then((faceInfo) => {
		optimalInfo = faceInfo
	}).catch(function(err) {
		console.log(err)
	})
}

var setCurrent = function(pictureCurrent) {
	return getFaceInfo(pictureCurrent).then((faceInfo) => {
		currentInfo = faceInfo
	}).catch(function(err) {
		console.log(err)
	})
}

var isUserCentered = function() {
	var movementInX = 0.30 * optimalInfo.width;
	var movementInY = 0.2 * optimalInfo.height;
	if(currentInfo.centreX<optimalInfo.centreX - movementInX 
		| currentInfo.centreX>optimalInfo.centreX + movementInX 
		| currentInfo.centreY<optimalInfo.centreY - movementInY 
		|currentInfo.centreY>optimalInfo.centreY + movementInY ) {
			return false;
	}
	else return true;
}

var isUserTooClose = function() {
	if(currentInfo.height * currentInfo.width > optimalInfo.height * optimalInfo.width * 1.2) {
		return true;
	}
	else {
		return false;
	}
}

var isUserTooFar = function() {
	if(currentInfo.height * currentInfo.width < optimalInfo.height * optimalInfo.width /1.1) {
		return true;
	}
	else {
		return false;
	}
}

// Promise.all([setCurrent(pictureCurrent), setOptimal(pictureOptimal)]).then(() => {
// 	console.log(isUserTooFar());
// })