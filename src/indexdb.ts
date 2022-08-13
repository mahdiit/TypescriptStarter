import Dexie from "dexie"

export interface IDbContact {
    id?: number; // Primary key. Optional (autoincremented)
    first: string; // First name
    last: string; // Last name
}

export interface IDbEmailAddress {
    id?: number;
    contactId: number; // "Foreign key" to an IContact
    type: string; // Type of email such as "work", "home" etc...
    email: string; // The email address
}

export interface IDbPhoneNumber {
    id?: number;
    contactId: number;
    type: string;
    phone: string;
}

export class AppDb extends Dexie {
    contacts!: Dexie.Table<IDbContact, number>;
    emails!: Dexie.Table<IDbEmailAddress, number>;
    phones!: Dexie.Table<IDbPhoneNumber, number>;

    constructor() {
        super("AppDb");

        this.version(1).stores({
            contacts: '++id, first, last',
            emails: '++id, contactId, type, email',
            phones: '++id, contactId, type, phone',
        });
        //this.on('populate', () => this.populate());
    }

    async populate() {
        var id = await this.contacts.add({ first: "Mahdi", last: "Yousefi" });
        console.log(id);
    }

    async Add(contact: IDbContact, email: IDbEmailAddress, phone: IDbPhoneNumber) {
        var id = await this.contacts.add(contact);
        email.contactId = id;
        await this.emails.add(email);
        phone.contactId = id;
        await this.phones.add(phone);
    }

    GetContactList(pageIndex: number, pageSize: number) {
        return this.contacts
            .orderBy("id")
            .reverse()
            .offset(pageIndex * pageSize)
            .limit(pageSize).toArray();
    }
    async GetContactListCount(){
        return await this.contacts.count();
    }

    GetPhoneNumbers(contactId: number){
        return this.phones.filter((e)=> { return e.contactId == contactId }).toArray();
    }

    async AddPhoneNumber(phone: IDbPhoneNumber, ){
        await this.phones.add(phone);
    }

    async RemovePhoneNumber(id: number){
        await this.phones.delete(id);
    }

    GetEmails(contactId: number){
        return this.emails.filter((e)=> { return e.contactId == contactId }).toArray();
    }

    async AddEmail(email: IDbEmailAddress, ){
        await this.emails.add(email);
    }

    async RemoveEmail(id: number){
        await this.emails.delete(id);
    }
}

export async function dbWork() {
    //var db = new AppDb();
    //await db.Add({ first: "Mahdi", last: "Yousefi" }
        //, { email: "mahdi.usefi@gmail.com", type: "home", contactId: 0 }
        //, { phone: "09203172059", type: "home", contactId: 0 });
}