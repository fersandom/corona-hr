import Chart from "chart.js";

/***País y habitantes***/

let euroUnion = [
  { country: "austria", pop: 8901064 },
  { country: "belgium", pop: 11549888 },
  { country: "bulgaria", pop: 6951482 },
  { country: "croatia", pop: 4058165 },
  { country: "cyprus", pop: 888005 },
  { country: "czech-republic", pop: 10693939 },
  { country: "denmark", pop: 5822763 },
  { country: "estonia", pop: 1328976 },
  { country: "finland", pop: 5525292 },
  { country: "france", pop: 67098824 },
  { country: "germany", pop: 83166711 },
  { country: "greece", pop: 10709739 },
  { country: "hungary", pop: 9769526 },
  { country: "ireland", pop: 4963839 },
  { country: "italy", pop: 60244639 },
  { country: "latvia", pop: 1907675 },
  { country: "lithuania", pop: 2794090 },
  { country: "luxembourg", pop: 626108 },
  { country: "malta", pop: 514564 },
  { country: "netherlands", pop: 17407585 },
  { country: "poland", pop: 37958138 },
  { country: "portugal", pop: 10298909 },
  { country: "romania", pop: 19317984 },
  { country: "slovakia", pop: 5457873 },
  { country: "slovenia", pop: 2098861 },
  { country: "spain", pop: 47329981 },
  { country: "sweden", pop: 10327589 },
];

console.log(euroUnion);

//VARS AND CONSTS

const selectionForm = document.getElementById("selectionForm");
const countryList = document.getElementById("countryList");
const getLength = document.getElementById("getLength");
const getData = document.getElementById("getData");
const table = document.getElementById("table");

for (const country of euroUnion) {
  let option = country.country;
  let el = document.createElement("option");
  el.textContent = option;
  el.value = option;
  countryList.appendChild(el);
}

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

/*Fetches data, fills arrays and calls render functions*/

function fetchData() {
  fetch(
    `https://api.covid19api.com/dayone/country/${countryList.value}/status/confirmed`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      let arrayCases = data;
      
      //   //Calculates infection ratio for 100000 inhabitants
      //   let position = diffArrayChart.length;
      //   let ratio100k = popCroatia / (diffArrayChart[position] * 100);
      //   console.log(
      //     `${popCroatia} / ${diffArrayChart[position] * 100} =  ${ratio100k}`
      //   );
      let diffArray = calcDifference(arrayCases);

      arrayLength(arrayCases, diffArray, noDays);

      console.log(diffArray);
    });
  const noDays = Number(getLength.value) + 1; //It is +1 because last value of array is usually empty
}

//Calculates difference from one day to another
function calcDifference(array) {
  const diffArray = [];
  for (let i = 1; i < array.length; i++) {
    diffArray[i - 1] = array[i].Cases - array[i - 1].Cases;
  }
  return diffArray;
}

//Creates arrays of the selected number of days
function arrayLength(casesArray, diffArray, length) {
  const newCasesArray = casesArray.slice(-length);
  const newDiffArray = diffArray.slice(-length);

  renderTable(newCasesArray, newDiffArray);
  renderChartIncrease(newCasesArray, newDiffArray)
}

//Renders the data from the new arrays
function renderTable(casesArray, diffArray) {
  table.classList.remove("hidden");

  for (let i = 0; i < Number(casesArray.length) - 1; i++) {
    let output = document.createElement("tr");
    output.innerHTML = `
        <td class="table-data output">${casesArray[i].Date}</td>
        <td class="table-data output">${casesArray[i].Cases}</td>
        <td class="table-data output">${diffArray[i]}</td>
    `;

    table.appendChild(output);
  }
}

// function renderChart() {
//   let ctx = document.getElementById("confirmedCases").getContext("2d");
//   let chart = new Chart(ctx, {
//     type: "line",

//     data: {
//       labels: dates,
//       datasets: [
//         {
//           label: "Confirmed cases",
//           borderColor: "rgb(125, 70, 0)",
//           data: totalCases,
//         },
//       ],
//     },

//     options: {},
//   });



// let requestOptions = {
//   method: "GET",
//   redirect: "follow",
// };

function renderChartIncrease(casesArray, diffArray){
  
   let ctx = document.getElementById("chartIncrease").getContext("2d");
  let chart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: casesArray,
      datasets: [
        {
          label: "daily cases",
          backgroundColor: "rgb(125, 70, 0)",
          data: diffArray,
        },
      ],
    },

    options: {},
  });
}

getData.addEventListener("click", fetchData);
