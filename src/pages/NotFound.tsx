import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="platform-editorial editorial-page min-h-[60vh] flex items-center justify-center">
            <section className="editorial-not-found text-center max-w-2xl mx-auto px-6">
                <div className="reveal revealed">
                    <p className="platform-kicker text-accent text-6xl font-bold mb-8">404</p>
                    <h1 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">This page is not part of the package.</h1>
                    <p className="text-xl text-primary/60 mb-12 leading-relaxed">The link may have moved, or the page may no longer exist in our record.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link className="px-8 py-4 bg-primary text-white rounded-lg font-bold hover:bg-accent transition-colors shadow-lg shadow-black/10" to="/">Back to platform</Link>
                        <Link className="px-8 py-4 border-2 border-primary/10 rounded-lg font-bold hover:border-accent transition-colors" to="/contact">Contact support</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
