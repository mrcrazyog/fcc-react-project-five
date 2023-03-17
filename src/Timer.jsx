import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { PlayPauseIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SetTimer from './SetTimer';
import './index.css';

function Timer() {
  const iconStyle = {
    width: '24px',
    height: '24px',
  };

  const [breakCount, setBreakCount] = useState(5);
  const [sessionCount, setSessionCount] = useState(25);
  const [clockCount, setClockCount] = useState(25 * 60); //multiplying to get the number of seconds
  const [loop, setLoop] = useState(undefined);

  const convertTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (loop) {
      //if timer currently running
      clearInterval(loop);
      setLoop(undefined);
    } else {
      setLoop(
        setInterval(() => {
          setClockCount((prevCount) => prevCount - 1);
        }, 1000)
      );
    }
  };

  const handleIncrease = () => {};

  const handleDecrease = () => {};

  const handleReset = () => {
    clearInterval(loop);
    setLoop(undefined);
    setClockCount(sessionCount * 60);
  };

  useEffect(() => {
    if (clockCount === 0) {
      clearInterval(loop);
      setLoop(undefined);
    }
  }, [clockCount, loop]);

  return (
    <div>
      <Container className='clock-container'>
        <Row>
          <Col>
            <h1 id='timer-label'>Session</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <span id='time-left'>{convertTime(clockCount)} </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant={`${loop ? 'danger' : 'success'}`}
              id='start_stop'
              onClick={() => handlePlayPause()}
            >
              <PlayPauseIcon style={iconStyle} />
            </Button>
            <Button variant='info' id='reset' onClick={() => handleReset()}>
              <ArrowPathIcon style={iconStyle} />
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className='m-5' col={6}>
            {' '}
            <SetTimer
              title='Break length'
              id='break-label'
              count={breakCount}
              handleIncrease={() => handleIncrease()}
              handleDecrease={() => handleDecrease()}
              incrementId='break-increment'
              decrementId='break-decrement'
              periodLength='break-length'
            />
          </Col>
          <Col className='m-5' col={6}>
            {' '}
            <SetTimer
              title='Session length'
              id='session-label'
              count={sessionCount}
              handleIncrease={() => handleIncrease}
              handleDecrease={() => handleDecrease}
              incrementId='session-increment'
              decrementId='session-decrement'
              periodLength='session-length'
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Timer;
