/**
 * 
 */
class ConcreteIterator extends Iterator {
	
    constructor(color) {
        super();        
        this.index = 0;
        this.color = color;
    }

    First (){
        return this.color.list[0];
    }

    Next (){
        this.index += 1;
        return this.color.list[this.index];
    }

    CurrentItem (){
        return this.color.list[this.index];
    }
}