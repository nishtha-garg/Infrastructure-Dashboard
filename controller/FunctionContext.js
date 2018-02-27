class FunctionContext {
	
	
	constructor(functionType){
		
		let colLabel = new Dataset().listOfColumns;
		
        switch(functionType) {
            case "Sum":
            	this.strategy = new ConcreteStrategySum(colLabel);
                break
            case "Average":
                this.strategy = new ConcreteStrategyAverage(colLabel);
                break;
            case "Min":
                this.strategy = new ConcreteStrategyMinimum(colLabel);
                break;
            case "Max":
                this.strategy = new ConcreteStrategyMaximum(colLabel);
                break;
            default:
                break;
        }
    }

    ContextInterface (){
        this.strategy.FunctionImplement();
    }
}