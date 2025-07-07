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

type DevelopmentArea = {
  description: string;
  tip: string;
};

export type Profile = {
  title: string;
  description: string;
  developmentAreas?: {
    Agility: DevelopmentArea;
    Agency: DevelopmentArea;
    Alignment: DevelopmentArea;
    Adaptability: DevelopmentArea;
  };
};

// Key format: Agility-Agency-Alignment-Adaptability
export const profiles: Record<string, Profile> = {
    "High-Low-Low-Low": {
        title: "The HIIT Specialist",
        description: "Like a HIIT enthusiast combining different movements in intense bursts, you excel at rapidly acquiring skills and switching between challenges. You leverage your preferred learning style to master new skills and technologies, demonstrating quick adaptation in changing environments.",
        developmentAreas: {
            Agility: { description: "The HIIT specialist excels at quick learning and versatility; challenge lies in developing deeper expertise", tip: "Identify skills that align with career interests to deepen and specialise into deep expertise" },
            Agency: { description: "The HIIT specialist's adaptable nature needs anchoring with clearer career direction and purpose", tip: "Create a long-term development roadmap that communicates your unique value proposition" },
            Alignment: { description: "The HIIT specialist's diverse capabilities need stronger links to organizational priorities", tip: "Schedule regular discussions with your supervisor to align skill development with organizational needs" },
            Adaptability: { description: "The HIIT specialist's quick-learning approach needs more focus for long-term success", tip: "Implement a weekly reflection routine to evaluate career priorities as strategic recovery" }
        }
    },
    "Low-High-Low-Low": {
        title: "The Mountain Climber",
        description: "Like a skilled climber planning routes and ascents, you excel at charting your own career path and making independent decisions. You take full ownership of your journey, carefully assessing your position and identifying promising paths forward as you strategically navigate to new professional heights.",
        developmentAreas: {
            Agility: { description: "A career climber can optimize their learning approach through real-time work experiences", tip: "Match tasks to your preferred learning style while measuring effectiveness within current work assignments" },
            Agency: { description: "A career climber needs clear pathways for different scenarios", tip: "Create a detailed 3–5 year career pathway document with alternative routes and clear decision points" },
            Alignment: { description: "A career climber might miss organizational connections", tip: "Join at least one cross-functional project each quarter to build diverse organizational relationships" },
            Adaptability: { description: "A career climber might neglect life balance", tip: "Conduct monthly assessments of energy levels and wellbeing while reviewing career aspirations against personal commitments" }
        }
    },
    "Low-Low-High-Low": {
        title: "The Archer",
        description: "Like an archer who masters wind patterns and distance calculations, you excel at aligning career moves with organizational needs, turning industry trends into opportunities. You maintain unwavering focus while adapting to changing conditions, skillfully calibrating personal development to create organizational impact.",
        developmentAreas: {
            Agility: { description: "The archer might over-analyze before taking the shot", tip: "Practice quick adjustments with weekly technique sprints instead of waiting for perfect conditions" },
            Agency: { description: "The archer may focus too much on target requirements versus personal form", tip: "Create a personal development roadmap with quarterly milestones that balance technique refinement with scoring goals" },
            Alignment: { description: "The archer has natural ability to gauge distances but needs structured practice", tip: "Create monthly impact maps linking shooting technique improvements to competition objectives" },
            Adaptability: { description: "The archer might let competition focus overshadow personal rhythms", tip: "Develop a quarterly training-life integration plan that aligns competition seasons with personal milestones" }
        }
    },
    "Low-Low-Low-High": {
        title: "The Marathon Runner",
        description: "Like a seasoned marathon runner adapting to changing terrains, you excel at pacing your career through life's seasons. You naturally know when to sprint ahead and when to adjust your stride, balancing career momentum with personal priorities across different life stages.",
        developmentAreas: {
            Agility: { description: "The marathon runner might settle into a comfortable pace, missing opportunities to accelerate", tip: "Set quarterly skill upgrade goals with specific milestones, even during steady training periods" },
            Agency: { description: "The marathon runner might react to course changes rather than plan strategic moves ahead", tip: "Schedule quarterly route reviews with mentors or your supervisor" },
            Alignment: { description: "The marathon runner's focus on personal pace might miss team relay requirements", tip: "Map your strengths to team objectives" },
            Adaptability: { description: "The marathon runner's natural endurance needs systematic recovery planning", tip: "Implement energy management routines with rest and social structures and supports" }
        }
    },
    "High-High-Low-Low": {
        title: "The CrossFit Athlete",
        description: "Like a CrossFit athlete excelling at varied workouts while programming their own training, you combine rapid skill acquisition with strong career ownership. You master multiple competencies while maintaining clear direction of your development path, balancing quick learning with strategic progression.",
        developmentAreas: {
            Agility: { description: "The CrossFit athlete excels at varied skill acquisition but requires more structured progression", tip: "Set monthly skill challenges with rotation through different movement domains" },
            Agency: { description: "The CrossFit athlete masters self-programming but lacks strategic periodization", tip: "Create a quarterly personal development roadmap with specific skill expansion opportunities" },
            Alignment: { description: "The CrossFit athlete shows strong skill versatility but requires clearer organizational alignment", tip: "Map each new skill acquisition to department goals and team objectives" },
            Adaptability: { description: "The CrossFit athlete demonstrates high work capacity but lacks systematic recovery planning", tip: "Implement annual reflection or guided conversation to reassess career values" }
        }
    },
    "High-Low-High-Low": {
        title: "The E-sport Player",
        description: "Like an elite e-sports player mastering new game mechanics while coordinating team strategies, you combine swift skill acquisition with organizational awareness. You analyze changes and adapt strategies, naturally connecting personal growth to team success.",
        developmentAreas: {
            Agility: { description: "The pro gamer excels at mastering new mechanics and would benefit from more systematic skill progression", tip: "Create regular skill training routines for new technologies while sharing knowledge in team sessions" },
            Agency: { description: "The pro gamer excels at developing unique playstyles and can strengthen long-term strategic planning", tip: "Map out your skill development path while building on your distinctive strengths" },
            Alignment: { description: "The pro gamer excels at individual performance and can enhance team-oriented strategic impact", tip: "Sync your skill development with team objectives through custom training assignments" },
            Adaptability: { description: "The pro gamer excels at quick adaptation to changes and would benefit from sustainable performance planning", tip: "Balance intensive learning periods with strategic breaks, like managing in-game resources" }
        }
    },
    "High-Low-Low-High": {
        title: "The High Jumper",
        description: "Like an elite high jumper perfecting their approach and technique while managing competition cycles, you excel at rapid skill acquisition while managing life commitments. You naturally time your peak performances with recovery periods, just as a jumper calibrates their run-up and launch.",
        developmentAreas: {
            Agility: { description: "The high jumper excels at precise execution and would benefit from more experimental learning approaches", tip: "Document successful learning patterns while trying different techniques for skill acquisition" },
            Agency: { description: "The high jumper excels at disciplined practice and can develop stronger career direction ownership", tip: "Take initiative in seeking stretch assignments that build on technical strengths" },
            Alignment: { description: "The high jumper excels at individual performance and can enhance collaborative impact", tip: "Co-design projects that leverage your technical precision for team objectives" },
            Adaptability: { description: "The high jumper excels at managing performance cycles and would benefit from strategic recovery planning", tip: "Design clear rhythms between intensive learning and integration periods" }
        }
    },
    "Low-High-High-Low": {
        title: "The Basketball Shooter",
        description: "Like an elite basketball shooter who balances personal scoring with team success, you masterfully chart your career while keeping organizational goals in focus. Just as a shooter knows when to take the shot and when to create opportunities for others, you strategically blend individual growth with team impact.",
        developmentAreas: {
            Agility: { description: "A sports tactician needs to balance planning with quick adaptation", tip: "Establish \"quick-test days\" where you commit to testing one new approach with minimal preparation" },
            Agency: { description: "A sports tactician excels at charting their course but requires more diverse experiences", tip: "Design a quarterly development roadmap that deliberately includes varied roles and cross-functional projects" },
            Alignment: { description: "A sports tactician shows strong organizational awareness but needs systematic tracking", tip: "Create monthly impact reports that map personal projects to specific organizational objectives" },
            Adaptability: { description: "A sports tactician needs to balance strategic career focus with personal life needs", tip: "Schedule quarterly life-career alignment reviews to adjust career pace with life stages" }
        }
    },
    "Low-High-Low-High": {
        title: "The Lifestyle Coach",
        description: "Like a lifestyle coach, you masterfully direct your career while respecting life's different seasons. Your talent lies in designing flexible career paths that maintain momentum through various life phases, just as a coach creates programs that adapt to their clients' changing fitness needs.",
        developmentAreas: {
            Agility: { description: "The lifestyle coach excels at guiding others through change and would benefit from accelerating their own learning adaptability", tip: "Take an assessment on your learning agility to find out your preferred learning style" },
            Agency: { description: "The lifestyle coach excels at creating sustainable paths for others and can develop clearer milestones for their own career journey", tip: "Take on 2–3 stretch assignments through STIP or GIG opportunities each year to expand your expertise beyond coaching" },
            Alignment: { description: "The lifestyle coach excels at personal-professional integration and can strengthen their contribution to business outcomes", tip: "Schedule quarterly check-ins with your supervisors to align your projects to organizational goals better" },
            Adaptability: { description: "The lifestyle coach is evolving their own professional identity across different career phases", tip: "Develop your personal brand further by identifying your unique value across different seasons of life" }
        }
    },
    "Low-Low-High-High": {
        title: "The Season Trainer",
        description: "Like a seasonal training coach, you harmonize organizational goals with life's natural rhythms, skillfully balancing business cycles with personal seasons. You excel at creating sustainable strategic impact while maintaining healthy work-life integration, just as a trainer adjusts team intensity through different seasons while keeping sight of long-term objectives.",
        developmentAreas: {
            Agility: { description: "The season trainer excels at cyclical planning and would benefit from quicker adaptation to new skills", tip: "When your team adopts new technology, learn basics within the first week instead of waiting for formal training" },
            Agency: { description: "The season trainer excels at managing seasonal demands and can develop stronger long-term career vision", tip: "Create a 5-year career vision with specific role targets, not just responding to organizational needs" },
            Alignment: { description: "The season trainer excels at strategic timing and can enhance systematic impact tracking", tip: "Create a quarterly impact dashboard showing how your seasonal work patterns enhance organizational goals" },
            Adaptability: { description: "The season trainer excels at life-work integration and would benefit from maintaining strategic consistency", tip: "Design a seasonal effectiveness plan that maintains strategic input across different life intensities" }
        }
    },
    "High-High-High-Low": {
        title: "The Triathlete",
        description: "Like a skilled triathlete who excels in multiple disciplines, you are a versatile high performer who combines rapid learning ability, strategic mindset, and self-directed career management. Your strength lies in high performance across multiple areas while maintaining sustainable pacing for long-term organizational impact.",
        developmentAreas: {
            Agility: { description: "The triathlete excels at mastering multiple disciplines and would benefit from more structured learning progression", tip: "Challenge yourself with cross-functional projects that combine technical and strategic elements" },
            Agency: { description: "The triathlete excels at multi-domain performance and can develop more focused career direction", tip: "Design roles that combine your technical expertise with strategic leadership" },
            Alignment: { description: "The triathlete excels at performance optimization and can strengthen organizational alignment", tip: "Map your skill development to organizational priorities" },
            Adaptability: { description: "The triathlete excels at sustained high performance and would benefit from strategic recovery planning", tip: "Create sustainable rhythms that prevent burnout while maintaining high performance" }
        }
    },
    "High-High-Low-High": {
        title: "The Surfer",
        description: "Like a seasoned surfer who reads ocean patterns, you excel at navigating career uncertainties while maintaining your rhythm through different seasons. Just as a surfer knows when to charge waves and when to wait, you combine opportunistic agility with strategic patience to create career momentum.",
        developmentAreas: {
            Agility: { description: "The surfer excels at riding dynamic changes and would benefit from more structured experimentation", tip: "Experiment with new skills through short-term projects while documenting your learning patterns for optimization" },
            Agency: { description: "The surfer excels at reading conditions independently and can develop stronger network connections", tip: "Build strategic networks that open up more career possibilities while maintaining your pioneering spirit" },
            Alignment: { description: "The surfer excels at adapting to changing environments and can strengthen organizational alignment", tip: "Create quarterly check-ins with mentors who can help link your contributions to strategic outcomes" },
            Adaptability: { description: "The surfer excels at catching momentum and would benefit from better consolidation periods", tip: "Balance your appetite for learning with deliberate periods of skill consolidation and reflection" }
        }
    },
    "High-Low-High-High": {
        title: "The Gymnast",
        description: "Like an elite gymnast mastering multiple apparatus and routines, you excel at adapting strategies while meeting precise technical requirements. You naturally balance agile execution with strategic recovery across different life seasons.",
        developmentAreas: {
            Agility: { description: "The gymnast excels at precise execution and would benefit from more strategic skill planning", tip: "Master new collaboration tools during your team's digital transformation phase, creating deliberate learning sprints" },
            Agency: { description: "The gymnast excels at technical mastery and can develop stronger career path ownership", tip: "Create a personal development plan beyond your current organizational role, designing intentional career moves" },
            Alignment: { description: "The gymnast excels at meeting technical requirements and can enhance systematic impact tracking", tip: "Align intensive project phases with the organization's quarterly priorities, measuring both short-term and long-term value" },
            Adaptability: { description: "The gymnast excels at performance consistency and would benefit from structured impact planning", tip: "Lead strategic initiatives during high-energy seasons while maintaining advisory roles during family-focused periods" }
        }
    },
    "Low-High-High-High": {
        title: "The F1 Driver",
        description: "Like an F1 driver who masters racing and team strategy, you excel at directing your path while aligning personal goals with organizational objectives. Just as a driver knows when to accelerate and when to conserve, you strategically choose when to pursue opportunities and when to maintain sustainable momentum at different life stages.",
        developmentAreas: {
            Agility: { description: "The F1 driver excels at quick decision-making and would benefit from developing systematic learning patterns", tip: "Break down unfamiliar assignments into small learning sprints, deliberately seeking projects outside your comfort zone" },
            Agency: { description: "The F1 driver excels at navigating high-stakes situations and can develop a broader experience portfolio", tip: "Build a diverse portfolio of experiences while proactively seeking stakeholder feedback to refine your career direction" },
            Alignment: { description: "The F1 driver excels at team coordination and can enhance systematic development planning", tip: "Design development opportunities by identifying emerging organizational needs that align with your interests" },
            Adaptability: { description: "The F1 driver excels at peak performance management and would benefit from structured recovery periods", tip: "Structure your year with clear growth and recovery periods, building support systems that help maintain sustainable performance across different life phases" }
        }
    },
    "High-High-High-High": {
        title: "The Olympian",
        description: "Like an Olympic champion who excels across all aspects of performance—mastering new techniques, directing their training, aligning with team goals, and maintaining career longevity—you demonstrate mastery in all career fitness dimensions.",
        developmentAreas: {
            Agility: { description: "The Olympian excels at peak performance mastery and would benefit from more cross-functional challenges", tip: "Challenge yourself with cross-functional projects that stretch your expertise into new domains" },
            Agency: { description: "The Olympian excels at disciplined self-direction and can develop a more diverse experience portfolio", tip: "Design stretch assignments that combine your strengths with organizational priorities while seeking diverse stakeholder feedback" },
            Alignment: { description: "The Olympian excels at achieving excellence standards and can strengthen organizational impact", tip: "Develop expertise in areas where organizational capability gaps intersect with your career aspirations" },
            Adaptability: { description: "The Olympian excels at sustained high performance and would benefit from strategic recovery planning", tip: "Structure your year with clear growth and recovery periods while building sustainable support systems" }
        }
    },
    "Low-Low-Low-Low": {
        title: "The Rookie Athlete",
        description: "Like someone just starting their fitness journey, you're at the beginning of developing your career fitness capabilities. This is an exciting time with tremendous potential for growth across all dimensions.",
        developmentAreas: {
            Agility: { description: "The rookie athlete may need to develop foundational learning habits and consistent practice routines", tip: "Break down learning into small, manageable blocks while discovering your preferred learning style" },
            Agency: { description: "The rookie athlete may need to build basic career ownership skills and goal-setting discipline", tip: "Create a weekly goals checklist while maintaining a simple career journal to track achievements" },
            Alignment: { description: "The rookie athlete may need to understand team dynamics and organizational fundamentals", tip: "Learn your team's key objectives through regular career conversations with your supervisor" },
            Adaptability: { description: "The rookie athlete may need to establish consistent work-life patterns and energy management", tip: "Map your energy patterns throughout the day while practicing basic boundary-setting between work and life" }
        }
    },
    "default": {
        title: "The Versatile All-Rounder",
        description: "Your unique combination of strengths makes you a versatile and adaptable professional, capable of navigating a wide range of challenges and opportunities. You have a balanced skill set that allows you to contribute in many different ways."
    }
};
