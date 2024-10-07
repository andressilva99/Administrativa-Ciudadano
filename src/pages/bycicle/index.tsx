import { useEffect, useState } from 'react';
import { useZxing } from 'react-zxing';
import { Box, Button } from '@mui/material';

const ByciclePage = () => {
  const [result, setResult] = useState('');

  const {
    ref,
    torch: { on, off, isOn, isAvailable },
  } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <Box>
      <video ref={ref}></video>
      {isAvailable ? (
        <Button variant="contained" onClick={() => (isOn ? off() : on())}>
          {isOn ? 'Turn off' : 'Turn on'} torch
        </Button>
      ) : (
        <strong>No se puede abrir la camara</strong>
      )}
      <p>
        <span>Results: </span>
        <span>{result}</span>
      </p>
    </Box>
  );
};

export default ByciclePage;
