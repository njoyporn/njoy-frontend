export class Timer {

    private _instance: Timer | null = null;
    private countedSchedulerList: CountedScheduler[] = [] ;

    private constructor(){}

    public _getInstance(): Timer {
        if (!this._instance){
            this._instance = new Timer();
            return this._instance;
        }
        return this._instance;
    }

    public async countedScheduler(counter: number, timeout: number, callback: Function): Promise<void> {
        await new Promise(callback => setTimeout(callback, 1000));
        await this.countedScheduler(counter, timeout, callback);
    }
}

export interface CountedScheduler {
    id: number;
    counter: number;
    timeout: number;
}