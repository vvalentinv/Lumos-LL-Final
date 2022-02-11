import { useAuth0 } from "@auth0/auth0-react";

import LoginButton from './components/login-button/login-button.component';
import LogoutButton from './components/logout-button/logout-button.component';

const App = () => {
  const { user } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <LoginButton />
        <LogoutButton />
        {user
          ?
          <h1>Welcome {user.name}</h1>
          : null
        }
      </header>
    </div>
  );
}

export default App;
