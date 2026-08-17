const Resource = require("../models/Resource");
const crudMethods = require("./crudController/crudMethods");

const resourceController = {};

resourceController.create = async (req, res) => {
  return crudMethods.create(Resource, req, res);
};

resourceController.read = async (req, res) => {
  try {
    const result = await Resource.findById(req.params.id).populate(
      "camp",
      "campName location"
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "Resource not found",
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: "Resource found",
    });
  } catch {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Unable to load resource",
    });
  }
};

resourceController.update = async (req, res) => {
  return crudMethods.update(Resource, req, res);
};

resourceController.delete = async (req, res) => {
  return crudMethods.delete(Resource, req, res);
};

resourceController.search = async (req, res) => {
  return crudMethods.search(Resource, req, res);
};

resourceController.list = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;

  try {
    const resultsPromise = Resource.find()
      .populate("camp", "campName location")
      .skip(skip)
      .limit(limit)
      .sort({ created: "desc" });

    const countPromise = Resource.countDocuments();

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
        message: "Resources loaded successfully",
      });
    }

    return res.status(203).json({
      success: false,
      result: [],
      pagination,
      message: "No resources found",
    });
  } catch {
    return res.status(500).json({
      success: false,
      result: [],
      message: "Unable to load resources",
    });
  }
};

module.exports = resourceController;