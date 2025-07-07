export type Trait = "Agility" | "Agency" | "Alignment" | "Adaptability";

type Question = {
  id: number;
  text: string;
  trait: Trait;
};

export const questions: Question[] = [
  // Agility
  {
    id: 1,
    text: "I understand my personal learning style and how I learn most effectively",
    trait: "Agility",
  },
  {
    id: 2,
    text: "I actively seek opportunities to gain new skills and knowledge",
    trait: "Agility",
  },
  {
    id: 3,
    text: "I am aware of emerging technologies and their potential impact on my work",
    trait: "Agility",
  },
  {
    id: 4,
    text: "I quickly learn and adjust when my work requires new skills",
    trait: "Agility",
  },
  // Agency
  {
    id: 5,
    text: "I regularly network to build professional relationships",
    trait: "Agency",
  },
  {
    id: 6,
    text: "I regularly review my career values and goals",
    trait: "Agency",
  },
  {
    id: 7,
    text: "I understand the possible career pathways in public service",
    trait: "Agency",
  },
  {
    id: 8,
    text: "I have a well-defined career plan with specific, achievable goals",
    trait: "Agency",
  },
  // Alignment
  {
    id: 9,
    text: "I understand how my role contributes to organisational goals",
    trait: "Alignment",
  },
  {
    id: 10,
    text: "I actively search for opportunities within my organisation that fulfil my personal goals",
    trait: "Alignment",
  },
  {
    id: 11,
    text: "I stay informed about future public service skill requirements",
    trait: "Alignment",
  },
  {
    id: 12,
    text: "I have regular career conversations with my supervisor (beyond performance reviews)",
    trait: "Alignment",
  },
  // Adaptability
  {
    id: 13,
    text: "I recognize how different life stages influence career decisions",
    trait: "Adaptability",
  },
  {
    id: 14,
    text: "I adjust my career goals based on different life stages",
    trait: "Adaptability",
  },
  {
    id: 15,
    text: "I can identify my transferrable skills across roles for different life seasons",
    trait: "Adaptability",
  },
  {
    id: 16,
    text: "I am aware of work-life support (e.g. flexible work, wellness services) in the public service that can help me through different seasons of life",
    trait: "Adaptability",
  },
];

type Profile = {
  title: string;
  description: string;
};

// Key format: Agility-Agency-Alignment-Adaptability
export const profiles: Record<string, Profile> = {
    "High-High-High-High": {
        title: "The All-Rounder Star",
        description: "You excel in all areas of career fitness. You're fast, proactive, aligned with your company's goals, and resilient. You are a key player who thrives in dynamic environments and drives success."
    },
    "High-High-High-Low": {
        title: "The High-Performer",
        description: "You are agile, proactive, and aligned with your organization. While you perform exceptionally well, you may find it challenging to bounce back from significant setbacks. Building resilience is your next growth area."
    },
    "High-High-Low-High": {
        title: "The Free Agent",
        description: "You are a dynamic, self-starting, and adaptable professional. You may not feel a strong connection to your current organization's specific mission, thriving instead on personal growth and achievement."
    },
    "High-High-Low-Low": {
        title: "The Sprinter",
        description: "You are quick and proactive, but you may struggle with organizational alignment and resilience. You excel in short-term projects but may need support in long-term engagement and handling adversity."
    },
    "High-Low-High-High": {
        title: "The Aligned Implementer",
        description: "You are flexible, connected to your company's mission, and resilient. You excel at executing tasks in a changing environment but may be hesitant to take initiative or lead new projects."
    },
    "High-Low-High-Low": {
        title: "The Dutiful Adapter",
        description: "You are agile and aligned with your company's vision, but may lack proactivity and resilience. You're great at following plans but could benefit from taking more initiative and managing stress."
    },
    "High-Low-Low-High": {
        title: "The Flexible Contributor",
        description: "You are highly flexible and adaptable, easily handling change. Your opportunity for growth lies in taking more initiative and finding a stronger connection with your organization's goals."
    },
    "High-Low-Low-Low": {
        title: "The Task-Switcher",
        description: "Your strength is your ability to move between tasks fluidly. To grow, focus on becoming more proactive, connecting with your company's mission, and building resilience to workplace challenges."
    },
    "Low-High-High-High": {
        title: "The Visionary Leader",
        description: "You are a proactive, aligned, and resilient leader. You excel at driving projects forward but may prefer a stable environment. Your strength is in strategic execution over rapid tactical shifts."
    },
    "Low-High-High-Low": {
        title: "The Committed Driver",
        description: "You are proactive and deeply aligned with your organization's goals. You thrive on driving initiatives but may struggle with rapid changes and recovering from setbacks. Predictability is your friend."
    },
    "Low-High-Low-High": {
        title: "The Independent Achiever",
        description: "You are a self-starter who is resilient in the face of challenges. You may prefer working autonomously and could benefit from finding greater alignment with your team and company's objectives."
    },
    "Low-High-Low-Low": {
        title: "The Self-Starter",
        description: "You are excellent at taking initiative but may find it challenging to adapt to change, align with company goals, or handle setbacks. Your drive is strong, but needs support in other areas."
    },
    "Low-Low-High-High": {
        title: "The Resilient Loyalist",
        description: "You are deeply aligned with your company and can handle adversity well. You prefer well-defined roles and clear direction. Your growth lies in embracing change and taking more initiative."
    },
    "Low-Low-High-Low": {
        title: "The Steady Believer",
        description: "You are loyal and aligned with your company's mission. You thrive in stable environments and may need support in adapting to change, taking initiative, and handling high-pressure situations."
    },
    "Low-Low-Low-High": {
        title: "The Survivor",
        description: "Your key strength is your resilience; you can handle anything thrown your way. To increase your impact, focus on becoming more proactive, agile, and connected to your organization's mission."
    },
    "Low-Low-Low-Low": {
        title: "The Specialist",
        description: "You thrive on consistency, predictability, and clear direction. You prefer stable, well-defined roles. Your growth path involves developing flexibility, proactivity, and a stronger connection to the bigger picture."
    }
};
