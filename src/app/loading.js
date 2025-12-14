"use client"
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <div className='w-full min-h-screen bg-white flex flex-col justify-center items-center'>

      <StyledWrapper>
        <div className="loader" />
      </StyledWrapper>
      <p className='text-black font-bold tracking-[2px] mt-6 animate-pulse text-2xl '>LOADING</p>
    </div>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 48px;
    height: 48px;
    background: #353535;
    display: block;
    position: relative;
    box-sizing: border-box;
    animation: rotationBack 1s ease-in-out infinite reverse;
  }

  .loader::before {
    content: '';
    box-sizing: border-box;
    left: 0;
    top: 0;
    transform: rotate(45deg);
    position: absolute;
    width: 48px;
    height: 48px;
    background: #2e2e2e;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }

  .loader::after {
    content: '';
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    background: rgb(0, 0, 0);
    transform: translate(-50%, -50%);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }

  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }`;

export default Loader;
