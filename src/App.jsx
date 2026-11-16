import { Route, Routes } from 'react-router-dom';
import { useLeagues } from './contexts/useLeagues';
import Header from './components/Header';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import Home from './pages/Home';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Fixtures from './pages/Fixtures';
import Stats from './pages/Stats';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';

export default function App() {
  const { loading, error, reload } = useLeagues();

  return (
    <>
      <Header />
      <main className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={reload} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:teamId" element={<TeamDetail />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>
    </>
  );
}
