
d3.json("/data", response => {

    // console.log(response);

    var v1950 = {
        key: "1950's",
        color: "#333333",
        values: [
            {
                "label": "Total",
                "value": 0
            },
            {
                "label": "F1",
                "value": 0
            },
            {
                "label": "F2",
                "value": 0
            },
            {
                "label": "F3",
                "value": 0
            },
            {
                "label": "F4",
                "value": 0
            },
            {
                "label": "F5",
                "value": 0
            }
        ]
    }

    var v2010 = {
        key: "2010's",
        color: "dark gray",
        values: [
            {
                "label": "Total",
                "value": 0
            },
            {
                "label": "F1",
                "value": 0
            },
            {
                "label": "F2",
                "value": 0
            },
            {
                "label": "F3",
                "value": 0
            },
            {
                "label": "F4",
                "value": 0
            },
            {
                "label": "F5",
                "value": 0
            }
        ]
    }



    var tID = 0

    response.forEach(tornado => {

        if (tID < tornado.Tornado_ID) {

            if (tornado.Year >= 1950 && tornado.Year <= 1959) {

                if (tornado.Magnitude >0){

                    v1950["values"][0]["value"] -= 1
                }

                if (tornado.Magnitude == 1) {

                    v1950["values"][1]["value"] -= 1

                }
                else if (tornado.Magnitude == 2) {

                    v1950["values"][2]["value"] -= 1
                }

                else if (tornado.Magnitude == 3) {

                    v1950["values"][3]["value"] -= 1
                }
                else if (tornado.Magnitude == 4) {

                    v1950["values"][4]["value"] -= 1
                }
                else if (tornado.Magnitude == 5) {

                    v1950["values"][5]["value"] -= 1
                }
            }

        if (tornado.Year >= 2010) {

            if (tornado.Magnitude >0){
                
                v2010["values"][0]["value"] += 1
            }
            if (tornado.Magnitude == 1) {

                v2010["values"][1]["value"] += 1

            }
            else if (tornado.Magnitude == 2) {

                v2010["values"][2]["value"] += 1
            }

            else if (tornado.Magnitude == 3) {

                v2010["values"][3]["value"] += 1
            }
            else if (tornado.Magnitude == 4) {

                v2010["values"][4]["value"] += 1
            }
            else if (tornado.Magnitude == 5) {

                v2010["values"][5]["value"] += 1
            }
        }

        tID += 1
    }


});



var long_short_data = [
    v1950,
    v2010
];


var chart;
nv.addGraph(function () {
    chart = nv.models.multiBarHorizontalChart()
        .x(function (d) { return d.label })
        .y(function (d) { return d.value })
        // .yErr(function (d) { return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] })
        .duration(250)
        .showControls(true)
        .showLegend(true)
        .legendPosition("bottom")
        .controlsPosition("bottom")
        .margin({ left: 100 })
        .stacked(true);

    chart.yAxis.tickFormat(d3.format(',.2f'));

    chart.yAxis.axisLabel('Magnitude');
    chart.xAxis.axisLabel('# of Tornadoes').axisLabelDistance(20);

    d3.select('#chart1 svg')
        .datum(long_short_data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    chart.dispatch.on('stateChange', function (e) { nv.log('New State:', JSON.stringify(e)); });
    chart.state.dispatch.on('change', function (state) {
        nv.log('state', JSON.stringify(state));
    });
    return chart;
});

});






// var v1950 = {
//     key: "1950's",
//     color: "#d67777",
//     values: [
//                 {
//                     "label" : "Total" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F1" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F2" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F3" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F4" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F5" ,
//                     "value" : 0
//                 } 
//         ]
// }

// var v2010 = {
//     key: "2010's",
//     color: "#4f99b4",
//     values: [
//                 {
//                     "label" : "Total" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F1" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F2" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F3" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F4" ,
//                     "value" : 0
//                 } ,
//                 {
//                     "label" : "F5" ,
//                     "value" : 0
//                 } 
//         ]
// }

// var tID = 0

// data.forEach(tornado =>{

// if (tID < tornado.Tornado_ID){
//     if (tornado.Year >= 1950 && tornado.Year <= 1959)  {

//         v1950["values"][0]["value"] -= 1

//         if (tornado.Magnitude = 1) {

//             v1950["values"][1]["value"] -= 1

//         }
//         else if (tornado.Magnitude = 2) {

//             v1950["values"][2]["value"] -= 1
//         }

//     }

//     tID += 1
// }

// });



// var long_short_data = [
// v1950,
// v2010
//         ];


// var chart;
// nv.addGraph(function() {
//     chart = nv.models.multiBarHorizontalChart()
//         .x(function(d) { return d.label })
//         .y(function(d) { return d.value })
//         .yErr(function(d) { return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] })
//         .barColor(d3.scale.category20().range())
//         .duration(250)
//         .showControls(true)
//         .showLegend(true)
//         .legendPosition("bottom")
//         .controlsPosition("bottom")
//         .margin({left: 100})
//         .stacked(true);

//     chart.yAxis.tickFormat(d3.format(',.2f'));

//     chart.yAxis.axisLabel('Y Axis');
//     chart.xAxis.axisLabel('X Axis').axisLabelDistance(20);

//     d3.select('#chart1 svg')
//         .datum(long_short_data)
//         .call(chart);

//     nv.utils.windowResize(chart.update);

//     chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
//     chart.state.dispatch.on('change', function(state){
//         nv.log('state', JSON.stringify(state));
//     });
//     return chart;
// });
