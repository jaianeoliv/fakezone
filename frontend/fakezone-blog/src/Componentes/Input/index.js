import React from 'react';
import styled from 'styled-components';

const Input = ({ value, onChange }) => {
  return (
    <StyledWrapper>
      <div className="input-container">
        <input placeholder="Procurando algum tema?" 
        className="input-field" 
        value={value}
        onChange={onChange} 
        />
        <label htmlFor="input-field" 
        className="input-label"></label>
        <span className="input-highlight" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
 
  .input-container {
    position: relative;
    margin: 10px;
  }

  
  .input-field {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-bottom: 2px solid #ccc;
    outline: none;
    background-color: transparent;
  }

  
  .input-label {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    color: rgba(204, 204, 204, 0);
    pointer-events: none;
    transition: all 0.3s ease;
  }

  
  .input-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background-color: #2D2D34;
    transition: all 0.3s ease;
  }

 
  .input-field:focus + .input-label {
    top: -20px;
    font-size: 12px;
    color: #2D2D34;
  }

  .input-field:focus + .input-label + .input-highlight {
    width: 100%;
  }`;

  

export default Input;
