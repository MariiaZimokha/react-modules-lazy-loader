import React, {PureComponent} from 'react';
import LazyLoader from '../../src/index';

export default class Image extends PureComponent {
    render() {
        const {url} = this.props;
        return (<div className="image">
            <img src={url} />
        </div>);
    }
}
