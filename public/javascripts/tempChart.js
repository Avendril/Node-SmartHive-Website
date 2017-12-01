var value;  //Temperature sensor 1 values
var value2; //Temperature sensor 2 values

createGraph(); //Call the functions for it to make a clean graph at the start.

var values = []; //create an Array of values from Temperature sensor 1
var values2 = []; //create an Array of values from Temperature sensor 2

var times = []; //create an Array of times

var text = 'txtArea'; //enter the name of the text field

var chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(231,233,237)'
};
//---------------------Temperature1 + 2 ----------------------------------------
var tempsocket = io.connect('http://87.44.19.169:5000');

$('#home').click(function(){
    emptyArrays(values, values2, times)
    window.location.href = "/home";
});

$('#humidity').click(function(){
    emptyArrays(values, values2, times)
    window.location.href = "/humidity"; //Works fine when not switching pages
});

$('#gyro').click(function(){
    emptyArrays(values, values2, times)
    window.location.href = "/gyro"; //Works fine when not switching pages
});

$('#weight').click(function(){
    emptyArrays(values, values2, times)
    window.location.href = "/weight"; //Works fine when not switching pages
});

tempsocket.on('connect', function (){
    tempsocket.on('mqtt', function (msg){

      var elmarr=msg.topic.split("/");
      var elm=elmarr[3];

      if(elmarr.indexOf('Temperature') >= 0){
          if( elmarr.indexOf('Temp1') >= 0){//Temperature1 queue
            var value = (parseFloat(msg.payload)); //convert the string to float
            var value = round(value,1);//round to 1 decimal place after the .
            var sendData = "Internal: " + value + "&#x2103;";// + "&#x2103;" adds the degree Celcius

            printText(text,elm,sendData);

            values.push(value); //Pass the temperature reading into the array
            //console.log("I pushed Values for Temp1")
          };
          if( elmarr.indexOf('Temp2') >= 0 && values.length > 0){//Temperature2 queue
            var value2 = (parseFloat(msg.payload)); //convert the string to float
            var value2 = round(value2,1);//round to 1 decimal place after the .
            var sendData2 = "External: " + value2 + "&#x2103;";// + "&#x2103;" adds the degree Celcius

            printText(text,elm,sendData2);

            values2.push(value2); //Pass the temperature reading into the array
            //console.log("I pushed Values for Temp2")
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

            times.push(n);

            cleanArrays();//Calls function to remove the first element of each Array
            if(times.length == values.length || times.length== values2.length){ //If one array is longer than another, wipe them and reset.
                createGraph(values, values2, times);
                //console.log("I emptied the arrays!")
            }else{
                emptyArrays(values, values2, times);
                //console.log("I created the graph!")
            };
          };

          cleanArrays();//Calls function to remove the first element of each Array
      };
    });//Subscribe to the queue
    tempsocket.emit('subscribe',{topic:'SmartHive/Temperature/#'});
});
//----------------------Round the decimal places--------------------------------
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
//-----------------------Clean up the Arrays------------------------------------
function cleanArrays(){
  if(values.length > 6){//Delete the first value in the Temperature Array
    values.splice(0, 1);
  }

  if(values2.length > 6){//Delete the first value in the Temperature Array
    values2.splice(0, 1);
  }

  if(times.length > 6){//Delete the first value in the Time Array
    times.splice(0, 1);
  }
};

//-----------------------Empty the Arrays --------------------------------------
function emptyArrays(array1, array2, array3){
  array1.lenght = 0;
  array2.lenght = 0;
  array3.lenght = 0;
};
//-----------------------Print to Text Area-------------------------------------
function printText(chatID,ValueElm,PayloadValue){
  $('#'+chatID).append("\n" + PayloadValue);
  $('#'+chatID).scrollTop($('#'+chatID)[0].scrollHeight);
  $('#'.concat(ValueElm)).html(PayloadValue);
};
//-----------------------Line Graph---------------------------------------------
//Function to create the line graph
function createGraph(dataValues, dataValues2, dataTimes){
  console.log(dataValues)
  console.log(dataValues)
  console.log(dataTimes)
  var options = {
  type: 'line',
  data: {
    labels: dataTimes,//Passing the array to be the labels
    datasets: [{
	      label: 'Internal Temperature',
	      data: dataValues,//Passing the array to be the data set
        borderColor: "#3e95cd",
        backgroundColor: "rgba(62, 149, 205, 0.4)",
        // backgroundColor: chartColors.red,
        // borderColor: chartColors.red,
        fill: true
    	},
      {
	      label: 'External Temperature',
	      data: dataValues2,//Passing the array to be the data set
        borderColor: "#ff00e5",
        backgroundColor: "rgba(255, 0, 229, 0.4)",
        // backgroundColor: chartColors.blue,
        // borderColor: chartColors.blue,
        fill: true
    	}
		]
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
            labelString: 'Temperature'
          }
      }]
    }
  }
}
  var ctx = document.getElementById("myChart").getContext('2d');
  new Chart(ctx, options);
};
