import Dexie from "dexie"
import { Repository } from "./Repository";

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

    public Contact: Repository<IDbContact, number>;
    public Email: Repository<IDbEmailAddress, number>;
    public Phone: Repository<IDbPhoneNumber, number>;

    constructor() {
        super("AppDb");

        this.version(1).stores({
            contacts: '++id, first, last',
            emails: '++id, contactId, type, email',
            phones: '++id, contactId, type, phone',
        });

        this.Contact = new Repository<IDbContact, number>(this,"contacts");
        this.Email = new Repository<IDbEmailAddress, number>(this,"emails");
        this.Phone = new Repository<IDbPhoneNumber, number>(this, "phones");
    }
}