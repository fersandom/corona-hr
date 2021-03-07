
# Review 01 - 05 May 2020

Hi!

In gerenal, this is okay since this is a simple page so maybe you want to do something more here, I have few ideas:

* **Add date picker** - user can pick a day/month/year
* **Add counrty dropdown** - user can pick whatever country he wants (maybe add country detection as well)
* **Add different themes** - maybe add ligth and black theme (and also a option for a user to pick from a set of accent colors)
* **Try some framework** - try to reproduce this in `Vue` or `React` (or any other)
* **...**

Here are my comments:

## NPM

Instead of manualy inserting packages you are using you can start using some `node package manager` or [`NPM`](https://www.npmjs.com/) for short.
There is an alterantive as well [`yarn`](https://yarnpkg.com/). I am using `NPM` but both are pretty simmilar.

## const vs let

You are mixing a `const` and `let` which is not a good practice. My general idea is to stick to `const` and use `let` if I really need to.

## Global variables

```js
let dayZero = [];
let diffArray = [];
let diffArrayChart = [];
let totalCases = [];
let dates = [];
```

There is not really a need for this to be a global variable. You can create them when you need them inside of `then` funtion
and pass them to `renderData` and `renderChart` via arguments.

## Comments

Instead of using comments you could extract those parts to functions.

## Loops

```
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
```

### 1. Multiple loops

You could have everithing inside of a one loop here and improve performance.
Maybe this is an issue here but what if you created a graph for one year instead of one day.


```
for (let i = 1; i < 31; i++) {
  //Calculates difference from one day to the other
  diffArray[i - 1] = dayZero[i - 1].Cases - dayZero[i].Cases;
  
  //Creates an array of the last month
  dates[i] = dayZero[i].Date.slice(0, 10);
  
  //Formats date
  totalCases[i] = dayZero[i].Cases;
}
```

### 2. For each

Maybe this is in API documentation, but what if there is less than 30 days in that array, or more? There is something called for each iterator

* [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
* [for..in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
* [for..of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)

Read documentation and we what is most suitable here.

## Dates

There is a widely used package for dates: [date-fns](https://date-fns.org/)

## Semantic

`fetchData` should do that and only that, fetch the data. Also, then you could reuse this function if you move URL as argument. I would do it like this:

```js
function fetchData(country, status) {
  return fetch(
    `https://api.covid19api.com/dayone/country/${country}/status/${status}`,
    requestOptions
  )
    .then((response) => response.json())
}
```

Then you can maybe have function `displayData`, which is basically funtion inside of the then, for preproccess and displaying the data.

You want you functions to do **one** task and one task only and effectively.

Function `renderCharts` can be splitted into 2 functions since both charts use different data.

## Reversing

Why so many `.reverse()` function calls? I there is a need for you to iterate an array in reverse order you can just do this `for (let i = 30; i > 0; i++)`















