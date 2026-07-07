import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="platform-editorial editorial-page">
            <section className="editorial-not-found">
                <div>
                    <p className="platform-kicker">404</p>
                    <h1>This page is not part of the package.</h1>
                    <p>The link may have moved, or the page may no longer exist.</p>
                    <div className="platform-hero-actions">
                        <Link className="platform-primary-link" to="/">Back to platform</Link>
                        <Link className="platform-secondary-link" to="/contact">Contact us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
