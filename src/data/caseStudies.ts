export type CaseStudy = {
    slug: string;
    industry: string;
    team: string;
    heading: string;
    problem: string;
    outcome: string;
    stats: { value: string; label: string }[];
    body: string[];
};

export const allStudies: CaseStudy[] = [
    {
        slug: 'construction-forty-packages',
        industry: 'Construction',
        team: 'Main contractor, 40-person procurement team',
        heading: 'Forty packages across three sites, now in one place.',
        problem: 'Packages were tracked across email threads and separate spreadsheets per project. By the time a delay surfaced, the window to act had already passed. The award trail existed in some inboxes and nowhere else.',
        outcome: 'Every package moved into one system. Award records now exist for every tender, not just the ones where someone saved the right email. The team can see where a package stands without asking.',
        stats: [
            { value: '40+', label: 'packages' },
            { value: '3', label: 'sites' },
            { value: '100%', label: 'documented' },
        ],
        body: [
            "A regional main contractor running three commercial building sites had fragmented tendering. Subcontractor packages (steel, concrete, MEP, glazing) were managed by individual project managers using their own spreadsheets, email chains, and WhatsApp messages.",
            "Bid comparisons were inconsistent, contract sign-offs ran late, and the corporate commercial team had no view of total spend until invoices arrived. If a trade subcontractor delayed a bid, it threatened the construction program.",
            "The contractor put all forty trade packages into Metics. Project managers built RFQs from importable BOQ templates. Suppliers responded in a standard format. Sign-offs ran through a multi-step digital approval workflow. Award cycle times shortened by 32%, they had an audit trail for client reviews, and they had 100% visibility into concurrent packages."
        ]
    },
    {
        slug: 'manufacturing-supplier-concentration',
        industry: 'Manufacturing',
        team: 'Indirect procurement, component sourcing',
        heading: 'Supplier concentration risk was invisible until a delivery failed.',
        problem: 'A sole-source supplier missed a critical delivery. The team had no way to see how exposed they were in that category until the damage was done.',
        outcome: 'Concentration flags now surface before the award is made. The team can see where a category is at risk before the PO goes out.',
        stats: [
            { value: '45%', label: 'lower concentration risk' },
            { value: '2.5x', label: 'sourcing speed' },
        ],
        body: [
            "An industrial component manufacturer relied on a complex supplier network for specialized raw materials. Over time, the sourcing team shifted volume to a single preferred supplier to secure volume discounts.",
            "That concentration was not tracked systematically. When the supplier suffered a major furnace failure, raw material deliveries stopped and the production line halted for ten days. Delivery delays to clients cost the manufacturer over EUR 250,000 in penalties and damaged relationships.",
            "The manufacturer used Metics to put resilience into raw material sourcing. Live analytics calculated supplier concentration across active category packages. On a new raw material tender, the platform showed that awarding the entire volume to the preferred supplier would exceed safe concentration levels. The team split the contract 60/40 between two qualified suppliers, reducing single-source exposure by 45% while keeping production safety."
        ]
    },
    {
        slug: 'energy-approval-packages',
        industry: 'Energy',
        team: 'Project procurement lead',
        heading: 'Approval packages sat in inboxes with no shared view.',
        problem: 'Multi-step approvals had no shared visibility. Finance and commercial teams worked from different document versions and tracked status through email.',
        outcome: 'Approval status is live in the package record. Both teams see the same data. Delays surface before they become escalations.',
        stats: [
            { value: '14 days', label: 'saved per package' },
            { value: '100%', label: 'compliance visibility' },
        ],
        body: [
            "A utility provider executing substation upgrades faced bottlenecked procurement approvals. Technical reviews, health and safety checks, commercial scores, and executive sign-offs were routed via email.",
            "Approval packages frequently sat in managers' inboxes for weeks, with no shared record of who was holding up the sign-off. When project deadlines neared, packages had to be escalated manually, which delayed equipment orders.",
            "The provider mapped their multi-step approval workflow into Metics. When bids close, the package is routed sequentially to technical, safety, and commercial teams for digital reviews. Current status and days elapsed are visible on a live dashboard. Approval bottlenecks show up immediately, order cycles have shortened by 14 days, and compliance approvals stay archived with the final purchase order."
        ]
    },
    {
        slug: 'government-award-records',
        industry: 'Government',
        team: 'Public sector procurement office',
        heading: 'Award records had to exist before the audit request arrived.',
        problem: 'When a procurement review was requested, the team reconstructed records from emails and shared folders. The process took weeks.',
        outcome: 'Every award now has a complete record: RFQ, bids, shortlist notes, approval, and PO. The next review took days.',
        stats: [
            { value: '3 mins', label: 'audit package retrieval' },
            { value: '100%', label: 'compliance score' },
        ],
        body: [
            "A municipal public sector procurement office was subject to strict compliance audits. For every public tender, they had to prove that evaluation was fair, transparent, and in line with municipal guidelines.",
            "Reconstructing that trail was a large manual effort. When auditors asked about a past award, staff spent weeks searching email archives, shared network drives, and paper files for the original RFQ specifications, all supplier bids, scorecard evaluations, and sign-offs.",
            "The municipality used Metics so every action in the procurement lifecycle is logged in a timestamped audit log. Bids are compared, scored, and approved on the platform. For audit reviews, staff enter the package number and export a complete compliance pack. Retrieval times dropped from three weeks to three minutes, and the office achieved a 100% audit compliance score."
        ]
    },
];

export function getCaseStudy(slug: string | undefined) {
    if (!slug) return undefined;
    return allStudies.find((study) => study.slug === slug);
}
