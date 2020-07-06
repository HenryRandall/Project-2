// Function to initialize page using initial data
function init() {
  // Grab the dropdown menu and add choices from the dataset
  var dropdown = d3.select("#States");
  // Create list of datasets for the dropdown
  for (var state in orders) {
    dropdown.append("option").text(orders[state].state);
  }
  var stateName = d3.select("#States").property('value');
  countySelect(stateName);
  var stateName = d3.select("#States").property('value');
  var totalsState = d3.select("#TotalS").property('value');
  var resultState = d3.select("#ResultS").property('value');
  StateGraph(stateName,totalsState,resultState)
  var countyName = d3.select("#Counties").property('value');
  var totalsCounty = d3.select("#TotalC").property('value');
  var resultCounty = d3.select("#ResultC").property('value');
  CountyGraph(stateName,countyName,totalsCounty,resultCounty)
};

function countySelect(stateName) {
  var dropdown = d3.select("#Counties");
  dropdown.html("");
  for (var county in county_cases) {
    if ((county_cases[county].State.toUpperCase()) == stateName.toUpperCase()) {
      dropdown.append("option").text(county_cases[county].County);
    }
  }
};

d3.select('#States').on('change', function() {
  var stateName = d3.select("#States").property('value');
  var totalsState = d3.select("#TotalS").property('value');
  var resultState = d3.select("#ResultS").property('value');
  StateGraph(stateName,totalsState,resultState)
  countySelect(stateName);
  var countyName = d3.select("#Counties").property('value');
  var totalsCounty = d3.select("#TotalC").property('value');
  var resultCounty = d3.select("#ResultC").property('value');
  CountyGraph(stateName,countyName,totalsCounty,resultCounty)
});

d3.select('#Counties').on('change', function() {
  var stateName = d3.select("#States").property('value');
  var countyName = d3.select("#Counties").property('value');
  var totalsCounty = d3.select("#TotalC").property('value');
  var resultCounty = d3.select("#ResultC").property('value');
  CountyGraph(stateName,countyName,totalsCounty,resultCounty)
});

d3.select('#TotalS').on('change', function() {
  var stateName = d3.select("#States").property('value');
  var totalsState = d3.select("#TotalS").property('value');
  var resultState = d3.select("#ResultS").property('value');
  StateGraph(stateName,totalsState,resultState)
});

d3.select('#TotalC').on('change', function() {
  var stateName = d3.select("#States").property('value');
  var countyName = d3.select("#Counties").property('value');
  var totalsCounty = d3.select("#TotalC").property('value');
  var resultCounty = d3.select("#ResultC").property('value');
  CountyGraph(stateName,countyName,totalsCounty,resultCounty)
});

d3.select('#ResultS').on('change', function() {
  var stateName = d3.select("#States").property('value');
  var totalsState = d3.select("#TotalS").property('value');
  var resultState = d3.select("#ResultS").property('value');
  StateGraph(stateName,totalsState,resultState)
});

d3.select('#ResultC').on('change', function() {
  var stateName = d3.select("#States").property('value');
  var countyName = d3.select("#Counties").property('value');
  var totalsCounty = d3.select("#TotalC").property('value');
  var resultCounty = d3.select("#ResultC").property('value');
  CountyGraph(stateName,countyName,totalsCounty,resultCounty)
});


function StateGraph(stateName,type,variable) {
  if ((type) == 'Total') {
    if ((variable) == 'Cases') {
      var df=state_cases;
    }
    else {
      var df=state_deaths;
    }
  }
  else {
    if ((variable) == 'Cases') {
      var df=state_cases_daily;
    }
    else {
      var df=state_deaths_daily;
    }
  }
  
  for (var state in df) {
    if ((df[state].State.toUpperCase()) == stateName.toUpperCase()) {
        index = state;
    }
  }

  data=JSON.parse(JSON.stringify(df[index]));
  delete data["State"];
  dates=Object.keys(data);
  var values=[];
  for (var date in dates) {
    values.push(data[dates[date]]);
  }

  var chartData = {
    labels: dates,
    datasets: [{
      data: values,
    }]
  };

  $('#Splot').remove(); // this is my <canvas> element
  $('#Sgraph-container').html('<canvas id="Splot"></canvas>');
  var Splot = document.getElementById("Splot");
  new Chart(Splot, {
    type: 'line',
    data: chartData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  });
};

function CountyGraph(stateName,countyName,type,variable) {
  if ((type) == 'Total') {
    if ((variable) == 'Cases') {
      var df=county_cases;
    }
    else {
      var df=county_deaths;
    }
  }
  else {
    if ((variable) == 'Cases') {
      var df=county_cases_daily;
    }
    else {
      var df=county_deaths_daily;
    }
  }

  for (var county in df) {
    if ((df[county].State.toUpperCase()) == stateName.toUpperCase() && (df[county].County.toUpperCase()) == countyName.toUpperCase()){
        index = county;
    }
  }

  data=JSON.parse(JSON.stringify(df[index]));
  delete data["State"];
  delete data["County"];
  delete data["FIPS"];
  dates=Object.keys(data);
  var values=[];
  for (var date in dates) {
    values.push(data[dates[date]]);
  }

  var chartData = {
    labels: dates,
    datasets: [{
      data: values,
    }]
  };

  $('#Cplot').remove(); // this is my <canvas> element
  $('#Cgraph-container').html('<canvas id="Cplot"></canvas>');
  var Cplot = document.getElementById("Cplot");
  new Chart(Cplot, {
    type: 'line',
    data: chartData,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  });
};

init();