
import IntersectionObserverMg  from './IntersectionObserverMg';

describe('IntersectionObserverMg', () => {
    const IntersectionObserverOriginal = global.IntersectionObserver;
    const window = global.window;

    beforeEach(() => {
        global.IntersectionObserver = jest.fn();
        global.window.IntersectionObserver = jest.fn();
        delete IntersectionObserverMg.observer;
        IntersectionObserverMg.allObservers.clear();
    });

    afterEach(() => {
        global.IntersectionObserver = IntersectionObserverOriginal;
        global.window = window;
    });


    describe('onChange', () => {
        test('if callback exists', () => {
            const mapKey = {key: 'target'};
            const entries = [{
                target: mapKey
            }];
            const onIntersection = jest.fn();
            IntersectionObserverMg.allTargets.set(mapKey, {onIntersection});
            IntersectionObserverMg.onChange(entries);
            expect(onIntersection).toBeCalled();
        });

        test('if callback does not exist', () => {
            const mapKey = {key: 'target'};
            const entries = [{
                target: {key: 'target1'}
            }];
            const onIntersection = jest.fn();
            IntersectionObserverMg.allTargets.set(mapKey, {onIntersection});
            IntersectionObserverMg.onChange(entries);
            expect(onIntersection).not.toBeCalled();
        });
    });

    describe('getInstance', () => {
        test('creates new instance', () => {
            const options = {
                root: null,
                margin: '0px',
                threshold: 0
            };
            const onIntersection = jest.fn();
            const observe = jest.fn();
            const target = {};
            global.IntersectionObserver.mockReturnValue({observe});

            IntersectionObserverMg.getInstance(onIntersection, options, target);
            expect(global.IntersectionObserver).toBeCalled();
        });

        test('uses existing instance', () => {
            const options = {
                root: null,
                margin: '0px',
                threshold: 0
            };
            const onIntersection = jest.fn();
            const observe = jest.fn();
            const target = {};

            global.IntersectionObserver.mockReturnValue({observe});
            IntersectionObserverMg.getInstance(onIntersection, options, target);
            IntersectionObserverMg.getInstance(onIntersection, options, target);

            expect(global.IntersectionObserver.mock.calls.length).toEqual(1);
        });
    });
});
