export type Locale = 'en' | 'nl';

type NavItem = {
  label: string;
  anchor: string;
};

type ValueCard = {
  icon: string;
  heading: string;
  body: string;
};

type FeatureColumn = {
  heading: string;
  bullets: string[];
};

type UseCase = {
  title: string;
  problem: string;
  solution: string;
  outcome: string;
};

type CredibilityStat = {
  metric: string;
  body: string;
};

type WorkflowStep = {
  title: string;
  body: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type FooterSection = {
  heading: string;
  links: {
    label: string;
    href: string;
  }[];
};

type LocaleContent = {
  seo: {
    title: string;
    description: string;
    ogDescription?: string;
  };
  nav: NavItem[];
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    ctas: {
      primary: string;
      secondary: string;
    };
    pills: string[];
    screenCards: { title: string; body: string }[];
    meta: string[];
    floatingCard: {
      label: string;
      heading: string;
      body: string;
    };
  };
  value: {
    eyebrow: string;
    heading: string;
    lede: string;
    cards: ValueCard[];
  };
  features: {
    eyebrow: string;
    heading: string;
    columns: FeatureColumn[];
  };
  useCases: {
    eyebrow: string;
    heading: string;
    items: UseCase[];
  };
  credibility: {
    eyebrow: string;
    heading: string;
    stats: CredibilityStat[];
    badges: string[];
  };
  workflow: {
    eyebrow: string;
    heading: string;
    steps: WorkflowStep[];
  };
  faqs: {
    eyebrow: string;
    heading: string;
    items: FaqItem[];
  };
  cta: {
    heading: string;
    body: string;
    fieldLabel: string;
    placeholder: string;
    submit: string;
    thanks: string;
    footnote: {
      intro: string;
      primary: {
        label: string;
        href: string;
      };
      separator: string;
      secondary: {
        label: string;
        href: string;
      };
    };
  };
  footer: {
    tagline: string;
    sections: FooterSection[];
    note: string;
  };
};

export const content: Record<Locale, LocaleContent> = {
  en: {
    seo: {
      title: 'Metics — Procurement Made Smarter for Construction',
      description:
        'Metics streamlines RFQs, bid comparisons, and purchase orders for construction buyers and suppliers. Faster awards, transparent decisions, and collaboration in one platform.',
      ogDescription:
        'Create RFQs, compare bids, and auto-generate POs. Built for contractors, QS firms, and suppliers.'
    },
    nav: [
      { label: 'Platform', anchor: '#features' },
      { label: 'Value', anchor: '#value' },
      { label: 'Use Cases', anchor: '#use-cases' },
      { label: 'FAQs', anchor: '#faqs' },
      { label: 'Contact', anchor: '#contact' }
    ],
    hero: {
      eyebrow: 'Procurement Made Smarter. Built for Construction.',
      heading:
        'Metics connects buyers and suppliers with a transparent, data-driven platform — simplifying RFQs, bids, and purchase orders from start to finish.',
    subheading: 'Speed decisions, stay audit-ready, and deliver every package with confidence.',
    ctas: {
      primary: 'Request a Demo',
      secondary: 'Get Started'
    },
    pills: ['Live RFQs', 'PO Auto-generated'],
    screenCards: [
      { title: 'Steel Package RFQ', body: '3 bids received · Partial awards enabled' },
      { title: 'MEP Tender', body: 'Supplier chat active · Documents synced' },
      { title: 'Finishes Procurement', body: 'PO ready · Export PDF' }
    ],
    meta: ['CSV/API Imports', 'Audit Trails', 'Real-time Collaboration'],
    floatingCard: {
      label: 'Buyer View',
      heading: 'Compare bids side-by-side.',
      body: 'Every metric, fee, and delivery promise in one view.'
      }
    },
    value: {
      eyebrow: 'Value Propositions',
      heading: 'Everything you need to run procurement at construction pace.',
      lede:
        'Metics blends structured workflows with real-time collaboration so every project can move from RFQ to PO without friction.',
      cards: [
        {
          icon: '⚡',
          heading: 'Speed Up Procurement',
          body: 'Generate RFQs, compare bids, and award contracts in minutes — not weeks.'
        },
        {
          icon: '📊',
          heading: 'Transparent Decisions',
          body: 'Every bid, comparison, and PO is tracked with clear analytics and audit trails.'
        },
        {
          icon: '🤝',
          heading: 'Seamless Collaboration',
          body: 'Real-time chat, supplier onboarding, and document sharing in one place.'
        },
        {
          icon: '🏗️',
          heading: 'Construction-Ready',
          body: 'Tailored to contractors, QS firms, and suppliers.'
        }
      ]
    },
    features: {
      eyebrow: 'Platform Overview',
      heading: 'Built for both sides of the table.',
      columns: [
        {
          heading: 'For Buyers',
          bullets: [
            'Create RFQs with headers, lines, attributes and flexible bidding modes.',
            'Invite authorized suppliers or open to all in category; receive multiple bids.',
            'Compare bids side-by-side, negotiate via chat, and award the best offer.',
            'Auto-generate Purchase Orders on award and export as PDF instantly.',
            'Edit RFQs pre-deadline, save drafts, or import via CSV/API.',
            'Manage suppliers, documents, contracts, and team roles in one place.'
          ]
        },
        {
          heading: 'For Suppliers',
          bullets: [
            'Register once, set company categories, and receive category-matched RFQs.',
            'Submit bids, including partial quantities, with reusable terms and remarks.',
            'Track bid status and buyer responses; accept or reject Purchase Orders.',
            'Maintain a client list, publish product catalogues, and manage inquiries.',
            'Store compliance documents and organisation templates with version control.'
          ]
        },
        {
          heading: 'Collaboration & Control',
          bullets: [
            'Real-time chat for each RFQ with notifications and activity updates.',
            'Role-based access, auditability, and document version control.',
            'Support for Incoterms and international trade contexts.',
            'Every decision captured with analytics, scorecards, and exportable summaries.'
          ]
        }
      ]
    },
    useCases: {
      eyebrow: 'Use Cases',
      heading: 'Designed for the full construction supply chain.',
      items: [
        {
          title: 'General Contractor',
          problem: 'Problem: Fragmented tendering across trades creates delays and cost drift.',
          solution:
            'Solution: Issue RFQs per package, collect comparable bids, split awards, auto PO.',
          outcome:
            'Outcome: Faster award cycles, documented decisions, predictable delivery.'
        },
        {
          title: 'Quantity Surveyor / Consultant',
          problem: 'Problem: Manual bid normalization and reporting wastes time.',
          solution:
            'Solution: Tender comparisons, partial bidding support, automated summaries.',
          outcome:
            'Outcome: Less spreadsheet work, clearer advice to clients, repeatable governance.'
        },
        {
          title: 'Developer / Project Owner',
          problem: 'Problem: Limited visibility into supplier capacity and cost risk.',
          solution:
            'Solution: Transparent comparisons, partial awards, live bid and PO updates.',
          outcome:
            'Outcome: Lower risk, better budget adherence, traceable procurement.'
        },
        {
          title: 'SME Supplier',
          problem: 'Problem: Hard to discover opportunities and prove reliability.',
          solution:
            'Solution: Category-matched RFQs, reusable T&C templates, public catalogues.',
          outcome:
            'Outcome: More invitations, higher win rate, cleaner POs and communication.'
        },
        {
          title: 'Enterprise Procurement',
          problem: 'Problem: High RFQ volume and compliance demands.',
          solution:
            'Solution: CSV/API import, controlled supplier lists, audit trails, PO PDFs.',
          outcome:
            'Outcome: Scalable operations, governance by design, ERP-ready workflows.'
        }
      ]
    },
    credibility: {
      eyebrow: 'Proof Points',
      heading: 'Trusted tooling for every stage of the build.',
      stats: [
        {
          metric: '80%',
          body: 'Reduction in time to shortlist suppliers after first month on Metics.'
        },
        {
          metric: '24/7',
          body: 'Live access to RFQs, supplier chats, and PO documents across teams.'
        },
        {
          metric: '100%',
          body: 'Audit-ready tender history with exportable summaries for governance.'
        }
      ],
      badges: ['ISO-ready workflows', 'GDPR compliant', 'SSO & SAML support', 'EU data residency']
    },
    workflow: {
      eyebrow: 'Flow',
      heading: 'From enquiry to PO, every step stays connected.',
      steps: [
        {
          title: '1. Launch RFQ',
          body: 'Import via CSV/API or build from templates. Define attributes, attachments, and bidding rules.'
        },
        {
          title: '2. Collaborate & Compare',
          body: 'Invite suppliers, chat in context, compare responses with price and qualitative scoring.'
        },
        {
          title: '3. Award & Automate',
          body: 'Make partial or full awards, auto-generate POs, and sync documentation for handover.'
        }
      ]
    },
    faqs: {
      eyebrow: 'FAQs',
      heading: 'Answers for buyers and suppliers.',
      items: [
        {
          question: 'Can suppliers bid partially?',
          answer:
            'Yes. Buyers can enable partial bidding; suppliers then quote partial quantities. Buyers can also make partial awards across suppliers.'
        },
        {
          question: 'Can I restrict an RFQ to selected suppliers?',
          answer: 'Yes. Choose Closed (selected/authorized suppliers) or Open (all in category).'
        },
        {
          question: 'Do POs generate automatically?',
          answer:
            'Yes. Awarding a bid auto-generates a purchase order with agreed terms; buyers can export a PDF.'
        },
        {
          question: 'Can I edit an RFQ after publishing?',
          answer:
            'Before the deadline: yes, with notifications to participants. Critical fields may lock after bids arrive to keep fairness.'
        },
        {
          question: 'Can I integrate with my ERP?',
          answer: 'Yes, import RFQs via CSV or API; mapping templates supported.'
        },
        {
          question: 'How do suppliers get RFQs?',
          answer: 'By category matching after they set company and product categories.'
        },
        {
          question: 'Is there in-platform communication?',
          answer: 'Yes, real-time chat on each RFQ, plus notifications and an updates feed.'
        }
      ]
    },
    cta: {
      heading: 'Ready to modernise procurement?',
      body: 'Request a demo and see how Metics brings every RFQ, bid, and PO into one connected workspace.',
      fieldLabel: 'Work email',
      placeholder: 'Work email',
      submit: 'Request a Demo',
      thanks: 'Thanks, the Metics team will reach out shortly.',
      footnote: {
        intro: 'Prefer to start now?',
        primary: {
          label: 'Get Started',
          href: '#contact'
        },
        separator: 'or',
        secondary: {
          label: 'join the beta',
          href: '#'
        }
      }
    },
    footer: {
      tagline: 'Construction procurement made transparent for buyers and suppliers.',
      sections: [
        {
          heading: 'Platform',
          links: [
            { label: 'Features', href: '#features' },
            { label: 'Use Cases', href: '#use-cases' },
            { label: 'FAQs', href: '#faqs' }
          ]
        },
        {
          heading: 'Company',
          links: [
            { label: 'Request a Demo', href: '#contact' },
            { label: 'Get Started', href: '#contact' },
            { label: 'Privacy', href: '#' }
          ]
        }
      ],
      note: '© {year} Metics. All rights reserved.'
    }
  },
  nl: {
    seo: {
      title: 'Metics — Slimmere inkoop voor de bouw',
      description:
        'Metics vereenvoudigt aanbestedingen, biedingsvergelijkingen en inkooporders voor bouwinkopers en leveranciers. Snellere gunning, transparante beslissingen en samenwerking in één platform.',
      ogDescription:
        'Maak aanbestedingen, vergelijk offertes en genereer automatisch inkooporders. Ontwikkeld voor aannemers, kostendeskundigen en leveranciers.'
    },
    nav: [
      { label: 'Platform', anchor: '#features' },
      { label: 'Waarde', anchor: '#value' },
      { label: 'Toepassingen', anchor: '#use-cases' },
      { label: 'Veelgestelde vragen', anchor: '#faqs' },
      { label: 'Contact', anchor: '#contact' }
    ],
    hero: {
      eyebrow: 'Inkoop slimmer geregeld. Ontworpen voor de bouw.',
      heading:
        'Metics verbindt inkopers en leveranciers via een transparant, data-gedreven platform – van aanvraag tot bestelling.',
    subheading: 'Versnel beslissingen, blijf audit-proof en lever elk pakket met vertrouwen op.',
    ctas: {
      primary: 'Vraag een demo aan',
      secondary: 'Begin nu'
    },
    pills: ['Live-aanvragen', 'PO automatisch gegenereerd'],
    screenCards: [
      { title: 'Aanvraag staalpakket', body: '3 offertes ontvangen · Deelgunning toegestaan' },
      { title: 'Installatie-aanbesteding', body: 'Chat met leverancier actief · Documenten gesynchroniseerd' },
      { title: 'Afbouw inkoop', body: 'Inkooporder klaar · Exporteer PDF' }
    ],
    meta: ['CSV/API-import', 'Audittrail', 'Realtime samenwerking'],
    floatingCard: {
      label: 'Kopersoverzicht',
      heading: 'Vergelijk offertes naast elkaar.',
      body: 'Elke prijs, toeslag en leverbelofte in één overzicht.'
      }
    },
    value: {
      eyebrow: 'Waardeproposities',
      heading: 'Alles wat u nodig heeft om inkoop in bouwtempo uit te voeren.',
      lede:
        'Metics combineert gestructureerde workflows met realtime samenwerking zodat elk project zonder frictie van aanvraag naar inkooporder gaat.',
      cards: [
        {
          icon: '⚡',
          heading: 'Versnel het inkoopproces',
          body: 'Genereer aanvragen, vergelijk biedingen en gun contracten in minuten in plaats van weken.'
        },
        {
          icon: '📊',
          heading: 'Transparante beslissingen',
          body: 'Elke bieding, vergelijking en inkooporder wordt gevolgd met heldere analytics en audittrail.'
        },
        {
          icon: '🤝',
          heading: 'Naadloze samenwerking',
          body: 'Realtime chat, onboarding van leveranciers en documentdeling op één plek.'
        },
        {
          icon: '🏗️',
          heading: 'Klaar voor de bouwsector',
          body: 'Speciaal ontwikkeld voor aannemers, kostendeskundigen en leveranciers.'
        }
      ]
    },
    features: {
      eyebrow: 'Platformoverzicht',
      heading: 'Gemaakt voor beide kanten van de tafel.',
      columns: [
        {
          heading: 'Voor inkopers',
          bullets: [
            'Stel aanbestedingen op met kopregels, lijnen en kenmerken; kies open of gesloten biedingen en bepaal wanneer prijzen zichtbaar worden.',
            'Nodig geautoriseerde leveranciers uit of open per categorie; ontvang meerdere offertes.',
            'Vergelijk biedingen naast elkaar, onderhandel via chat en gun de beste aanbieding.',
            'Genereer automatisch inkooporders bij gunning en exporteer direct naar PDF.',
            'Bewerk aanvragen vóór de deadline, sla concepten op of importeer via CSV/API.',
            'Beheer leveranciers, documenten, contracten en teamrollen op één plek.'
          ]
        },
        {
          heading: 'Voor leveranciers',
          bullets: [
            'Registreer eenmaal, stel bedrijfsprofiel en categorieën in en ontvang passende aanvragen.',
            'Dien biedingen in, inclusief deelhoeveelheden, met herbruikbare voorwaarden en opmerkingen.',
            'Volg biedstatus en reacties van inkopers; accepteer of weiger inkooporders.',
            'Beheer klantenlijst, publiceer productcatalogus en behandel aanvragen.',
            'Bewaar compliance-documenten en organisatietemplates met versiebeheer.'
          ]
        },
        {
          heading: 'Samenwerking & controle',
          bullets: [
            'Realtime chat per aanvraag met notificaties en activiteitenoverzicht.',
            'Rolgebaseerde toegang, audittrail en documentversiebeheer.',
            'Ondersteuning voor Incoterms en internationale handelscontexten.',
            'Elke beslissing vastgelegd met analyses, scorecards en exporteerbare samenvattingen.'
          ]
        }
      ]
    },
    useCases: {
      eyebrow: 'Toepassingen',
      heading: 'Ontworpen voor de volledige bouwketen.',
      items: [
        {
          title: 'Hoofdaannemer',
          problem:
            'Probleem: Versnipperde aanbestedingen per discipline veroorzaken vertraging en kostenafwijkingen.',
          solution:
            'Oplossing: Dien per pakket (staal, installaties, afbouw) aanvragen in, verzamel vergelijkbare biedingen, verdeel gunningen en genereer automatisch orders.',
          outcome:
            'Resultaat: Snellere gunningscycli, gedocumenteerde beslissingen, voorspelbare levering.'
        },
        {
          title: 'Kostendeskundige / consultant',
          problem: 'Probleem: Handmatige normalisatie en rapportage kosten te veel tijd.',
          solution:
            'Oplossing: Vergelijk biedingen naast elkaar, ondersteun deelbiedingen en genereer automatische tendersamenvattingen en leveranciersscorecards.',
          outcome:
            'Resultaat: Minder spreadsheetwerk, duidelijker advies aan opdrachtgevers, herhaalbaar toezicht.'
        },
        {
          title: 'Projectontwikkelaar / opdrachtgever',
          problem: 'Probleem: Beperkt zicht op capaciteit van leveranciers en kostrisico.',
          solution:
            'Oplossing: Transparante vergelijkingen, deelgunningen over meerdere leveranciers en live updates van biedingen en inkooporders.',
          outcome:
            'Resultaat: Minder risico op afhankelijkheid, beter budgetbeheer, traceerbare inkoop.'
        },
        {
          title: 'MKB-leverancier',
          problem: 'Probleem: Moeilijk om kansen te vinden en betrouwbaarheid aan te tonen.',
          solution:
            'Oplossing: Aanvragen op basis van categorie, herbruikbare voorwaarden en een openbare catalogus met aanvragen.',
          outcome:
            'Resultaat: Meer uitnodigingen, hogere scoringskans, duidelijkere orders en communicatie.'
        },
        {
          title: 'Enterprise-inkoop',
          problem: 'Probleem: Hoog volume aan aanvragen en strenge compliance-eisen.',
          solution:
            'Oplossing: CSV/API-import, gecontroleerde leverancierslijsten, audittrail, PO-pdf’s en centrale chat en documenten.',
          outcome:
            'Resultaat: Schaalbare processen, governance by design, ERP-klaar.'
        }
      ]
    },
    credibility: {
      eyebrow: 'Bewijs',
      heading: 'Betrouwbare tooling voor elke bouwfase.',
      stats: [
        {
          metric: '80%',
          body: 'Minder tijd nodig om leveranciers te shortlist na de eerste maand met Metics.'
        },
        {
          metric: '24/7',
          body: 'Altijd toegang tot aanvragen, leverancierschats en inkooporders voor het hele team.'
        },
        {
          metric: '100%',
          body: 'Volledig auditbestendig aanbestedingsarchief met exporteerbare samenvattingen.'
        }
      ],
      badges: ['ISO-ready workflows', 'AVG-conform', 'SSO & SAML-ondersteuning', 'EU dataresidentie']
    },
    workflow: {
      eyebrow: 'Proces',
      heading: 'Van aanvraag tot inkooporder blijven alle stappen verbonden.',
      steps: [
        {
          title: '1. Start de aanvraag',
          body: 'Importeer via CSV/API of gebruik templates. Definieer attributen, bijlagen en spelregels.'
        },
        {
          title: '2. Samenwerken & vergelijken',
          body: 'Nodig leveranciers uit, chat in context en vergelijk antwoorden op prijs en kwaliteit.'
        },
        {
          title: '3. Gunnen & automatiseren',
          body:
            'Gun volledig of gedeeltelijk, genereer automatisch inkooporders en synchroniseer documentatie voor overdracht.'
        }
      ]
    },
    faqs: {
      eyebrow: 'Veelgestelde vragen',
      heading: 'Antwoorden voor inkopers en leveranciers.',
      items: [
        {
          question: 'Kunnen leveranciers deels inschrijven?',
          answer:
            'Ja. Inkopers kunnen deelbiedingen inschakelen; leveranciers geven deelhoeveelheden op. Inkopers kunnen gunningen ook verdelen over meerdere leveranciers.'
        },
        {
          question: 'Kan ik een aanvraag beperken tot geselecteerde leveranciers?',
          answer:
            'Ja. Kies Gesloten (geselecteerde/geautoriseerde leveranciers) of Open (iedereen binnen de categorie).'
        },
        {
          question: 'Worden inkooporders automatisch aangemaakt?',
          answer:
            'Ja. Bij gunning wordt direct een inkooporder met afgesproken voorwaarden aangemaakt; u kunt deze als PDF exporteren.'
        },
        {
          question: 'Kan ik een aanvraag aanpassen na publicatie?',
          answer:
            'Voor de deadline: ja, met notificaties voor deelnemers. Kritieke velden kunnen na binnenkomst van biedingen worden vergrendeld om eerlijkheid te waarborgen.'
        },
        {
          question: 'Kan ik integreren met mijn ERP?',
          answer: 'Ja, importeer aanvragen via CSV of API; mappingtemplates worden ondersteund.'
        },
        {
          question: 'Hoe ontvangen leveranciers aanvragen?',
          answer: 'Via categoriekoppeling nadat zij hun bedrijf en productcategorieën hebben ingesteld.'
        },
        {
          question: 'Is er communicatie binnen het platform?',
          answer: 'Ja, realtime chat per aanvraag plus notificaties en een activiteitenfeed.'
        }
      ]
    },
    cta: {
      heading: 'Klaar om inkoop te moderniseren?',
      body: 'Vraag een demo aan en ontdek hoe Metics elke aanvraag, bieding en inkooporder samenbrengt.',
      fieldLabel: 'Zakelijk e-mailadres',
      placeholder: 'Zakelijk e-mailadres',
      submit: 'Vraag een demo aan',
      thanks: 'Bedankt, het Metics-team neemt snel contact op.',
      footnote: {
        intro: 'Wilt u meteen starten?',
        primary: {
          label: 'Begin nu',
          href: '#contact'
        },
        separator: 'of',
        secondary: {
          label: 'neem deel aan de bèta',
          href: '#'
        }
      }
    },
    footer: {
      tagline: 'Bouwinkoop transparant voor kopers en leveranciers.',
      sections: [
        {
          heading: 'Platform',
          links: [
            { label: 'Features', href: '#features' },
            { label: 'Toepassingen', href: '#use-cases' },
            { label: 'Veelgestelde vragen', href: '#faqs' }
          ]
        },
        {
          heading: 'Bedrijf',
          links: [
            { label: 'Vraag een demo aan', href: '#contact' },
            { label: 'Begin nu', href: '#contact' },
            { label: 'Privacy', href: '#' }
          ]
        }
      ],
      note: '© {year} Metics. Alle rechten voorbehouden.'
    }
  }
};
