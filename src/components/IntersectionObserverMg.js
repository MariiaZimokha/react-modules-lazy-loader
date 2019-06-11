export default class IntersectionObserverSingleton {
    static allTargets = new Map();
    static allObservers = new Map();

    static getInstance(onIntersection, options, ref) {
        const key = Object.values(options).join(',');
        const observer = IntersectionObserverSingleton.allObservers.get(key);

        IntersectionObserverSingleton.allTargets.set(ref, {onIntersection});

        if (!observer) {
            const newObserver = new IntersectionObserver(IntersectionObserverSingleton.onChange, options);
            IntersectionObserverSingleton.allObservers.set(key, newObserver);
            return newObserver;
        }

        return observer;
    }

    static onChange(entries) {
        entries.forEach((entry) => {
            const {target} = entry;
            const instance = IntersectionObserverSingleton.allTargets.get(target);
            if (instance) {
                instance.onIntersection(entry);
            }
        });
    }
}