import {
  combineReducers
} from "redux";
import user_reducer from "../reducers/users_r";
import device_reducer from "../reducers/devices_r";
import alert_reducer from "./alert";

const reducers = combineReducers({
  user: user_reducer,
  device_data: device_reducer,
  alerts: alert_reducer
});

export default reducers;