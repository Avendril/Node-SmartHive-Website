//---------------------x,y,z Axis readings--------------------------------------
var socket = io.connect('http://localhost:3000');

socket.on('connect', function (){
    socket.on('mqtt', function (msg){

      var elmarr=msg.topic.split("/");
      var elm=elmarr[3];
//console.log(elmarr);
      if( elmarr.indexOf('Accelerometer' && 'X-Axis') >= 0){//X-Axis queue
        var sendData = msg.payload;
        printText(sendData); //Publish data to the textArea
      };
      if( elmarr.indexOf('Accelerometer' && 'Y-Axis') >= 0){//X-Axis queue
        var sendData = msg.payload;
        printText2(sendData); //Publish data to the textArea
      };
      if( elmarr.indexOf('Accelerometer' && 'Z-Axis') >= 0){//X-Axis queue
        var sendData = msg.payload;
        printText3(sendData); //Publish data to the textArea
      };


      if( elmarr.indexOf('Gyroscope' && 'X-Axis') >= 0){//X-Axis queue
        var sendData = msg.payload;
        printText4(sendData); //Publish data to the textArea
      };
      if( elmarr.indexOf('Gyroscope' && 'Y-Axis') >= 0){//X-Axis queue
        var sendData = msg.payload;
        printText5(sendData); //Publish data to the textArea
      };
      if( elmarr.indexOf('Gyroscope' && 'Z-Axis') >= 0){//X-Axis queue
        var sendData = msg.payload;
        printText6(sendData); //Publish data to the textArea
      };


    });//Subscribe to the queue
    socket.emit('subscribe',{topic:'SmartHive/Accelerometer/#'});
    socket.emit('subscribe',{topic:'SmartHive/Gyroscope/#'});
});
//-----------------------Print to Text Area-------------------------------------
function printText(value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById("accX").firstChild.nodeValue = data;
};
function printText2(value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById("accY").firstChild.nodeValue = data;
};
function printText3(value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById("accZ").firstChild.nodeValue = data;
};


function printText4(value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById("gyrX").firstChild.nodeValue = data;
};
function printText5(value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById("gyrY").firstChild.nodeValue = data;
};
function printText6(value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById("gyrZ").firstChild.nodeValue = data;
};
