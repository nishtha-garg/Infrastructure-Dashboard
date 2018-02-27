 var dfObj;
 var dataCol = null;
 var newDataCol = null;
 var selectedCol;
 var selectedCol_x;
 var selectedCol_y;
 var selectedCol_z;
 var colLabel;
 var distinctCol;
 var dataset = null;
 var pieDataValues = null;
 var countries = null;
 let instance = null;

 class Dataset {

	 constructor () {
	    	
	        if(!instance) {
	            this.instance = this;	            
	        }
	 }


     //Properties for accessing the columns
     get Col_x() {
         return selectedCol_x;
     }
     
     get datasetValues() {
         return dataset;
     }

     get Col_y() {
         return selectedCol_y;
     }
     
     get Col_z() {
         return selectedCol_z;
     }
     
     get pieDataValues() {
         return pieDataValues;
     }
     
     get countries() {
         return countries;
     }
     
     get listOfColumns() {
    	 return colLabel;
     }
     
     refreshDataset(selectedItems) {
    	 
    	 document.getElementById('divTable').innerHTML = "";
         var table = document.createElement('table');
         var tableBody = document.createElement('tbody');
         var div = document.createElement('div');
         
         selectedCol_x = dfObj.select(selectedItems[0]).toArray();
         selectedCol_y = dfObj.select(selectedItems[1]).toArray();
         selectedCol_z = dfObj.select('Country_Code').toArray();         
         
         for (i = 0; i < selectedCol_y.length; i++) {
             var intvalue = parseInt(selectedCol_y[i]);
             selectedCol_y[i] = intvalue;
         }         
         
         for (var i = 0; i < selectedItems.length; i++) {
        	 var row = document.createElement('th');

             row.textContent = selectedItems[i];
             tableBody.appendChild(row);        	 
         }
         table.appendChild(tableBody);
         div.appendChild(table);
         document.getElementById('divTable').appendChild(div);
    
         
         newDataCol = (dfObj.select(...selectedItems).toArray());
         
         for (var i = 0; i < newDataCol.length; i++) {       	 
        	 
        	 var row = document.createElement('tr');
        	 
        	 for (var j = 0; j < newDataCol[i].length; j++) {
                 var column = document.createElement('td');
                 column.textContent = newDataCol[i][j];
                 row.appendChild(column);
             }
             tableBody.appendChild(row);
        	 
        	 
         }
         
         table.appendChild(tableBody);
         div.appendChild(table);
         document.getElementById('divTable').appendChild(div);
         
         
     }


     datasetLoad(df) {
    	 
         document.getElementById('divTable').innerHTML = "";
         var table = document.createElement('table');
         var tableBody = document.createElement('tbody');
         var div = document.createElement('div');
         
                 dfObj = df;
                 dataCol = df.toArray();
                 colLabel = df.listColumns();
                 distinctCol = df.distinct('Country_Name').toArray();
                 
                 this.refreshDOM();
                 
                 
                 for (var i = 0; i < colLabel.length; i++) {
                     var row = document.createElement('th');
                     var br = document.createElement("br");

                    row.textContent = colLabel[i];
                    tableBody.appendChild(row);
                 }
                 
                 
                 for (var i = 4; i < colLabel.length; i++) {
                	 
                	 var br = document.createElement("br");

                     //Creating Dynamic Checkboxes
                     var checkbox = document.createElement('input');
                     checkbox.type = "checkbox";
                     checkbox.name = "name";
                     checkbox.value = colLabel[i];
                     checkbox.id = "id";
                     checkbox.className = "chckBox"

                     var label = document.createElement('label')
                     label.htmlFor = colLabel[i];
                     label.appendChild(document.createTextNode(colLabel[i]));

                     document.getElementById('checkLabels').appendChild(checkbox);
                     document.getElementById('checkLabels').appendChild(label);
                 }
                 
                 // For loading Filters for Categorical values
                 
                 for (var i = 0; i < distinctCol.length; i++) {                 
                	 
                	 var br1 = document.createElement("br");

                     //Creating Dynamic Checkboxes
                     var checkbox1 = document.createElement('input');
                     checkbox1.type = "checkbox";
                     checkbox1.name = "name";
                     checkbox1.value = distinctCol[i];
                     checkbox1.id = "id";
                     checkbox1.className = "chckBox"

                     var label1 = document.createElement('label')
                     label1.htmlFor = distinctCol[i];
                     label1.appendChild(document.createTextNode(distinctCol[i]));

                     document.getElementById('checkCountry').appendChild(checkbox1);
                     document.getElementById('checkCountry').appendChild(label1);
                 }
                 
                 
                 table.appendChild(tableBody);
                 div.appendChild(table);
                 document.getElementById('divTable').appendChild(div);

                 for (var i = 0; i < dataCol.length; i++) {
                     var row = document.createElement('tr');
                     for (var j = 0; j < dataCol[i].length; j++) {
                         var column = document.createElement('td');
                         column.textContent = dataCol[i][j];
                         row.appendChild(column);
                     }
                     tableBody.appendChild(row);
                 }
                 table.appendChild(tableBody);
                 div.appendChild(table);
                 document.getElementById('divTable').appendChild(div);

            // });

     }
     
     applyFilter(countrySelected, yearSelected, selectedLabels, df) {
    	 
    	 
    	 alert(countrySelected);
    	 /*var DataFrame = dfjs.DataFrame; 
    	 DataFrame.fromCSV('data/europeTech.csv').then( 

    	 df => {*/
    	 //var DataFrame = dfjs.DataFrame; 	 
    	var listOfColumns = df.listColumns();
    	 var DataFrame = dfjs.DataFrame; 
    	DataFrame.sql.registerTable(df, 'eastTechTable', true);
    	 
    	 var year = new Array(yearSelected);
    	 
    	 
    	 var query = 'SELECT * FROM eastTechTable WHERE Country_Name IN (' + countrySelected + ') AND Time IN (' + year + ')';
    	 
    	 var query1 = 'SELECT SUM('+ selectedLabels[0] + ') FROM eastTechTable GROUP BY Country_Name';
    	     	    	 
    	 var rows = DataFrame.sql.request(query).toArray();
    	 var rows1 = DataFrame.sql.request(query1).toArray();
    	 
    	 var xcol = new Array();
    	 for(var i=0; i < rows.length; i++) {
    		 xcol.push(rows[i][0]);
    	 }
    	 
    	 var labelIndex = new Array();
    	     	 
    	 for(var i=0; i < selectedLabels.length; i++) {
    		 
    		 for(var j=0; j < listOfColumns.length; j++) {
    			 
    			 if(listOfColumns[j].includes(selectedLabels[i])) {
    				 
    				 labelIndex.push(j);
    			 }
        		 
        	 }
    		 
    	 }
    	 
    	 dataset = [];
    	 
    	 for(var i=0; i < rows.length; i++) {
    		 
    		 var labelValue = new Array();
    		 
    		 for(var j=0; j < labelIndex.length; j++) {
    			 
    			 var index = labelIndex[j];
    			 labelValue.push(parseInt(rows[i][index]));
    			 
    		 }
    		 
    		 dataset.push({
    			 label: countrySelected[i],
                 data: labelValue,
                 backgroundColor: ""
    		 });
    	 }
    	 
    	 
    	 
    	 selectedCol_x = selectedLabels;
    	 selectedCol_y = countrySelected;
    	 selectedCol_z = rows1;
    	 
    	 pieDataValues = new Array();
         countries = new Array();

         for (var i = 0; i < selectedCol_y.length; i++){
         	
         	for (var j = 0; j < selectedCol_z.length; j++){
         		
         		if(selectedCol_z[j][0].includes(selectedCol_y[i])) {
         			pieDataValues.push(selectedCol_z[j][1]);
         		}
         		
         		
         	}
         }
    	 
     }
     
     applyNumericFilterSum(selectedLabels, df) {
    	 
    	 var DataFrame = dfjs.DataFrame; 
    	
    		 
    	var listOfColumns = df.listColumns();
    	DataFrame.sql.registerTable(df, 'eastTechTable', true);
    	
    	
    	var query = 'Select DISTINCT Country_Name FROM eastTechTable';
    	var rows = DataFrame.sql.request(query).toArray();
    	 
    	 var query1 = 'SELECT SUM('+ selectedLabels + ') FROM eastTechTable GROUP BY Country_Name';
    	     	    	 
    	 var rows1 = DataFrame.sql.request(query1).toArray();
    	 
    	 
    	 
    	 
    	 dataset = [];
    	 
    	    	 
    	 pieDataValues = new Array();
		 
		 for(var j=0; j < rows1.length; j++) {
			 
			 pieDataValues.push(parseInt(rows1[j][1]));
			 
		 }
		 
		 countries = new Array();
		 
		 for(var j=0; j < rows.length; j++) {
			 
			 countries.push(rows[j]);
			 
		 }
    	 
    	 dataset.push({
			 label: selectedLabels,
             data: pieDataValues,
             backgroundColor: ""
		 });
    	 
    	 
    	 
    	 selectedCol_x = rows;
    	 selectedCol_y = rows;
    	 selectedCol_z = rows1;
    	 
    	 
    	 
    	     	 
     }
     
applyNumericFilterAverage(selectedLabels, df) {
    	 
    	 var DataFrame = dfjs.DataFrame; 
    	
    		 
    	var listOfColumns = df.listColumns();
    	DataFrame.sql.registerTable(df, 'eastTechTable', true);
    	
    	
    	var query = 'Select DISTINCT Country_Name FROM eastTechTable';
    	var rows = DataFrame.sql.request(query).toArray();
    	 
    	 var query1 = 'SELECT AVG('+ selectedLabels + ') FROM eastTechTable GROUP BY Country_Name';
    	     	    	 
    	 var rows1 = DataFrame.sql.request(query1).toArray();
    	 
    	 
    	 
    	 
    	 dataset = [];
    	 
    	    	 
    	 pieDataValues = new Array();
		 
		 for(var j=0; j < rows1.length; j++) {
			 
			 pieDataValues.push(parseInt(rows1[j][1]));
			 
		 }
		 
		 countries = new Array();
		 
		 for(var j=0; j < rows.length; j++) {
			 
			 countries.push(rows[j]);
			 
		 }
    	 
    	 dataset.push({
			 label: selectedLabels,
             data: pieDataValues,
             backgroundColor: ""
		 });
    	 
    	 
    	 
    	 selectedCol_x = rows;
    	 selectedCol_y = rows;
    	 selectedCol_z = rows1;
    	 
    	 
    	 
    	     	 
     }

applyNumericFilterMaximum(selectedLabels, df) {
	 
	 var DataFrame = dfjs.DataFrame; 
	
		 
	var listOfColumns = df.listColumns();
	DataFrame.sql.registerTable(df, 'eastTechTable', true);
	
	
	var query = 'Select DISTINCT Country_Name FROM eastTechTable';
	var rows = DataFrame.sql.request(query).toArray();
	 
	 var query1 = 'SELECT MAX('+ selectedLabels + ') FROM eastTechTable GROUP BY Country_Name';
	     	    	 
	 var rows1 = DataFrame.sql.request(query1).toArray();
	 
	 
	 
	 
	 dataset = [];
	 
	    	 
	 pieDataValues = new Array();
	 
	 for(var j=0; j < rows1.length; j++) {
		 
		 pieDataValues.push(parseInt(rows1[j][1]));
		 
	 }
	 
	 countries = new Array();
	 
	 for(var j=0; j < rows.length; j++) {
		 
		 countries.push(rows[j]);
		 
	 }
	 
	 dataset.push({
		 label: selectedLabels,
        data: pieDataValues,
        backgroundColor: ""
	 });
	 
	 
	 
	 selectedCol_x = rows;
	 selectedCol_y = rows;
	 selectedCol_z = rows1;
	 
	 
	 
	     	 
}

applyNumericFilterMinimum(selectedLabels, df) {
	 
	 var DataFrame = dfjs.DataFrame; 
	
		 
	var listOfColumns = df.listColumns();
	DataFrame.sql.registerTable(df, 'eastTechTable', true);
	
	
	var query = 'Select DISTINCT Country_Name FROM eastTechTable';
	var rows = DataFrame.sql.request(query).toArray();
	 
	 var query1 = 'SELECT MIN('+ selectedLabels + ') FROM eastTechTable GROUP BY Country_Name';
	     	    	 
	 var rows1 = DataFrame.sql.request(query1).toArray();
	 
	 
	 
	 
	 dataset = [];
	 
	    	 
	 pieDataValues = new Array();
	 
	 for(var j=0; j < rows1.length; j++) {
		 
		 pieDataValues.push(parseInt(rows1[j][1]));
		 
	 }
	 
	 countries = new Array();
	 
	 for(var j=0; j < rows.length; j++) {
		 
		 countries.push(rows[j]);
		 
	 }
	 
	 dataset.push({
		 label: selectedLabels,
        data: pieDataValues,
        backgroundColor: ""
	 });
	 
	 
	 
	 selectedCol_x = rows;
	 selectedCol_y = rows;
	 selectedCol_z = rows1;
	 
	 
	 
	     	 
}
     
     refreshDOM() {    	 
    	 
    	 document.getElementById("checkLabels").innerHTML = '';
         document.getElementById("checkCountry").innerHTML = '';
         
         var year = 1967;
         var till = 2016;
         var options = "";
         
         for(var y = year; y <= till; y++){
           options += "<option>"+ y +"</option>";
         }
         document.getElementById("selectYear").innerHTML = options;
     }

 }