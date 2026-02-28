import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section className="page-hero" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
            <div className="page-hero-inner" style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', fontWeight: 800, background: 'linear-gradient(135deg, var(--i5), var(--v5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '24px' }}>404</h1>
                <p className="page-hero-sub" style={{ marginBottom: '40px' }}>
                    The page you are looking for does not exist or has been moved.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link className="btn-glow" to="/">Back to Home</Link>
                    <Link className="btn-glass" to="/contact">Contact Us</Link>
                </div>
            </div>
        </section>
    );
}
