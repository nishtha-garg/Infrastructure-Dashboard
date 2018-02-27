class DoughnutChart extends ChartConfiguration {
	

	constructor() {
		super();
	}
	
	loadChart(chartType) {
		
		let chartConfig = new DoughnutChart().getConfig(chartType);		

		document.getElementById('linechart').innerHTML = '';
		
		
		let ctx = document.getElementById('linechart').getContext('2d');
    	
    	let myChart = new Chart(ctx, {
    		  type: 'doughnut',
    		  data: chartConfig,
    		  scaleFontSize: 13,
              scaleFontColor: "#ffa45e",
              zoomEnabled: true,
              scaleSteps: 10000,
              responsive: false
    		});
		
	}
}