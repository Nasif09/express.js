const response = require("../../helpers/response");
const Car = require("./car.model");
const User = require("../User/user.model");


const addCar = async (req, res) => {
    try {
         const newCar = new Car({
            carName : req.body.carName,
            modelName : req.body.modelName,
            user: req.User.id   //add user ref(id) in car model using populate
         })
         console.log("newCar:::", newCar)
        const car = await newCar.save();

        ///Update usermodel using populate
        await User.updateOne({
            _id : req.User.id
        },{
            $push: {
                cars: car._id
            }
        })
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'car', message: "Car added", data: newCar }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'car', message: "Car isnot added", errors: error.message }));
    }
}

//allCar
const allCar = async(req,res)=>{
    try{
        //live search & pagination
        const search = req.query.search || '';
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const searchRegEx = new RegExp('.*'+search+'.*', 'i');
        const filter = {
            $or: [
                {carName : {$regex: searchRegEx} },
                {modelName : {$regex: searchRegEx} }
            ]
        } 

        const car = await Car.find(filter).populate("user", "fullName email image -_id").limit(limit).skip((page-1)*limit);
        const count = await Car.find(filter).countDocuments();
        const pagination = {
            TotalPage: Math.ceil(count/limit),
            CurrentPage: page,
            PreviousPage: page-1 > 0 ? page-1 : null,
            NextPage: (page+1) < Math.ceil(count/limit) ? (page+1) : null

        }
        if(!car){
            return res.status(404).json(response({ status: 'Not-found', statusCode: '404', type: 'car', message: "car not found"}));
        }
        return res.status(200).json(response({ status: "OK",  statusCode: '200', type: "car", message: 'successfully fetch cars',  data: car, pagination: pagination}));
    }catch(error){
        return res.status(400).json(response({ status: 'Fail', statusCode: '401', type: 'car', message: "Failed to fetch ", errors: error.message }));
    }
}


module.exports = {addCar, allCar};