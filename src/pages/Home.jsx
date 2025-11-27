import { Link } from 'react-router-dom';
import { BookOpen, Mic, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Home.css';

export default function Home() {
    return (
        <div className="home">
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="hero-title">
                            Journey Through the Life of
                            <span className="text-accent"> Prophet Muhammad ﷺ</span>
                        </h1>
                        <p className="hero-subtitle">
                            Explore comprehensive Seerah lectures from renowned scholars.
                            Learn, reflect, and grow through the blessed biography of the final messenger.
                        </p>

                        <div className="hero-actions">
                            <Link to="/yasir-qadhi" className="btn btn-primary">
                                <BookOpen size={20} />
                                Start Learning
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="scholars-section">
                <div className="container">
                    <h2 className="section-title">Featured Scholars</h2>

                    <div className="scholars-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link to="/yasir-qadhi" className="scholar-card glass-panel">
                                <div className="scholar-icon">
                                    <Mic size={40} />
                                </div>
                                <h3>Dr. Yasir Qadhi</h3>
                                <p className="scholar-description">
                                    104 comprehensive episodes covering the complete life of the Prophet ﷺ
                                    with deep academic insights and Quranic references.
                                </p>
                                <div className="scholar-stats">
                                    <div className="stat">
                                        <span className="stat-number">104</span>
                                        <span className="stat-label">Episodes</span>
                                    </div>
                                </div>
                                <div className="card-arrow">
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link to="/abdul-nasir-jangda" className="scholar-card glass-panel">
                                <div className="scholar-icon">
                                    <Mic size={40} />
                                </div>
                                <h3>Shaykh Abdul Nasir Jangda</h3>
                                <p className="scholar-description">
                                    200 detailed episodes exploring the Seerah with engaging storytelling
                                    and practical lessons for modern life.
                                </p>
                                <div className="scholar-stats">
                                    <div className="stat">
                                        <span className="stat-number">200</span>
                                        <span className="stat-label">Episodes</span>
                                    </div>
                                </div>
                                <div className="card-arrow">
                                    <ArrowRight size={24} />
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">📚</div>
                            <h3>Comprehensive Coverage</h3>
                            <p>Complete biographical accounts from birth to passing</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🎯</div>
                            <h3>Episode Summaries</h3>
                            <p>Quick one-page summaries for each episode</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🔗</div>
                            <h3>Direct Links</h3>
                            <p>Easy access to original podcast episodes</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
