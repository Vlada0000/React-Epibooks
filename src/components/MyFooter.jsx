import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';

function MyFooter() {
    const { theme } = useContext(ThemeContext);

   
    const footerStyle = {
        backgroundColor: theme === 'dark' ? '#121212' : '#b3b3b3',
        color: theme === 'dark' ? '#ffffff' : '#000000',
    };

    return (
        <Container fluid style={footerStyle} className="p-3">
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <p className="text-center">
                        © 2022 Copyright: EPI-BOOKS
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default MyFooter;
