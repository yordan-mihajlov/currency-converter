export class Currency {
    constructor(public name: string) { }
}

export class RatedCurrency extends Currency {
    constructor(public name: string, public rate: number) {
        super(name);
    }
}
