import React from 'react' ;
import LazyLoader from './LazyLoader';
import {shallow} from 'enzyme';
import IntersectionObserverMg  from './IntersectionObserver';

describe('LazyLoader', () => {
    const windowOriginal = global.window;
    const getInstanceOriginal = IntersectionObserverMg.getInstance;

    const children = (<div> This is children </div>);

    beforeEach(() => {
        global.window.IntersectionObserver = {};
        IntersectionObserverMg.getInstance = jest.fn();
        
    });

    afterEach(() => {
        global.window = windowOriginal;
        IntersectionObserverMg.getInstance = getInstanceOriginal;
    });

    describe('renders ', () => {
        test('when element is not in view', () => {
            const wrapper = shallow(<LazyLoader children={children} />, {
                disableLifecycleMethods: true,
            });
    
            expect(wrapper.length).toBe(1);
            expect(wrapper.find('div').prop('style')).toEqual({height: '300px'});
        });

        test('when element is in view', () => {
            const wrapper = shallow(<LazyLoader children={children} />, {
                disableLifecycleMethods: true,
            });
    
            expect(wrapper.length).toBe(1);
            wrapper.setState({hasIntersected: true});
            expect(wrapper.contains(children)).toEqual(true);
        });

        test('with custom placeholder', () => {
            const placeholder = (<div style={{height: '200px'}}/>);
            const wrapper = shallow(<LazyLoader children={children} placeholder={placeholder}/>, {
                disableLifecycleMethods: true,
            });

            expect(wrapper.contains(placeholder)).toEqual(true);
        });
    });

    describe('componentDidMount', () => {
        test('when polyfill exists', () => {
            const wrapper = shallow(<LazyLoader children={children} />, {
                disableLifecycleMethods: true,
            });

            const instance = wrapper.instance();
            instance.createObserver = jest.fn();
            instance.componentDidMount();
            expect(instance.createObserver).toBeCalled();
        });
    });

    test('componentWillUnmount', () => {
        const wrapper = shallow(<LazyLoader children={children} />, {
            disableLifecycleMethods: true,
        });

        const unobserve = jest.fn();
        const instance = wrapper.instance();
        instance.observer = {unobserve};
        instance.target = {current: null};

        instance.componentWillUnmount();
        expect(unobserve).toBeCalled();
    });

    describe('onIntersection', () => {
        const target = 'target';

        test('when element is visible', () => {
            const wrapper = shallow(<LazyLoader children={children} />, {
                disableLifecycleMethods: true,
            });

            const entry = {
                target,
                isIntersecting: true
            };
            const instance = wrapper.instance();
            const unobserve = jest.fn();
            instance.observer = {unobserve};
            instance.target = {current: target};
            instance.setState = jest.fn();

            instance.onIntersection(entry);
            expect(unobserve).toBeCalled();
            expect(instance.setState).toBeCalled();
        });

        test('when element is not visible', () => {
            const wrapper = shallow(<LazyLoader children={children} />, {
                disableLifecycleMethods: true,
            });

            const entries = {
                target,
                isIntersecting: false
            };
            const instance = wrapper.instance();
            const unobserve = jest.fn();
            instance.observer = {unobserve};
            instance.target = {current: target};
            instance.setState = jest.fn();

            instance.onIntersection(entries);
            expect(unobserve).not.toBeCalled();
            expect(instance.setState).not.toBeCalled();
        });

        test('does nothing if element has been loaded', () => {
            const wrapper = shallow(<LazyLoader children={children} />, {
                disableLifecycleMethods: true,
            });

            const instance = wrapper.instance();
            instance.setState({hasIntersected: true});
            const unobserve = jest.fn();
            instance.observer = {unobserve};

            instance.onIntersection();
            expect(unobserve).not.toBeCalled();
        });
    });

    test('createObserver', () => {
        const props = {
            root: null,
            margin: '0px',
            threshold: 0
        };
        const observe = jest.fn();
        IntersectionObserverMg.getInstance.mockReturnValue({observe});

        const wrapper = shallow(<LazyLoader children={children} {...props} />, {
            disableLifecycleMethods: true,
        });

        const instance = wrapper.instance();
        instance.createObserver();

        expect(observe).toBeCalled();
    });
});