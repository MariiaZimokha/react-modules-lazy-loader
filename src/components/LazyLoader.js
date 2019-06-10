import React from 'react';
import IntersectionObserverMg  from './IntersectionObserver';

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
        if(window.IntersectionObserver === 'undefined') {
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
        const {root, margin, threshold} = this.props;
        const options = {root, margin, threshold};
        this.observer = IntersectionObserverMg.getInstance(this.onIntersection, options, this.target.current);
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