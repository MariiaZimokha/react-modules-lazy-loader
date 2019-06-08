import React from 'react';

class IntersectionObserverSingleton {
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


export default class LazyLoader extends React.Component {
    static defaultProps = {
        root: null,
        margin: '0px',
        threshold: 0,
        children: null
    };

    constructor(props) {
        super(props);
        this.target = React.createRef();
        this.state = {hasIntersected: false};
    }

    componentDidMount() {
        this.createObserver();
    }

    componentWillUnmount() {
        this.observer.unobserve(this.target.current);
    }

    onIntersection = (entry) => {
        if (!this.state.hasIntersected && entry && entry.isIntersecting) {
            this.setState({hasIntersected: true});
            this.observer.unobserve(entry.target);
        }
    }

    createObserver = () => {
        const {root, margin, threshold} = this.props;
        const options = {root, margin, threshold};
        this.observer = IntersectionObserverSingleton.getInstance(this.onIntersection, options, this.target.current);
        this.observer.observe(this.target.current);
    }

    render() {
        const {children} = this.props;
        const {hasIntersected} = this.state;
        return (
            <div ref={this.target} className="lazy-load" style={hasIntersected ? {} : {height: '300px'}}>
                {hasIntersected && children}
            </div>
        );
    }
}