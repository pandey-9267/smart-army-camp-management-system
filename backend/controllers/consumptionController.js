const Consumption = require("../models/Consumption");
const Resource = require("../models/Resource");

const consumptionController = {};

consumptionController.create = async (req, res) => {
  try {
    const { resource: resourceId, quantityUsed } = req.body;

    if (!resourceId || !quantityUsed || Number(quantityUsed) <= 0) {
      return res.status(400).json({
        success: false,
        result: null,
        message:
          "Please select a resource and enter a valid quantity used.",
      });
    }

    const resource = await Resource.findById(resourceId);

    if (!resource) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "Selected resource was not found.",
      });
    }

    const openingQuantity = resource.currentQuantity;
    const usedQuantity = Number(quantityUsed);

    if (usedQuantity > openingQuantity) {
      return res.status(400).json({
        success: false,
        result: null,
        message:
          "Quantity used cannot be greater than available stock.",
      });
    }

    const remainingQuantity = openingQuantity - usedQuantity;

    resource.currentQuantity = remainingQuantity;
    await resource.save();

    const result = await Consumption.create({
      ...req.body,
      camp: resource.camp,
      openingQuantity,
      remainingQuantity,
    });

    return res.status(200).json({
      success: true,
      result,
      message:
        "Consumption recorded and stock updated successfully.",
    });
  } catch (error) {
    console.error("Consumption create error:", error);

    return res.status(500).json({
      success: false,
      result: null,
      message: "Unable to record consumption.",
    });
  }
};

consumptionController.read = async (req, res) => {
  try {
    const result = await Consumption.findById(req.params.id)
      .populate("resource", "resourceName unit")
      .populate("camp", "campName location");

    if (!result) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "Consumption record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      result,
      message: "Consumption record found.",
    });
  } catch (error) {
    console.error("Consumption read error:", error);

    return res.status(500).json({
      success: false,
      result: null,
      message: "Unable to load consumption record.",
    });
  }
};

consumptionController.list = async (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = page * limit - limit;

  try {
    const resultsPromise = Consumption.find()
      .populate("resource", "resourceName unit")
      .populate("camp", "campName location")
      .skip(skip)
      .limit(limit)
      .sort({ date: "desc" });

    const countPromise = Consumption.countDocuments();

    const [result, count] = await Promise.all([
      resultsPromise,
      countPromise,
    ]);

    return res.status(200).json({
      success: true,
      result,
      pagination: {
        page,
        pages: Math.ceil(count / limit),
        count,
      },
      message: "Consumption records loaded successfully.",
    });
  } catch (error) {
    console.error("Consumption list error:", error);

    return res.status(500).json({
      success: false,
      result: [],
      message: "Unable to load consumption records.",
    });
  }
};

/*
 * DELETE CONSUMPTION
 *
 * When a consumption record is deleted,
 * restore the quantity back to the resource.
 */
consumptionController.delete = async (req, res) => {
  try {
    const consumption = await Consumption.findById(req.params.id);

    if (!consumption) {
      return res.status(404).json({
        success: false,
        result: null,
        message: "Consumption record not found.",
      });
    }

    const resource = await Resource.findById(
      consumption.resource
    );

    if (resource) {
      const usedQuantity = Number(
        consumption.quantityUsed || 0
      );

      resource.currentQuantity =
        Number(resource.currentQuantity || 0) +
        usedQuantity;

      await resource.save();
    }

    await Consumption.findByIdAndDelete(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      result: consumption,
      message:
        "Consumption record deleted and resource stock restored successfully.",
    });
  } catch (error) {
    console.error("Consumption delete error:", error);

    return res.status(500).json({
      success: false,
      result: null,
      message: "Unable to delete consumption record.",
    });
  }
};

module.exports = consumptionController;