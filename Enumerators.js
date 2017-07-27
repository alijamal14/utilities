var Enumerators = {
	System: {
		DayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		WeekDaysBoolean: {
			"Sunday": false, "Monday": false, "Tuesday": false, "Wednesday": false, "Thursday": false, "Friday": false, "Saturday": false
		}
	},
	PreFetch: ["/", "/Home/Index"], ///These Are URL Examples in One Of My Projects For Your Project It May Vary This Is URL on Which PreFetch Will Be Aplied
	SubPreFetchFor: { ///These Are URL Examples in One Of My Projects For Your Project It May Vary These Are URLs Which Are PreFetched
		"/Medicine": ['/Create', '/ListAsync'],
		"/MedicineCategories": ['/Create', '/ListAsync'],
		"/MedicineDosages": ['/Create', '/ListAsync'],
		"/MedicineGenerics": ['/Create', '/ListAsync'],
		"/MedicineRoutes": ['/Create', '/ListAsync'],
		"/MedicineStrengths": ['/Create', '/ListAsync'],
		"/Suppliers": ['/Create', '/ListAsync'],
		"/MedicineTypes": ['/Create', '/ListAsync'],
		"Units": ['/Create', '/ListAsync'],
		"MedicineConcentrations": ['/Create', '/ListAsync'],

	}

}