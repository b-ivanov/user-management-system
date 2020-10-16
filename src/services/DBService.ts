import UserRecord from '../inerfaces/UserRecord';
import { IDBPDatabase, openDB } from 'idb';

class Service {
	private database:string;
	private databaseVersion:number;
	private db:any;

	constructor(database:string, databaseVersion:number = 1) {
		this.database = database;
		this.databaseVersion = databaseVersion;
	}

	public async createTables(tableNames:string[]) {
		try {
			this.db = await openDB(this.database, this.databaseVersion, {
				upgrade(db:IDBPDatabase) {
					for (const tableName of tableNames) {
						if (db.objectStoreNames.contains(tableName)) {
							continue;
						}
						db.createObjectStore(tableName, {
							keyPath: 'id'
						});
					}
				},
			});
		} catch (error:any) {
			console.error("Error while creating database/tables:", error)
			return false;
		}
	}

	public async getValue(tableName:string, id:string) {
		const tx = this.db.transaction(tableName, 'readonly');
		const store = tx.objectStore(tableName);
		const result = await store.get(id);
		// console.log('Get Data ', JSON.stringify(result));
		return result;
	}

	public async getAllValues(tableName:string) {
		const tx = this.db.transaction(tableName, 'readonly');
		const store = tx.objectStore(tableName);
		const result = await store.getAll();
		// console.log('Get All Data', JSON.stringify(result));
		return result;
	}

	public async putValue(tableName:string, value:UserRecord) {
		const tx = this.db.transaction(tableName, 'readwrite');
		const store = tx.objectStore(tableName);
		const result = await store.put(value);
		// console.log('Put Data ', JSON.stringify(result));
		return result;
	}

	public async putBulkValues(tableName:string, values:UserRecord[]) {
		const tx = this.db.transaction(tableName, 'readwrite');
		const store = tx.objectStore(tableName);
		for (const value of values) {
			await store.put(value);
			// console.log('Put Bulk Data ');
		}
		return this.getAllValues(tableName);
	}

	public async deleteValue(tableName:string, id:string) {
		const tx = this.db.transaction(tableName, 'readwrite');
		const store = tx.objectStore(tableName);
		const result = await store.get(id);
		if (!result) {
			// console.log('Id not found', id);
			return result;
		}
		await store.delete(id);
		// console.log('Deleted Data', id);
		return id;
	}
}

export default Service;