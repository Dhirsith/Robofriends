import React, { useEffect, useState } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundry";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [loadAttempt, setLoadAttempt] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadRobots() {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(USERS_URL, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                const users = await response.json();
                if (!Array.isArray(users)) {
                    throw new Error('The users response was not a list.');
                }
                setRobots(users);
            } catch (loadError) {
                if (loadError.name !== 'AbortError') {
                    setError('Could not load the robots. Check your connection and try again.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadRobots();
        return () => controller.abort();
    }, [loadAttempt]);

    const filteredRobots = robots.filter((robot) =>
        robot.name.toLowerCase().includes(searchfield.trim().toLowerCase())
    );

    return (
        <main className="tc">
            <h1 className="f1">Robofriends</h1>
            <SearchBox
                searchChange={(event) => setSearchfield(event.target.value)}
                value={searchfield}
            />

            {loading && <p className="f3" role="status">Loading robots…</p>}

            {!loading && error && (
                <div role="alert">
                    <p>{error}</p>
                    <button type="button" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && (
                <>
                    <p role="status">
                        {filteredRobots.length} {filteredRobots.length === 1 ? 'robot' : 'robots'} found
                    </p>
                    {filteredRobots.length > 0 ? (
                        <Scroll>
                            <ErrorBoundary>
                                <CardList robots={filteredRobots} />
                            </ErrorBoundary>
                        </Scroll>
                    ) : (
                        <p>No robots match “{searchfield}”. Try another name.</p>
                    )}
                </>
            )}
        </main>
    );
}

export default App;
