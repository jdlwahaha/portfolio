class SwitchTypes {
    static all() {return 'all'};
    static linear() {return 'linear'};
    static tactile() {return 'tactile'};
    static clicky() {return 'clicky'};
    static membrane() {return 'membrane'};
    static mecha() {return 'mecha'};

    constructor() { 
    }
}


class Keyboards {

    // hide these variable for safari...
    // cachedFullKeyboards = [];
    // keyboards = [];

    constructor(keyboards) {
        this.keyboards = keyboards.filter((r) => { return r.review });
        this.cachedFullKeyboards = keyboards.filter((r) => { return r.review })
    }

    get() {
        return this.keyboards
    }

    getByName(name) {
        if (name === '') { 
            this.resetList();
        }
        return this.keyboards.filter(k => {
            const original = k.name.toUpperCase();
            const target = name.toUpperCase();
            return original.includes(target);
        });
    }

    getSwitchFilter(type) {
        return (type === SwitchTypes.all())
            ? this.keyboards
            : this.keyboards.filter(k => k.switchType === type);
    }

    set(keyboards) {
        this.keyboards = keyboards;
    }

    resetList() {
        this.keyboards = this.cachedFullKeyboards;
    }

    static getSwitchTypes() {
        return [
            SwitchTypes.all(), 
            SwitchTypes.linear(), 
            SwitchTypes.tactile(), 
            SwitchTypes.clicky(), 
            SwitchTypes.membrane()
        ];
    } 

}

