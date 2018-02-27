/**
 * 
 */
class ConcreteColor extends Color {
    
	constructor(list) {
        super();
        this.list = list;
    }

    CreateIterator (){
        this.iterator = new ConcreteIterator(this);
    }
}