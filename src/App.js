import { AuthProvider } from './AuthContext';
import { Route, Routes } from 'react-router-dom';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import TVShows from './pages/TVShows';
import SignUp from './pages/signup';
import Lobby from './pages/Lobby'; 
import Login from './pages/Login';
import FindID from './pages/findID';
import FindPW from './pages/findPW';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Lobby />} /> 
        <Route path="/Lobby" element={<Lobby />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/findID" element={<FindID />} />
        <Route path="/findPW" element={<FindPW />} />
        <Route path="/tv" element={<TVShows />}>
          <Route path=":id" element={<></>} />
        </Route>
        <Route path="/movie" element={<Movies />}>
          <Route path=":id" element={<></>} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
