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
  const [timerRunning, setTimerRunning] = useState(false);

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

      if (!breakToggle) {
        setTimerLabel('Ready to work?');
      }
    } else {
      setLoop(
        setInterval(() => {
          setClockCount((prevCount) => prevCount - 1);
        }, 1000)
      );

      if (!breakToggle) {
        setTimerLabel('Session in progress!');
      }
    }
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
    setClockCount(sessionCount * 60);
    setBreakCount(5);
    setSessionCount(25);
    setTimerLabel('Ready to work?');
  };

  useEffect(() => {
    console.log(`The current break state is ${breakToggle} `);
  });

  useEffect(() => {
    if (!loop) return;

    if (clockCount === 0) {
      clearInterval(loop);
      setLoop(undefined);
      setBreakToggle((prevBreakToggle) => {
        const newBreakToggle = !prevBreakToggle;
        setClockCount(newBreakToggle ? breakCount * 60 : sessionCount * 60);
        setTimerLabel(
          newBreakToggle ? 'Take a break, dawg!' : 'Session in progress!'
        );
        return newBreakToggle;
      });
      return;
    }

    const timer = setInterval(() => {
      setClockCount((prevCount) => {
        if (prevCount === 1) {
          clearInterval(timer);
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [clockCount, loop, breakCount, breakToggle, sessionCount]);

  useEffect(() => {
    console.log(`The current clockCount is: ${clockCount} `);
  }, [clockCount]);

  useEffect(() => {
    setClockCount(sessionCount * 60);
  }, [sessionCount]);

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
