import Home from "./scenes/Home/Home";
import MedicReports from "./scenes/MedicReports/MedicReports";

export default [
  { path: "/", name: "home", component: Home, },
  { path: "/reports", name: "reports", component: MedicReports }
];
