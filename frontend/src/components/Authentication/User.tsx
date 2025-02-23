import { useState } from "react";
import { BaseUserType } from '../../../../shared/types/UserType';
import Login from "./Login";

const [user, setUser] = useState<BaseUserType | null>(null);
const [error, setError] = useState('');

export default function User() {

return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <Login />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}