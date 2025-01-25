import React from 'react';

const Loading = () => {
  return (
    <div
      className="skeleton-card"
      style={{
        display: 'inline-block',
        margin: '10px',
        width: '300px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        position: 'relative',
        animation: 'pulse 1.5s infinite',
      }}
    >
      {/* Image skeleton */}
      <div
        style={{
          height: '300px',
          width: '100%',
          backgroundColor: '#e0e0e0',
        }}
      ></div>
      <div
        className="skeleton-body"
        style={{
          padding: '10px',
        }}
      >
        {/* Title skeleton */}
        <div
          style={{
            height: '20px',
            backgroundColor: '#e0e0e0',
            width: '70%',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
        ></div>
        {/* Price skeleton */}
        <div
          style={{
            height: '15px',
            backgroundColor: '#e0e0e0',
            width: '50%',
            marginBottom: '20px',
            borderRadius: '4px',
          }}
        ></div>
        {/* Button and icon skeleton */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              height: '30px',
              backgroundColor: '#e0e0e0',
              width: '30%',
              borderRadius: '4px',
            }}
          ></div>
          <div
            style={{
              height: '30px',
              backgroundColor: '#e0e0e0',
              width: '30px',
              borderRadius: '50%',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Adding global keyframe animation for pulse effect
const style = document.createElement('style');
style.innerHTML = `
  @keyframes pulse {
    0% {
      background-color: #f0f0f0;
    }
    50% {
      background-color: #e0e0e0;
    }
    100% {
      background-color: #f0f0f0;
    }
  }
`;
document.head.appendChild(style);

export default Loading;
