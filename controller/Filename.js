class Filename {
	
	constructor(category, region) {
		
		let category1 = category.substring(0,4);
		let region1 = region.substring(0,4);
		
		
		let name = "data/" + region1 + category1 +".csv";
		
		this.filename = name;
		
	}

	getFilename() {
		return this.filename;
	}
}