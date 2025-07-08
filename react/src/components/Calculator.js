import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CalculatorContainer = styled(Box)({
  width: '100%',
  maxWidth: '400px',
  margin: '0 auto',
  backgroundColor: '#000',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  color: '#fff',
});

const Display = styled(Box)({
  backgroundColor: '#000',
  textAlign: 'right',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const StyledButton = styled(Button)(({ theme, variant }) => ({
  height: '80px',
  fontSize: '1.5rem',
  borderRadius: '50%',
  width: '80px',
  minWidth: '80px',
  color: variant === 'operation' ? '#000' : variant === 'equals' ? '#fff' : '#fff',
  backgroundColor: 
    variant === 'operation' 
      ? '#a5a5a5' 
      : variant === 'equals' 
      ? '#ff9500' 
      : '#333',
  '&:hover': {
    backgroundColor: 
      variant === 'operation' 
        ? '#b5b5b5' 
        : variant === 'equals' 
        ? '#ffaa33' 
        : '#444',
  },
}));

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState('');

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
      setCurrentValue(value);
    } else {
      setDisplay(display + value);
      setCurrentValue(currentValue + value);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(currentValue);
    setCurrentValue('');
    setOperation(op);
    setDisplay(display + ' ' + op);
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setOperation(null);
    setPreviousValue('');
  };

  const handleEquals = () => {
    if (!previousValue || !currentValue || !operation) return;

    let result = 0;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (operation === '+') {
      result = prev + current;
    } else if (operation === '-') {
      result = prev - current;
    } else if (operation === '×') {
      result = prev * current;
    } else if (operation === '÷') {
      if (current === 0) {
        setDisplay('Error');
        setCurrentValue('');
        setOperation(null);
        setPreviousValue('');
        return;
      }
      result = prev / current;
    }

    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setOperation(null);
    setPreviousValue('');
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
    '='
  ];

  return (
    <CalculatorContainer>
      <Display>
        <Typography variant="h3" sx={{ fontWeight: 'lighter', margin: 0 }}>
          {display}
        </Typography>
      </Display>
      <Grid container spacing={2} justifyContent="center">
        {buttons.map((btn) => (
          <Grid item key={btn} xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton
              variant={
                ['+', '-', '×', '÷'].includes(btn) 
                  ? 'operation' 
                  : btn === '=' 
                  ? 'equals' 
                  : 'number'
              }
              onClick={() => {
                if (btn === 'C') handleClear();
                else if (btn === '=') handleEquals();
                else if (['+', '-', '×', '÷'].includes(btn)) handleOperationClick(btn);
                else handleNumberClick(btn);
              }}
            >
              {btn}
            </StyledButton>
          </Grid>
        ))}
      </Grid>
    </CalculatorContainer>
  );
};

export default Calculator;
