import React from 'react'
import {Container,Row,Col} from "react-bootstrap"

function Footer() {
    const date  = new Date()
    const currentYear = date.getFullYear()
  return (
    <footer>
  <Container>
        <Row>
            <Col className=' text-center py-3'><p>ProShop &copy; {currentYear}</p></Col>
        </Row>
    </Container>
    </footer>
  
  )
}

export default Footer