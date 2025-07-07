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
    text: "I can quickly switch between different types of work.",
    trait: "Agility",
  },
  {
    id: 2,
    text: "I am comfortable with unexpected changes to my projects.",
    trait: "Agility",
  },
  {
    id: 3,
    text: "I learn new skills quickly to meet job demands.",
    trait: "Agility",
  },
  {
    id: 4,
    text: "I prefer dynamic work environments over predictable ones.",
    trait: "Agility",
  },
  // Agency
  {
    id: 5,
    text: "I actively seek out new responsibilities at work.",
    trait: "Agency",
  },
  {
    id: 6,
    text: "I don't wait to be told what to do; I take initiative.",
    trait: "Agency",
  },
  {
    id: 7,
    text: "I am confident in my ability to make decisions independently.",
    trait: "Agency",
  },
  {
    id: 8,
    text: "I often identify and suggest improvements to processes.",
    trait: "Agency",
  },
  // Alignment
  {
    id: 9,
    text: "I have a clear understanding of my company's mission and goals.",
    trait: "Alignment",
  },
  {
    id: 10,
    text: "I feel that my personal values align with my organization's values.",
    trait: "Alignment",
  },
  {
    id: 11,
    text: "My work directly contributes to the success of my company.",
    trait: "Alignment",
  },
  {
    id: 12,
    text: "I am proud to be a part of my current organization.",
    trait: "Alignment",
  },
  // Adaptability
  {
    id: 13,
    text: "I remain calm and effective when faced with setbacks.",
    trait: "Adaptability",
  },
  {
    id: 14,
    text: "I can adjust my approach when the initial plan doesn't work.",
    trait: "Adaptability",
  },
  {
    id: 15,
    text: "I see challenges as opportunities for growth.",
    trait: "Adaptability",
  },
  {
    id: 16,
    text: "I am open to feedback and willing to change my behaviors.",
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
