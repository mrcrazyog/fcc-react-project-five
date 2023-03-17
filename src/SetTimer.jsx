import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import './index.css';

function SetTimer({
  title,
  count,
  handleDecrease,
  handleIncrease,
  id,
  incrementId,
  decrementId,
  periodLength,
}) {
  return (
    <div>
      <Container className='timer-container'>
        <Row>
          <Col>
            <h1 id={id}>{title}</h1>
          </Col>
        </Row>
        <Row className='d-flex align-items-center'>
          <Col>
            <Button variant='outline-warning' onClick={handleIncrease}>
              <AiOutlinePlusCircle id={incrementId} /> Increment
            </Button>
          </Col>
          <Col>
            <span>
              <span id={periodLength}>{count}</span> minutes
            </span>
          </Col>
          <Col>
            <Button variant='outline-warning' onClick={handleDecrease}>
              <AiOutlineMinusCircle id={decrementId} /> Decrement{' '}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SetTimer;
