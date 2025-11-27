import { ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './EpisodeCard.css';

export default function EpisodeCard({ episode, speaker }) {
    return (
        <motion.div
            className="episode-card glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)' }}
            transition={{ duration: 0.3 }}
        >
            <div className="episode-number">
                <span>Episode {episode.id}</span>
            </div>

            <h3 className="episode-title">{episode.title}</h3>

            <div className="episode-actions">
                <a
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                >
                    <ExternalLink size={18} />
                    Listen Now
                </a>

                <Link
                    to={`/summary/${speaker}/${episode.summaryId}`}
                    className="btn btn-outline"
                >
                    <FileText size={18} />
                    Summary
                </Link>
            </div>
        </motion.div>
    );
}
