import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
function Welcome() {
    const [show, setShow] = useState(true);
 if (show) {
    return (
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Welcome to EPI-BOOKS!</Alert.Heading>
        </Alert>
    )
 }
}

export default Welcome;