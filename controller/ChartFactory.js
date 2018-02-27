class ChartFactory{
	
	constructor(){
	}
	
	
	getChart(ChartType){
		
		if (ChartType=="line"){
			return new LineChart();
			
		} else if(ChartType=="bar"){
			return new BarChart();
			
		} else if(ChartType=="pie"){
			return new PieChart();
			
		} else if(ChartType=="doughnut"){
			return new DoughnutChart();
			
		} else if(ChartType=="stack"){
			return new StackChart();
			
		} else {
			return null;
		}

	}
}