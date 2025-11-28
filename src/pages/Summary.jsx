import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { yasirAlQadhiEpisodes, abdulNasirJangdaEpisodes } from '../data/episodes';
import './Summary.css';

export default function Summary() {
    const { speaker, summaryId } = useParams();
    const [isGenerating, setIsGenerating] = useState(false);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        // Find the episode based on summaryId
        let foundEpisode = null;
        if (speaker === 'yasir-qadhi') {
            foundEpisode = yasirAlQadhiEpisodes.find(ep => ep.summaryId === summaryId);
        } else if (speaker === 'abdul-nasir-jangda') {
            foundEpisode = abdulNasirJangdaEpisodes.find(ep => ep.summaryId === summaryId);
        }
        setEpisode(foundEpisode);
    }, [speaker, summaryId]);

    const handleGenerateSummary = async () => {
        if (!episode) return;

        setIsGenerating(true);
        setError(null);

        try {
            // Call our own secure backend
            const response = await fetch('/api/generate-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: episode.title })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate summary');
            }

            const data = await response.json();

            if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
                throw new Error('Invalid response structure from server');
            }

            const generatedText = data.candidates[0].content.parts[0].text;

            try {
                const parsedSummary = JSON.parse(generatedText.replace(/```json|```/g, ''));
                setSummary(parsedSummary);
            } catch (e) {
                setSummary({
                    title: episode.title,
                    overview: generatedText.slice(0, 200) + "...",
                    keyPoints: ["Detailed summary content is available in the full text."]
                });
            }

        } catch (err) {
            console.error(err);
            setError(err.message || "Unable to generate summary. Please try again later.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!episode) {
        return (
            <div className="summary-page">
                <div className="container">
                    <div className="error-message">
                        <AlertCircle size={48} />
                        <h2>Episode Not Found</h2>
                        <Link to="/" className="btn btn-primary">Return Home</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="summary-page">
            <div className="container">
                <Link to={`/${speaker}`} className="back-link">
                    <ArrowLeft size={20} />
                    Back to Episodes
                </Link>

                <div className="summary-header">
                    <h1 className="summary-title">{episode.title}</h1>
                    <p className="summary-id">Episode ID: {episode.id}</p>
                </div>

                {!summary && !isGenerating && (
                    <div className="generate-section glass-panel">
                        <h2>Generate AI Summary</h2>
                        <p>Click the button below to generate a comprehensive summary of this episode.</p>
                        <button
                            onClick={handleGenerateSummary}
                            className="btn btn-primary"
                        >
                            Generate Summary
                        </button>
                        {!import.meta.env.VITE_GEMINI_API_KEY && (
                            <p className="note-text text-sm mt-4 opacity-70">
                                Note: Running in simulation mode (No API Key detected).
                            </p>
                        )}
                    </div>
                )}

                {isGenerating && (
                    <div className="loading-section glass-panel">
                        <Loader className="spinner" size={48} />
                        <p>Generating summary for "{episode.title}"...</p>
                    </div>
                )}

                {error && (
                    <div className="error-section glass-panel">
                        <AlertCircle className="text-red-500 mb-2" />
                        <p>{error}</p>
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
