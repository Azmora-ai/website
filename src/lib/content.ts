/**
 * All site copy lives here — sections render from these constants.
 * Positioning: AI business value + product building + compliance,
 * for compliance-heavy industries in the GCC.
 */

export const EMAIL = "hello@azmora.ai"
export const MAILTO = `mailto:${EMAIL}`

export const hero = {
  eyebrow: "AI Strategy · Product · Compliance — GCC",
  headline: ["AI that creates real value.", "Compliant by design."],
  subheadline:
    "Azmora is a GCC-focused AI strategy and compliance consultancy. We help startups and SMBs across the UAE, Saudi Arabia, and the wider Gulf find where AI creates real business value, build the right products around it, and deploy them in full alignment with regional regulation.",
  secondaryCta: "See how we work ↓",
}

export const problem = {
  stat: 84,
  headline: "AI adoption in the GCC has reached 84%. Value and compliance haven't kept up.",
  body: "Most pilots never pay off — and the rules are already here. Retrofitting compliance, or chasing value after the fact, costs more than building it right the first time.",
  regulators: ["SDAIA", "PDPL", "UAE AI Charter", "DIFC Regulation 10"],
}

export const whatWeDo = {
  title: "Value first. Compliance always.",
  intro:
    "We work hands-on with your team to find where AI genuinely pays off, build the right product around it, and design the roadmap regulators would sign off on — from day one.",
  services: [
    {
      name: "AI Strategy & Value Discovery",
      description:
        "Where AI creates real value in your business: which use cases actually pay off, what to build vs. buy, and a roadmap grounded in your operational reality — not generic playbooks.",
    },
    {
      name: "AI Product Building",
      description:
        "From validated use case to working product. We help you scope, design, and ship AI products that deliver measurable business value — with compliance designed in from the first sprint.",
    },
    {
      name: "Compliance & Responsible AI",
      description:
        "Your AI assessed against UAE, Saudi, and GCC requirements — data residency, consent, audit trails — with practical governance your team can actually run. Built for SDAIA, PDPL, the UAE AI Charter, and DIFC. Not retrofitted from Western templates.",
    },
  ],
  closing: "Every engagement ends with your team moving forward — not just holding a report.",
}

export const whyAzmora = {
  title: "Built for this region. Not adapted to it.",
  body: "Most AI consultancies are US-based, with zero native coverage of GCC regulatory frameworks. In compliance-heavy industries — finance, healthcare, insurance, government services — their advice exposes you to regulatory and reputational risk you won't see until it's expensive.",
  lead: "Azmora operates where global AI capability, real product value, and regional regulatory reality meet:",
  values: [
    {
      name: "Value first",
      description:
        "Every initiative ties to a measurable business outcome. If AI doesn't pay for itself, we'll tell you.",
    },
    {
      name: "Regional depth",
      description:
        "Fluent in SDAIA, PDPL, the UAE AI Charter, DIFC Regulation 10, and GCC data sovereignty requirements.",
    },
    {
      name: "Safety by design",
      description:
        "Compliance isn't a checkbox at the end. It's the foundation of every product we help build.",
    },
    {
      name: "Accessible expertise",
      description:
        "Enterprise-grade strategy and product capability, priced and packaged for startups and SMBs.",
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
        "Building AI-native products who need the right product — and compliance — baked in before a regulator forces a costly rebuild.",
    },
    {
      name: "SMBs",
      qualifier: "10–500 employees",
      description:
        "Adopting AI for operations, customer service, or analytics — and needing it to pay off, without in-house governance expertise.",
    },
    {
      name: "Regulated enterprises",
      qualifier: "Finance · Health · Insurance",
      description:
        "In compliance-heavy sectors, navigating cross-border data complexity across multiple GCC jurisdictions.",
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
  title: "Beyond consulting",
  body: "Today, we deliver hands-on strategy and product work. Next, packaged compliance frameworks — and ultimately, a middleware layer that enforces GCC regulatory compliance automatically between global AI tools and your systems.",
  closing:
    "Work with us now, and you're working with the team building the region's AI compliance standard.",
  roadmap: [
    { phase: "Now", name: "Hands-on strategy & product" },
    { phase: "Next", name: "Packaged compliance frameworks" },
    { phase: "Ultimately", name: "Compliance middleware layer" },
  ],
}

export const contact = {
  headline: "Start with a conversation.",
  body: 'Tell us where you are with AI — even if the answer is "nowhere yet." We\'ll tell you honestly where AI can create real value for your business, and what compliant adoption looks like.',
}

export const footer = {
  line1: "Azmora — AI Strategy, Product & Compliance for the GCC",
  line2: "UAE · Saudi Arabia · GCC",
}

export const navLinks = [
  { label: "What we do", href: "#what-we-do" },
  { label: "Why Azmora", href: "#why" },
  { label: "Who it's for", href: "#who" },
  { label: "Contact", href: "#contact" },
]

export const sectionIds = ["hero", "problem", "what-we-do", "why", "who", "beyond", "contact"] as const
