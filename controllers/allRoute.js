// JavaScript program to print all
// paths from a source to
// destination.

var express = require("express");

const router = express.Router();

let v;

let adjList;
let resultData = [];

// A directed graph using
// adjacency list representation
function Graph(vertices) {
  // initialise vertex count
  v = vertices;

  // initialise adjacency list
  initAdjList();
}

// utility method to initialise
// adjacency list
function initAdjList() {
  adjList = new Array(v);

  for (let i = 0; i < v; i++) {
    adjList[i] = [];
  }
}

// add edge from u to v
function addEdge(u, v) {
  // Add v to u's list.
  adjList[u].push(v);
}

// Prints all paths from
// 's' to 'd'
function printAllPaths(s, d, dict) {
  let isVisited = new Array(v);
  for (let i = 0; i < v; i++) isVisited[i] = false;
  let pathList = [];

  // add source to path[]
  pathList.push(s);

  // Call recursive utility
  printAllPathsUtil(s, d, isVisited, pathList, dict);
}

// A recursive function to print
// all paths from 'u' to 'd'.
// isVisited[] keeps track of
// vertices in current path.
// localPathList<> stores actual
// vertices in the current path
function printAllPathsUtil(u, d, isVisited, localPathList, dict) {
  if (u == d) {
    let localData = [];
    for (let t = 0; t < localPathList.length; t++) {
      const data = localPathList[t];
      const keyData = Object.keys(dict).find((key) => dict[key] === data);

      localData.push(keyData);
    }
    resultData.push({ [`route ${resultData.length + 1}`]: [...localData] });
    // if match found then no need to
    // traverse more till depth
    return;
  }

  // Mark the current node
  isVisited[u] = true;

  // Recur for all the vertices
  // adjacent to current vertex
  for (let i = 0; i < adjList[u].length; i++) {
    if (!isVisited[adjList[u][i]]) {
      // store current node
      // in path[]
      localPathList.push(adjList[u][i]);
      printAllPathsUtil(adjList[u][i], d, isVisited, localPathList, dict);

      // remove current node
      // in path[]
      localPathList.splice(localPathList.indexOf(adjList[u][i]), 1);
    }
  }

  // Mark the current node
  isVisited[u] = false;
}

// Driver program
// Create a sample graph
let links = [
  ["Nagole", "Uppal", 10],
  ["Uppal", "Stadium", 10],
  ["Stadium", "NGRI", 12],
  ["NGRI", "Habsiguda", 8],
  ["Habsiguda", "Tarnaka", 14],
  ["Tarnaka", "Mettuguda", 14],
  ["Mettuguda", "Secunderabad East", 18],
  ["Secunderabad East", "Parade Grounds", 16],
  ["Parade Grounds", "Paradise", 12],
  ["Paradise", "Rasool Pura", 10],
  ["Rasool Pura", "Prakash Nagar", 11],
  ["Prakash Nagar", "Begumpet", 14],
  ["Begumpet", "Ameerpet", 15],
  ["Ameerpet", "Madhura Nagar", 7],
  ["Madhura Nagar", "Yusuf Guda", 14],
  ["Yusuf Guda", "Jubilee Hills Road No 5", 8],
  ["Jubilee Hills Road No 5", "Jubilee Hills Check Post", 12],
  ["Jubilee Hills Check Post", "Pedamma Temple", 6],
  ["Pedamma Temple", "Madhapur", 12],
  ["Madhapur", "Durgam Chervu", 16],
  ["Durgam Chervu", "HITEC City", 8],
  ["HITEC City", "Raidurg", 15],
  ["Uppal", "Nagole", 10],
  ["Stadium", "Uppal", 10],
  ["NGRI", "Stadium", 12],
  ["Habsiguda", "NGRI", 8],
  ["Tarnaka", "Habsiguda", 14],
  ["Mettuguda", "Tarnaka", 14],
  ["Secunderabad East", "Mettuguda", 18],
  ["Parade Grounds", "Secunderabad East", 16],
  ["Paradise", "Parade Grounds", 12],
  ["Rasool Pura", "Paradise", 10],
  ["Prakash Nagar", "Rasool Pura", 11],
  ["Begumpet", "Prakash Nagar", 14],
  ["Ameerpet", "Begumpet", 15],
  ["Madhura Nagar", "Ameerpet", 7],
  ["Yusuf Guda", "Madhura Nagar", 14],
  ["Jubilee Hills Road No 5", "Yusuf Guda", 8],
  ["Jubilee Hills Check Post", "Jubilee Hills Road No 5", 12],
  ["Pedamma Temple", "Jubilee Hills Check Post", 6],
  ["Madhapur", "Pedamma Temple", 12],
  ["Durgam Chervu", "Madhapur", 16],
  ["HITEC City", "Durgam Chervu", 8],
  ["Raidurg", "HITEC City", 15],
  ["L B Nagar", "Victoria Memorial", 14],
  ["Victoria Memorial", "Chaitanyapuri", 10],
  ["Chaitanyapuri", "Dilsukhnagar", 14],
  ["Dilsukhnagar", "Musarambagh", 15],
  ["Musarambagh", "New Market", 10],
  ["New Market", "Malakpet", 11],
  ["Malakpet", "M G Bus station", 10],
  ["M G Bus station", "Osmania Medical College", 6],
  ["Osmania Medical College", "Gandhi Bhavan", 10],
  ["Gandhi Bhavan", "Nampally", 8],
  ["Nampally", "Assembly", 7],
  ["Assembly", "Lakdikapul", 10],
  ["Lakdikapul", "Khairatabad", 10],
  ["Khairatabad", "Irrum Manzil", 10],
  ["Irrum Manzil", "Punjagutta", 11],
  ["Punjagutta", "Ameerpet", 10],
  ["Ameerpet", "S R Nagar", 10],
  ["S R Nagar", "ESI Hospital", 7],
  ["ESI Hospital", "Erragadda Road", 10],
  ["Erragadda Road", "Bharat Nagar", 7],
  ["Bharat Nagar", "Moosapet", 11],
  ["Moosapet", "Balanagar", 7],
  ["Balanagar", "Kukatpally", 14],
  ["Kukatpally", "KPHB Colony", 14],
  ["KPHB Colony", "JNTU College", 15],
  ["JNTU College", "Miyapur", 17],
  ["Victoria Memorial", "L B Nagar", 14],
  ["Chaitanyapuri", "Victoria Memorial", 10],
  ["Dilsukhnagar", "Chaitanyapuri", 14],
  ["Musarambagh", "Dilsukhnagar", 15],
  ["New Market", "Musarambagh", 10],
  ["Malakpet", "New Market", 11],
  ["M G Bus station", "Malakpet", 10],
  ["Osmania Medical College", "M G Bus station", 6],
  ["Gandhi Bhavan", "Osmania Medical College", 10],
  ["Nampally", "Gandhi Bhavan", 8],
  ["Assembly", "Nampally", 7],
  ["Lakdikapul", "Assembly", 10],
  ["Khairatabad", "Lakdikapul", 10],
  ["Irrum Manzil", "Khairatabad", 10],
  ["Punjagutta", "Irrum Manzil", 11],
  ["Ameerpet", "Punjagutta", 10],
  ["S R Nagar", "Ameerpet", 10],
  ["ESI Hospital", "S R Nagar", 7],
  ["Erragadda Road", "ESI Hospital", 10],
  ["Bharat Nagar", "Erragadda Road", 7],
  ["Moosapet", "Bharat Nagar", 11],
  ["Balanagar", "Moosapet", 7],
  ["Kukatpally", "Balanagar", 14],
  ["KPHB Colony", "Kukatpally", 14],
  ["JNTU College", "KPHB Colony", 15],
  ["Miyapur", "JNTU College", 17],
  ["JBS", "Parade Grounds", 5],
  ["Parade Grounds", "Secunderabad West", 13],
  ["Secunderabad West", "Gandhi Hospital", 13],
  ["Gandhi Hospital", "Musheerabad", 10],
  ["Musheerabad", "RTC Cross Roads", 13],
  ["RTC Cross Roads", "Chikkadpally", 8],
  ["Chikkadpally", "Narayanguda", 9],
  ["Narayanguda", "Sultan Bazar", 13],
  ["Sultan Bazar", "M G Bus station", 7],
  ["Parade Grounds", "JBS", 5],
  ["Secunderabad West", "Parade Grounds", 13],
  ["Gandhi Hospital", "Secunderabad West", 13],
  ["Musheerabad", "Gandhi Hospital", 10],
  ["RTC Cross Roads", "Musheerabad", 13],
  ["Chikkadpally", "RTC Cross Roads", 8],
  ["Narayanguda", "Chikkadpally", 9],
  ["Sultan Bazar", "Narayanguda", 13],
  ["M G Bus station", "Sultan Bazar", 7],
];

let arr = [];
for (let i = 0; i < links.length; i++) {
  const data = links[i];
  arr.push(data[0]);
  arr.push(data[1]);
}

let newArr = [...new Set(arr)];

let dict = {};

for (let i = 0; i < newArr.length; i++) {
  dict[newArr[i]] = i;
}

g = Graph(59);

for (let i = 0; i < links.length; i++) {
  const data = links[i];
  addEdge(dict[data[0]], dict[data[1]]);
}

let source = "Nagole",
  destination = "Nampally";
let s = dict[source],
  d = dict[destination];

//console.log("Following are all different paths from " + s + " to " + d);
//printAllPaths(s, d, dict);
//console.log(resultData);

router.get("/:from/:to", (req, res) => {
  let to = req.params.to;
  let from = req.params.from;
  let s = dict[from],
    d = dict[to];
  resultData = [];
  //console.log("s d", s, d, from, to, dict);
  printAllPaths(s, d, dict);
  //console.log("resultData", resultData);
  res.send(resultData);
});

module.exports = router;
