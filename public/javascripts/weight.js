//---------------------x,y,z Axis readings--------------------------------------
var weightsocket = io.connect('http://87.44.19.169:5000');

$('#home').click(function(){
    window.location.href = "/home";
});

$('#humidity').click(function(){
    window.location.href = "/humidity";
});

$('#gyro').click(function(){
   window.location.href = "/gyro";
});

$('#temp').click(function(){
   window.location.href = "/temp";
});

weightsocket.on('connect', function (){
    weightsocket.on('mqtt', function (msg){

      var elmarr=msg.topic.split("/");
      var elm=elmarr[3];

      var d = new Date();//Get Date/Time for the times array
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
          if(hours < 10){
            hours = "0" + hours;
          };
          if(minutes < 10){
            minutes = "0" + minutes;
          };
          if(seconds < 10){
            seconds = "0" + seconds;
          }
          console.log(hours + ":" + minutes + ":" + seconds);
      var n = hours + ":" + minutes + ":" + seconds;

      if( elmarr.indexOf('Weight') >= 0){
        str = msg.payload;
        var trim = str.replace(/(?:\r\n|\r|\n)/g, '');
        var sendData = n + "-Weight:" + trim + " KG";
        printText('txtArea',elm,sendData); //Publish data to the textArea

        var test = msg.payload;
        var res = test.split(".");

        var res1 = res[0];
        var res2 = res[1];

        updateWeight(res1,res2);
      }

  });//Subscribe to the queue
    weightsocket.emit('subscribe',{topic:'SmartHive/Weight'});
});
//-----------------------Print to Text Area-------------------------------------
function printText(chatID,ValueElm,PayloadValue){
  $('#'+chatID).append("\n" + PayloadValue);
  $('#'+chatID).scrollTop($('#'+chatID)[0].scrollHeight);
  $('#'.concat(ValueElm)).html(PayloadValue);
};

jQuery(function($) {
  setInterval(function() {
    var date = new Date(),
        time = date.toLocaleTimeString();
    $(".clock").html(time);
  }, 1000);
});

function updateWeight(value1,value2) {
  var firstValue = value1;
  var secondValue = value2;
  var data = firstValue + "." + secondValue +" " + "kg";
  document.getElementById("glock").firstChild.nodeValue = data;
}
