class ConcreteInfrastructure extends AbstractFactoryInfrastructure {
	
	constructor() {
		super();
	}
	
	  createCategory(c) {  
		  return new Category(c).c;
	  }
	  
	  createRegion(r) {
		  return new Region(r).r;
	  }
}