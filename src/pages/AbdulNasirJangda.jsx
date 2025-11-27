import { useState } from 'react';
import { Search } from 'lucide-react';
import EpisodeCard from '../components/EpisodeCard';
import { abdulNasirJangdaEpisodes } from '../data/episodes';
import './AbdulNasirJangda.css';

export default function AbdulNasirJangda() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEpisodes = abdulNasirJangdaEpisodes.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="episodes-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Shaykh Abdul Nasir Jangda's Seerah Series</h1>
                    <p className="page-description">
                        An extensive 200-episode journey through the Prophet's life ﷺ with
                        engaging storytelling and practical lessons.
                    </p>
                </div>

                <div className="search-bar glass-panel">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search episodes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="episodes-grid">
                    {filteredEpisodes.map((episode) => (
                        <EpisodeCard
                            key={episode.id}
                            episode={episode}
                            speaker="abdul-nasir-jangda"
                        />
                    ))}
                </div>

                {filteredEpisodes.length === 0 && (
                    <div className="no-results">
                        <p>No episodes found matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
