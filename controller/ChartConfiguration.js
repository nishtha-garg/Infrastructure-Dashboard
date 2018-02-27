let chartData;
class ChartConfiguration extends Dataset{


	constructor(){
		super(); 
	}
	
	getConfig(chartType) {
    	
    	this.getChartData(chartType);
    	
		return chartData;
	}
	
	getChartData(chartType) {
		
		let colors = new ConcreteColor(["rgba(153,255,51,0.5)","rgba(255, 82, 33, 0.5)","rgba(121, 53, 144, 0.5)","rgba(252,147,65,0.5)","rgba(222,17,65,0.5)","rgba(12,7,55,0.5)","rgba(151,249,190,0.5)","rgba(82, 94, 235, 1)"]);
		colors.CreateIterator();
		
		let selectedCol_x = new ChartConfiguration().Col_x;
        let selectedCol_y = new ChartConfiguration().Col_y;
        let selectedCol_z = new ChartConfiguration().Col_z;
        let datasetValues = new ChartConfiguration().datasetValues;
        
        for(let i = 0; i < datasetValues.length; i++) {
            let obj = datasetValues[i];
            
            obj.backgroundColor = colors.iterator.Next();
        }
        
        let pieDataValues = new ChartConfiguration().pieDataValues;
        let countries = new ChartConfiguration().countries;
        
        if (chartType == "line" || chartType == "bar" || chartType == "stack") {
        	
        	chartData = {
                    labels: selectedCol_x,
                    datasets: datasetValues
                };
        	
        } else if (chartType == "pie" || chartType == "doughnut") {
        	
        	chartData = {
    			    labels: selectedCol_y,
    			    datasets: [{
    			      backgroundColor: [
    			        "#2ecc71",
    			        "#3498db",
    			        "#9b59b6",
    			        "#e74c3c",
    			        "#4206F6",
    			        "#9EEEEE",
    			        "#E181E7",
    			        "#6AE128"
    			      ],
    			      data: pieDataValues
    			    }]
    			  };
        	
        }
	}

}