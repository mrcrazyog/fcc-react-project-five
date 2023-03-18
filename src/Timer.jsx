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
  const [clockCount, setClockCount] = useState(sessionCount * 60); //multiplying to get the number of seconds
  const [loop, setLoop] = useState(undefined);
  const [breakToggle, setBreakToggle] = useState(false); // if true, it means a session is running (not a break)
  const [timerLabel, setTimerLabel] = useState('Ready to work?');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setClockCount(sessionCount * 60);
  }, [sessionCount]);

  const convertTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${minutes}:${seconds}`;
  };

  const handlePlayPause = () => {
    if (isRunning) {
      // If the timer is running, clear the interval and update the label
      clearInterval(loop);
      setLoop(undefined);

      if (!breakToggle) {
        setTimerLabel('Ready to work?');
      }
    } else {
      // If the timer is not running, update the label
      if (!breakToggle) {
        setTimerLabel('Session in progress!');
      }
    }
    setIsRunning((prevState) => !prevState); // Toggle the isRunning state
  };

  const handleBreakIncrease = () => {
    setBreakCount((prevState) => (prevState < 60 ? prevState + 1 : prevState));
  };

  const handleBreakDecrease = () => {
    setBreakCount((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  };

  const handleSessionIncrease = () => {
    setSessionCount((prevState) =>
      prevState < 60 ? prevState + 1 : prevState
    );
  };

  const handleSessionDecrease = () => {
    setSessionCount((prevState) => (prevState > 1 ? prevState - 1 : prevState));
  };

  const handleReset = () => {
    clearInterval(loop);
    setLoop(undefined);
    setClockCount(25 * 60);
    setBreakCount(5);
    setSessionCount(25);
    setBreakToggle(false);
    setTimerLabel('Ready to work?');
  };

  const handleTimerSwitch = () => {
    const isBreak = !breakToggle;
    setBreakToggle(isBreak);
    setTimerLabel(isBreak ? 'Break time!' : 'Session in progress!');
    setClockCount(isBreak ? breakCount * 60 : sessionCount * 60);
  };

  const intervalCallback = () => {
    setClockCount((prevCount) => {
      if (prevCount <= 0) {
        handleTimerSwitch();
        return breakToggle ? sessionCount * 60 : breakCount * 60;
      }
      return prevCount - 1;
    });
  };

  useEffect(() => {
    if (!isRunning) {
      clearInterval(loop);
      return;
    }

    const timer = setInterval(intervalCallback, 1000);

    setLoop(timer);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, breakToggle, sessionCount, breakCount]);

  useEffect(() => {
    console.log(`The current clockCount is: ${clockCount} `);
  }, [clockCount]);

  return (
    <div>
      <Container className='clock-container'>
        <Row>
          <Col>
            <h1 id='timer-label'>{timerLabel}</h1>
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
              handleIncrease={() => handleBreakIncrease()}
              handleDecrease={() => handleBreakDecrease()}
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
              handleIncrease={() => handleSessionIncrease()}
              handleDecrease={() => handleSessionDecrease()}
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
