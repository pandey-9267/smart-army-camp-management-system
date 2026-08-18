import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PageLoader from "@/components/PageLoader";

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "DashboardPage" */ "@/pages/Dashboard")
);

const Admin = lazy(() =>
  import(/* webpackChunkName: "AdminPage" */ "@/pages/Admin")
);

const Customer = lazy(() =>
  import(/* webpackChunkName: "CustomerPage" */ "@/pages/Customer")
);

const SelectCustomer = lazy(() =>
  import(/* webpackChunkName: "SelectCustomerPage" */ "@/pages/SelectCustomer")
);

const Lead = lazy(() =>
  import(/* webpackChunkName: "LeadPage" */ "@/pages/Lead")
);

const Product = lazy(() =>
  import(/* webpackChunkName: "ProductPage" */ "@/pages/Product")
);

const Camp = lazy(() =>
  import(/* webpackChunkName: "CampPage" */ "@/pages/Camp")
);

// recent added
const Resource = lazy(() =>
  import(/* webpackChunkName: "ResourcePage" */ "@/pages/Resource")
);

// add recent 
const Consumption = lazy(() =>
  import(/* webpackChunkName: "ConsumptionPage" */ "@/pages/Consumption")
);

// add recent 
const Alerts = lazy(() =>
  import(/* webpackChunkName: "AlertsPage" */ "@/pages/Alerts")
);

// add recent
const Equipment = lazy(() =>
  import(/* webpackChunkName: "EquipmentPage" */ "@/pages/Equipment")
);

// add recent 
const Maintenance = lazy(() =>
  import(/* webpackChunkName: "MaintenancePage" */ "@/pages/Maintenance")
);

const Logout = lazy(() =>
  import(/* webpackChunkName: "LogoutPage" */ "@/pages/Logout")
);

const NotFound = lazy(() =>
  import(/* webpackChunkName: "NotFoundPage" */ "@/pages/NotFound")
);

export default function AppRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          <PrivateRoute path="/" component={Dashboard} exact />

          <PrivateRoute path="/camp" component={Camp} exact />


          {/* add recent */}
          <PrivateRoute path="/resource" component={Resource} exact />

          {/* add recent */}
          <PrivateRoute
            path="/consumption"
            component={Consumption}
            exact
          />

          {/* add recent */}
          <PrivateRoute
            path="/alerts"
            component={Alerts}
            exact
          />

          {/* add recent */}
          <PrivateRoute
            path="/equipment"
            component={Equipment}
            exact
          />

          {/* add recent  */}
          <PrivateRoute
            path="/maintenance"
            component={Maintenance}
            exact
          />

          <PrivateRoute path="/customer" component={Customer} exact />
          <PrivateRoute
            path="/selectcustomer"
            component={SelectCustomer}
            exact
          />
          <PrivateRoute path="/lead" component={Lead} exact />
          <PrivateRoute path="/product" component={Product} exact />
          <PrivateRoute path="/admin" component={Admin} exact />
          <PrivateRoute path="/logout" component={Logout} exact />

          <PublicRoute path="/login" render={() => <Redirect to="/" />} />
          <Route
            path="*"
            component={NotFound}
            render={() => <Redirect to="/notfound" />}
          />
        </Switch>
      </AnimatePresence>
    </Suspense>
  );
}