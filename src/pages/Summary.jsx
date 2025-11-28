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
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (apiKey) {
                // Real API Call Implementation
                // This block will only execute if the user provides an API key in .env
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Generate a detailed summary for the Seerah episode titled "${episode.title}". 
                                Include an overview, 5 key points, and practical lessons. 
                                Format the response as JSON with keys: title, overview, keyPoints (array).`
                            }]
                        }]
                    })
                });

                if (!response.ok) throw new Error('Failed to generate summary from AI service.');

                const data = await response.json();
                const generatedText = data.candidates[0].content.parts[0].text;

                // Basic parsing of the JSON response from AI (assuming it returns valid JSON string)
                // In a production app, we'd need more robust parsing/cleaning
                try {
                    const parsedSummary = JSON.parse(generatedText.replace(/```json|```/g, ''));
                    setSummary(parsedSummary);
                } catch (e) {
                    // Fallback if JSON parsing fails
                    setSummary({
                        title: episode.title,
                        overview: generatedText.slice(0, 200) + "...",
                        keyPoints: ["Detailed summary content is available in the full text."]
                    });
                }

            } else {
                // Enhanced Simulation (Fallback)
                await new Promise(resolve => setTimeout(resolve, 2000));

                setSummary({
                    title: episode.title,
                    overview: `In this episode, "${episode.title}", the speaker delves into significant events in the life of Prophet Muhammad ﷺ. The discussion provides historical context and spiritual insights relevant to the chapter of the Seerah being covered.`,
                    keyPoints: [
                        `Detailed analysis of the events surrounding ${episode.title}.`,
                        "Examination of the socio-political climate of the time.",
                        "Lessons on character, leadership, and faith derived from the narrative.",
                        "Reflections on how these historical events apply to contemporary challenges.",
                        "Closing supplications and reminders for the community."
                    ]
                });
            }
        } catch (err) {
            console.error(err);
            setError("Unable to generate summary at this time. Please try again later.");
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
