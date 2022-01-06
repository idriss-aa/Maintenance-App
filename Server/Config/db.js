const mongoose = require("mongoose");
require('dotenv').config();

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(`mongodb+srv://${process.env.user}:${process.env.secret}@maintenancecluster.ngre7.mongodb.net/MaintenanceCluster?retryWrites=true&w=majority`,{
            useUnifiedTopology:true,
	        useNewUrlParser:true,
		    useFindAndModify: false,
        });
        console.log('connection database created');
    } catch (error) {
        console.log(error);
    }
}