import { initializeApp } from "firebase/app";
import {
  getDatabase,
  push,
  set,
  get,
  update,
  remove,
  ref,
} from "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://pretestdb-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const mathrandrom = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const dbfunction = {
  setData: ({ table, json }) => {
    try {
      push(ref(db, `${table}`), json);
      return {
        status: 200,
        message: "success",
      };
    } catch (error) {
      return {
        status: 500,
        message: `error ${error.message}`,
      };
    }
  },
  getData: async ({ table, key }) => {
    var dbkey = "";

    dbkey = table ? `${table}` : "/";
    dbkey = key ? `${dbkey}/${key}` : dbkey;

    try {
      const snapshot = await get(ref(db, dbkey));

      if (snapshot.exists()) {
        return {
          status: 200,
          message: "success",
          data: snapshot.val(),
        };
      } else {
        return {
          status: 404,
          message: "success",
          data: "data not found",
        };
      }
    } catch (error) {
      return {
        status: 500,
        message: `error ${error.message}`,
      };
    }
  },
  updateData: ({ table, key, json }) => {
    try {
      set(ref(db, `${table}/${key}`), json);
      return {
        status: 200,
        message: "success",
      };
    } catch (error) {
      return {
        status: 500,
        message: `error ${error.message}`,
      };
    }
  },
  deleteData: ({ table, key }) => {
    try {
      remove(ref(db, `${table}/${key}`));
      return {
        status: 200,
        message: "success",
      };
    } catch (error) {
      return {
        status: 500,
        message: `error ${error.message}`,
      };
    }
  },
};

export default dbfunction;
