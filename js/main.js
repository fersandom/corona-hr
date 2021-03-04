//VARS AND CONSTS

let dayZero = [];
let diffArray = [];
let diffArrayChart = [];
let totalCases = [];
let dates = [];

const table = document.getElementById("table");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

/*Fetches data, fills arrays and calls render functions*/

function fetchData() {
  fetch(
    "https://api.covid19api.com/dayone/country/croatia/status/confirmed",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      dayZero = data;
      dayZero.reverse();
      //Calculates difference from one day to the other
      for (let i = 1; i < 31; i++) {
        diffArray[i - 1] = dayZero[i - 1].Cases - dayZero[i].Cases;
      }
      //Creates an array of the last month
      for (let i = 0; i < 31; i++) {
        totalCases[i] = dayZero[i].Cases;
      }
      //Formats date
      for (let i = 0; i < 31; i++) {
        dates[i] = dayZero[i].Date.slice(0, 10);
      }
      //Put in correct order for display the arrays
      totalCases.reverse();
      diffArrayChart = [...diffArray];
      diffArrayChart.reverse();

      //Launches functions
      renderChart();
      renderData();
    });
}

//Renders the data from the table
function renderData() {
  for (let i = 0; i < 30; i++) {
    let output = document.createElement("tr");
    output.innerHTML = `
        <td class="table-data">${dates[i]}</td>
        <td class="table-data">${dayZero[i].Cases}</td>
        <td class="table-data">${diffArray[i]}</td>
    `;

    table.appendChild(output);
  }
}

/*Renders the charts. 
Here I used chartist.js the CDNs are in the HTML head
https://gionkunz.github.io/chartist-js/index.html
*/

function renderChart() {
  const totalChartOptions = {
    width: 1200,
    height: 500,
  };

  const diffChartOptions = {
    width: 1200,
    height: 500,
  };

  let dataTotal = {
    labels: dates,
    series: [totalCases],
  };
  new Chartist.Line(".total-cases-chart", dataTotal, totalChartOptions);

  let dataIncrease = {
    labels: dates,
    series: [diffArrayChart],
  };

  new Chartist.Bar(".increase-chart", dataIncrease, diffChartOptions, {
    distributeSeries: true,
  });
}

//Calls the first function
fetchData();
