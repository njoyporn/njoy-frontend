export interface HS<T> {
    key:string;
    value: T;
    deleted: boolean
}

export class HiddenStorage {

    private static hS: HiddenStorage = new HiddenStorage();

    private storage: HS<any>[] = [{key:"empty", value: true, deleted: false}]
    
    private constructor(){}

    public static _getInstance(): HiddenStorage {
        if(!this.hS) return new HiddenStorage();
        return this.hS;
    }

    public add<T>(_key: string, value: T): void {
        this.storage.push({key:_key,value, deleted:false})
    }

    public remove(_key: string):  void {
        this.storage = this.storage.filter(function(item) { return item.key != _key; });
    }

    public get<T>(_key: string): HS<T> | undefined {
        let hs: HS<T>|undefined = this.storage.find(function(item) { return item.key == _key});
        return hs; 
    }
}