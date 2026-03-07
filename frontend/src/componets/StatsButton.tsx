import { useState } from 'react';
import api from '../api/api';
import TextSignal from '../signals/StatsButtonSignal';

const STORAGE_KEY = 'uploadedText';

function StatsButton() {
  const [status, setStatus] = useState<string>('');
  
  const handleSend = async () => {
    const text = (localStorage.getItem(STORAGE_KEY) ?? '').trim();

    if (!text) {
      setStatus('No uploaded text found in local storage.');
      return;
    }

    try {
      const res = await api.post('/text', {
        user_text: {
          content: text,
        },
      });
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem('analysisResult', JSON.stringify(res.data));
      setStatus('Text sent successfully.');
      console.log('POST /text response:', res.data);
      TextSignal.value ++; // Increment the signal to trigger updates in other components
    } catch (error) {
      setStatus('Failed to send text.');
      console.error('POST /text failed:', error);
    }
  };

  return (
    <>
      <button className="ComponetButton" onClick={handleSend}>
        Check Text
      </button>
      {status && <p className="text">{status}</p>}
    </>
  );
}

export default StatsButton;
