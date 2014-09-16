(function( $ ){
  $.fn.lineChart = function(o) {
	  var cfg={
		renderTo:'',  
		title:'',
		xTitle:'',
		yTitle:'',
		categories:[],
		seriesdata:[]
	  };
	  
	  jQuery.extend(cfg, o);
	  
	  $('#'+cfg.renderTo).highcharts({
		  chart: {
	            type: 'area',
	      },
	      credits: {
	          enabled: false
	      },
		  title: {
              text: cfg.title,
          },
          colors: [
                   '#FFE25A',
                   '#F17A40', 
                   '#5dcff3', 
                   '#fcc44d', 
                ],
          xAxis: {        	
          	title: {
                  text: cfg.xTitle
              },
              categories: cfg.categories
          },
          yAxis: {
        	  allowDecimals: false,
        	  min : 0,        	  
              title: {
                  text: cfg.yTitle,
              },
              plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
              }]
          },
          plotOptions: {
        	  series: {
                  fillOpacity: 0.2,
                  lineWidth : 2,
                  marker: {
                      fillColor: '#FFFFFF',
                      lineWidth: 2,
                      radius: 3,
                      symbol : 'circle',
                      lineColor: null // inherit from series
                  }
              }
          },
          exporting: { enabled: false },
          tooltip: {
//              formatter: function() {
//                  return this.x +
//                  			'<br/>Status : <b>'+ this.series.name +
//                  		   '</b><br/>Count : <b>'+ this.y +'</b>';
//              }
          },      
          legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'top',
//              floating: true,
//              x: 0,
//              y: 0,
              borderWidth: 0,
              symbolWidth: 20,
              symbolHeight: 2
          },
          series: cfg.seriesdata
	  });
  };
})( jQuery );