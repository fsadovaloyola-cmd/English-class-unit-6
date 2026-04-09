import { GrammarPoint, HiringStep, ProfileChallenge, WordPair, MemoryCard } from './types';

export const GRAMMAR_CHALLENGES: GrammarPoint[] = [
  {
    original: "Meet with the hiring manager",
    enhanced: "A meeting must be held with the hiring manager",
    point: "Passive modal — obligation"
  },
  {
    original: "Define the level of education required",
    enhanced: "The level of education must be defined based on the role",
    point: "Passive modal"
  },
  {
    original: "Define the required job experience",
    enhanced: "The required experience must be specified — whether the candidate has worked in the field before",
    point: "Passive modal + Present Perfect"
  },
  {
    original: "Establish the purpose of the role",
    enhanced: "The purpose of the position must be established before the search begins",
    point: "Passive modal"
  },
  {
    original: "Identify the main responsibilities",
    enhanced: "The main responsibilities must be identified and listed in the job posting",
    point: "Passive modal — compound"
  },
  {
    original: "Determine the type of candidate",
    enhanced: "The ideal candidate profile must be determined based on all previous steps",
    point: "Passive modal"
  },
  {
    original: "Set the level of rigor",
    enhanced: "Eligibility criteria must be set so it is clear who can apply and who cannot",
    point: "Passive modal + active contrast"
  }
];

export const TRANSLATIONS: { [key: string]: string } = {
  "meeting": "reunión",
  "held": "llevada a cabo",
  "hiring": "contratación",
  "manager": "gerente",
  "must": "debe",
  "defined": "definido",
  "based": "basado",
  "role": "rol",
  "required": "requerido",
  "experience": "experiencia",
  "specified": "especificado",
  "whether": "si",
  "candidate": "candidato",
  "worked": "trabajado",
  "field": "campo",
  "before": "antes",
  "purpose": "propósito",
  "position": "posición",
  "established": "establecido",
  "search": "búsqueda",
  "begins": "comienza",
  "responsibilities": "responsabilidades",
  "identified": "identificado",
  "listed": "listado",
  "posting": "publicación",
  "ideal": "ideal",
  "profile": "perfil",
  "determined": "determinado",
  "previous": "previo",
  "steps": "pasos",
  "eligibility": "elegibilidad",
  "criteria": "criterios",
  "clear": "claro",
  "apply": "postular",
  "cannot": "no puede",
  "staffing": "personal",
  "need": "necesidad",
  "initiated": "iniciado",
  "specific": "específico",
  "understood": "entendido",
  "clearly": "claramente",
  "minimum": "mínimo",
  "education": "educación",
  "degree": "título",
  "accepted": "aceptado",
  "instead": "en su lugar",
  "agreed": "acordado",
  "area": "área",
  "similar": "similar",
  "managed": "gestionado",
  "teams": "equipos",
  "number": "número",
  "years": "años",
  "complexity": "complejidad",
  "solve": "resolver",
  "included": "incluido",
  "described": "descrito",
  "specifically": "específicamente",
  "generic": "genérico",
  "avoided": "evitado",
  "task": "tarea",
  "explained": "explicado",
  "evaluate": "evaluar",
  "qualified": "calificado",
  "competencies": "competencias",
  "divided": "dividido",
  "categories": "categorías",
  "technical": "técnico",
  "skills": "habilidades",
  "verified": "verificado",
  "soft": "blandas",
  "assessed": "evaluado",
  "interview": "entrevista",
  "essential": "esencial",
  "overloaded": "sobrecargado",
  "built": "construido",
  "cultural": "cultural",
  "fit": "ajuste",
  "considered": "considerado",
  "aligned": "alineado",
  "values": "valores",
  "filters": "filtros",
  "carefully": "cuidadosamente",
  "strict": "estricto",
  "excluded": "excluido",
  "loose": "suelto/laxo",
  "unqualified": "no calificado",
  "applicants": "solicitantes",
  "might": "podría"
};

export const PROFILE_CHALLENGES: ProfileChallenge[] = [
  {
    id: 1,
    name: "Elena Rodriguez",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400",
    activeDescription: "Elena needs to hire a manager. She wants someone with a degree and 5 years of experience.",
    correctPassive: "A manager must be hired with a minimum of 5 years of experience and a degree must be required.",
    options: [
      "A manager must be hired with a minimum of 5 years of experience and a degree must be required.",
      "Elena wants to hire a manager who has a degree and 5 years of experience.",
      "The manager should have 5 years and a degree if Elena likes them."
    ]
  },
  {
    id: 2,
    name: "Marcus Chen",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400",
    activeDescription: "Marcus is looking for a developer. He needs to define the technical skills first.",
    correctPassive: "Technical skills must be defined by Marcus before the developer search can be initiated.",
    options: [
      "Marcus needs to define skills before he looks for developers.",
      "Technical skills must be defined by Marcus before the developer search can be initiated.",
      "The developer search will start when Marcus defines the skills."
    ]
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400",
    activeDescription: "Sarah wants to set clear rules for who can apply to the new creative role.",
    correctPassive: "Eligibility criteria must be set for the creative role to ensure only qualified candidates apply.",
    options: [
      "Sarah wants to set rules for the creative role applicants.",
      "Eligibility criteria must be set for the creative role to ensure only qualified candidates apply.",
      "Qualified candidates can apply if Sarah sets the rules clearly."
    ]
  }
];

export const HIRING_STEPS: HiringStep[] = [
  {
    id: 0,
    title: "Trigger",
    description: "Someone in the company has identified a vacancy or a new role is needed.",
    enhancedPoints: ["A staffing need has been identified by the department, and a job profile process must be initiated."],
    placeholder: "Describe the initial need for this role..."
  },
  {
    id: 1,
    title: "Needs Meeting",
    description: "Meet with the hiring manager or department head to understand the gap.",
    enhancedPoints: [
      "A meeting must be held with the hiring manager or department head before any other step can be taken.",
      "The specific needs of the area must be understood clearly — no profile can be written without this information."
    ],
    placeholder: "Notes from the meeting with the hiring manager..."
  },
  {
    id: 2,
    title: "Education Requirements",
    description: "Define academic background.",
    enhancedPoints: [
      "The minimum level of education must be defined: should a degree be required, or can relevant experience be accepted instead?",
      "This criterion must be agreed on with the hiring area."
    ],
    placeholder: "Specify the required education level..."
  },
  {
    id: 3,
    title: "Experience Requirements",
    description: "Specify the professional background needed.",
    enhancedPoints: [
      "The required work experience must be specified — for example, whether the candidate has worked in a similar role or has managed teams before.",
      "A minimum number of years should be established based on the complexity of the position."
    ],
    placeholder: "Detail the necessary work experience..."
  },
  {
    id: 4,
    title: "Purpose of the Role",
    description: "Clarify why the position exists.",
    enhancedPoints: [
      "The purpose of the role must be established so that candidates understand what problem they will be hired to solve.",
      "This information must be included in the job posting."
    ],
    placeholder: "What is the primary goal of this position?"
  },
  {
    id: 5,
    title: "Main Responsibilities",
    description: "List what the person will actually do.",
    enhancedPoints: [
      "The main responsibilities must be identified and described clearly and specifically.",
      "Generic descriptions should be avoided — each task must be explained so that candidates can evaluate whether they are qualified."
    ],
    placeholder: "List the key tasks and duties..."
  },
  {
    id: 6,
    title: "Competencies and Skills",
    description: "Define both technical and soft skills.",
    enhancedPoints: [
      "The required competencies must be divided into two categories: technical skills that can be verified and soft skills that must be assessed during the interview.",
      "Only skills that are truly essential should be listed — the profile must not be overloaded."
    ],
    placeholder: "Identify technical and soft skills..."
  },
  {
    id: 7,
    title: "Ideal Candidate Profile",
    description: "Determine who would be the best fit.",
    enhancedPoints: [
      "Based on all the previous steps, the ideal candidate profile must be built.",
      "Cultural fit should also be considered — the candidate must be aligned with the company's values."
    ],
    placeholder: "Describe the perfect candidate..."
  },
  {
    id: 8,
    title: "Eligibility Criteria",
    description: "Set who can and cannot apply.",
    enhancedPoints: [
      "Clear eligibility criteria must be set: who can apply, and who cannot.",
      "These filters must be defined carefully — if they are too strict, qualified candidates may be excluded; if they are too loose, unqualified applicants might be considered."
    ],
    placeholder: "Final filters and rigor level..."
  }
];

export const WORD_PAIRS: WordPair[] = [
  { id: 1, left: "Hiring Manager", right: "Gerente de Contratación" },
  { id: 2, left: "Must be held", right: "Debe llevarse a cabo" },
  { id: 3, left: "Staffing need", right: "Necesidad de personal" },
  { id: 4, left: "Eligibility criteria", right: "Criterios de elegibilidad" }
];

export const MEMORY_CARDS: MemoryCard[] = [
  { id: 1, content: "Active: Meet with manager", pairId: 1 },
  { id: 2, content: "Passive: A meeting must be held", pairId: 1 },
  { id: 3, content: "Active: Define education", pairId: 2 },
  { id: 4, content: "Passive: Education must be defined", pairId: 2 },
  { id: 5, content: "Active: Set criteria", pairId: 3 },
  { id: 6, content: "Passive: Criteria must be set", pairId: 3 },
  { id: 7, content: "Active: Identify duties", pairId: 4 },
  { id: 8, content: "Passive: Duties must be identified", pairId: 4 }
];
