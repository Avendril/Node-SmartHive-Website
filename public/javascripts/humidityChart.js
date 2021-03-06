var value;  //Humidity sensor values

createGraph(); //Call the functions for it to make a clean graph at the start.

var values = []; //create an Array of values from humidity sensor

var times = []; //create an Array of times
//---------------------Humidity sensor------------------------------------------
var humisocket = io.connect('http://87.44.19.169:5000');

$('#home').click(function(){
    window.location.href = "/home";
});

$('#temp').click(function(){
    window.location.href = "/temp";
});

$('#gyro').click(function(){
   window.location.href = "/gyro";
});

$('#weight').click(function(){
   window.location.href = "/weight";
});

humisocket.on('connect', function (){
    humisocket.on('mqtt', function (msg){

      var elmarr=msg.topic.split("/");
      var elm=elmarr[3];

      if( elmarr.indexOf('Humidity') >= 0){
        var value = (parseFloat(msg.payload)); //convert the string to float
        var value = round(value, 1);
        var value = value.toFixed(1);
        var sendData = "Humidity: " + value + "%";

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
        var n = hours + ":" + minutes + ":" + seconds;

        values.push(value); //Pass the Humidity readings into array
        times.push(n);

        printText("txtHumi",elm,sendData);
        cleanArrays();

        if(times.length > values.length){ //If one array is longer than another, wipe them and reset.
            EmptyArrays(values, times);
        }else{
            createGraph(values, times);
        };

        cleanArrays();
      };
    });//Subscribe to the queue
    humisocket.emit('subscribe',{topic:'SmartHive/Humidity'});
});
//------------------------Print to text area------------------------------------
function printText(chatID,ValueElm,PayloadValue){
  $('#'+chatID).append("\n" + PayloadValue);
  $('#'+chatID).scrollTop($('#'+chatID)[0].scrollHeight);
  $('#'.concat(ValueElm)).html(PayloadValue);
};
//----------------------Round the decimal places--------------------------------
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
//-----------------------Clean Arrays-------------------------------------------
function cleanArrays(){
  if(values.length > 6)//Delete the first value in the Temperature Array
  {
    values.splice(0, 1);
  }

  if(times.length > 6)//Delete the first value in the Time Array
  {
    times.splice(0, 1);
  }
};
//-----------------------Empty Arrays-------------------------------------------
function EmptyArrays(array1, array2){
  array1.lenght = 0;
  array2.lenght = 0;
};
//-----------------------Line Graph---------------------------------------------
//Function to create the line graph
function createGraph(dataValues, dataTimes){
  var options = {
  type: 'line',
  data: {
    labels: dataTimes,//Passing the array to be the labels
    datasets: [{
	      label: 'Humidity Readings',
	      data: dataValues,//Passing the array to be the data set
        borderColor: "#3e95cd",
        backgroundColor: "rgba(62, 149, 205, 0.4)",
        fill: true
    	}]
  },
  options: {
      responsive: true,
      tooltips: {
        mode: 'label',
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Humidity'
          }
      }]
    }
  }
}
  var ctx = document.getElementById("humidityReadings").getContext('2d');
  new Chart(ctx, options);
};
