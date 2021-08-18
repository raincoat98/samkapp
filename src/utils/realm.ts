import * as RealmWeb from "realm-web";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";

export async function RealmLogIn(credentials: RealmWeb.Credentials) {
  const dispatch = useDispatch();
  const realmApp = useSelector((state: RootState) => state.realm.app);

  try {
    if (!realmApp) throw new Error("realmApp 생성되지 않음");
    await realmApp.logIn(credentials);
    dispatch({
      type: "realm/logIn",
      payload: realmApp.currentUser,
    });
    dispatch({
      type: "system/setCredentials",
      payload: credentials,
    });
    return true;
  } catch (error) {
    return error;
  }
}
