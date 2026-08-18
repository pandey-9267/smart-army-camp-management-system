const Maintenance = require("../models/Maintenance");
const crudMethods = require("./crudController/crudMethods");

const maintenanceController = {};

maintenanceController.create = async (req, res) => {
  return crudMethods.create(Maintenance, req, res);
};

maintenanceController.read = async (req, res) => {
  try {
    const result = await Maintenance.findById(req.params.id)
      .populate("equipment", "equipmentId equipmentName category")
      .exec();

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "Maintenance record not found",
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: "Maintenance record found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Unable to load maintenance record",
    });
  }
};

maintenanceController.update = async (req, res) => {
  return crudMethods.update(Maintenance, req, res);
};

maintenanceController.delete = async (req, res) => {
  return crudMethods.delete(Maintenance, req, res);
};

maintenanceController.search = async (req, res) => {
  return crudMethods.search(Maintenance, req, res);
};

maintenanceController.list = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;

  try {
    const resultsPromise = Maintenance.find()
      .populate("equipment", "equipmentId equipmentName category")
      .skip(skip)
      .limit(limit)
      .sort({ maintenanceDate: "desc" });

    const countPromise = Maintenance.countDocuments();

    const [result, count] = await Promise.all([
      resultsPromise,
      countPromise,
    ]);

    const pagination = {
      page,
      pages: Math.ceil(count / limit),
      count,
    };

    if (count > 0) {
      return res.status(200).json({
        success: true,
        result,
        pagination,
        message: "Maintenance records loaded successfully",
      });
    }

    return res.status(203).json({
      success: false,
      result: [],
      pagination,
      message: "Collection is Empty",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      result: [],
      message: "Unable to load maintenance records",
    });
  }
};

module.exports = maintenanceController;