
import LoginButton from './components/login-button/login-button.component';
import LogoutButton from './components/logout-button/logout-button.component';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <LoginButton />
        <LogoutButton />
      </header>
    </div>
  );
}

export default App;
