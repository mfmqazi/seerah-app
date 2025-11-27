import { useState } from 'react';
import { Search } from 'lucide-react';
import EpisodeCard from '../components/EpisodeCard';
import { yasirAlQadhiEpisodes } from '../data/episodes';
import './YasirQadhi.css';

export default function YasirQadhi() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEpisodes = yasirAlQadhiEpisodes.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="episodes-page">
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Dr. Yasir Qadhi's Seerah Series</h1>
                    <p className="page-description">
                        A comprehensive 104-episode series exploring the life of Prophet Muhammad ﷺ
                        with academic depth and Quranic insights.
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
                            speaker="yasir-qadhi"
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
