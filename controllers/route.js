// var express = require("express");

// const router = express.Router();

// //QUEUE CLASS
// class PriorityQueue {
//   constructor() {
//     this.collection = [];
//   }
//   enqueue(element) {
//     if (this.isEmpty()) {
//       this.collection.push(element);
//     } else {
//       let added = false;
//       for (let i = 1; i <= this.collection.length; i++) {
//         if (element[1] < this.collection[i - 1][1]) {
//           this.collection.splice(i - 1, 0, element);
//           added = true;
//           break;
//         }
//       }
//       if (!added) {
//         this.collection.push(element);
//       }
//     }
//   }
//   dequeue() {
//     let value = this.collection.shift();
//     return value;
//   }
//   isEmpty() {
//     return this.collection.length === 0;
//   }
// }

// //GRAPH CLASS
// class Graph {
//   constructor() {
//     this.nodes = [];
//     this.adjacencyList = {};
//   }

//   addNode(node) {
//     this.nodes.push(node);
//     this.adjacencyList[node] = [];
//   }

//   addEdge(node1, node2, weight, color) {
//     if (node1 == "mayur vihar - 1") {
//       console.log(node1, node2);
//     }
//     this.adjacencyList[node1].push({
//       node: node2,
//       weight: weight,
//       line: color,
//     });
//     this.adjacencyList[node2].push({
//       node: node1,
//       weight: weight,
//       line: color,
//     });
//   }

//   addEdgeSingle(node1, node2, weight, color) {
//     this.adjacencyList[node1].push({
//       node: node2,
//       weight: weight,
//       line: color,
//     });
//   }

//   //Djikstra
//   shortestRoute(startNode, endNode) {
//     console.log("--Directions from " + startNode + " to " + endNode + "--\n");
//     let times = {};
//     var change = [];
//     let backtrace = {};
//     var foundS = 0,
//       foundD = 0;
//     let pq = new PriorityQueue();
//     times[startNode] = 0;
//     this.nodes.forEach((node) => {
//       if (node == startNode) {
//         foundS = 1;
//       }
//       if (node == endNode) {
//         foundD = 1;
//       }
//       if (node !== startNode) {
//         times[node] = Infinity;
//       }
//     });
//     if (foundS == 0 && foundD == 0) return { status: 406 };
//     else if (foundS == 0) {
//       return { status: 4061 };
//     } else if (foundD == 0) {
//       return { status: 4062 };
//     }
//     pq.enqueue([startNode, 0]);
//     while (!pq.isEmpty()) {
//       let shortestStep = pq.dequeue();
//       let currentNode = shortestStep[0];
//       this.adjacencyList[currentNode].forEach((neighbor) => {
//         console.log(currentNode, neighbor);
//         let time = times[currentNode] + neighbor.weight;
//         if (currentNode != startNode) {
//           if (
//             this.getline(currentNode, neighbor.node) !=
//             this.getline(currentNode, backtrace[currentNode])
//           ) {
//             if (
//               this.getline(currentNode, neighbor.node) == "1.2km Skywalk" ||
//               this.getline(currentNode, backtrace[currentNode]) ==
//                 "1.2km Skywalk"
//             )
//               time = time + 0;
//             //Noida Sector 51 - Noida Sector 52 Handler
//             else if (
//               this.getline(currentNode, neighbor.node) ==
//                 "300m Walkway/Free e-Rickshaw" ||
//               this.getline(currentNode, backtrace[currentNode]) ==
//                 "300m Walkway/Free e-Rickshaw"
//             )
//               time = time + 0;
//             //Ashok Park Main handler
//             else if (
//               currentNode == "Ashok Park Main" &&
//               neighbor.node == "Punjabi Bagh" &&
//               backtrace[currentNode] == "Satguru Ram Singh Marg"
//             ) {
//               time = time + 0;
//             } else if (
//               currentNode == "Ashok Park Main" &&
//               neighbor.node == "Satguru Ram Singh Marg" &&
//               backtrace[currentNode] == "Punjabi Bagh"
//             ) {
//               time = time + 0;
//             }
//             //Interchange Time Penalty
//             else time = time + 9;
//           }
//         }

//         if (time < times[neighbor.node]) {
//           // console.log(time,times[neighbor.node])
//           times[neighbor.node] = time;
//           backtrace[neighbor.node] = currentNode;
//           pq.enqueue([neighbor.node, time]);
//         }
//       });
//     }
//     let path = [endNode];
//     let lastStep = endNode;

//     //Class to send as result
//     class all {
//       constructor() {
//         this.status = 204;
//         this.line1 = [];
//         this.line2 = [];
//         this.interchange = [];
//         this.lineEnds = [];
//         this.path;
//         this.time;
//       }
//     }
//     var result = new all();
//     while (lastStep !== startNode) {
//       if (
//         this.getline(lastStep, backtrace[lastStep]) !=
//         this.getline(backtrace[lastStep], backtrace[backtrace[lastStep]])
//       )
//         if (backtrace[lastStep] == startNode);
//         else if (
//           backtrace[lastStep] == "yamuna bank" &&
//           lastStep == "Indraprastha" &&
//           backtrace[backtrace[lastStep]] == "Laxmi Nagar"
//         ) {
//           //Yamuna Bank Handler
//         } else if (
//           backtrace[lastStep] == "yamuna bank" &&
//           lastStep == "Laxmi Nagar" &&
//           backtrace[backtrace[lastStep]] == "Indraprastha"
//         ) {
//         }
//         //Ashok Park Main Handler
//         else if (
//           backtrace[lastStep] == "Ashok Park Main" &&
//           lastStep == "Punjabi Bagh" &&
//           backtrace[backtrace[lastStep]] == "Satguru Ram Singh Marg"
//         ) {
//         } else if (
//           backtrace[lastStep] == "Ashok Park Main" &&
//           lastStep == "Satguru Ram Singh Marg" &&
//           backtrace[backtrace[lastStep]] == "Punjabi Bagh"
//         ) {
//         } else {
//           var line1Send = this.getline(
//             backtrace[lastStep],
//             backtrace[backtrace[lastStep]]
//           );
//           var line2Send = this.getline(lastStep, backtrace[lastStep]);
//           var interchangeSend = backtrace[lastStep];
//           result.line1.unshift(line1Send);
//           result.line2.unshift(line2Send);
//           result.interchange.unshift(interchangeSend);
//         }
//       path.unshift(backtrace[lastStep]);
//       lastStep = backtrace[lastStep];
//     }
//     result.path = path;
//     result.time = times[endNode];

//     if (result.interchange.length == 0)
//       result.line1[0] = this.getline(result.path[0], result.path[1]);
//     result.lineEnds = getLast(
//       result.path,
//       result.interchange,
//       result.line1,
//       result.line2
//     );
//     console.log(result.time);

//     if (path.length != 1) result.status = 200;
//     return result;
//   }

//   printGraph(sta) {
//     console.log("--Adjacency List Of " + sta + "--");
//     for (var i = 0; i < this.adjacencyList[sta].length; i++)
//       console.log(this.adjacencyList[sta][i].line);
//   }

//   //Returns line between two adjacent stations
//   getline(sta1, sta2) {
//     var a = this.adjacencyList[sta1];
//     var b = this.adjacencyList[sta2];
//     if (a == undefined || b == undefined) return -2;
//     for (var i = 0; i < this.adjacencyList[sta1].length; i++) {
//       if (this.adjacencyList[sta1][i].node == sta2)
//         return this.adjacencyList[sta1][i].line;
//     }
//     for (var j = 0; j < this.adjacencyList[sta2].length; j++) {
//       if (this.adjacencyList[sta2][j].node == sta1)
//         return this.adjacencyList[sta2][j].line;
//     }
//     return -1;
//   }
// }

// //Chooses station array based on input
// function lineChoose(linein) {
//   var line = [];
//   if (linein == "blue") line = blueline;
//   else if (linein == "red") line = redline;
//   else if (linein == "green") line = greenline;
//   else line = 0;
//   return line;
// }

// //Gets last station on line in direction of traversal
// function getLast(path, interchange, line1, line2) {
//   var line;
//   var linein;
//   var out = [];
//   linein = line1[0];

//   //Bluebranch at Yamuna Bank Handler
//   if (linein == "bluebranch" && interchange[0] == "Yamuna Bank") {
//     out.push("Dwarka Sector 21");
//   }
//   //Greenbranch at Ashok Park Main Handler
//   else if (linein == "greenbranch" && interchange[0] == "Ashok Park Main") {
//     out.push("Brigadier Hoshiyar Singh");
//   } else if (linein == "rapid") {
//     var startLoop = 1;
//     var endLoop = 1;

//     for (var i = 0; i < rapidline.length; i++) {
//       if (rapidline[i] == path[0]) {
//         startLoop = 0;
//       }
//       if (rapidline[i] == path[path.length - 1]) {
//         endLoop = 0;
//       }
//     }
//     console.log("S:" + startLoop + " E:" + endLoop);
//     if (startLoop == 1) {
//       if (endLoop == 1) {
//         out.push(getLastCalcStart(rapidloopline, path, interchange));
//       } else out.push("Sector 55–56");
//     } else if (startLoop == 0 && endLoop == 1) {
//       out.push("Phase 3");
//     } else {
//       line = lineChoose(linein);
//       out.push(getLastCalcStart(line, path, interchange));
//     }
//   } else {
//     line = lineChoose(linein);
//     out.push(getLastCalcStart(line, path, interchange));
//   }
//   if (line2.length == 0) return out;
//   for (var i = 0; i < line2.length; i++) {
//     linein = line2[i];

//     line = lineChoose(linein);
//     out.push(getLastCalc(line, path, interchange[i], interchange[i + 1]));
//   }
//   return out;
// }

// //Last station calculator first line
// function getLastCalcStart(line, path, interchange) {
//   var startPos = 1000;
//   var endPos = 1000;
//   if (line == 0) return 0;
//   for (var i = 0; i <= line.length; i++) {
//     //startpos
//     if (line[i] == path[0]) startPos = i;
//     //endpos
//     if (interchange.length == 0) {
//       if (line[i] == path[path.length - 1]) endPos = i;
//     } else if (line[i] == interchange[0]) endPos = i;
//   }
//   console.log("start:" + startPos + " end:" + endPos);
//   return comparePos(startPos, endPos, line);
// }

// //Last station calculator for all lines except first
// function getLastCalc(line, path, interchange, nextInterchange) {
//   var startPos = 1000;
//   var endPos = 1000;
//   if (line == 0) return 0;
//   for (var j = 0; j <= line.length; j++) {
//     //startpos
//     if (line[j] == interchange) startPos = j;
//     //endpos
//     if (nextInterchange == undefined) {
//       if (line[j] == path[path.length - 1]) endPos = j;
//     } else if (line[j] == nextInterchange) {
//       endPos = j;
//     }
//   }
//   return comparePos(startPos, endPos, line);
// }

// //Returns station based on comparisons
// function comparePos(startPos, endPos, line) {
//   //Out of line start handler
//   if (startPos == 1000) {
//     if (line == blueline) return "Dwarka Sector 21";
//     else if (line == greenline) return "Brigadier Hoshiyar Singh";
//   }
//   //Out of line end handler
//   if (endPos == 1000) {
//     if (line == blueline) return "Vaishali";
//     else if (line == greenline) return "Kirti Nagar";
//   }
//   if (endPos < startPos) {
//     return line[0];
//   } else return line[line.length - 1];
// }

// var lines = ["blue", "red", "green"];

// for (var i = 0; i < lines.length; i++) {
//   eval("var " + lines[i] + "line=[]");
// }

// //Imports station details from JSON to line arrays
// function importlines() {
//   blue = require("./lines/blue.json");

//   for (var i = 0; i < blue.length; i++) {
//     blueline[i] = blue[i]["English"].toLowerCase();
//   }

//   for (var i = 0; i < blueline.length; i++) {
//     if (blueline[i] == "Parade Grounds" || blueline[i] == "Ameerpet") continue;
//     else g.addNode(blueline[i]);
//   }

//   for (var i = 0; i < blueline.length - 1; i++) {
//     g.addEdge(blueline[i], blueline[i + 1], 2.06, "blue");
//   }

//   //green Line
//   green = require("./lines/green.json");

//   for (var i = 0; i < green.length; i++) {
//     greenline[i] = green[i]["English"].toLowerCase();
//   }
//   for (var i = 0; i < greenline.length; i++) {
//     if (greenline[i] == "Parade Grounds" || greenline[i] == "MG Bus Station")
//       continue;
//     else g.addNode(greenline[i]);
//   }
//   for (var i = 0; i < greenline.length - 1; i++) {
//     g.addEdge(greenline[i], greenline[i + 1], 1.24, "green");
//   }

//   //red Line
//   red = require("./lines/red.json");

//   for (var i = 0; i < red.length; i++) {
//     redline[i] = red[i]["English"].toLowerCase();
//   }
//   for (var i = 0; i < redline.length; i++) {
//     if (redline[i] == "MG Bus Station" || redline[i] == "Ameerpet") continue;
//     else g.addNode(redline[i]);
//   }
//   for (var i = 0; i < redline.length - 1; i++) {
//     g.addEdge(redline[i], redline[i + 1], 1.46, "red");
//   }
// }

// //Create new graph
// let g = new Graph();
// //Import lines
// importlines();

// router.get("/:from/:to", (req, res) => {
//   let to = req.params.to.toLowerCase();
//   let from = req.params.from.toLowerCase();
//   result = g.shortestRoute(from, to);
//   console.log(result);
//   res.send(result);
// });

// module.exports = router;

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
    if (resultData.length > 0) {
      if (localData.length < resultData.length) {
        resultData = [...localData];
      }
    } else {
      resultData = [...localData];
    }
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
