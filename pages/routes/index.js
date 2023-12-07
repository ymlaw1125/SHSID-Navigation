const app = getApp()

Page({
  data: {
    checkDeviation: "true",
    latitude: 31.133459286532112,
    longitude: 121.39819305755685,
    lat_ratio: 1138290.0413503277,
    long_ratio: 597692.019606351,
    startingLocation: '',
    N: 64,
    startIndex: -1,
    endingLocation: '',
    endIndex: -1,
    multiplier: 50,
    originalX: Math.round(wx.getSystemInfoSync().windowWidth - wx.getSystemInfoSync().windowWidth / 18.75),
    originalY: Math.round(wx.getSystemInfoSync().windowWidth) * 800 * 0.5434 / 750,
    xMultiplier: 1962,
    yMultiplier: 1194,
    xM: Math.round(wx.getSystemInfoSync().windowWidth - wx.getSystemInfoSync().windowWidth / 18.75) / 1962,
    yM: Math.round(wx.getSystemInfoSync().windowWidth) * 800 * 0.5434 / 750 / 1194,
    stv: {
      offsetX: 0,
      offsetY: 0,
      zoom: false,
      distance: 0,
      scale: 1,
    },
    dist: [],
    shortestDistance: 0,
    shortestTime: 0,
    route: [],
    directions: [],
    context: '',

    latlong: {
        1: [31.142283407899107, 121.4379695992327],
        2: [31.142034503728336, 121.43813681984369],
        3: [31.14144310584703, 121.43815800859795],
        4: [31.14090150436317, 121.43837671323357],
        5: [31.14069560297207, 121.4384969969156],
        6: [31.140675804737857, 121.43878382723439],
        7: [31.140343193784535, 121.43885784796181],
        8: [31.14005413808, 121.43897813164388],
        9: [31.139994742963122, 121.43874219057521],
        10: [31.140295677838814, 121.438640412075],
        11: [31.13978621201424, 121.43876223287644],
        12: [31.139622549175897, 121.43913849511743],
        13: [31.13928466369583, 121.43861419526361],
        14: [31.139094602593847, 121.43913849510764],
        15: [31.13852969651441, 121.43902746690537],
        16: [31.138841187198693, 121.4394160656133],
        17: [31.13858249161766, 121.43886709283542],
        18: [31.138990880589255, 121.4389466765222],
        19: [31.13917379476597, 121.43817625068803],
        20: [31.139559195726207, 121.4379973719177],
        21: [31.138148470694283, 121.43850519853],
        22: [31.139764140775096, 121.4379443310162],
        23: [31.14052982994165, 121.43767690114527],
        24: [31.14136618598116, 121.43782596070899],
        25: [31.14132365958128, 121.43750023798951],
        26: [31.14094564629962, 121.43641265534984],
        27: [31.14072620872061, 121.43670910422071],
        28: [31.139916899849524, 121.43698601437377],
        29: [31.139777895971218, 121.43655480050747],
        30: [31.1398402080798, 121.43639799546517],
        31: [31.139245844761394, 121.43654920032738],
        32: [31.13883049399205, 121.43482800034809],
        33: [31.139301936208742, 121.4350422023377],
        34: [31.139629325258134, 121.43496570162712],
        35: [31.139923974436204, 121.43411654373976],
        36: [31.139930522185324, 121.43387939153698],
        37: [31.139910878936615, 121.4338028908264],
        38: [31.139920700561504, 121.43567715823545],
        39: [31.14097879017512, 121.43678072271466],
        40: [31.140275035804486, 121.43699521968493],
        41: [31.139395335496687, 121.43730802776662],
        42: [31.139395335496687, 121.4374510257468],
        43: [31.139012854556658, 121.43767446009085],
        44: [31.138791014904616, 121.43687009645228],
        45: [31.139211744837976, 121.43670922372456],
        46: [31.138806314207617, 121.4382732641329],
        47: [31.140718707646588, 121.43614616917756],
        48: [31.140106745942063, 121.4363964156429],
        49: [31.138791014904616, 121.4352256196801],
        50: [31.138583975497813, 121.43511772215136],
        51: [31.13974571775886, 121.4357227890113],
        52: [31.13999765998579, 121.43491330767162],
        53: [31.139808703378346, 121.43414470922792],
        54: [31.139787708176502, 121.43385852895632],
        55: [31.14032658356236, 121.43804493757943],
        56: [31.14059252093109, 121.43794681862916],
        57: [31.13946578117603, 121.43856006208469],
        58: [31.139248829748297, 121.43862547471821],
        59: [31.139262826629576, 121.43510954566713],
        60: [31.1394797780253, 121.43507683935039],
        61: [31.138898907044798, 121.43740716441911],
        62: [31.140298590111748, 121.43483971855393],
        63: [31.140466550704883, 121.43918965870085],
        64: [31.139297818835626, 121.43905883345192],      
    },
        
    edges: [
      [1, 2, 0.45012, "S"],
      [2, 1, 0.45012, "N"],
      [2, 3, 0.76993, "S"],
      [3, 2, 0.76993, "N"],
      [3, 24, 0.74726, "W"],
      [24, 3, 0.74726, "E"],
      [3, 4, 1.00651, "S"],
      [4, 3, 1.00651, "N"],
      [4, 5, 0.42027, "S"],
      [5, 4, 0.42027, "N"],
      [5, 6, 0.60121, "E"],
      [6, 5, 0.60121, "W"],
      [6, 7, 0.66421, "S"],
      [7, 6, 0.66421, "N"],
      [7, 8, 0.44817, "S"],
      [8, 7, 0.44817, "N"],
      [8, 9, 0.69004, "W"],
      [9, 8, 0.69004, "E"],
      [5, 10, 0.6017, "S"],
      [10, 5, 0.6017, "N"],
      [10, 9, 0.57463, "S"], 
      [9, 10, 0.57463, "N"],
      [9, 11, 0.4553, 'S'],
      [11, 9, 0.4553, 'N'],
      [5, 55, 1.42527, 'W'],
      [55, 5, 1.42527, 'E'],
      [24, 25, 0.90523, 'W'],
      [25, 24, 0.90523, 'E'],
      [25, 23, 0.96448, 'S'],
      [23, 25, 0.96448, 'N'], 
      [23, 56, 0.37766, 'E'],
      [56, 23, 0.37766, 'W'],
      [56, 55, 0.51794, 'S'], 
      [55, 56, 0.51794, 'N'],
      [11, 57, 0.40536, 'S'], 
      [57, 11, 0.40536, 'N'],
      [57, 12, 0.79785, 'E'],
      [12, 57, 0.79785, 'W'], 
      [57, 13, 0.42143, 'S'], 
      [13, 57, 0.42143, 'N'],
      [13, 64, 0.38272, 'E'],
      [64, 13, 0.38272, 'W'],
      [14, 64, 0.66, 'N'],
      [64, 14, 0.66, 'S'],
      [13, 58, 0.57734, 'W'],
      [58, 13, 0.57734, 'E'],
      [58, 18, 0.7693, 'S'],
      [18, 58, 0.7693, 'N'],
      [18, 17, 0.91125, 'S'],
      [17, 18, 0.91125, 'N'],
      [17, 15, 0.61025, 'E'],
      [15, 17, 0.61025, 'W'],
      [17, 16, 0.56347, 'E'],
      [16, 17, 0.56347, 'W'],
      [16, 15, 0.43691, 'S'],
      [15, 16, 0.43691, 'N'],
      [21, 17, 1.16017, 'E'],
      [17, 21, 1.16017, 'W'],
      [21, 46, 0.89731, 'N'],
      [46, 21, 0.89731, 'S'],
      [46, 18, 1.02049, 'E'],
      [18, 46, 1.02049, 'W'],
      [46, 19, 0.75403, 'N'],
      [19, 46, 0.75403, 'S'],
      [19, 58, 1.02433, 'E'],
      [58, 19, 1.02433, 'W'],
      [19, 43, 1.06036, 'W'],
      [43, 19, 1.06036, 'E'],
      [43, 42, 0.9506, 'N'], 
      [42, 43, 0.9506, 'S'],
      [43, 61, 0.70391, 'W'], 
      [61, 43, 0.70391, 'E'],
      [61, 44, 1.07775, 'W'], 
      [44, 61, 1.07775, 'E'],
      [44, 45, 0.89851, 'N'],
      [45, 44, 0.89851, 'S'],
      [45, 41, 1.31994, 'E'],
      [41, 45, 1.31994, 'W'],
      [41, 42, 0.56069, 'E'],
      [42, 41, 0.56069, 'W'],
      [42, 20, 1.03446, 'E'],
      [20, 42, 1.03446, 'W'],
      [42, 22, 1.07412, 'E'],
      [22, 42, 1.07412, 'W'],
      [20, 22, 0.34793, 'N'],
      [22, 20, 0.34793, 'S'],
      [20, 11, 1.65088, 'E'],
      [11, 20, 1.65088, 'W'],
      [45, 31, 0.48199, 'W'],
      [31, 45, 0.48199, 'E'],
      [31, 49, 1.94339, 'W'],
      [49, 31, 1.94339, 'E'],
      [49, 50, 1.00223, 'W'],
      [50, 49, 1.00223, 'E'],
      [50, 32, 0.36584, 'N'],
      [32, 50, 0.36584, 'S'],
      [32, 49, 1.05827, 'E'],
      [49, 32, 1.05827, 'W'],
      [49, 59, 0.41957, 'N'],
      [59, 49, 0.41957, 'S'],
      [59, 33, 0.5202, 'W'],
      [33, 59, 0.5202, 'E'],
      [33, 60, 0.57105, 'N'],
      [60, 33, 0.57105, 'S'],
      [60, 34, 0.61646, 'N'],
      [34, 60, 0.61646, 'S'],
      [34, 52, 0.64435, 'N'],
      [52, 34, 0.64435, 'S'],
      [52, 53, 1.30183, 'W'],
      [53, 52, 1.30183, 'E'],
      [53, 35, 0.35637, 'N'],
      [35, 53, 0.35637, 'S'],
      [35, 54, 1.21608, 'W'],
      [54, 35, 1.21608, 'E'],
      [54, 36, 0.48199, 'N'],
      [36, 54, 0.48199, 'S'],
      [54, 37, 0.46275, 'N'],
      [37, 54, 0.46275, 'S'],
      [37, 36, 0.43332, 'E'],
      [36, 37, 0.43332, 'W'],
      [60, 51, 1.21051, 'E'],
      [51, 60, 1.21051, 'W'],
      [51, 38, 0.38375, 'N'],
      [38, 51, 0.38375, 'S'],
      [51, 48, 1.42593, 'E'],
      [48, 51, 1.42593, 'W'],
      [48, 30, 0.31875, 'S'],
      [30, 48, 0.31875, 'N'],
      [30, 29, 0.40824, 'S'],
      [29, 30, 0.40824, 'N'],
      [29, 45, 1.04844, 'S'],
      [45, 29, 1.04844, 'N'],
      [48, 40, 1.37162, 'E'],
      [40, 48, 1.37162, 'W'],
      [40, 28, 0.57378, 'S'],
      [28, 40, 0.57378, 'N'],
      [28, 41, 0.85277, 'S'],
      [41, 28, 0.85277, 'N'],
      [47, 48, 1.34305, 'S'],
      [48, 47, 1.34305, 'N'],
      [47, 26, 0.82517, 'E'],
      [26, 47, 0.82517, 'W'],
      [26, 39, 0.62402, 'E'],
      [39, 26, 0.62402, 'W'],
      [39, 27, 0.32271, 'S'],
      [27, 39, 0.32271, 'W'],
      [27, 40, 1.096, 'S'],
      [40, 27, 1.096, 'N'],
      [39, 25, 1.58006, 'E'],
      [25, 39, 1.58006, 'W'],
      [62, 47, 2.5522, 'E'],
      [47, 62, 2.5522, 'W'],
      [62, 52, 0.37307, 'S'],
      [52, 62, 0.37307, 'N'],
      [63, 7, 1.05636, 'W'],
      [7, 63, 1.05636, 'E'],
    ], 

    coords: {
      1: [1624, 988],
      2: [1623, 929],
      3: [1619, 837],
      4: [1631, 728],
      5: [1619, 667],
      6: [1721, 667],
      7: [1722, 597],
      8: [1727, 523],
      9: [1621, 523],
      10: [1631, 595],
      11: [1615, 479],
      12: [1721, 409],
      13: [1619, 361],
      14: [1661, 261],
      15: [1631, 129],
      16: [1621, 179],
      17: [1553, 137],
      18: [1559, 269],
      19: [1423, 363],
      20: [1423, 463],
      21: [1423, 133],
      22: [1421, 489],
      23: [1418, 711],
      24: [1536, 837],
      25: [1417, 833],
      26: [1151, 841],
      27: [1221, 793],
      28: [1226, 587],
      29: [1059, 587],
      30: [1047, 633],
      31: [1019, 487],
      32: [638, 505],
      33: [714, 557],
      34: [732, 707],
      35: [590, 827],
      36: [469, 871],
      37: [440, 880],
      38: [880, 687],
      39: [1229, 829],
      40: [1229, 667],
      41: [1229, 473],
      42: [1295, 473],
      43: [1295, 357],
      44: [1067, 357],
      45: [1067, 475],
      46: [1425, 265],
      47: [1045, 831],
      48: [1057, 665],
      49: [763, 475],
      50: [664, 469],
      51: [880, 653],
      52: [741, 785],
      53: [577, 785],
      54: [455, 831],
      55: [1469, 639],
      56: [1469, 705],
      57: [1619, 407],
      58: [1549, 357],
      59: [763, 531],
      60: [739, 639],
      61: [1185, 357],
      62: [741, 830],
      63: [1857, 607],
      64: [517, 423],
    },

    num_key: {
      "1": "North Gate: Baise Road",
      "2": "Teacher's Car Parking Lot",
      "3": "3",
      "4": "ZhenTao Building - Grades 8-10",
      "5": "5",
      "6": "6",
      "7": "School Bus Parking Lot",
      "8": "8",
      "9": "9",
      "10": "Engineering Building",
      "11": "11",
      "12": "Administration Building",
      "13": "13",
      "14": "YiFu Building",
      "15": "XianMian Annex Building",
      "16": "SHSID Admissions Office",
      "17": "Lawson",
      "18": "XianMian Building - Grades 11-12",
      "19": "LongMen Building - Local School",
      "20": "LongMen Building - Local School",
      "21": "South Gate: Shang Zhong Road",
      "22": "Auditorium",
      "23": "Multi-media Center",
      "24": "Art Center",
      "25": "SHSID Cafeteria",
      "26": "Laundry",
      "27": "SHS Cafeteria",
      "28": "General Affairs Building",
      "29": "Soccer Field",
      "30":  "Indoor Swimming Pool",
      "31": "Library and Information Center",
      "32": "Gymnasium",
      "33": "Gymnasium",
      "34": "Basketball Court",
      "35": "Tennis Center",
      "36": "Primary School Building - Grades 1-3",
      "37": "Outdoor Tennis Court",
      "38": "38",
      "39": "39",
      "40": "40",
      "41": "41",
      "42": "42",
      "43": "43",
      "44": "44",
      "45": "45",
      "46": "46",
      "47": "47",
      "48": "48",
      "49": "49",
      "50": "Volleyball Court",
      "51": "51",
      "52": "52",
      "53": "53",
      "54": "54",
      "55": "55",
      "56": "56",
      "57": "57",
      "58": "58",
      "59": "59",
      "60": "60",
      "61": "ZhongXing Building - Grades 4-7",
      "62": "62",
      "63": "East Gate: North Long Chuan Road",
      "64": "64",
    },
    key: {
      "North Gate: Baise Road": [[1], ['S']],
      "Teacher's Car Parking Lot": [[2], ['W']],
      "3": [[3], []],
      "ZhenTao Building - Grades 8-10": [[4], ['W']],
      "5": [[5], []],
      "6": [[6], []],
      "School Bus Parking Lot": [[7], ['W']],
      "8": [[9], []],
      "9": [[9], []],
      "Engineering Building": [[10], ['W']],
      "11": [[11], []],
      "Administration Building": [[12], ['S']],
      "13": [[13], []],
      "YiFu Building": [[14], ['W']],
      "XianMian Annex Building": [[15], ['W']],
      "SHSID Admissions Office": [[16], ['W']],
      "Lawson": [[17], ['N']],
      "XianMian Building - Grades 11-12": [[18],  ['W']],
      "LongMen Building - Local School": [[20, 19], ['N', 'S']],
      "South Gate: Shang Zhong Road": [[21], ['N']],
      "Auditorium": [[22], ['S']],
      "Multi-media Center": [[23], ['N']],
      "Art Center": [[24], ['S']],
      "SHSID Cafeteria": [[25], ['S']],
      "Laundry": [[26], ['S']],
      "SHS Cafeteria": [[27], ['E']],
      "General Affairs Building": [[28], ['E']],
      "Soccer Field": [[29], ['W']],
      "Indoor Swimming Pool": [[30], ['E']],
      "Library and Information Center": [[31], ['S']],
      "Gymnasium": [[32, 33], ['S', 'E']],
      "Basketball Court": [[34], ['E']],
      "Tennis Center": [[35], ['W']],
      "Primary School Building - Grades 1-3": [[36], ['S']],
      "Outdoor Tennis Court": [[37], ['E']],
      "38": [[38], []],
      "39": [[39], []],
      "40": [[40], []],
      "41": [[41], []],
      "42": [[42], []],
      "43": [[43], []],
      "44": [[44], []],
      "45": [[45], []],
      "46": [[46], []],
      "47": [[47], []],
      "48": [[48], []],
      "49": [[49], []],
      "Volleyball Court": [[50], ['N']],
      "51": [[51], []],
      "52": [[52], []],
      "53": [[53], []],
      "54": [[54], []],
      "55": [[55], []],
      "56": [[56], []],
      "57": [[57], []],
      "58": [[58], []],
      "59": [[59], []],
      "60": [[60], []],
      "ZhongXing Building - Grades 4-7": [[61], ['N']],
      "61": [[61], []],
      "East Gate: North Long Chuan Road": [[63], ['W']],
      "64": [[64], []],
    },
    canvasURL: "",
    path: [],
    deviationConstant: 100,
    liveLat: 0,
    liveLong: 0,
    walkingSpeed: 60, // in m/min
  },

  

  onShareAppMessage(){
    return {
      title: "Recommended Route",
    }
  },

  getLocation() {
    //return [31.133459286532112, 121.39819305755685];
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      success: (res) => {
        const lat = res.latitude;
        const long = res.longitude;
        that.setData({
          liveLat: lat,
          liveLong: long,
        })
        
      }
     })
  },

  findClosest(latitude, longitude){
    let N = this.data.N;
    let distances = [];
    for (let i = 1; i <= N; i++){
      let distance = Math.sqrt(Math.pow(latitude - this.data.latlong[i][0], 2) + Math.pow(longitude - this.data.latlong[i][1], 2));
      distances.push(distance);
    }

    let node = distances.indexOf(Math.min.apply(Math, distances))+1;
    //console.log(node);
    return node;

  },

  bellmanFord: function(startNode, endNode){
    let startIndex = this.data.key[startNode];
    let endIndex = this.data.key[endNode];
    let edges = this.data.edges;
    let N = this.data.N; // there are N nodes
    let predecessor = [];
    this.data.dist.length = 0;
    for (let i = 0; i <= N; i++){ // there are N nodes
      this.data.dist.push(Number.POSITIVE_INFINITY);
      predecessor.push(null);
    }
    this.data.dist[startIndex[0][0]] = 0;
    for (let k = 1; k <= N-1; k++) {
      for (let i = 0; i < this.data.edges.length; i++) {
          let a = edges[i][0];
          let b = edges[i][1];
          let w = edges[i][2];
          if (this.data.dist[b] > this.data.dist[a] + w){
            this.data.dist[b] = this.data.dist[a] + w;
            predecessor[b] = a;
          }
      }
    }
    let route = []
    let directions = [];
    let current = endIndex[0][0];
    while (!(current === null)){
      route.splice(0, 0, current);
      current = predecessor[current];
    }
    for (let i = 1; i < route.length; i++){
      let startFrom = route[i-1];
      let endAt = route[i];
      for (let e = 0; e < this.data.edges.length; e++){
        if (this.data.edges[e][0] == startFrom && this.data.edges[e][1] == endAt){
          directions.push([endAt, this.data.edges[e][2], this.data.edges[e][3]]);
        }
      }
    }
    directions.splice(0, 0, [-1, 0, directions[0][2]]);
    directions.push([-1, 0, endIndex[1][0]]);
    this.setData({
      shortestDistance: Math.round(this.data.dist[endIndex[0][0]] * this.data.multiplier),
      shortestTime: Math.ceil(Math.round(this.data.dist[endIndex[0][0]] * this.data.multiplier) / this.data.walkingSpeed),
      route: directions,
    })
  },

  getDirections: function(){
    let key = {"N": 1, "E": 2, "S": 3, "W": 4};
    let dirkey = {"1": "right", "3": "left", "2": "in front of you"};
    let route = this.data.route;
    let length = 0;
    let direction = "";
    let directions = [["Start at " + this.data.startingLocation]];
    for (let i = 1; i < route.length - 1; i++){
      if (route[i][2] == route[i-1][2]){
        length += route[i][1];
      } else {
        if (i != 1){
          directions.push([" Walk for " + Math.round(length * this.data.multiplier) + " meters"]);
        }
        direction = dirkey[((key[route[i][2]] - key[route[i-1][2]]+4)%4).toString()];
        directions[directions.length - 1][0] += ", Turn " + direction;
        directions[directions.length - 1][1] = direction;
        length = route[i][1];
      }
    }
    if (length != 0){
      directions.push([" Walk for " + Math.round(length * this.data.multiplier) + " meters"]);
      direction = dirkey[((key[route[route.length - 2][2]] - key[route[route.length - 1][2]] + 4)%4).toString()];
      if (direction == "left" || direction == "right" ){
        directions.push([" " + this.data.endingLocation + " is on your " + direction]);
      } else {
        directions.push([" " + this.data.endingLocation + " is " + direction]);
      }
    }
    if (directions.length == 1){
      directions.push([" You are already at " + this.data.endingLocation]);
    }
    
    

    this.setData({
      directions: directions,
    })
  },
  
    getPointToLineDistance(a, b, c, x, y){
      // ax + by + c = 0
      // P(x, y)
      return Math.abs(a * x + b * y + c)/Math.sqrt(a*a + b*b);
  },

  

  getLineFormula(x1, y1, x2, y2){
      // P(x1, y1), Q(x2, y2) -- find equation of PQ
      // Return A, B, C -- Ax+By+C=0
      if (x1 == x2) {
        return [1, 0, -x1];
      } else {
        return [y2-y1, x1-x2, y1*(x2-x1)-x1*(y2-y1)];
      }
  },
  /*
  drawLiveLocation(lat, long){
      console.log(lat, long)
      let ind = this.findClosest(lat, long);
      let current_ypos = this.data.coords[ind][1] + (this.data.latlong[ind][0] - lat) * this.data.lat_ratio;
      let current_xpos = this.data.coords[ind][0] + (this.data.latlong[ind][1] - long) * this.data.long_ratio;
      console.log(current_xpos, current_ypos);
      var ctx = wx.createCanvasContext('canvas_live_location');
      ctx.setFillStyle("red");
      ctx.fillRect(200, 300, 10, 10);
      ctx.draw();
  },*/

  drawRoute(start){
      var context = wx.createContext();
      context.setStrokeStyle('red');
      context.lineWidth = 3;
      context.moveTo(this.data.coords[start[0][0]][0]*this.data.xM, this.data.coords[start[0][0]][1]*this.data.yM);
      context.drawImage("../../media/images/placeholder.png", this.data.coords[start[0][0]][0]*this.data.xM - 15, this.data.coords[start[0][0]][1]*this.data.yM - 30, 30, 30);
      this.setData({
        'context': context,
      })
      for (let i = 1; i < this.data.route.length - 1; i++){
        let coords = this.data.coords[this.data.route[i][0]];
        this.data.context.lineTo(coords[0]*this.data.xM, coords[1]*this.data.yM);
        this.data.context.moveTo(coords[0]*this.data.xM, coords[1]*this.data.yM);
      }
      
      this.data.context.fill();
      this.data.context.stroke();
      wx.drawCanvas({
        canvasId: 'canvas',
        actions: this.data.context.getActions(),
      })
  },
  checkDeviation(){
    if (this.data.checkDeviation == "true"){
      this.getLocation();
      let lat = this.data.liveLat;
      let long = this.data.liveLong;
      let ind = this.findClosest(lat, long);
      console.log(ind)
      let current_ypos = this.data.coords[ind][1] + (this.data.latlong[ind][0] - lat) * this.data.lat_ratio;
      let current_xpos = this.data.coords[ind][0] + (this.data.latlong[ind][1] - long) * this.data.long_ratio;

      let lineFormula = this.getLineFormula(this.data.path[0][0][0], this.data.path[0][0][1], this.data.path[0][1][0], this.data.path[0][1][1]);
      
      //console.log(lineFormula[0], lineFormula[1], lineFormula[2], current_xpos, current_ypos);
      let distance = this.getPointToLineDistance(lineFormula[0], lineFormula[1], lineFormula[2], current_xpos, current_ypos);
      console.log(distance)
      if (distance > this.data.deviationConstant){
          let newLocation = this.data.num_key[this.findClosest(lat, long)];
          this.setData({
              startingLocation: newLocation,
          })
          this.bellmanFord(newLocation, this.data.endingLocation);
          this.getDirections();
          // clear previous route
          var ctx = wx.createCanvasContext('canvas');
          ctx.clearRect(0, 0, this.data.originalX, this.data.originalY)
          ctx.draw();
          // draw new route
          this.drawRoute(this.data.key[newLocation]);
      }
    }
  },
  
  onLoad: function(){
    this.getLocation();
    let lat = this.data.liveLat;
    let long = this.data.liveLong;
    // change wrong y value of coords
    for (let i = 1; i <= this.data.N; i++){
        this.data.coords[i][1] = this.data.yMultiplier - this.data.coords[i][1];
    }
    const currentPages = getCurrentPages();
    let startingLocation = currentPages[0].__data__.startMultiArray[1][currentPages[0].__data__.startMultiIndex[1]];
    //let startingLocation = this.data.num_key[this.findClosest(lat, long)];
    let endingLocation = currentPages[0].__data__.endMultiArray[1][currentPages[0].__data__.endMultiIndex[1]];
    this.setData({
      startingLocation: startingLocation,
      endingLocation: endingLocation,
      startIndex: this.data.key[startingLocation],
      endIndex: this.data.key[endingLocation],
    })/*
    let lat = [], long = [];
    for (let i = 1; i <= this.data.N; i++){
      lat.push(this.data.latlong[i][0]);
      long.push(this.data.latlong[i][1]);
    }*/
    this.bellmanFord(startingLocation, endingLocation);
    this.getDirections();
    this.drawRoute(this.data.startIndex);
    let route = this.data.route;
    let from, end;
    let path = [];
    for (let i = 1; i < route.length - 1; i++){
        if (i == 1) {
          from = this.data.startIndex[0];
        } else {
          from = end;
        }
        end = route[i][0];
        path.push([this.data.coords[from], this.data.coords[end]]);
    }
    this.setData({
        'path': path,
        checkDeviation: "true",
    });
    //this.drawLiveLocation(lat, long);
    setInterval(this.checkDeviation, 5000); // constantly check if user's live location is on track
  }, 

  onUnload(){
      this.setData({
        checkDeviation: "false",
      })
  },

  touchstartCallback: function(e) {
    if (e.touches.length === 1){
      let {clientX, clientY} = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;  
      this.touchStartEvent = e.touches;
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove*xMove + yMove*yMove);
      this.setData({
        "stv.distance": distance,
        "stv.zoom": true, 
      })
    }
  },
  touchmoveCallback: function(e) {
    if (e.touches.length === 1){
      // single finger movement
      if (this.data.stv.zoom) {
        return;
      }
      let {clientX, clientY} = e.touches[0];
      let offsetX = clientX - this.startX;
      let offsetY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      let {stv} = this.data;
      stv.offsetX += offsetX;
      stv.offsetY += offsetY;
      stv.offsetLeftX = -stv.offsetX;
      stv.offsetLeftY = -stv.offsetLeftY;
      this.setData({
        stv: stv
      })
    } else {
      // double finger zooming
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove*xMove + yMove*yMove);
      let distanceDiff = distance - this.data.stv.distance;
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;

      this.setData({
        'stv.distance': distance,
        'stv.scale': newScale,
      })
    }
    
  },
  touchendCallback: function(e){
    // end of touch
    if (e.touches.length === 0){
      this.setData({
        'stv.zoom': false,
      })
    }
  }, 
  

})
