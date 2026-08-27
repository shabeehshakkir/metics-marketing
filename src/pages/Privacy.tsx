import LegalPage, { LegalSection } from '../components/LegalPage';
import { usePageMeta } from '../hooks/usePageMeta';

const sections: LegalSection[] = [
    {
        id: 'who-we-are',
        heading: 'Who we are',
        body: (
            <>
                <p>
                    Metics provides a procurement decision-intelligence platform for the construction industry. The
                    platform keeps RFQs, supplier bids, approvals, and purchase orders in one shared record for buyers
                    and suppliers.
                </p>
                <p>
                    For the purposes of the EU General Data Protection Regulation (GDPR), Metics acts as a{' '}
                    <strong>controller</strong> for the personal data described in this policy that relates to our
                    website visitors and account holders, and as a <strong>processor</strong> for personal data our
                    customers upload into the platform in the course of running their procurement.
                </p>
            </>
        ),
    },
    {
        id: 'data-we-collect',
        heading: 'Data we collect',
        body: (
            <>
                <p>We collect and process the following categories of personal data:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>
                        <strong>Account data</strong>: name, work email address, company, role, and authentication
                        credentials when you create a Metics account.
                    </li>
                    <li>
                        <strong>Contact data</strong>: the details you submit through our contact and demo request
                        forms, including your name, email, company, and message.
                    </li>
                    <li>
                        <strong>Platform content</strong>: RFQs, bids, clarifications, documents, and purchase order
                        records created by you or your organisation while using the platform. This content may contain
                        personal data of your colleagues or business contacts.
                    </li>
                    <li>
                        <strong>Usage data</strong>: log records such as IP address, browser type, pages visited, and
                        actions taken in the platform, used for security and service improvement.
                    </li>
                </ul>
                <p>We do not collect special categories of personal data, and the platform is not directed at children.</p>
            </>
        ),
    },
    {
        id: 'how-we-use-data',
        heading: 'How we use your data',
        body: (
            <>
                <p>We process personal data only where we have a lawful basis to do so:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>
                        <strong>Performance of a contract</strong>: to provide the platform, operate your account, and
                        deliver the procurement workflows your organisation has subscribed to.
                    </li>
                    <li>
                        <strong>Legitimate interests</strong>: to secure the service, prevent abuse, maintain audit
                        records, and improve the product based on how it is used.
                    </li>
                    <li>
                        <strong>Consent</strong>: where you have asked us to contact you, for example after submitting
                        a demo request. You can withdraw consent at any time.
                    </li>
                    <li>
                        <strong>Legal obligation</strong>: where retention or disclosure is required by applicable law.
                    </li>
                </ul>
                <p>We do not sell personal data, and we do not use platform content for advertising.</p>
            </>
        ),
    },
    {
        id: 'data-residency',
        heading: 'Data residency and international transfers',
        body: (
            <>
                <p>
                    Metics customer data is hosted in the <strong>European Union</strong>. Platform content (your RFQs,
                    bids, approvals, and purchase orders) is stored and processed within the EU.
                </p>
                <p>
                    Where a limited transfer outside the EU is unavoidable (for example, an email notification delivered
                    to a recipient abroad), we rely on appropriate safeguards such as the European Commission&rsquo;s
                    Standard Contractual Clauses.
                </p>
            </>
        ),
    },
    {
        id: 'sharing',
        heading: 'Sharing and sub-processors',
        body: (
            <>
                <p>We share personal data only with:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>
                        <strong>Your organisation and counterparties</strong>: the platform is collaborative by design:
                        buyers see supplier responses to their RFQs, and suppliers see the RFQs they are invited to or
                        matched with. Suppliers never see other suppliers&rsquo; bids during tendering.
                    </li>
                    <li>
                        <strong>Service providers</strong>: hosting, email delivery, and support tooling providers that
                        process data on our documented instructions under data processing agreements.
                    </li>
                    <li>
                        <strong>Authorities</strong>: where disclosure is required by law.
                    </li>
                </ul>
                <p>A current list of sub-processors is available on request.</p>
            </>
        ),
    },
    {
        id: 'retention',
        heading: 'Retention',
        body: (
            <>
                <p>
                    We keep personal data only as long as needed for the purposes described above. Account data is
                    retained for the life of the account and deleted or anonymised after closure, subject to any legal
                    retention obligations. Platform content is retained according to your organisation&rsquo;s plan
                    terms: procurement records often need to remain available for audit purposes, and your organisation
                    controls how long they are kept.
                </p>
                <p>Usage logs are kept for a limited period for security purposes and then deleted or aggregated.</p>
            </>
        ),
    },
    {
        id: 'security',
        heading: 'Security',
        body: (
            <>
                <p>
                    Data is encrypted in transit using TLS and encrypted at rest. Access to platform data follows
                    role-based access controls, access to production systems is restricted and logged, and every action
                    on a procurement record is captured in an audit trail.
                </p>
                <p>
                    You can read more about our approach on the{' '}
                    <a href="/security" className="font-semibold text-primary underline decoration-black/20 underline-offset-4 hover:text-accent">
                        security page
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        id: 'your-rights',
        heading: 'Your rights',
        body: (
            <>
                <p>Under the GDPR you have the right to:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Access the personal data we hold about you.</li>
                    <li>Have inaccurate data corrected.</li>
                    <li>Request deletion of your data, where no legal basis requires us to keep it.</li>
                    <li>Restrict or object to certain processing.</li>
                    <li>Receive your data in a portable format.</li>
                    <li>Lodge a complaint with your local supervisory authority.</li>
                </ul>
                <p>
                    To exercise any of these rights, contact us through the contact page. If your data was uploaded to
                    the platform by one of our customers, we may refer your request to them as the controller of that
                    data.
                </p>
            </>
        ),
    },
    {
        id: 'cookies',
        heading: 'Cookies',
        body: (
            <p>
                The Metics website uses only the cookies necessary to operate the site and, for logged-in users, to
                maintain a secure session. We do not use third-party advertising or cross-site tracking cookies.
            </p>
        ),
    },
    {
        id: 'changes',
        heading: 'Changes to this policy',
        body: (
            <p>
                We may update this policy as the product and applicable law evolve. Material changes will be announced
                to account holders, and the &ldquo;Last updated&rdquo; date at the top of this page always reflects the
                current version.
            </p>
        ),
    },
];

export default function Privacy() {
    usePageMeta(
        'Privacy Policy',
        'How Metics collects, uses, and protects personal data: GDPR lawful bases, EU data residency, retention, sub-processors, and your rights.'
    );

    return (
        <LegalPage
            eyebrow="Legal"
            title="Privacy Policy"
            intro="This policy explains what personal data Metics collects, why we collect it, where it lives, and the rights you have over it. We have kept it as plain as a legal document allows."
            lastUpdated="1 July 2026"
            sections={sections}
        />
    );
}
