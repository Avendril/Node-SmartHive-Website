var value;  //Humidity sensor values

createGraph(); //Call the functions for it to make a clean graph at the start.

var values = []; //create an Array of values from humidity sensor

var times = []; //create an Array of times
//---------------------Humidity sensor------------------------------------------
var humisocket = io.connect('http://87.44.19.169:5000');

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
        $('#txtHumi').append("\n" + msg.payload + "%");
        $('#txtHumi').scrollTop($('#txtHumi')[0].scrollHeight);
        $('#'.concat(elm)).html(msg.payload);
        var value = (parseFloat(msg.payload)); //convert the string to float
        //console.log(msg.payload);
        values.push(value); //Pass the Humidity readings into array
        var d = new Date();//Get Date/Time for the times array
        var n = d.getHours()+ ":" + d.getMinutes()+ ":" + d.getSeconds();
        times.push(n);

        createGraph(values, times);
      }

        if(values.length > 6)//Delete the first value in the Temperature Array
        {
          values.splice(0, 1);
        }

        if(times.length > 6)//Delete the first value in the Time Array
        {
          times.splice(0, 1);
        }
    });//Subscribe to the queue
    humisocket.emit('subscribe',{topic:'SmartHive/Humidity'});
});
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
      // title: {
      //   display: true,
      //   text: 'Chart.js Line Chart'
      // },
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
