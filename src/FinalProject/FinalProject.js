import React, { useState } from 'react';
import { Row, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import InteractiveViz from '../InteractiveViz/InteractiveViz';
import MediaChart from './MediaChart';
import DeathDateChart from './DeathDateChart';
const FinalProject = () => {
    const [comp, setComp] = useState(<InteractiveViz />);
    const chooseComp = (component) => {
        setComp(component)
    }
    return (
        <>
            <Row className='mx-1'>
                <Button as={Col} variant="outline-primary" onClick={() => { chooseComp(<InteractiveViz />) }}>By Gender</Button>
                {/* <Button as={Col} variant="outline-primary" onClick={() => { chooseComp(<MediaChart />) }}>By Media</Button> */}
                <Button as={Col} variant="outline-primary" onClick={() => { chooseComp(<DeathDateChart width={1200} height={750}/>) }}>By Year</Button>
            </Row>
            {comp}

        </>
    );
}

export default FinalProject