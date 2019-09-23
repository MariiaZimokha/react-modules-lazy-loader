import React from 'react';
import IntersectionObserverMg  from './IntersectionObserverMg';

export default class LazyLoader extends React.Component {
    static defaultProps = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
        children: null
    };

    constructor(props) {
        super(props);
        this.target = React.createRef();
        this.state = {hasIntersected: false};
    }

    componentDidMount() {
        if(typeof window.IntersectionObserver === 'undefined') {
            import(`intersection-observer`).then(this.createObserver);
        } else {
            this.createObserver();
        }
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
        const {root, rootMargin, threshold} = this.props;
        const options = {root, rootMargin, threshold};
        this.observer = IntersectionObserverMg.getInstance(this.onIntersection, options, this.target.current);
        this.observer.observe(this.target.current);
    }

    render() {
        const {children, placeholder} = this.props;
        const {hasIntersected} = this.state;
        const showPlaceholder = placeholder || (<div style={{height: '300px'}} />);
    
        return React.cloneElement(
            showPlaceholder, 
            {ref: this.target}
        );
    }
}
