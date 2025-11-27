import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { useState } from 'react';
import './Summary.css';

export default function Summary() {
    const { speaker, summaryId } = useParams();
    const [isGenerating, setIsGenerating] = useState(false);
    const [summary, setSummary] = useState(null);

    const handleGenerateSummary = () => {
        setIsGenerating(true);
        // Simulate AI summary generation
        setTimeout(() => {
            setSummary({
                title: "Episode Summary",
                keyPoints: [
                    "Introduction to the historical context of the episode",
                    "Main events and narratives discussed in detail",
                    "Key lessons and takeaways from the Prophet's life",
                    "Connections to Quranic verses and hadith",
                    "Practical applications for modern Muslims"
                ],
                overview: "This episode provides an in-depth exploration of a significant period in the Prophet Muhammad's ﷺ life. The discussion covers historical events, their spiritual significance, and practical lessons that remain relevant today."
            });
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="summary-page">
            <div className="container">
                <Link to={`/${speaker}`} className="back-link">
                    <ArrowLeft size={20} />
                    Back to Episodes
                </Link>

                <div className="summary-header">
                    <h1 className="summary-title">Episode Summary</h1>
                    <p className="summary-id">ID: {summaryId}</p>
                </div>

                {!summary && !isGenerating && (
                    <div className="generate-section glass-panel">
                        <h2>Generate AI Summary</h2>
                        <p>Click the button below to generate a comprehensive one-page summary of this episode.</p>
                        <button
                            onClick={handleGenerateSummary}
                            className="btn btn-primary"
                        >
                            Generate Summary
                        </button>
                    </div>
                )}

                {isGenerating && (
                    <div className="loading-section glass-panel">
                        <Loader className="spinner" size={48} />
                        <p>Generating summary...</p>
                    </div>
                )}

                {summary && (
                    <div className="summary-content glass-panel">
                        <h2>{summary.title}</h2>

                        <div className="summary-section">
                            <h3>Overview</h3>
                            <p>{summary.overview}</p>
                        </div>

                        <div className="summary-section">
                            <h3>Key Points</h3>
                            <ul className="key-points-list">
                                {summary.keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="summary-note">
                            <strong>Note:</strong> This is an AI-generated summary. For complete understanding,
                            please listen to the full episode.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
