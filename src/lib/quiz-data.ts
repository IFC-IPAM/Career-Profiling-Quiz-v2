
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
        description: "Like a HIIT enthusiast combining different movements in intense bursts, you excel at rapidly acquiring skills and switching between challenges. You leverage your preferred learning style to master new skills demonstrating quick adaptation in changing environment. Continue strengthening your strong agility while developing your agency, alignment, and adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at quick learning, you can continue to develop deeper expertise", tip: "Identify skills that align with your career interests to deepen and specialise into deep expertise" },
            Agency: { description: "You can develop clearer career direction and purpose", tip: "Create a long-term development roadmap that communicates your unique value proposition" },
            Alignment: { description: "You can develop stronger connections between your capabilities and organizational priorities", tip: "Schedule regular discussions with your supervisor to better align skill development with organizational needs" },
            Adaptability: { description: "You can develop more focused approaches for long-term success", tip: "Implement a weekly reflection routine to evaluate career priorities" }
        }
    },
    "Low-High-Low-Low": {
        title: "The Mountain Climber",
        description: "Like a skilled climber planning routes and ascents, you excel at charting your own career path and making independent decisions. You take full ownership of your journey, carefully assessing your position and identifying promising paths forward as you strategically navigate to new professional heights. Continue strengthening your strong sence of agency while developing your agility, alignment, and adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop an optimized learning approach using real-time work experiences as opportunities", tip: "Match tasks to your preferred learning style and measure effectiveness within your current work assignments" },
            Agency: { description: "While you excel at maintaining clear career direction, you can continue to strengthen your access to diverse pathways and insights", tip: "Build relationships and expand your network outside your team or agency who can serve as career guides" },
            Alignment: { description: "You can develop stronger organizational connections", tip: "Join at least one cross-functional project to build diverse organizational relationships" },
            Adaptability: { description: "You can develop better balance between career aspirations and personal wellbeing", tip: "Review career aspirations with your personal commitments by establishing clear boundaries and priorities" }
        }
    },
    "Low-Low-High-Low": {
        title: "The Archer",
        description: "Like an archer who masters wind patterns and distance calculations, you excel at aligning career moves with organizational needs, turning industry trends into opportunities. You maintain unwavering focus while adapting to changing conditions, calibrating personal development to create organizational impact. Continue strengthening your ability to align with organisational goals while developing your agility, agency and adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop quicker decision-making approaches rather than over-analyzing", tip: "Test different work methods through rapid trials to find your most effective approach, rather than waiting for perfect plans" },
            Agency: { description: "You can develop better balance between organizational requirements and personal growth", tip: "Engage with Public Service Career Coach to design a development plan that align with your career values and interests." },
            Alignment: { description: "While you excel at understanding organizational dynamics, you can continue to strengthen your structured approach", tip: "Create a personal development roadmap with quarterly milestones that balances your career aspirations with organizational goals" },
            Adaptability: { description: "You can develop better integration between work intensity and personal wellbeing", tip: "Schedule regular check-ins with your reporting officer during mid-year and year-end reviews to discuss workload sustainability" }
        }
    },
    "Low-Low-Low-High": {
        title: "The Marathon Runner",
        description: "Like a seasoned marathon runner adapting to changing terrains, you excel at pacing your career through life's seasons. You naturally know when to sprint ahead and when to adjust your stride, balancing career momentum with personal priorities. Continue strengthening your ability to adapt through different seasons of life while developing your agility, agency and alignment to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop a more proactive approach to skill development during stable work periods", tip: "Discuss your quarterly learning goals with your supervisor regular check-ins, focusing on both current role mastery and future skill needs" },
            Agency: { description: "You can develop more strategic career planning approaches", tip: "Engage with a Public service career coach or supervisor to explore your career values and its alignment with your career direction and development (horizontal, vertical or diagonal development)." },
            Alignment: { description: "You can develop stronger connections between individual work and team objectives", tip: "Map your personal contributions to team workplan outcomes during mid-year and year-end reviews, identifying areas where your strengths can better support team goals" },
            Adaptability: { description: "While you excel at maintaining long-term sustainability, you can continue to strengthen your approach to work-life harmony", tip: "Participate in Public Service communities (e.g. sports and volunteer) to develop hobbies and build supportive networks" }
        }
    },
    "High-High-Low-Low": {
        title: "The CrossFit Athlete",
        description: "Like a CrossFit athlete excelling at varied workouts while programming their own training, you combine rapid skill acquisition with strong career ownership. You master multiple competencies while maintaining clear direction of your development path, balancing quick learning with strategic progression. Continue strengthening your agility and agency while develop the skills to align and adaptat to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at rapid skill acquisition, you can continue to develop more structured learning progression", tip: "Set 1-2 development goals for the year with different competency areas (e.g., technical skills, core competencies)" },
            Agency: { description: "While you excel at self-directed learning, you can continue to strengthen your strategic planning", tip: "Create a quarterly personal development roadmap with specific skill expansion opportunities" },
            Alignment: { description: "You can develop clearer connections between your versatile skillset and organizational needs", tip: "Map each new competency to your department's strategic objectives and team workplan" },
            Adaptability: { description: "You can develop more systematic approaches to sustainable performance", tip: "Schedule regular reflection or guided conversation to reassess career values." }
        }
    },
    "High-Low-High-Low": {
        title: "The E-sport Player",
        description: "Like an elite e-sports player mastering new game mechanics while coordinating team strategies, you combine swift skill acquisition with organizational awareness. You analyze changes and adapt strategies, naturally connecting personal growth to team success. Continue strengthening your agility and alignment with organisation goals while developing your agency and adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at mastering new technologies, you can continue to develop more systematic skill progression", tip: "Create regular learning routines for emerging tools while conducting knowledge-sharing sessions with your team" },
            Agency: { description: "You can develop clearer long-term career direction while leveraging your unique strengths", tip: "Map out your professional development path with specific milestones and competency targets" },
            Alignment: { description: "While you excel at connecting individual contributions to team goals, you can continue to strengthen collaborative impact at department or organisational level.", tip: "Sync your skill development through regular inter-department/organisation level projects." },
            Adaptability: { description: "You can develop more sustainable approaches to managing work intensity", tip: "Balance intensive project periods with strategic recovery phases, explore project management techniques to increase time efficiency." }
        }
    },
    "High-Low-Low-High": {
        title: "The High Jumper",
        description: "Like an elite high jumper perfecting their approach and technique while managing competition cycles, you excel at rapid skill acquisition while managing life commitments. You naturally time your peak performances with recovery periods. Continue strengthening your agility and adaptation while developing your agency and alignment enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at precise execution in learning, you can continue to explore skills that best match your career interest and strengths", tip: "Join relevant Communities of Practice (CoPs) to build skills to find more fulfilment and expand network with peers across agencies" },
            Agency: { description: "You can develop stronger ownership of your career direction", tip: "Take initiative in seeking challenging assignments that build on your technical strengths and soft skills" },
            Alignment: { description: "You can develop stronger ways to contribute to team outcomes", tip: "Join cross-functional projects to broaden your impact while applying your technical and soft skills" },
            Adaptability: { description: "While you excel at managing work cycles now, you can continue to strengthen for long-term sustainability", tip: "Be aware of your energy levels, deliberately plan for recovery time after high-intensity projects periods." }
        }
    },
    "Low-High-High-Low": {
        title: "The Basketball Shooter",
        description: "Like an elite basketball shooter who balances personal scoring with team success, you masterfully chart your career while keeping organizational goals in focus. Just as a shooter knows when to take the shot and when to create opportunities for others, you blend individual growth with team impact. Continue strengthening your agency and align with organisational goals while developing your agility and adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop learn more efficiently to respond to dynamic work situations", tip: "Use LEARN portal's micro-learning modules for quick skill acquisition and immediately apply the concepts in your current projects" },
            Agency: { description: "While you excel at taking ownership of your development path, you can continue to diversify your experiences", tip: "Design a quarterly development roadmap that includes varied roles and cross-functional projects to expand your range" },
            Alignment: { description: "While you excel at hitting organizational targets, you can continue to strengthen your strategic contributions", tip: "Create monthly progress updates that clearly show how your work directly supports key organizational objectives" },
            Adaptability: { description: "You can develop better balance between performance intensity and recovery", tip: "Schedule half-yearly reviews to adjust your work intensity and ensure sustainable high performance over the long term" }
        }
    },
    "Low-High-Low-High": {
        title: "The Free Diver",
        description: "Like a free diver who masters precise control and calculated risks, skillfully balancing intense preparation phases with essential recovery periods. You demonstrate remarkable self-regulation and work-life integration, just as a free diver carefully manages deep dives with surface intervals. Continue strengthening your strong agency and adaptation while developing your agility and alignment to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop faster learning adaptability and skill experimentation", tip: "Take an assessment on your learning agility to discover new approaches beyond your comfort zone" },
            Agency: { description: "While you excel at calculated risk-taking and self-direction, you can continue to build clearer career milestones", tip: "Take on 2-3 stretch assignments through STIP or GIG opportunities to expand your expertise to new areas" },
            Alignment: { description: "You can develop stronger connections between your precise work and organizational goals", tip: "Schedule quarterly check-ins with supervisors to better align your contributions with organizational priorities" },
            Adaptability: { description: "While you excel at balancing intensity with recovery phases, you can continue to evolve across different life phases", tip: "Develop your professional identity by aligning your unique strengths with different seasons of life" }
        }
    },
    "Low-Low-High-High": {
        title: "The Synchronised Swimmer",
        description: "Like a synchronized swimmer, you excel at harmonizing with team rhythms and organizational flow, skillfully aligning your movements with collective patterns. You demonstrate natural ability in adapting to different performance cycles, just as a synchronized swimmer maintains perfect coordination through changing formations. Continue strengthening your strong alignment and adaptation while developing your agility and agency to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop faster independent learning and skill experimentation", tip: "When new systems are introduced, experiment with learning them independently rather than waiting for team guidance" },
            Agency: { description: "You can develop stronger individual career direction and ownership", tip: "Create a 3-year career vision with specific role targets, beyond current team responsibilities" },
            Alignment: { description: "While you excel at team synchronization and coordination, you can continue to enhance your strategic impact", tip: "Map how your collaborative strengths directly contribute to team and organizational outcomes" },
            Adaptability: { description: "While you excel at matching team rhythms and cycles, you can continue to refine your work-life integration", tip: "Create regular check-ins to assess and adjust your energy levels across different life phases" }
        }
    },
    "High-High-High-Low": {
        title: "The Triathlete",
        description: "Like a skilled triathlete who excels in multiple disciplines, you are a versatile high performer who combines rapid learning ability, strategic mindset, and self-directed career management. Your strength lies in high performance across multiple areas, while maintaining sustainable pacing for long-term organizational impact. Continue strengthening your strong agility, agency and alignment while developing your adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at mastering multiple disciplines, you can continue to build structured learning progression", tip: "Challenge yourself with cross-functional projects that combine different skill areas" },
            Agency: { description: "While you excel at multi-domain performance, you can continue to shape your career direction", tip: "Reshape your role by identifying opportunities that match your strengths and interests" },
            Alignment: { description: "While you excel at performance optimization, you can continue to strengthen organizational alignment", tip: "Map your skill development to organizational priorities" },
            Adaptability: { description: "You can develop better strategic recovery planning", tip: "Balance periods of intense work with proper rest to maintain performance" }
        }
    },
    "High-High-Low-High": {
        title: "The Surfer",
        description: "Like a seasoned surfer who reads ocean patterns, you excel at navigating career uncertainties while maintaining your rhythm through different seasons. Just as a surfer knows when to charge waves and when to wait, you combine opportunistic agility with strategic patience to create career momentum. Continue strengthening your strong agility, agency and adaptation while developing your alignment to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at riding dynamic changes, you can continue to participate in structured experimentation", tip: "Experiment with new skills through short-term projects while documenting your learning patterns for optimization" },
            Agency: { description: "While you excel at reading conditions independently, you can continue to develop network connections", tip: "Build strategic networks that open up more career possibilities while maintaining your pioneering spirit" },
            Alignment: { description: "You can develop stronger organizational alignment", tip: "Create quarterly check-ins with mentors who can help link your contributions to strategic outcomes" },
            Adaptability: { description: "While you excel at catching momentum, you can continue to refine your consolidation periods", tip: "Balance your appetite for learning with deliberate periods of skill consolidation and reflection" }
        }
    },
    "High-Low-High-High": {
        title: "The Gymnast",
        description: "Like an elite gymnast mastering multiple apparatus and routines, you excel at adapting strategies while meeting precise technical requirements. You naturally balance agile execution with strategic recovery across different life seasons. Continue strengthening your strong agility, alignment and adaptation while developing your agency to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "The gymnast excels at precise execution and would benefit from more strategic skill planning", tip: "Try out one new collaboration tool regularly to build your digital skills" },
            Agency: { description: "The gymnast excels at technical mastery and can develop stronger career path ownership", tip: "Create personal development plan beyond current organizational role, designing intentional career moves" },
            Alignment: { description: "The gymnast excels at meeting technical requirements and can enhance systematic impact tracking", tip: "Align your projects with organizational priorities to drive both team and organizational growth" },
            Adaptability: { description: "The gymnast excels at performance consistency and would benefit from structured impact planning", tip: "Adjust your work involvement to match your energy levels across different life phases" }
        }
    },
    "Low-High-High-High": {
        title: "The F1 Driver",
        description: "Like an F1 driver who masters racing and team strategy, you excel at directing your path while aligning personal goals with organizational objectives. Just as a driver knows when to accelerate and when to conserve, strategically choosing when to accelerate opportunities and when to maintain sustainable momentum at different life stages. Continue strengthening your strong agency, alignment and adaptation while developing your agility to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop more systematic learning patterns", tip: "Break down unfamiliar assignments into small learning sprints, deliberately seeking projects outside your comfort zone" },
            Agency: { description: "While you excel at navigating high-stakes situations, you can continue to build your experience portfolio", tip: "Build a diverse portfolio of experiences while proactively seeking stakeholder feedback to refine your career direction" },
            Alignment: { description: "While you excel at team coordination, you can continue to enhance development planning", tip: "Design development opportunities by identifying emerging organizational needs that align with your interests" },
            Adaptability: { description: "While you excel at peak performance management, you can continue to refine your recovery periods", tip: "Structure your year with clear growth and recovery periods, building support systems that help maintain sustainable performance across different life phases" }
        }
    },
    "High-High-High-High": {
        title: "The Olympian",
        description: "Like an Olympic champion who excels across all aspects of performance - mastering new techniques, directing their training, aligning with team goals, and maintaining career longevity - you demonstrate mastery in all career fitness dimensions.  Continue developing your agility, agency, alignment and adaptation to enhance your career fitness! Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "While you excel at peak performance mastery, you can continue to take on cross-functional challenges", tip: "Challenge yourself with cross-functional projects that stretch your expertise into new domains" },
            Agency: { description: "While you excel at disciplined self-direction, you can continue to build a diverse experience portfolio", tip: "Design stretch assignments that combine your strengths with organizational priorities while seeking diverse stakeholder feedback" },
            Alignment: { description: "While you excel at achieving excellence standards, you can continue to strengthen organizational impact", tip: "Develop expertise in areas where organizational capability gaps intersect with your career aspirations" },
            Adaptability: { description: "While you excel at sustained high performance, you can continue to refine your recovery planning", tip: "Structure your year with clear growth and recovery periods while building sustainable support systems" }
        }
    },
    "Low-Low-Low-Low": {
        title: "The Rookie Athlete",
        description: "Like someone just starting their fitness journey, you're at the beginning of developing your career fitness capabilities. This is an exciting time with tremendous potential for growth across all dimensions. Strengthen your agility, agency, alignment and adaptation to enhance your career fitness. Remember that all four areas can be strengthened through consistent practice.",
        developmentAreas: {
            Agility: { description: "You can develop foundational learning habits and consistent practice routines", tip: "Break down learning into small, manageable blocks while discovering your preferred learning style" },
            Agency: { description: "You can develop basic career ownership skills and goal-setting discipline", tip: "Create a weekly goals checklist while maintaining a simple career journal to track achievements" },
            Alignment: { description: "You can develop better understanding of team dynamics and organizational fundamentals", tip: "Learn your team's key objectives through regular career conversations with your supervisor" },
            Adaptability: { description: "You can develop consistent work-life patterns and energy management", tip: "Map your energy patterns throughout the day while practicing basic boundary-setting between work and life" }
        }
    },
    "default": {
        title: "The Versatile All-Rounder",
        description: "Your unique combination of strengths makes you a versatile and adaptable professional, capable of navigating a wide range of challenges and opportunities. You have a balanced skill set that allows you to contribute in many different ways."
    }
};
