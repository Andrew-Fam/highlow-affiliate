function dashboardLoader(start, end) {
	if(start.format('MMMM D, YYYY') == end.format('MMMM D, YYYY')) {
		$('#reportrange span').html(start.format('MMMM D, YYYY'));
	} else {
		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));	
	}
	$.cookie('dashboard_range', start.format('YYYY-MM-DD') + ' ' + end.format('YYYY-MM-DD'), { path: '/' });
	loadAffiliateStats(start, end);
	loadLineChart(start, end);
}

function getCookieDate()
{	
	startRangeDate = endRangeDate = moment();	
	rangeCookie = $.cookie('dashboard_range');
	if(rangeCookie != undefined) {
		rangeData = rangeCookie.split(' ');
		startRangeDate = moment(rangeData[0]);
		endRangeDate = moment(rangeData[1]);
	}
	
	var data = new Array();
	data['startRangeDate'] = startRangeDate;
	data['endRangeDate'] = endRangeDate;
	
	return data;
}

$(document).ready(function() {	
	data = getCookieDate();	
	startRangeDate = data['startRangeDate'];
	endRangeDate = data['endRangeDate'];
	
	rangeOptions = {
						ranges: {
				         'Today': [moment(), moment()],
				         'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
				         'Last 7 Days': [moment().subtract('days', 6), moment()],
				         'Last 30 Days': [moment().subtract('days', 29), moment()],
				         'This Month': [moment().startOf('month'), moment().endOf('month')],
				         'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
				      },
				      startDate: startRangeDate,
				      endDate: endRangeDate,
				      opens: "left"
			    };
	
	$('#reportrange').daterangepicker(
		    rangeOptions,
		    function(start, end) {
		    	dashboardLoader(start, end);
		    }
	);

	dashboardLoader(startRangeDate, endRangeDate);
		
});

function loadLineChart(start, end){
	var url = $("#affiliate-line-chart").attr('data-link');
	var startDate = start.format('YYYY-MM-DD');
	var endDate = end.format('YYYY-MM-DD');
	$.post(url,{
			startDate : startDate,
			endDate : endDate,
		},function(data){  									
			$("#affiliate-line-chart").lineChart({
				renderTo: 'affiliate-line-chart',
				title: '',
				xTitle: data['xTitle'],
				categories : data['categories'],
				seriesdata : data['series']				
			});
		});		
}

function loadAffiliateStats(start, end)
{	
	var url = $("#affiliate-stats").attr('data-link');
	var startDate = start.format('YYYY-MM-DD');
	var endDate = end.format('YYYY-MM-DD');
	$.post(url,{
			startDate : startDate,
			endDate : endDate,
		},function(data){  						
			$('#affiliate-stats').html(data);			
		});
}
