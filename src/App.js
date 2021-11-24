import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from 'react-router';

function App() {
  return (
    <div className="App" fluid>
      <Navigate to="/login" />
    </div>
  );
}

export default App;
