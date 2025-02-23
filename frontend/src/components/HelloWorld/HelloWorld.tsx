// filepath: /c:/Users/oconn/Documents/Workspace/dragon/frontend/src/components/HelloWorld/HelloWorld.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/', { withCredentials: true })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;