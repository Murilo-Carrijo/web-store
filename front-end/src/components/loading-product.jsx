const ProductLoading = () => {
  return (
    <div
      style={{
        border: '1px solid black',
        height: '92%',
        margin: '10px',
        display: 'flex',
        justifyContent: 'center',
        animation: 'pulse 1.5s infinite ease-in-out',
      }}
    >
      {/* Placeholder da Imagem */}
      <div
        style={{
          width: '300px',
          height: '500px',
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
          marginRight: '20px',
        }}
      ></div>
      {/* Placeholder do Texto */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '50%',
          marginLeft: '16px',
        }}
      >
        <div
          style={{
            height: '30px',
            width: '80%',
            backgroundColor: '#e0e0e0',
            marginBottom: '16px',
            borderRadius: '4px',
          }}
        ></div>
        <div
          style={{
            height: '15px',
            width: '90%',
            backgroundColor: '#e0e0e0',
            marginBottom: '12px',
            borderRadius: '4px',
          }}
        ></div>
        <div
          style={{
            height: '15px',
            width: '60%',
            backgroundColor: '#e0e0e0',
            borderRadius: '4px',
          }}
        ></div>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
`;
document.head.appendChild(style);

export default ProductLoading;
