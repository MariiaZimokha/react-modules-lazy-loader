import React, {PureComponent} from 'react';
import LazyLoader from '../../src/index';
import Image from './Image';

function createImageArray() {
    const output = [];
    for(let i = 1; i < 101; ++i) {
        output.push(`https://picsum.photos/id/${i}/300/300`);
    }
    return output;
}

const placeholder = (<div className="placeholder"></div>)

export default class Example extends PureComponent {
    render() {
        const images = createImageArray();

        return (<div className="container">
            {images.map(item => (
                <LazyLoader key={item} placeholder={placeholder}> 
                    <Image key={item} url={item}/>
                </LazyLoader>
            ))}
            
        </div>);
    }
}
