import Dexie, { Collection, IndexableType } from "dexie"

type Filter<T> = (item: T) => boolean;

export interface IRepository<IEntity, Key> {
    Add(item: IEntity): Promise<Key>;
    Remove(id: Key);
    Update(item: IEntity, id: Key);

    GetAll(): Promise<IEntity[]>;
    GetById(id: Key): Promise<IEntity>;    
    GetPaged(sort: string, pageIndex: number, pageSize: number): Promise<IEntity[]>;    
    Count(): Promise<number>;
    GetTable(): Dexie.Table;
    
    SetFilter(filter: Filter<IEntity>): IRepository<IEntity, Key>;
    GetFilterResult(): Promise<IEntity[]>;
}

export class Repository<IEntity, Key> implements IRepository<IEntity, Key> {
    _Dexie: Dexie;
    _tableName: string;
    _filter: any;

    constructor(dexie: Dexie, tableName: string) {
        this._Dexie = dexie;
        this._tableName = tableName;
    }

    async Remove(id: Key){
        await this.GetTable().delete(id);
    }

    async Update(item: IEntity, id: Key){
        await this.GetTable().put(item, id);
    }

    async Count(): Promise<number> {
        return await this.GetTable().count();
    }
    async Add(item: IEntity): Promise<Key> {
        return await this.GetTable().add(item);
    }
    async GetFilterResult(): Promise<IEntity[]> {
        return await this.GetTable().filter(this._filter).toArray();
    }

    SetFilter(filter: Filter<IEntity>): Repository<IEntity, Key> {
        this._filter = filter;
        return this;
    }

    //SetTable(tableName: string): Repository<IEntity, Key> {
    //this._tableName = tableName;
    //return this;
    //}

    GetTable(): Dexie.Table {
        return this._Dexie.table(this._tableName);
    }

    async GetById(id: any): Promise<IEntity> {
        return await this.GetTable().get(id);
    }

    async GetPaged(sort: string, pageIndex: number, pageSize: number): Promise<IEntity[]> {

        var query = this.GetTable().orderBy(sort).reverse();
        if (this._filter != null)
            query = query.filter(this._filter);

        return await query.offset(pageIndex * pageSize).limit(pageSize).toArray();
    }

    async GetAll(): Promise<IEntity[]> {
        return await this.GetTable().toArray();
    }

}