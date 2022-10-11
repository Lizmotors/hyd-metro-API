// JavaScript program to print all
// paths from a source to
// destination.

var express = require("express");

const router = express.Router();

let v;

let adjList;
let resultData = [];

let links = [
  ["Nagole", "Uppal", 1, 120],
  ["Uppal", "Stadium", 1, 120],
  ["Stadium", "NGRI", 1.2, 60],
  ["NGRI", "Habsiguda", 0.8, 120],
  ["Habsiguda", "Tarnaka", 1.4, 120],
  ["Tarnaka", "Mettuguda", 1.4, 120],
  ["Mettuguda", "Secunderabad East", 1.8, 180],
  ["Secunderabad East", "Parade Grounds", 1.6, 120],
  ["Parade Grounds", "Paradise", 1.2, 120],
  ["Paradise", "Rasool Pura", 1, 120],
  ["Rasool Pura", "Prakash Nagar", 1.1, 60],
  ["Prakash Nagar", "Begumpet", 1.4, 180],
  ["Begumpet", "Ameerpet", 1.5, 180],
  ["Ameerpet", "Madhura Nagar", 0.7, 120],
  ["Madhura Nagar", "Yusuf Guda", 1.4, 120],
  ["Yusuf Guda", "Jubilee Hills Road No 5", 0.8, 120],
  ["Jubilee Hills Road No 5", "Jubilee Hills Check Post", 1.2, 120],
  ["Jubilee Hills Check Post", "Pedamma Temple", 0.6, 120],
  ["Pedamma Temple", "Madhapur", 1.2, 120],
  ["Madhapur", "Durgam Chervu", 1.6, 120],
  ["Durgam Chervu", "HITEC City", 0.8, 120],
  ["HITEC City", "Raidurg", 1.5, 180],
  ["Uppal", "Nagole", 1, 120],
  ["Stadium", "Uppal", 1, 120],
  ["NGRI", "Stadium", 1.2, 60],
  ["Habsiguda", "NGRI", 0.8, 120],
  ["Tarnaka", "Habsiguda", 1.4, 120],
  ["Mettuguda", "Tarnaka", 1.4, 120],
  ["Secunderabad East", "Mettuguda", 1.8, 180],
  ["Parade Grounds", "Secunderabad East", 1.6, 120],
  ["Paradise", "Parade Grounds", 1.2, 120],
  ["Rasool Pura", "Paradise", 1, 120],
  ["Prakash Nagar", "Rasool Pura", 1.1, 60],
  ["Begumpet", "Prakash Nagar", 1.4, 180],
  ["Ameerpet", "Begumpet", 1.5, 180],
  ["Madhura Nagar", "Ameerpet", 0.7, 120],
  ["Yusuf Guda", "Madhura Nagar", 1.4, 120],
  ["Jubilee Hills Road No 5", "Yusuf Guda", 0.8, 120],
  ["Jubilee Hills Check Post", "Jubilee Hills Road No 5", 1.2, 120],
  ["Pedamma Temple", "Jubilee Hills Check Post", 0.6, 120],
  ["Madhapur", "Pedamma Temple", 1.2, 120],
  ["Durgam Chervu", "Madhapur", 1.6, 120],
  ["HITEC City", "Durgam Chervu", 0.8, 120],
  ["Raidurg", "HITEC City", 1.5, 180],
  ["L B Nagar", "Victoria Memorial", 1.4, 120],
  ["Victoria Memorial", "Chaitanyapuri", 1, 120],
  ["Chaitanyapuri", "Dilsukhnagar", 1.4, 120],
  ["Dilsukhnagar", "Musarambagh", 1.5, 120],
  ["Musarambagh", "New Market", 1, 60],
  ["New Market", "Malakpet", 1.1, 120],
  ["Malakpet", "M G Bus station", 1, 120],
  ["M G Bus station", "Osmania Medical College", 0.6, 120],
  ["Osmania Medical College", "Gandhi Bhavan", 1, 60],
  ["Gandhi Bhavan", "Nampally", 0.8, 120],
  ["Nampally", "Assembly", 0.7, 60],
  ["Assembly", "Lakdikapul", 1, 120],
  ["Lakdikapul", "Khairatabad", 1, 120],
  ["Khairatabad", "Irrum Manzil", 1, 120],
  ["Irrum Manzil", "Punjagutta", 1.1, 120],
  ["Punjagutta", "Ameerpet", 1, 120],
  ["Ameerpet", "S R Nagar", 1, 60],
  ["S R Nagar", "ESI Hospital", 0.7, 60],
  ["ESI Hospital", "Erragadda Road", 1, 120],
  ["Erragadda Road", "Bharat Nagar", 0.7, 120],
  ["Bharat Nagar", "Moosapet", 1.1, 120],
  ["Moosapet", "Balanagar", 0.7, 60],
  ["Balanagar", "Kukatpally", 1.4, 120],
  ["Kukatpally", "KPHB Colony", 1.4, 120],
  ["KPHB Colony", "JNTU College", 1.5, 120],
  ["JNTU College", "Miyapur", 1.7, 120],
  ["Victoria Memorial", "L B Nagar", 1.4, 120],
  ["Chaitanyapuri", "Victoria Memorial", 1, 120],
  ["Dilsukhnagar", "Chaitanyapuri", 1.4, 120],
  ["Musarambagh", "Dilsukhnagar", 1.5, 120],
  ["New Market", "Musarambagh", 1, 60],
  ["Malakpet", "New Market", 1.1, 120],
  ["M G Bus station", "Malakpet", 1, 120],
  ["Osmania Medical College", "M G Bus station", 0.6, 120],
  ["Gandhi Bhavan", "Osmania Medical College", 1, 60],
  ["Nampally", "Gandhi Bhavan", 0.8, 120],
  ["Assembly", "Nampally", 0.7, 60],
  ["Lakdikapul", "Assembly", 1, 120],
  ["Khairatabad", "Lakdikapul", 1, 120],
  ["Irrum Manzil", "Khairatabad", 1, 120],
  ["Punjagutta", "Irrum Manzil", 1.1, 120],
  ["Ameerpet", "Punjagutta", 1, 120],
  ["S R Nagar", "Ameerpet", 1, 60],
  ["ESI Hospital", "S R Nagar", 0.7, 60],
  ["Erragadda Road", "ESI Hospital", 1, 120],
  ["Bharat Nagar", "Erragadda Road", 0.7, 120],
  ["Moosapet", "Bharat Nagar", 1.1, 120],
  ["Balanagar", "Moosapet", 0.7, 60],
  ["Kukatpally", "Balanagar", 1.4, 120],
  ["KPHB Colony", "Kukatpally", 1.4, 120],
  ["JNTU College", "KPHB Colony", 1.5, 120],
  ["Miyapur", "JNTU College", 1.7, 120],
  ["JBS", "Parade Grounds", 1, 120],
  ["Parade Grounds", "Secunderabad West", 1, 120],
  ["Secunderabad West", "Gandhi Hospital", 1.3, 180],
  ["Gandhi Hospital", "Musheerabad", 1, 60],
  ["Musheerabad", "RTC Cross Roads", 1.3, 120],
  ["RTC Cross Roads", "Chikkadpally", 0.8, 60],
  ["Chikkadpally", "Narayanguda", 0.9, 120],
  ["Narayanguda", "Sultan Bazar", 1.3, 120],
  ["Sultan Bazar", "M G Bus station", 0.7, 60],
  ["Parade Grounds", "JBS", 1, 120],
  ["Secunderabad West", "Parade Grounds", 1, 120],
  ["Gandhi Hospital", "Secunderabad West", 1.3, 180],
  ["Musheerabad", "Gandhi Hospital", 1, 60],
  ["RTC Cross Roads", "Musheerabad", 1.3, 120],
  ["Chikkadpally", "RTC Cross Roads", 0.8, 60],
  ["Narayanguda", "Chikkadpally", 0.9, 120],
  ["Sultan Bazar", "Narayanguda", 1.3, 120],
  ["M G Bus station", "Sultan Bazar", 0.7, 60],
];

const stations = require("../station.json");

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
function findDistance(distanceData) {
  let distance = 0;
  let time = 0;
  for (let i = 0; i < distanceData.length - 1; i++) {
    const val1 = distanceData[i];
    const val2 = distanceData[i + 1];
    const findData = links.find((ele) => ele[0] === val1 && ele[1] === val2);
    //console.log("find", findData);
    if (findData && findData.length > 0) {
      distance += findData[2];
      time += findData[3];
    }
  }
  return { distance: distance + " kms", time: time + " secs" };
}

function printAllPathsUtil(u, d, isVisited, localPathList, dict) {
  if (u == d) {
    let localData = [];
    for (let t = 0; t < localPathList.length; t++) {
      const data = localPathList[t];
      const keyData = Object.keys(dict).find((key) => dict[key] === data);
      localData.push(keyData);
    }
    const timeData = findDistance([...localData]);

    const formatData = localData.map((ele) => {
      const findData = stations.find((item) => item.station_name === ele);
      //console.log("findData", findData, ele);
      return { ...findData };
    });
    let lines = formatData.map((ele) => ele.line);
    resultData.push({
      [`route ${resultData.length + 1}`]: [...formatData],
      ...timeData,
      lines: [...new Set(lines)],
      totalStations: formatData.length,
    });
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
