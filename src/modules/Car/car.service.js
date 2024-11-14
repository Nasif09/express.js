const response = require("../../helpers/response");
const Car = require("./car.model");


const addCar = async (req, res) => {
    try {
        var { fullName, modelName } = req.body;
         const newCar = new Car({
            fullName,
            modelName
         })
        await Car.Save(newCar);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'car', message: "Car added", data: newCar }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'car', message: "Car isnot added", errors: error.message }));
    }
}

module.exports = {addCar};