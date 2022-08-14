import Dexie, { IndexableType } from "dexie"

type Filter<T> = (item: T) => boolean;

export interface IRepository {
    Add<IEntity, Key>(item: IEntity): Promise<Key>;
    GetAll<IEntity>(): Promise<IEntity[]>;
    GetById<IEntity>(id: any): Promise<IEntity>;
    SetFilter<IEntity>(filter: Filter<IEntity>): IRepository;
    GetFilterResult<IEntity>(): Promise<IEntity[]>;
    GetPaged<IEntity>(sort: string, pageIndex: number, pageSize: number): Promise<IEntity[]>;
    SetTable(tableName: string): IRepository;
    Count(): Promise<number>;
}

export class Repository implements IRepository {
    _Dexie: Dexie;
    _tableName: string;
    _filter: any;

    constructor(dexie: Dexie) {
        this._Dexie = dexie;
    }
    async Count(): Promise<number> {
        return await this.GetTable().count();
    }
    async Add<IEntity, key>(item: IEntity): Promise<key> {
        return await this.GetTable().add(item);
    }
    async GetFilterResult<IEntity>(): Promise<IEntity[]> {
        return await this.GetTable().filter(this._filter).toArray();
    }

    SetFilter<IEntity>(filter: Filter<IEntity>): Repository {
        this._filter = filter;
        return this;
    }

    SetTable(tableName: string): Repository {
        this._tableName = tableName;
        return this;
    }

    GetTable(): Dexie.Table {
        return this._Dexie.table(this._tableName);
    }

    async GetById<IEntity>(id: any): Promise<IEntity> {
        return await this.GetTable().get(id);
    }

    async GetPaged<IEntity>(sort: string, pageIndex: number, pageSize: number): Promise<IEntity[]> {
        return await this.GetTable().orderBy(sort)
            .reverse()
            .offset(pageIndex * pageSize)
            .limit(pageSize).toArray();
    }

    async GetAll<IEntity>(): Promise<IEntity[]> {
        return await this.GetTable().toArray();
    }

}