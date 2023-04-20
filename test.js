var count = 0;
var hunt = []; //[[row, column]]
var m = [
  [1, 1, 1, 0],
  [0, 5, 0, 1],
  [2, 1, 3, 10],
];
for (var i = 0; i < m.length; i++) {
  for (var j = 0; j < m[i].length; j++) {
    if (m[i][j] === 0) hunt.unshift([i, j]);

    if (m[i][j] > 0) {
      if (hunt === []) count += m[i][j];
      for (var p = 0; p < hunt.length; p++) {
        let row = hunt[p][0];
        let column = hunt[p][1];

        if (column === j && i < row) {
          count += m[i][j];
          //console.log("row: " + row + " / column: " + column);
          console.log(hunt[p]);
        }
      }
    }
  }
}

console.log(count);
