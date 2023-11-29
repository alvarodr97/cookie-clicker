let request: IDBOpenDBRequest;
let requestInit: IDBOpenDBRequest;
let db: IDBDatabase;
let version = 1;

export interface User {
  name: string;
  cookies: number;
  nivel: number;
}

export enum Stores {
  Users = "users",
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // open the connection
    requestInit = indexedDB.open("myCookieDB");

    requestInit.onupgradeneeded = () => {
      db = requestInit.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.Users)) {
        console.log("Creating users store");
        db.createObjectStore(Stores.Users, { keyPath: "name" });
      }
    };

    requestInit.onsuccess = () => {
      db = requestInit.result;
      version = db.version;
      console.log("requestInit.onsuccess - initDB", version);
      resolve(true);
    };

    requestInit.onerror = () => {
      resolve(false);
    };
  });
};

export const addData = <T>(
  storeName: string,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myCookieDB", version);

    request.onsuccess = () => {
      console.log("request.onsuccess - addData", data);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      console.log("DATA FUNCION: " + JSON.stringify(data))
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message;
      if (error) {
        resolve(error);
      } else {
        resolve("Unknown error");
      }
    };
  });
};

export const updateData = <T>(
  storeName: string,
  key: string,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myCookieDB", version);

    request.onsuccess = () => {
      // alert("NEW DATA: " + data)
      console.log("request.onsuccess - updateData", key);
      db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const res = store.get(key);
      res.onsuccess = () => {
        const newData = { ...res.result, ...data };
        // alert(JSON.stringify(newData))
        store.put(newData);
        resolve(newData);
      };
      res.onerror = () => {
        resolve(null);
      };
    };
  });
};

export const getStoreData = <T>(storeName: Stores): Promise<T[]> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myCookieDB");

    request.onsuccess = () => {
      console.log("request.onsuccess - getAllData");
      db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const res = store.getAll();
      res.onsuccess = () => {
        resolve(res.result);
      };
    };
  });
};

export const getUserData = <T>(
  storeName: string,
  key: string,
): Promise<T | User | undefined> => {
  return new Promise((resolve) => {
    request = indexedDB.open("myCookieDB");

    request.onsuccess = () => {
      console.log("request.onsuccess - getUserData");
      db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      console.log("storeName: " + storeName)
      const res = store.get(key)
      res.onsuccess = () => {
        console.log("DATOS USUARIO DB: " + JSON.stringify(res.result))
        resolve(res.result);
      };
    };
  });
};