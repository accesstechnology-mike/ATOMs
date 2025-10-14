export interface RatingDescriptor {
  rating: number;
  description: string;
}

export interface FrameworkSection {
  id: string;
  category: "qol" | "at_buyin" | "at_technical";
  categoryLabel: string;
  name: string;
  prompt: string;
  descriptors: RatingDescriptor[];
}

export const frameworkSections: FrameworkSection[] = [
  // Quality of Life considerations (4 sections)
  {
    id: "qol_understanding",
    category: "qol",
    categoryLabel: "Quality of Life considerations",
    name: "Understanding of client's needs",
    prompt: "The client's support network are:",
    descriptors: [
      {
        rating: 1,
        description:
          "Care is taken to ensure the client is physically and emotionally ready to learn and/or engage in activities. The support team recognises the social, environmental and procedural barriers that hinder client success and work collaboratively to overcome them. Support team prioritise and are extremely responsive to clients physical, social and emotional needs",
      },
      {
        rating: 2,
        description:
          "Clients physical, social and emotional wellbeing are well considered and planned for. Client perspectives and opinions are considered and drive supporting activities where it is safe and appropriate to do so.",
      },
      {
        rating: 3,
        description:
          "Support is driven by policy, outcome or process. Further action is required to ensure client's social, emotional and/or physical wellbeing is considered and supported.",
      },
    ],
  },
  {
    id: "qol_intentions",
    category: "qol",
    categoryLabel: "Quality of Life considerations",
    name: "Supportive of client intentions",
    prompt: "The client's support network are:",
    descriptors: [
      {
        rating: 1,
        description:
          "Client is encouraged and/or able to regularly advocate for themselves, receives advocacy support or has an advocate that acts on their behalf. Support is committed to hearing, understanding and validating client's wishes, opinions and intentions. Plans for support and intervention are based on the client's wishes and intentions, with clients directing their own support/goals where possible.",
      },
      {
        rating: 2,
        description:
          "Opportunities are created to hear, understand and validate clients opinions, wishes and areas of interest. Support team is responsive to client's communication and behaviour.",
      },
      {
        rating: 3,
        description:
          "Opportunities are missed to hear and/or understand client's own opinions, wishes or areas of interest. Little support and/or value given to the exploration of client's areas of interest",
      },
    ],
  },
  {
    id: "qol_autonomy",
    category: "qol",
    categoryLabel: "Quality of Life considerations",
    name: "Facilitate client autonomy and independence",
    prompt: "The client's support network:",
    descriptors: [
      {
        rating: 1,
        description:
          "Client is happy and makes excellent progress as a result of highly skilled, respectful and responsive support. Client has excellent relationship with support team and is empowered to direct and make decisions about their own support. Client's health, safety and wellbeing are well considered. Client is enabled to make contributions and be part of decision making processes where possible.",
      },
      {
        rating: 2,
        description:
          "Client has a good relationship with their support team and is enabled to make age/capacity appropriate choices and contributions. Support is skilled in identifying when a client can do things for themselves and when they need additional support. Client is generally happy and makes good progress toward goals Client's health and safety is well considered.",
      },
      {
        rating: 3,
        description:
          "Opportunities to enable client choice making are missed or are not age/capacity appropriate. Client's progress, wellbeing and/or safety is hindered by over or under-support.",
      },
    ],
  },
  {
    id: "qol_expectations",
    category: "qol",
    categoryLabel: "Quality of Life considerations",
    name: "Respectful & fair age/capacity-appropriate expectations",
    prompt: "The client's support network have:",
    descriptors: [
      {
        rating: 1,
        description:
          "Expectations are aspirational and are respectful of client's age, interest, cognitive ability and physical ability. Communication is positive and is supportive of client's rights to explore and express their identity.",
      },
      {
        rating: 2,
        description:
          "Expectations are reasonable, and consider the client's age, interest, cognitive and physical abilities. Communication is appropriate and respectful.",
      },
      {
        rating: 3,
        description:
          "Expectations are too high/too low and do not take into consideration the client's rights and freedoms relative to their age, cognitive and/or physical abilities. Communication is inappropriate, patronising, lacking positivity and/or aspiration.",
      },
    ],
  },
  // AT buy-in (2 sections)
  {
    id: "at_buyin_impact",
    category: "at_buyin",
    categoryLabel: "AT buy-in",
    name: "Recognise the positive impact AT can have",
    prompt: "The client's support network:",
    descriptors: [
      {
        rating: 1,
        description:
          "Demonstrates an excellent awareness of the potential ways that AT can improve the quality of life of all disabled people and has high aspirations for what the client can make possible.",
      },
      {
        rating: 2,
        description:
          "Recognises the potential ways that AT can improve the client's quality of life and is committed to supporting the client to achieve their goals.",
      },
      {
        rating: 3,
        description:
          "Requires further opportunity to learn about the benefits of AT and support to build confidence in its ability to enhance the client's life.",
      },
    ],
  },
  {
    id: "at_buyin_practice",
    category: "at_buyin",
    categoryLabel: "AT buy-in",
    name: "Understand and demonstrate AT best practice",
    prompt: "The client's support network:",
    descriptors: [
      {
        rating: 1,
        description:
          "Has the confidence and insight to develop solutions that support client intentions beyond current intervention and recommendations, without the support of an AT professional. Is comfortable and equipped to motivate the client during periods of non-linear progress.",
      },
      {
        rating: 2,
        description:
          "Can deliver effective support using AT, developing client skills and knowledge drawing upon support from AT professionals as required. Is able to motivate clients to achieve outcomes, is not process or tech focussed.",
      },
      {
        rating: 3,
        description:
          "Relies on support put forward by AT professional to deliver intervention to client. Finds it hard to action recommendations Is unsure of AT journey e.g. might expect AT to have an immediate positive impact, endpoint etc.",
      },
    ],
  },
  // AT technical knowledge & understanding (3 sections)
  {
    id: "at_technical_understanding",
    category: "at_technical",
    categoryLabel: "AT technical knowledge & understanding",
    name: "Understand how the AT solution works and what it can do",
    prompt: "The client's support network:",
    descriptors: [
      {
        rating: 1,
        description:
          "Applies extensive knowledge and understanding of the capabilities of the client's AT, how it can be accessed and navigated, to pursue new and engaging opportunities that expand and support client intentions.",
      },
      {
        rating: 2,
        description:
          "Demonstrates sound knowledge and understanding of the capabilities of client's AT and how it can be accessed/navigated.",
      },
      {
        rating: 3,
        description:
          "Demonstrates some understanding of how the solution works and/or the purpose of the AT solution but would benefit from further guidance/training.",
      },
    ],
  },
  {
    id: "at_technical_opportunities",
    category: "at_technical",
    categoryLabel: "AT technical knowledge & understanding",
    name: "Can identify and create opportunities for client to use AT solutions",
    prompt: "The client's support network:",
    descriptors: [
      {
        rating: 1,
        description:
          "Is being led by the client's interests and intentions to create and identify opportunities for regular and appropriate use of AT - without direction from supporting professionals.",
      },
      {
        rating: 2,
        description:
          "Is enabling the client to use AT at appropriate and frequent opportunities- as directed by supporting professionals.",
      },
      {
        rating: 3,
        description:
          "Is finding it difficult to identify suitable or regular opportunities for the client to use their AT.",
      },
    ],
  },
  {
    id: "at_technical_troubleshoot",
    category: "at_technical",
    categoryLabel: "AT technical knowledge & understanding",
    name: "Can troubleshoot and resolve technical barriers",
    prompt: "The client's support network:",
    descriptors: [
      {
        rating: 1,
        description:
          "Can resolve more complex or uncommon technical problems without professional support. Is confident to seek professional support when necessary.",
      },
      {
        rating: 2,
        description:
          "Can resolve common technical problems independently. Will contact supporting professionals for assistance to discuss faults, problems, concerns and changes.",
      },
      {
        rating: 3,
        description:
          "Regularly relies on supporting professionals to troubleshoot simple/common technical problems Does not notify supporting professionals of faults, problems, concerns and changes",
      },
    ],
  },
];

export const getCategoryLabel = (category: string): string => {
  const labels = {
    qol: "Quality of Life considerations",
    at_buyin: "AT buy-in",
    at_technical: "AT technical knowledge & understanding",
  };
  return labels[category as keyof typeof labels] || category;
};

