class ConcreteStrategyMinimum extends NumericFilterStrategy {
	
	constructor() {
		super();
	}
	
	FunctionImplement() {
		
		
		let newSel1 = document.getElementById("category1");
		newSel1.innerHTML="<option value=\"\">Select</option>";
			
		let opt1;
		
		
		for (var i = 4; i < colLabel.length; i++) {
            opt1 = document.createElement("option");
            opt1.value = colLabel[i];
            opt1.text = colLabel[i];
            newSel1.appendChild(opt1);
        }
		
		
	}
}