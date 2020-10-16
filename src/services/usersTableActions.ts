import Service from './DBService';
import UserRecord from '../inerfaces/UserRecord';

class usersTableActions {
	DATABASE_NAME:string = "usersDatabase";
	TABLE_NAME:string = "users";

	async getAllUsers (callback:any) {
		const usersDatabase:any = new Service(this.DATABASE_NAME, 1);
		await usersDatabase.createTables([this.TABLE_NAME]);
		const allUsers:UserRecord[] = await usersDatabase.getAllValues(this.TABLE_NAME);
		callback(allUsers);
	}

	async addUser (user:UserRecord, callback:any) {
		const usersDatabase:any = new Service(this.DATABASE_NAME, 1);
		await usersDatabase.createTables([this.TABLE_NAME]);
		const newUserID:string = await usersDatabase.putValue(this.TABLE_NAME, user);
		if (newUserID === null) {
			console.error("Error while adding suser to table!");
			callback(null);
		} else {
			const allUsers:UserRecord[] = await usersDatabase.getAllValues(this.TABLE_NAME);
			callback(allUsers);
		}
	}

	async deleteUser (id:string, callback:any) {
		const usersDatabase:any = new Service(this.DATABASE_NAME, 1);
		await usersDatabase.createTables([this.TABLE_NAME]);
		const deletedUserID:string = await usersDatabase.deleteValue(this.TABLE_NAME, id);
		if (deletedUserID === null) {
			console.error("Error while deleting suser to table!");
			callback(null);
		} else {
			const allUsers:UserRecord[] = await usersDatabase.getAllValues(this.TABLE_NAME);
			callback(allUsers);
		}
	}
}

export default usersTableActions;