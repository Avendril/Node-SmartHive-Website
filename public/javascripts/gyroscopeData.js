//---------------------x,y,z Axis readings--------------------------------------
var gyrosocket = io.connect('http://87.44.19.169:5000');

$('#home').click(function(){
    window.location.href = "/home";
});

$('#humidity').click(function(){
    window.location.href = "/humidity";
});

$('#temp').click(function(){
   window.location.href = "/temp";
});

$('#weight').click(function(){
   window.location.href = "/weight";
});

gyrosocket.on('connect', function (){
    gyrosocket.on('mqtt', function (msg){

      var index=msg.topic.split("/"); //Makes index and Array with different topic elements example: index[0] ="SmartHive",index[1]="Temperature",index[2]="Temp1"

      Array.prototype.contains = function ( needle ) {
         for (i in this) {
             if (this[i] == needle) return true;
         }
         return false;
      }

      if (index.contains('Gyroscope')) { //Get all data from Gyroscope queue

        if((index.indexOf('Axis-X')) >= 0){//X-Axis queue  && 'X-Axis'
          var sendData1 = msg.payload;
          printText("gyrX", sendData1); //Publish data to the textArea
        };

        if((index.indexOf('Axis-Y')) >= 0){//X-Axis queue  && 'X-Axis'
          var sendData1 = msg.payload;
          printText("gyrY", sendData1); //Publish data to the textArea
        };

        if((index.indexOf('Axis-Z')) >= 0){//X-Axis queue  && 'X-Axis'
          var sendData1 = msg.payload;
          printText("gyrZ", sendData1); //Publish data to the textArea
        };
      };

    });//Subscribe to the queue
    gyrosocket.emit('subscribe',{topic:'SmartHive/Gyroscope/#'});
});
//-----------------------Print to Text Area-------------------------------------
function printText(location, value2){
  var secondValue = value2;
  var data = secondValue;
  document.getElementById(location).firstChild.nodeValue = data;
};
