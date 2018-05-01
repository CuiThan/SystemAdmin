export class Dictionary<T>  {
    private items: { [index: string]: T } = {};

    private count = 0;

    public ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Add(key: string, value: T) {
        if (this.items.hasOwnProperty(key)) {
            throw new Error('key duplicate');
        }
        this.count++;
        this.items[key] = value;
    }
    public Change(key: string, value: T) {
        if (!this.items.hasOwnProperty(key)) {
            throw new Error('key not found');
        }
        this.items[key] = value;
    }

    public Remove(key: string): T {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }

    public Item(key: string): T {
        return this.items[key];
    }

    public Keys(): string[] {
        const keySet: string[] = [];

        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                keySet.push(prop);
            }
        }

        return keySet;
    }

    public Values(): T[] {
        const values: T[] = [];
        for (const prop in this.items) {
            if (this.items.hasOwnProperty(prop)) {
                values.push(this.items[prop]);
            }
        }
        return values;
    }
}
