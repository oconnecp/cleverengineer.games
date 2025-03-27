// filepath: /c:/Users/oconn/Documents/Workspace/dragon/frontend/src/components/HelloWorld/HelloWorld.tsx
import { useEffect, useState } from 'react';
import { AxiosResponse, AxiosError } from 'axios';
import { apiGet } from '../../services/ApiClient'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiGet('/helloworld')
      .then((response: AxiosResponse)  => {
        setMessage(response.data);
      })
      .catch((error: AxiosError) => {
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