const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");

const router = express.Router();

const adminController = require("../controllers/adminController");
const clientController = require("../controllers/clientController");
const leadController = require("../controllers/leadController");
const productController = require("../controllers/productController");
const campController = require("../controllers/campController");
const equipmentController = require("../controllers/equipmentController");
const maintenanceController = require("../controllers/maintenanceController");
const resourceController = require("../controllers/resourceController");
const consumptionController = require("../controllers/consumptionController");

//_______________________________ Admin management _______________________________

router.route("/admin/create").post(catchErrors(adminController.create));
router.route("/admin/read/:id").get(catchErrors(adminController.read));
router.route("/admin/update/:id").patch(catchErrors(adminController.update));
router.route("/admin/delete/:id").delete(catchErrors(adminController.delete));
router.route("/admin/search").get(catchErrors(adminController.search));
router.route("/admin/list").get(catchErrors(adminController.list));

router
  .route("/admin/password-update/:id")
  .patch(catchErrors(adminController.updatePassword));

//_____________________________________ API for clients __________________________

router.route("/client/create").post(catchErrors(clientController.create));
router.route("/client/read/:id").get(catchErrors(clientController.read));
router.route("/client/update/:id").patch(catchErrors(clientController.update));
router.route("/client/delete/:id").delete(catchErrors(clientController.delete));
router.route("/client/search").get(catchErrors(clientController.search));
router.route("/client/list").get(catchErrors(clientController.list));

//_____________________________________ API for leads ___________________________

router.route("/lead/create").post(catchErrors(leadController.create));
router.route("/lead/read/:id").get(catchErrors(leadController.read));
router.route("/lead/update/:id").patch(catchErrors(leadController.update));
router.route("/lead/delete/:id").delete(catchErrors(leadController.delete));
router.route("/lead/search").get(catchErrors(leadController.search));
router.route("/lead/list").get(catchErrors(leadController.list));

//_____________________________________ API for products ___________________________

router.route("/product/create").post(catchErrors(productController.create));
router.route("/product/read/:id").get(catchErrors(productController.read));

router
  .route("/product/update/:id")
  .patch(catchErrors(productController.update));

router
  .route("/product/delete/:id")
  .delete(catchErrors(productController.delete));

router.route("/product/search").get(catchErrors(productController.search));
router.route("/product/list").get(catchErrors(productController.list));

//_____________________________________ API for camps ___________________________

router.route("/camp/create").post(catchErrors(campController.create));
router.route("/camp/read/:id").get(catchErrors(campController.read));
router.route("/camp/update/:id").patch(catchErrors(campController.update));
router.route("/camp/delete/:id").delete(catchErrors(campController.delete));
router.route("/camp/search").get(catchErrors(campController.search));
router.route("/camp/list").get(catchErrors(campController.list));

//_____________________ API for equipment ______________________

router
  .route("/equipment/create")
  .post(catchErrors(equipmentController.create));

router
  .route("/equipment/read/:id")
  .get(catchErrors(equipmentController.read));

router
  .route("/equipment/update/:id")
  .patch(catchErrors(equipmentController.update));

router
  .route("/equipment/delete/:id")
  .delete(catchErrors(equipmentController.delete));

router
  .route("/equipment/search")
  .get(catchErrors(equipmentController.search));

router
  .route("/equipment/list")
  .get(catchErrors(equipmentController.list));

//_____________________ API for maintenance ______________________

router
  .route("/maintenance/create")
  .post(catchErrors(maintenanceController.create));

router
  .route("/maintenance/read/:id")
  .get(catchErrors(maintenanceController.read));

router
  .route("/maintenance/update/:id")
  .patch(catchErrors(maintenanceController.update));

router
  .route("/maintenance/delete/:id")
  .delete(catchErrors(maintenanceController.delete));

router
  .route("/maintenance/search")
  .get(catchErrors(maintenanceController.search));

router
  .route("/maintenance/list")
  .get(catchErrors(maintenanceController.list));

//_____________________ API for resources ______________________

router
  .route("/resource/create")
  .post(catchErrors(resourceController.create));

router
  .route("/resource/read/:id")
  .get(catchErrors(resourceController.read));

router
  .route("/resource/update/:id")
  .patch(catchErrors(resourceController.update));

router
  .route("/resource/delete/:id")
  .delete(catchErrors(resourceController.delete));

router
  .route("/resource/search")
  .get(catchErrors(resourceController.search));

router
  .route("/resource/list")
  .get(catchErrors(resourceController.list));

//_____________________ API for consumption ______________________

router
  .route("/consumption/create")
  .post(catchErrors(consumptionController.create));

router
  .route("/consumption/read/:id")
  .get(catchErrors(consumptionController.read));

router
  .route("/consumption/delete/:id")
  .delete(catchErrors(consumptionController.delete));

router
  .route("/consumption/list")
  .get(catchErrors(consumptionController.list));

module.exports = router;