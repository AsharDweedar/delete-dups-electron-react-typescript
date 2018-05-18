import * as React from 'react';
import AboutHTML from './stateless/about_HTML'
import {TextInput} from 'belle'

const About = () => (
    <div>
        <AboutHTML />
        <TextInput defaultValue="Update here and see how the input grows …" />
    </div>
)

export default About