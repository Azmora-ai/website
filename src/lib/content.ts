/**
 * All site copy lives here — sections render from these constants.
 * Positioning: a governed-AI middleware layer that enforces GCC
 * compliance between global AI tools and your systems — plus the
 * strategy to adopt it effectively. Product-led; strategy as wrapper.
 */

export const EMAIL = "raoof@azmora.ai"
export const MAILTO = `mailto:${EMAIL}`

export const hero = {
  eyebrow: "Governed AI Middleware · Strategy — GCC",
  headline: ["Put any AI to work.", "Compliant by design."],
  subheadline:
    "Azmora is the control layer for AI in your business. Govern the global tools your team already uses — or run open-source models entirely on your own infrastructure — with GCC compliance, data residency, and audit trails enforced automatically. Plus the strategy to make it pay off.",
  secondaryCta: "See how it works ↓",
}

export const problem = {
  stat: 84,
  headline: "AI adoption in the GCC has reached 84%. Almost none of it is governed — and the rules are already here.",
  body: "Your team pastes customer data into public AI tools every day. Under SDAIA, PDPL, and the UAE AI Charter, that's a compliance breach waiting to surface — and banning the tools just pushes the risk underground.",
  regulators: ["SDAIA", "PDPL", "UAE AI Charter", "DIFC Regulation 10"],
}

export const whatWeDo = {
  title: "Every model, under your control.",
  intro:
    "Govern the public AI tools your team already uses — or run open-source models entirely on your own infrastructure. Either way, every prompt stays compliant and every byte stays in your control.",
  services: [
    {
      name: "Compliance, enforced",
      description:
        "Data residency, consent, and GCC regulatory rules applied to every prompt and response, automatically. Built for SDAIA, PDPL, the UAE AI Charter, and DIFC — not retrofitted from Western templates.",
    },
    {
      name: "Guardrails & data shield",
      description:
        "PII, sensitive data, and IP detected and blocked before they reach a public model. Prompt-injection defense and policy-aware filtering on every interaction.",
    },
    {
      name: "On-prem & open-source models",
      description:
        "Run open-source models entirely inside your own infrastructure — including CPU-only inference, no GPU required. Your data never leaves your network, and no external API ever sees it.",
    },
    {
      name: "Audit & observability",
      description:
        "Full visibility down to the prompt level: who used what, when, and whether it was compliant. The audit trail regulators ask for, generated as you work.",
    },
  ],
  closing: "Governed public models, or fully private open-source — either way, the compliance is automatic.",
}

export const whyAzmora = {
  title: "Built for this region. Not adapted to it.",
  body: "Most AI governance tools are US-built, with zero native coverage of GCC regulatory frameworks. In compliance-heavy industries — finance, healthcare, insurance, government services — that gap exposes you to regulatory and reputational risk you won't see until it's expensive.",
  lead: "Azmora operates where global AI capability, real product value, and regional regulatory reality meet:",
  values: [
    {
      name: "Value first",
      description:
        "Governance only matters if AI earns its keep. Every rollout we govern ties to a measurable business outcome — if AI doesn't pay for itself, we'll tell you.",
    },
    {
      name: "Regional depth",
      description:
        "Fluent in SDAIA, PDPL, the UAE AI Charter, DIFC Regulation 10, and GCC data sovereignty requirements — encoded into the layer itself.",
    },
    {
      name: "Safety by design",
      description:
        "Compliance is enforced on every prompt by default — not bolted on at the end. And when data can't leave at all, run open-source models fully on-prem, including CPU-only inference.",
    },
    {
      name: "Accessible expertise",
      description:
        "Enterprise-grade governance and strategy, priced and packaged for startups and SMBs — not just large enterprises.",
    },
    {
      name: "Accountability",
      description: "We own outcomes, not deliverables.",
    },
  ],
}

export const whoItsFor = {
  title: "Who we work with",
  audiences: [
    {
      name: "Startups",
      qualifier: "Seed–Series B",
      description:
        "Building AI-native products who need governance and compliance baked in before a regulator forces a costly rebuild.",
    },
    {
      name: "SMBs",
      qualifier: "10–500 employees",
      description:
        "Adopting AI for operations, customer service, or analytics — and needing it governed and worth it, without in-house compliance expertise.",
    },
    {
      name: "Regulated enterprises",
      qualifier: "Finance · Health · Insurance",
      description:
        "In compliance-heavy sectors, governing AI use across cross-border data complexity and multiple GCC jurisdictions.",
    },
    {
      name: "Government-adjacent",
      qualifier: "DIFC · ADGM",
      description:
        "Entities in free zones like DIFC and ADGM that require sovereign-grade AI governance.",
    },
  ],
}

export const beyond = {
  title: "The strategy to make it pay off.",
  body: "Governance keeps you safe; strategy makes AI worth it. We help you find where AI creates real value, roll it out across your team, and stand up the governance practice to run it long-term.",
  closing:
    "Work with us, and you're working with the team building the region's AI governance standard.",
  roadmap: [
    { phase: "Assess", name: "Where AI creates real value" },
    { phase: "Deploy", name: "Governed rollout across your team" },
    { phase: "Govern", name: "A practice your team runs" },
  ],
}

export const contact = {
  headline: "See where you're exposed.",
  body: "Tell us which AI tools your team uses today. We'll show you honestly where you're exposed under GCC regulation — and how Azmora closes the gap.",
}

export const footer = {
  line1: "Azmora — Governed AI for the GCC",
  line2: "UAE · Saudi Arabia · GCC",
}

export const navLinks = [
  { label: "The product", href: "#what-we-do" },
  { label: "Why Azmora", href: "#why" },
  { label: "Strategy", href: "#beyond" },
  { label: "Contact", href: "#contact" },
]

export const sectionIds = ["hero", "problem", "what-we-do", "why", "who", "beyond", "contact"] as const
