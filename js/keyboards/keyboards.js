class SwitchTypes {
    static all = 'all';
    static linear = 'linear';
    static tactile = 'tactile';
    static clicky = 'clicky';
    static membrane = 'membrane';
    static mecha = 'mecha';
}


class Keyboards {

    static SWITCH_TYPES = [
        SwitchTypes.all, 
        SwitchTypes.linear, 
        SwitchTypes.tactile, 
        SwitchTypes.clicky, 
        SwitchTypes.membrane
    ];

    cachedFullKeyboards;
    keyboards;

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
        return (type === SwitchTypes.all)
            ? this.keyboards
            : this.keyboards.filter(k => k.switchType === type);
    }

    set(keyboards) {
        this.keyboards = keyboards;
    }

    resetList() {
        this.keyboards = this.cachedFullKeyboards;
    }
}

