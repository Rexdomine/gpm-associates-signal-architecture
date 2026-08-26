export type QuickCheckTier = "UHL" | "EHL" | "OHL" | "REVIEW" | "NONE";

export type QuickCheckQuestionId =
  | "sector"
  | "subtype"
  | "volume"
  | "sensitive"
  | "financial"
  | "cloud"
  | "cross_border"
  | "vulnerable"
  | "automated"
  | "commercial_ict";

export type QuickCheckOption = {
  value: string;
  label: string;
  detail?: string;
};

export type QuickCheckAnswers = Partial<Record<QuickCheckQuestionId, string>>;

export type QuickCheckQuestion = {
  id: QuickCheckQuestionId;
  eyebrow: string;
  title: string;
  help: string;
  options: QuickCheckOption[];
  visible?: (answers: QuickCheckAnswers) => boolean;
};

export const quickCheckQuestionOrder: QuickCheckQuestionId[] = [
  "sector",
  "subtype",
  "volume",
  "sensitive",
  "financial",
  "cloud",
  "cross_border",
  "vulnerable",
  "automated",
  "commercial_ict",
];

export type QuickCheckCard = {
  title: string;
  detail: string;
};

export type QuickCheckResult = {
  tier: QuickCheckTier;
  label: string;
  shortLabel: string;
  summary: string;
  obligations: QuickCheckCard[];
  nextSteps: QuickCheckCard[];
  drivers: string[];
  confidence: "High" | "Moderate" | "Indicative";
};

export const quickCheckSectors: QuickCheckOption[] = [
  {
    value: "finance",
    label: "Banking & financial services",
    detail: "Banks, fintechs, insurance, payments, pensions and related services",
  },
  {
    value: "technology",
    label: "Technology & communications",
    detail: "Telecoms, platforms, apps, device makers and technology service providers",
  },
  {
    value: "public",
    label: "Government & public sector",
    detail: "Ministries, departments, agencies and public institutions",
  },
  {
    value: "health",
    label: "Health & life sciences",
    detail: "Hospitals, clinics, laboratories and health programmes",
  },
  {
    value: "education",
    label: "Education & training",
    detail: "Schools, higher institutions and training providers",
  },
  {
    value: "energy",
    label: "Energy, utilities & extractives",
    detail: "Electricity, oil and gas, infrastructure and related services",
  },
  {
    value: "hospitality",
    label: "Hospitality & accommodation",
    detail: "Hotels, guest houses and accommodation providers",
  },
  {
    value: "processing_services",
    label: "Data processing & outsourcing",
    detail: "Commercial processors, managed services and outsourced data-processing providers",
  },
  {
    value: "commerce_mobility",
    label: "Aviation, trade, e-commerce & tourism",
    detail: "Aviation, export/import, e-commerce, tourism and related organisations",
  },
  {
    value: "other",
    label: "Another type of organisation",
    detail: "Professional services, NGOs, retail, manufacturing and others",
  },
];

export const quickCheckSubtypeOptions: Record<string, QuickCheckOption[]> = {
  finance: [
    { value: "commercial_bank_national_regional", label: "Commercial bank operating at national or regional level" },
    { value: "insurance", label: "Insurance company" },
    { value: "payment_gateway", label: "Payment gateway service provider" },
    { value: "fintech", label: "Fintech" },
    { value: "microfinance", label: "Microfinance bank" },
    { value: "mortgage_bank", label: "Mortgage bank" },
    { value: "other_finance", label: "Pension, investment or other financial service" },
  ],
  technology: [
    { value: "telecom", label: "Telecommunications company" },
    { value: "public_social_media_app", label: "Public social-media app developer or proprietor" },
    { value: "public_email_app", label: "Public email app developer or proprietor" },
    { value: "device_manufacturer", label: "Communication-device manufacturer" },
    { value: "commercial_ict", label: "Commercial technology service provider" },
    { value: "other_technology", label: "Other technology organisation" },
  ],
  public: [
    { value: "government_mda", label: "Government ministry, department or agency" },
    { value: "public_institution", label: "Other public institution" },
    { value: "embassy", label: "Embassy or high commission" },
    { value: "judiciary", label: "Judicial or adjudicatory body" },
  ],
  health: [
    { value: "hospital_secondary_tertiary", label: "Secondary or tertiary hospital" },
    { value: "primary_health", label: "Primary health centre or clinic" },
    { value: "medical_lab", label: "Independent medical laboratory" },
    { value: "other_health", label: "Other health or life-sciences organisation" },
  ],
  education: [
    { value: "higher_institution", label: "University or other higher institution" },
    { value: "primary_secondary_school", label: "Primary or secondary school" },
    { value: "corporate_training", label: "Corporate training provider" },
    { value: "other_education", label: "Other education organisation" },
  ],
  energy: [
    { value: "electricity_distribution", label: "Electricity distribution company" },
    { value: "oil_gas", label: "Oil and gas company" },
    { value: "other_energy", label: "Other energy, utility or infrastructure organisation" },
  ],
  hospitality: [
    { value: "hotel_under_50", label: "Hotel or guest house with fewer than 50 suites" },
    { value: "hotel_50_plus", label: "Hotel or guest house with 50 or more suites" },
    { value: "other_hospitality", label: "Other hospitality organisation" },
  ],
  processing_services: [
    {
      value: "sensitive_processor_200_plus",
      label: "Commercial processor handling sensitive personal data for more than 200 people",
    },
    { value: "general_data_processor", label: "Other commercial data processor or outsourcing provider" },
    { value: "other_processing_service", label: "Another data-processing service" },
  ],
  commerce_mobility: [
    { value: "aviation", label: "Aviation organisation or service provider" },
    { value: "export_import", label: "Export or import organisation or service provider" },
    { value: "ecommerce", label: "E-commerce organisation or service provider" },
    { value: "tourism", label: "Tourism organisation or service provider" },
    { value: "other_commerce_mobility", label: "Another organisation in this group" },
  ],
  other: [
    { value: "multinational", label: "Multinational company" },
    { value: "ngo", label: "NGO, charity or development organisation" },
    { value: "professional_services", label: "Professional services firm" },
    { value: "retail_manufacturing", label: "Retail, trade or manufacturing business" },
    { value: "faith_community", label: "Faith-based or community organisation" },
    { value: "sole_trader", label: "Sole trader or artisan" },
    { value: "other_org", label: "Another organisation type" },
  ],
};

export const yesNoUnsureOptions: QuickCheckOption[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export const quickCheckQuestions: QuickCheckQuestion[] = [
  {
    id: "sector",
    eyebrow: "About your organisation",
    title: "Which area best describes your organisation?",
    help: "Choose the closest match. You can refine your answer on the next screen.",
    options: quickCheckSectors,
  },
  {
    id: "subtype",
    eyebrow: "Organisation type",
    title: "Which description is the closest fit?",
    help: "This helps us check whether your organisation is specifically listed in current regulatory guidance.",
    options: [],
    visible: (answers) => Boolean(answers.sector),
  },
  {
    id: "volume",
    eyebrow: "Scale of processing",
    title: "About how many individuals’ personal data have you processed in the last six months?",
    help: "Include customers, employees, applicants, users, patients, students, beneficiaries, contractors and website visitors where relevant.",
    options: [
      { value: "0_200", label: "0–200 people" },
      { value: "201_999", label: "201–999 people" },
      { value: "exact_1000", label: "Exactly 1,000 people" },
      { value: "1001_4999", label: "1,001–4,999 people" },
      { value: "exact_5000", label: "Exactly 5,000 people" },
      { value: "over_5000", label: "More than 5,000 people" },
      { value: "unsure", label: "I’m not sure" },
    ],
  },
  {
    id: "sensitive",
    eyebrow: "Nature of the data",
    title: "Do you handle sensitive personal data?",
    help: "For example: health, biometric, genetic or financial information, or information about children.",
    options: yesNoUnsureOptions,
  },
  {
    id: "financial",
    eyebrow: "Financial responsibility",
    title: "Do you hold or manage funds, financial accounts or financial assets linked to individuals?",
    help: "This could include deposits, wallets, investments, pensions, insurance funds or payment accounts.",
    options: yesNoUnsureOptions,
  },
  {
    id: "cloud",
    eyebrow: "Technology environment",
    title: "Do you substantially store or process personal data on cloud platforms or externally managed servers?",
    help: "Think of cloud-hosted systems, outsourced databases, SaaS platforms or externally managed infrastructure used for significant processing.",
    options: yesNoUnsureOptions,
  },
  {
    id: "cross_border",
    eyebrow: "Data location",
    title: "Is personal data regularly stored, accessed, shared or processed outside Nigeria?",
    help: "This may include foreign cloud infrastructure, overseas group companies or international service providers.",
    options: yesNoUnsureOptions,
  },
  {
    id: "vulnerable",
    eyebrow: "People affected",
    title: "Do you regularly process data about children or people who may require additional protection?",
    help: "Examples may include children, patients or other people whose circumstances make them more vulnerable.",
    options: yesNoUnsureOptions,
  },
  {
    id: "automated",
    eyebrow: "How processing happens",
    title: "Do digital systems routinely collect, analyse, monitor or make decisions using personal data?",
    help: "Examples include apps, online platforms, monitoring tools, automated profiling or large customer databases.",
    options: yesNoUnsureOptions,
  },
  {
    id: "commercial_ict",
    eyebrow: "Technology services",
    title: "Do your services involve accessing personal data stored on devices or systems belonging to other people?",
    help: "This applies to commercial technology services that access, repair, manage or process data on another person’s device or system.",
    options: yesNoUnsureOptions,
    visible: (answers) => answers.sector === "technology" || answers.subtype === "commercial_ict",
  },
];

export const explicitSubtypeTierMap: Partial<Record<string, QuickCheckTier>> = {
  commercial_bank_national_regional: "UHL",
  insurance: "UHL",
  payment_gateway: "UHL",
  fintech: "UHL",
  telecom: "UHL",
  public_social_media_app: "UHL",
  public_email_app: "UHL",
  device_manufacturer: "UHL",
  multinational: "UHL",
  electricity_distribution: "UHL",
  oil_gas: "UHL",
  microfinance: "EHL",
  mortgage_bank: "EHL",
  government_mda: "EHL",
  higher_institution: "EHL",
  hospital_secondary_tertiary: "EHL",
  primary_secondary_school: "OHL",
  corporate_training: "OHL",
  primary_health: "OHL",
  medical_lab: "OHL",
  hotel_under_50: "OHL",
  sensitive_processor_200_plus: "OHL",
};

const driverMessageMap: Partial<Record<QuickCheckQuestionId, string>> = {
  sensitive: "You indicated that sensitive personal data is processed.",
  financial: "Your organisation holds or manages financial assets linked to individuals.",
  cloud: "Substantial processing relies on cloud or externally managed infrastructure.",
  cross_border: "Personal data is regularly involved in cross-border processing.",
  vulnerable: "Your processing involves children or other people requiring additional protection.",
  automated: "Personal data is routinely processed through digital or automated systems.",
};

const coreGovernanceActions: QuickCheckCard[] = [
  {
    title: "Designate and empower a DPO",
    detail:
      "Appoint a suitably qualified Data Protection Officer with a clear mandate, direct access to leadership and sufficient resources to oversee compliance.",
  },
  {
    title: "Establish the required policies",
    detail:
      "Put in place proportionate policies and procedures covering privacy notices, data-subject rights, retention, breaches, third parties, ROPA, DPIA and related controls.",
  },
  {
    title: "Build staff capability",
    detail:
      "Provide recurring, role-based data-protection training for leadership, staff and operational teams, supported by specialised development for the DPO.",
  },
];

const resultCards: Record<QuickCheckTier, Omit<QuickCheckResult, "tier" | "drivers" | "nextSteps" | "confidence">> = {
  UHL: {
    label: "Likely Ultra-High Level",
    shortLabel: "UHL",
    summary: "Your answers indicate the highest processing level under the current major-importance framework.",
    obligations: [
      {
        title: "Registration",
        detail: "Registration as a Data Controller or Processor of Major Importance is generally required.",
      },
      {
        title: "Annual CAR",
        detail: "UHL organisations register once and generally file an annual Compliance Audit Return.",
      },
      {
        title: "Governance",
        detail: "Strong governance, DPO oversight and evidence-based compliance controls are expected.",
      },
    ],
  },
  EHL: {
    label: "Likely Extra-High Level",
    shortLabel: "EHL",
    summary: "Your answers indicate an extra-high processing level under the current major-importance framework.",
    obligations: [
      {
        title: "Registration",
        detail: "Registration as a Data Controller or Processor of Major Importance is generally required.",
      },
      {
        title: "Annual CAR",
        detail: "EHL organisations register once and generally file an annual Compliance Audit Return.",
      },
      {
        title: "Accountability",
        detail: "Documented compliance, risk controls and appropriate DPO oversight should be maintained.",
      },
    ],
  },
  OHL: {
    label: "Likely Ordinary-High Level",
    shortLabel: "OHL",
    summary: "Your answers indicate an ordinary-high processing level under the current major-importance framework.",
    obligations: [
      {
        title: "Annual registration",
        detail: "OHL registration is generally renewed annually under the current framework.",
      },
      {
        title: "CAR position",
        detail: "An annual CAR is generally not filed where the required OHL registration is renewed annually.",
      },
      {
        title: "NDPA duties",
        detail: "Core data-protection, accountability and security obligations still apply.",
      },
    ],
  },
  REVIEW: {
    label: "Further Review Recommended",
    shortLabel: "Review",
    summary:
      "Your responses do not support a sufficiently clear automated classification, but some processing characteristics may still be significant.",
    obligations: [
      {
        title: "Confirm scope",
        detail: "Validate the number of data subjects and the nature of your processing.",
      },
      {
        title: "Review designation factors",
        detail: "Consider sector, sensitivity, technology use and cross-border processing together.",
      },
      {
        title: "Do not assume exemption",
        detail: "Uncertainty about classification does not remove obligations under the NDPA.",
      },
    ],
  },
  NONE: {
    label: "No Clear Major-Importance Level Identified",
    shortLabel: "No clear level",
    summary:
      "Based on your answers, the Quick Check has not identified a clear basis for UHL, EHL or OHL classification.",
    obligations: [
      {
        title: "NDPA may still apply",
        detail: "Processing-level classification is not the same as exemption from the Nigeria Data Protection Act.",
      },
      {
        title: "Monitor changes",
        detail: "Reassess if your data volume, services, technology or cross-border activity changes.",
      },
      {
        title: "Use good practice",
        detail: "Maintain appropriate privacy notices, security controls and responsible data handling.",
      },
    ],
  },
};

const nextStepMap: Record<QuickCheckTier, QuickCheckCard[]> = {
  UHL: [
    {
      title: "Confirm UHL compliance requirements",
      detail: "Validate registration status, annual CAR obligations and the evidence required for the highest processing level.",
    },
    ...coreGovernanceActions,
  ],
  EHL: [
    {
      title: "Confirm EHL compliance requirements",
      detail: "Validate registration status, annual CAR obligations and the evidence required for the extra-high processing level.",
    },
    ...coreGovernanceActions,
  ],
  OHL: [
    {
      title: "Confirm OHL compliance requirements",
      detail: "Validate annual registration or renewal requirements and the organisation’s ongoing accountability obligations.",
    },
    ...coreGovernanceActions,
  ],
  REVIEW: [
    {
      title: "Complete a classification review",
      detail: "Confirm the organisation type, processing volume and regulatory factors before relying on a particular level.",
    },
    {
      title: "Assess DPO requirements",
      detail: "Determine whether major-importance status requires formal DPO designation and establish interim privacy ownership.",
    },
    {
      title: "Review foundational policies",
      detail: "Check whether privacy notices, data-subject rights, retention, breach and third-party procedures are proportionate and current.",
    },
    {
      title: "Strengthen awareness",
      detail: "Provide baseline training for staff who handle personal data while classification is being confirmed.",
    },
  ],
  NONE: [
    {
      title: "Monitor your processing profile",
      detail: "Reassess when data volumes, services, technology use or cross-border activities materially change.",
    },
    {
      title: "Assign privacy responsibility",
      detail:
        "Give a capable person clear responsibility for privacy oversight, even where formal DPO designation has not been identified.",
    },
    {
      title: "Maintain proportionate policies",
      detail: "Keep clear privacy notices and practical procedures for rights requests, retention, security and incident response.",
    },
    {
      title: "Train relevant staff",
      detail: "Ensure personnel who handle personal data understand their responsibilities and the organisation’s approved practices.",
    },
  ],
};

export function getSubtypeOptions(sector?: string) {
  if (!sector) {
    return [];
  }

  return quickCheckSubtypeOptions[sector] ?? [];
}

export function getQuestionOptions(question: QuickCheckQuestion, answers: QuickCheckAnswers) {
  if (question.id === "subtype") {
    return getSubtypeOptions(answers.sector);
  }

  return question.options;
}

export function getVisibleQuickCheckQuestions(answers: QuickCheckAnswers) {
  return quickCheckQuestions
    .filter((question) => (question.visible ? question.visible(answers) : true))
    .map((question) => ({
      ...question,
      options: getQuestionOptions(question, answers),
    }));
}

export function normalizeQuickCheckAnswers(nextAnswers: QuickCheckAnswers) {
  const normalized: QuickCheckAnswers = { ...nextAnswers };

  const subtypeOptions = getSubtypeOptions(normalized.sector);
  if (normalized.subtype && !subtypeOptions.some((option) => option.value === normalized.subtype)) {
    delete normalized.subtype;
  }

  if (!(normalized.sector === "technology" || normalized.subtype === "commercial_ict")) {
    delete normalized.commercial_ict;
  }

  return normalized;
}

export function pruneAnswersAfterQuestion(questionId: QuickCheckQuestionId, nextAnswers: QuickCheckAnswers) {
  const normalized = normalizeQuickCheckAnswers(nextAnswers);
  const questionIndex = quickCheckQuestionOrder.indexOf(questionId);

  if (questionIndex === -1) {
    return normalized;
  }

  const pruned: QuickCheckAnswers = { ...normalized };

  quickCheckQuestionOrder.slice(questionIndex + 1).forEach((id) => {
    delete pruned[id];
  });

  return normalizeQuickCheckAnswers(pruned);
}

export function evaluateQuickCheck(answers: QuickCheckAnswers): QuickCheckResult {
  const explicitSubtypeTier = answers.subtype ? explicitSubtypeTierMap[answers.subtype] : undefined;
  const volumeTier =
    answers.volume === "over_5000"
      ? "UHL"
      : answers.volume === "1001_4999"
        ? "EHL"
        : answers.volume === "201_999"
          ? "OHL"
          : undefined;

  const boundaryVolume = answers.volume === "exact_1000" || answers.volume === "exact_5000";
  const impliedTier = explicitSubtypeTier ?? volumeTier;

  const highRiskFlags: QuickCheckQuestionId[] = ["sensitive", "financial", "cloud", "cross_border", "vulnerable", "automated"];
  const affirmedFlags = highRiskFlags.filter((key) => answers[key] === "yes");
  const unsureAnswers = Object.values(answers).filter((value) => value === "unsure").length;
  const principalRiskKeys = ["sensitive", "financial", "cloud", "cross_border"] as const;
  const principalRiskFlags = principalRiskKeys.filter((key) => (answers as Record<string, string | undefined>)[key] === "yes");
  const extraHighSignal = principalRiskFlags.length + Number(answers.sector === "public");

  let tier: QuickCheckTier = impliedTier ?? "NONE";
  let confidence: QuickCheckResult["confidence"] = impliedTier ? "High" : "Indicative";

  if (!impliedTier && principalRiskFlags.length >= 4) {
    tier = "UHL";
    confidence = "Moderate";
  } else if (!impliedTier && extraHighSignal >= 4) {
    tier = "EHL";
    confidence = "Moderate";
  } else if (!impliedTier && (boundaryVolume || affirmedFlags.length >= 3 || answers.commercial_ict === "yes" || unsureAnswers >= 2)) {
    tier = "REVIEW";
    confidence = "Indicative";
  }

  const subtypeLabel = answers.sector ? getSubtypeOptions(answers.sector).find((option) => option.value === answers.subtype)?.label : undefined;
  const volumeLabel =
    quickCheckQuestions
      .find((question) => question.id === "volume")
      ?.options.find((option) => option.value === answers.volume)?.label ?? undefined;

  const drivers: string[] = [];

  if (explicitSubtypeTier && subtypeLabel) {
    drivers.push(`${subtypeLabel} is expressly listed at ${explicitSubtypeTier}; this organisation-type rule determines the Quick Check result.`);
  }

  if (!explicitSubtypeTier && volumeTier && volumeLabel) {
    drivers.push(`Your stated six-month processing volume is ${volumeLabel.toLowerCase()}.`);
  }

  if (explicitSubtypeTier && volumeTier && explicitSubtypeTier !== volumeTier && volumeLabel) {
    drivers.push(
      `Your volume response (${volumeLabel.toLowerCase()}) was noted, but the expressly listed organisation type controls this indicative result.`,
    );
  }

  affirmedFlags.slice(0, 3).forEach((key) => {
    const message = driverMessageMap[key];
    if (message) {
      drivers.push(message);
    }
  });

  if (tier === "REVIEW" && answers.commercial_ict === "yes") {
    drivers.unshift("Your commercial technology services may create a separate major-importance designation route.");
  }

  if (tier === "REVIEW" && unsureAnswers >= 2) {
    drivers.push("More than one answer was uncertain, so a reliable automated classification is not appropriate.");
  }

  if (tier === "REVIEW" && boundaryVolume) {
    drivers.unshift(
      "The published volume bands do not expressly resolve the exact 1,000 or 5,000 boundary selected, so professional confirmation is appropriate.",
    );
  }

  if (drivers.length === 0) {
    drivers.push("No specifically listed organisation type or volume threshold was identified from your answers.");
    if (affirmedFlags.length === 0) {
      drivers.push("You did not indicate the principal higher-risk processing characteristics covered by this Quick Check.");
    }
  }

  return {
    tier,
    confidence,
    drivers: drivers.slice(0, 4),
    nextSteps: nextStepMap[tier],
    ...resultCards[tier],
  };
}
