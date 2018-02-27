
let datasetSingleton = null;
var DataFrame = dfjs.DataFrame;
var dfObj;

class Dashboard {
	
	constructor() {
		
		this.filename = "";
	}
	
	loadDataset(category, region) {
		
		
		var factory1 = new ConcreteInfrastructure();
		let category1 = factory1.createCategory(category);
		let region1 = factory1.createRegion(region);		
		
		this.filename = new Filename(category1, region1).getFilename();
		
		if(this.filename != null) {
			datasetSingleton = new Dataset();
			
	        DataFrame.fromCSV(this.filename, true).then(

	                 df => {
	                	 dfObj = df;
	                	 datasetSingleton.datasetLoad(df);
	                 });
			
		} else {
			datasetSingleton = new Dataset(filename);
		}
		
		
	}
	
	drawChart(chartType) {
		
		let chartFactory = new ChartFactory();
		
		let chart = chartFactory.getChart(chartType);
		
		chart.loadChart(chartType);
		
	}
	
	selectLabels() {
		
		let x = document.getElementById('checkLabels');
		let y = x.getElementsByTagName('input');
		
		let selectedItems = new Array('Country_Name', 'Country_Code', 'Time', 'Time_Code');
		
		for (let i = 0; i < y.length; i++) {
			
			if(y[i].checked) {
				
				selectedItems.push(y[i].value);
			}
		   
		}
		
		new Dataset().refreshDataset(selectedItems)
	}
	
	
	
	applyFilter() {
		
		var x = document.getElementById('checkCountry');
		var y = x.getElementsByTagName('input');
		
		var x2 = document.getElementById('selectYear');
		var yearSelected = x2.options[x2.selectedIndex].text;
		
		var countrySelected = new Array();
		
		for (var i = 0; i < y.length; i++) {
			
			if(y[i].checked) {				
				countrySelected.push(y[i].value);
			}		   
		}
		
		var x1 = document.getElementById('checkLabels');
		var y1 = x1.getElementsByTagName('input');
		
		var selectedLabel = new Array();
		
		for (var i = 0; i < y1.length; i++) {
			
			if(y1[i].checked) {
				
				selectedLabel.push(y1[i].value);
			}
		   
		}
		
		
		datasetSingleton.applyFilter(countrySelected, yearSelected, selectedLabel, dfObj);	
	}
	
	selectAggregationFunction() {
		
		var x = document.getElementById('selectFunction');
		var aggrName = x.options[x.selectedIndex].value;
		
		let funcContext = new FunctionContext(aggrName);
	    funcContext.ContextInterface();		
	}
	
	applyNumericFilter() {
		
		var x = document.getElementById('selectFunction');
		var aggrName = x.options[x.selectedIndex].value;
		
		var x1 = document.getElementById('checkLabels');
		var y1 = x1.getElementsByTagName('input');
		
		var selectedLabel = new Array();
		
		for (var i = 0; i < y1.length; i++) {
			
			if(y1[i].checked) {
				
				selectedLabel.push(y1[i].value);
			}
		   
		}
		
		if(aggrName == "Sum") {
			
			let x1 = document.getElementById('category1');
			let selectedLabel = x1.options[x1.selectedIndex].text;
			
			datasetSingleton.applyNumericFilterSum(selectedLabel, dfObj);
			
		} else if (aggrName == "Average") {
			
			let x1 = document.getElementById('category1');
			let selectedLabel = x1.options[x1.selectedIndex].text;
			
			datasetSingleton.applyNumericFilterAverage(selectedLabel, dfObj);
			
		} else if (aggrName == "Min") {
			
			let x1 = document.getElementById('category1');
			let selectedLabel = x1.options[x1.selectedIndex].text;
			
			datasetSingleton.applyNumericFilterMin(selectedLabel, dfObj);
			
		} else if (aggrName == "Max") {
			
			let x1 = document.getElementById('category1');
			let selectedLabel = x1.options[x1.selectedIndex].text;
			
			datasetSingleton.applyNumericFilterMax(selectedLabel, dfObj);
			
		}		
		
		
	}
	
}

