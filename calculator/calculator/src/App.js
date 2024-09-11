import React, { useState } from 'react';
import './App.css';

const App = () => {
  const keys = [
    { id: 'clear', value: 'AC' },
    { id: 'divide', value: '/' },
    { id: 'multiply', value: 'x' },
    { id: 'seven', value: '7' },
    { id: 'eight', value: '8' },
    { id: 'nine', value: '9' },
    { id: 'subtract', value: '-' },
    { id: 'four', value: '4' },
    { id: 'five', value: '5' },
    { id: 'six', value: '6' },
    { id: 'add', value: '+' },
    { id: 'one', value: '1' },
    { id: 'two', value: '2' },
    { id: 'three', value: '3' },
    { id: 'equals', value: '=' },
    { id: 'zero', value: '0' },
    { id: 'decimal', value: '.' }
  ];

  const [display, setDisplay] = useState("0");
  const [formulaScreen, setFormulaScreen] = useState("");
  const [evaluated, setEvaluated] = useState(false);

  const handleClick = (value) => {
    if (value === 'AC') {
      setDisplay('0');
      setFormulaScreen('');
      return;
    }
    
    if (value === '.') {
      if (!display.includes('.') || display.slice(-1) !== ".") {
        setDisplay(display + value);
        setFormulaScreen(formulaScreen + value);
      }
      return;
    }

    if (evaluated) {
     if (/[0-9.]/.test(value)) {
        setDisplay(value === '.' ? '0.' : value);
        setFormulaScreen(value);
      } 
      
      else {
        setFormulaScreen(display + value);
      }
      setEvaluated(false);
      return;
    }
   

    if (value === '0') {
      if (display === '0') return;
    }

    if (/[0-9]/.test(value)) {
      if(/[0-9]/.test(value) && display.slice(-1) === '.' && !isNaN(Number(display.slice(-2, -1))) && display.slice(-3, -2) === '.'){
        setDisplay(display.slice(0,-1) + value);
        setFormulaScreen(display.slice(0,-2) + value);
      }
      else if (display === '0') {
        setDisplay(value);
        setFormulaScreen(value);
      } else {
        setDisplay(display + value);
        setFormulaScreen(formulaScreen + value);
      }
      return;
    }

    if (['+', '-', 'x', '/'].includes(value)) {
      const lastChar = formulaScreen.slice(-1);
      if (['+', '-', 'x', '/'].includes(lastChar)) {
        if (value === '-') {
          setDisplay(display + value);
          setFormulaScreen(formulaScreen + value);
        } else {
          setDisplay(display.slice(0, -1) + value);
          setFormulaScreen(formulaScreen.slice(0, -1) + value);
        }
      } else {
        setDisplay(display + value);
        setFormulaScreen(formulaScreen + value);
      }
      return;
    }

    if (value === '=') {
      try {
        const expression = formulaScreen.replace(/x/g, '*');
        let newExpress = "";
        
        for (let i = 0; i < expression.length; i++) {
          const currentChar = expression[i];
          const lastChar = newExpress[newExpress.length - 1];
        
          
          if (['+', '-', '*', '/'].includes(currentChar) && ['+', '*', '/'].includes(lastChar)) {
            if (currentChar === '-') {
              newExpress += currentChar; 
            } else {
              newExpress = newExpress.slice(0, -1) + currentChar; 
            }
          } else {
            newExpress += currentChar; 
          }
        }
        
        
        let result = eval(newExpress);
        result = Math.round(result * 10000) / 10000;
        setDisplay(result.toString());
        setFormulaScreen(result.toString());
        setEvaluated(true);
      } catch (error) {
        setDisplay('NaN');
        setFormulaScreen('');
      }
    }
  };

  return (
    <div id='calculator'>
      <div id='formulaScreen'>{formulaScreen}</div>
      <div id='display'>{display}</div>
      <div id='buttons'>
        {keys.map(({ id, value }) => (
          <button
            id={id}
            className='key'
            key={id}
            onClick={() => handleClick(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
