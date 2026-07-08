import LegalPage, { LegalSection } from '../components/LegalPage';
import { usePageMeta } from '../hooks/usePageMeta';

const sections: LegalSection[] = [
    {
        id: 'agreement',
        heading: 'The agreement',
        body: (
            <>
                <p>
                    These Terms of Service govern access to and use of the Metics platform — the procurement
                    decision-intelligence service that keeps RFQs, supplier bids, approvals, and purchase orders in one
                    shared record. By creating an account or using the platform, you agree to these terms on behalf of
                    yourself and, where applicable, the organisation you represent.
                </p>
                <p>
                    If your organisation has signed a separate written agreement with Metics (for example, an Enterprise
                    agreement), that agreement prevails where it conflicts with these terms.
                </p>
            </>
        ),
    },
    {
        id: 'accounts',
        heading: 'Accounts and access',
        body: (
            <>
                <p>
                    You must provide accurate registration information and keep your credentials confidential. You are
                    responsible for activity under your account. Organisations are responsible for managing which of
                    their members have access and with which roles.
                </p>
                <p>
                    Supplier accounts are free of charge: suppliers can register, receive RFQs, submit bids, and respond
                    to clarifications without paying a fee.
                </p>
            </>
        ),
    },
    {
        id: 'plans-and-billing',
        heading: 'Plans, billing, and trials',
        body: (
            <>
                <p>
                    Buyer plans and their features are described on the pricing page. Paid plans are billed per user,
                    monthly or annually as agreed. Fees are exclusive of applicable taxes.
                </p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Trials convert to a paid plan only if you choose to continue; otherwise you can move to the free Starter plan or pause.</li>
                    <li>Plan changes take effect at the next billing cycle unless agreed otherwise.</li>
                    <li>Existing records remain available according to your plan terms after a downgrade or pause.</li>
                </ul>
            </>
        ),
    },
    {
        id: 'acceptable-use',
        heading: 'Acceptable use',
        body: (
            <>
                <p>You agree not to:</p>
                <ul className="list-disc space-y-2 pl-5">
                    <li>Use the platform for any unlawful purpose, or to run tenders you are not authorised to run.</li>
                    <li>Misrepresent your identity, organisation, or authority in any RFQ, bid, or communication.</li>
                    <li>Attempt to access data belonging to other organisations, including other suppliers&rsquo; bids.</li>
                    <li>Probe, scan, or test the vulnerability of the service, or interfere with its operation.</li>
                    <li>Resell or provide access to the platform to third parties outside your organisation without our agreement.</li>
                </ul>
                <p>We may suspend accounts that put the integrity of the platform or its tendering processes at risk.</p>
            </>
        ),
    },
    {
        id: 'customer-content',
        heading: 'Your content and data',
        body: (
            <>
                <p>
                    You retain all rights to the content your organisation puts into the platform — RFQs, bids,
                    documents, and records. You grant Metics the limited licence needed to host, process, and display
                    that content in order to provide the service.
                </p>
                <p>
                    We process personal data in accordance with our{' '}
                    <a href="/privacy" className="font-semibold text-primary underline decoration-black/20 underline-offset-4 hover:text-accent">
                        Privacy Policy
                    </a>{' '}
                    and, for organisations, a data processing agreement. Customer data is hosted in the EU. You can
                    export your records; audit trail exports are available on paid plans.
                </p>
            </>
        ),
    },
    {
        id: 'tendering',
        heading: 'Tendering between buyers and suppliers',
        body: (
            <>
                <p>
                    Metics provides the record and the workflow; the commercial relationship formed through a tender is
                    between the buyer and the supplier. Metics is not a party to any RFQ, bid, award, or purchase order
                    created on the platform, and does not guarantee that any tender will receive bids or result in an
                    award.
                </p>
                <p>
                    Buyers are responsible for the accuracy of their RFQs and the fairness of their award decisions.
                    Suppliers are responsible for the accuracy of their bids. The platform&rsquo;s audit trail records
                    what both sides did, but does not substitute for either side&rsquo;s legal obligations.
                </p>
            </>
        ),
    },
    {
        id: 'availability',
        heading: 'Availability and support',
        body: (
            <p>
                We work to keep the platform available and performant, and schedule maintenance to minimise disruption.
                The service is provided &ldquo;as is&rdquo; unless a written agreement with your organisation specifies
                service levels. Support channels and response expectations depend on your plan.
            </p>
        ),
    },
    {
        id: 'ip',
        heading: 'Intellectual property',
        body: (
            <p>
                The platform, including its software, design, and documentation, is owned by Metics and its licensors.
                These terms do not grant you any rights in the platform other than the right to use it in accordance
                with your plan. Feedback you give us about the product may be used to improve it without obligation.
            </p>
        ),
    },
    {
        id: 'liability',
        heading: 'Liability',
        body: (
            <>
                <p>
                    To the maximum extent permitted by law, Metics is not liable for indirect or consequential losses,
                    loss of profits, or loss of business arising from use of the platform, and our total liability under
                    these terms is limited to the fees paid by your organisation in the twelve months preceding the
                    claim.
                </p>
                <p>Nothing in these terms limits liability that cannot be limited under applicable law.</p>
            </>
        ),
    },
    {
        id: 'termination',
        heading: 'Termination',
        body: (
            <>
                <p>
                    You may stop using the platform and close your account at any time. We may terminate or suspend
                    access for material breach of these terms that remains uncured after notice.
                </p>
                <p>
                    On termination, your organisation can export its records within a reasonable wind-down period, after
                    which data is deleted or anonymised in line with our retention terms and any legal obligations.
                </p>
            </>
        ),
    },
    {
        id: 'changes',
        heading: 'Changes to these terms',
        body: (
            <p>
                We may update these terms as the service evolves. Material changes will be notified to account holders
                in advance. Continued use of the platform after a change takes effect constitutes acceptance of the
                updated terms. The &ldquo;Last updated&rdquo; date above always reflects the current version.
            </p>
        ),
    },
    {
        id: 'law',
        heading: 'Governing law',
        body: (
            <p>
                These terms are governed by the laws applicable at Metics&rsquo;s place of establishment in the
                European Union, without regard to conflict-of-law rules. Disputes that cannot be resolved amicably are
                subject to the competent courts of that jurisdiction.
            </p>
        ),
    },
];

export default function Terms() {
    usePageMeta(
        'Terms of Service',
        'The terms that govern use of the Metics platform: accounts, plans and billing, acceptable use, customer data, tendering, liability, and termination.'
    );

    return (
        <LegalPage
            eyebrow="Legal"
            title="Terms of Service"
            intro="The agreement between you, your organisation, and Metics when you use the platform. Written to be read, not just scrolled past."
            lastUpdated="1 July 2026"
            sections={sections}
        />
    );
}
