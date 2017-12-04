//---------------------x,y,z Axis readings--------------------------------------
var gyrosocket = io.connect('http://87.44.19.169:5000');//..

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
          var axisx = round(msg.payload,2);
          document.getElementById('gyrX').firstChild.nodeValue = axisx;
        //  document.getElementById('gyrX').firstChild.nodeValue = msg.payload;
        };

        if((index.indexOf('Axis-Y')) >= 0){
          var axisy = round(msg.payload,2);
          document.getElementById('gyrY').firstChild.nodeValue = axisy;
        //  document.getElementById('gyrX').firstChild.nodeValue = msg.payload;
        };

        if((index.indexOf('Axis-Z')) >= 0){
          var axisz = round(msg.payload,2);
          console.log(axisz)
          document.getElementById('gyrZ').firstChild.nodeValue = axisz;
        //  document.getElementById('gyrX').firstChild.nodeValue = msg.payload;
        };
      };

    });//Subscribe to the queue
    gyrosocket.emit('subscribe',{topic:'SmartHive/Gyroscope/#'});
});

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
