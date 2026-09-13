export type Question = {
  id: string;
  topic: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

/**
 * Practice items grounded in the Arizona Driver License Manual (ADOT MVD).
 * Labeled in the UI as study-guide practice—not official MVD exam questions.
 */
export const questions: Question[] = [
  {
    id: "q01",
    topic: "permits-and-licenses",
    prompt: "At what minimum age may you receive a graduated instruction permit in Arizona?",
    choices: ["14 years", "15 years", "15 years and 6 months", "16 years"],
    correctIndex: 2,
    explanation:
      "Arizona may issue a graduated and/or motorcycle instruction permit at 15 years and 6 months of age.",
  },
  {
    id: "q02",
    topic: "permits-and-licenses",
    prompt: "While driving with a graduated or operator instruction permit, who must accompany you?",
    choices: [
      "Any licensed driver 18 or older in the back seat",
      "A Class A, B, C, or D licensed driver at least 21 sitting beside you",
      "A parent only, regardless of license class",
      "No accompaniment is required on residential streets",
    ],
    correctIndex: 1,
    explanation:
      "You must be accompanied by a Class A, B, C, or D licensed driver at least 21 who occupies the seat beside you.",
  },
  {
    id: "q03",
    topic: "permits-and-licenses",
    prompt: "For the first 6 months, a Class G graduated license holder generally may not drive between:",
    choices: [
      "9:00 p.m. and 5:00 a.m.",
      "10:00 p.m. and 6:00 a.m.",
      "Midnight and 5:00 a.m.",
      "1:00 a.m. and 6:00 a.m.",
    ],
    correctIndex: 2,
    explanation:
      "Unless an exception applies (parent/guardian in front seat or certain trips), the curfew is midnight to 5:00 a.m.",
  },
  {
    id: "q04",
    topic: "permits-and-licenses",
    prompt: "Arizona’s minimum private passenger liability insurance includes property damage coverage of at least:",
    choices: ["$5,000", "$10,000", "$15,000", "$25,000"],
    correctIndex: 2,
    explanation:
      "Minimums are $25,000/$50,000 bodily injury and $15,000 property damage liability.",
  },
  {
    id: "q05",
    topic: "permits-and-licenses",
    prompt: "You must notify MVD of a name or address change within:",
    choices: ["24 hours", "10 days", "30 days", "60 days"],
    correctIndex: 1,
    explanation: "Arizona law requires notification within 10 days of any name or address change.",
  },
  {
    id: "q06",
    topic: "before-you-drive",
    prompt: "A child who is under five years of age must be:",
    choices: [
      "In the front seat with a lap belt",
      "Properly secured in a child restraint system",
      "Allowed to stand if the trip is short",
      "Secured only on freeways",
    ],
    correctIndex: 1,
    explanation:
      "Arizona law requires children under five to be properly secured in a child restraint system.",
  },
  {
    id: "q07",
    topic: "before-you-drive",
    prompt: "Children between five and eight years of age must remain in a child restraint system until they are at least:",
    choices: ["4 feet tall", "4 feet 9 inches tall", "5 feet tall", "80 pounds"],
    correctIndex: 1,
    explanation:
      "Ages 5–8 must use a child restraint until they reach a minimum of four feet, nine inches tall.",
  },
  {
    id: "q08",
    topic: "before-you-drive",
    prompt: "The driver of a motor vehicle must require which passengers to buckle up?",
    choices: [
      "Only front-seat adults",
      "All passengers under 16 years of age",
      "Only passengers under 8",
      "Only passengers on freeways",
    ],
    correctIndex: 1,
    explanation: "The operator must require all passengers under age 16 to buckle up.",
  },
  {
    id: "q09",
    topic: "before-you-drive",
    prompt: "A working horn must be audible from about:",
    choices: ["50 feet", "100 feet", "200 feet", "500 feet"],
    correctIndex: 2,
    explanation: "Arizona requires a working horn that can be heard for 200 feet.",
  },
  {
    id: "q10",
    topic: "safe-driving",
    prompt: "How far ahead should you generally signal before turning?",
    choices: ["25 feet", "50 feet", "At least 100 feet", "500 feet"],
    correctIndex: 2,
    explanation:
      "Signal at least 100 feet (about 4 seconds) before you turn so others have time to react.",
  },
  {
    id: "q11",
    topic: "safe-driving",
    prompt: "Using the 3–6 second rule means you:",
    choices: [
      "Count how many cars are between you and the next light",
      "Measure following distance by timing when you reach a landmark the vehicle ahead passed",
      "May follow bumper-to-bumper under 30 mph",
      "Only need one second on freeways",
    ],
    correctIndex: 1,
    explanation:
      "When the vehicle ahead passes a point, count seconds until you reach it. Finishing early means you are too close.",
  },
  {
    id: "q12",
    topic: "safe-driving",
    prompt: "Arizona law on wireless devices while driving generally prohibits:",
    choices: [
      "Hands-free calls only",
      "Holding or supporting a wireless device, and reading/writing text-based communication",
      "Using GPS at all times",
      "Any phone in the vehicle, even when parked",
    ],
    correctIndex: 1,
    explanation:
      "You may not hold/support a wireless device while driving, or write/read text-based communication (with limited emergency exceptions). Hands-free/voice-to-text is allowed.",
  },
  {
    id: "q13",
    topic: "safe-driving",
    prompt: "When sharing a lane with a bicycle, allow at least:",
    choices: ["1 foot", "2 feet", "3 feet", "One full empty lane only"],
    correctIndex: 2,
    explanation: "Motorists must allow a minimum safe distance of 3 feet when passing a bicyclist.",
  },
  {
    id: "q14",
    topic: "safe-driving",
    prompt: "You must not pass when approaching within 100 feet of:",
    choices: [
      "A gas station driveway",
      "A street crossing or railroad crossing",
      "A painted gore area only",
      "Any solid white edge line",
    ],
    correctIndex: 1,
    explanation:
      "Do not pass within 100 feet of a street crossing or railroad crossing (among other listed situations).",
  },
  {
    id: "q15",
    topic: "safe-driving",
    prompt: "When parking downhill next to a curb, turn your wheels:",
    choices: [
      "Away from the curb",
      "Toward the curb",
      "Straight ahead with no brake",
      "Left, then right twice",
    ],
    correctIndex: 1,
    explanation: "Downhill with a curb: turn wheels toward the curb and set the parking brake.",
  },
  {
    id: "q16",
    topic: "signs-signals-lanes",
    prompt: "A flashing red traffic light means:",
    choices: [
      "Slow and continue without stopping",
      "The same as a stop sign—full stop, then proceed when clear",
      "Stop only if cross traffic is present",
      "The signal is about to turn green",
    ],
    correctIndex: 1,
    explanation: "A flashing red light has the same meaning as a stop sign.",
  },
  {
    id: "q17",
    topic: "signs-signals-lanes",
    prompt: "A steady yellow light means:",
    choices: [
      "Speed up to clear the intersection",
      "Caution—the light is about to turn red; stop if you have not entered",
      "You must always stop even if already in the intersection",
      "Pedestrians may cross against you",
    ],
    correctIndex: 1,
    explanation:
      "Yellow warns the light will turn red. Stop if you have not entered; if already inside, continue and clear safely. Beating the light is illegal.",
  },
  {
    id: "q18",
    topic: "signs-signals-lanes",
    prompt: "Unless a sign prohibits it, a right turn on red is allowed only after:",
    choices: [
      "Slowing to 5 mph",
      "A complete stop and when traffic and pedestrians are clear",
      "Honking once",
      "Waiting for a green arrow",
    ],
    correctIndex: 1,
    explanation:
      "Come to a complete stop first, then turn right when motor and pedestrian traffic are clear, unless signs prohibit it.",
  },
  {
    id: "q19",
    topic: "signs-signals-lanes",
    prompt: "When traffic signals are completely out, treat the intersection as:",
    choices: [
      "Uncontrolled—first in goes first without stopping",
      "A 4-way stop",
      "Yield only to the left",
      "Closed to all traffic",
    ],
    correctIndex: 1,
    explanation:
      "Inoperative signals are treated like a 4-way stop. If two vehicles arrive together, the driver on the left yields to the right.",
  },
  {
    id: "q20",
    topic: "signs-signals-lanes",
    prompt: "If no speed limit is posted, the limit when approaching a school crosswalk is:",
    choices: ["10 mph", "15 mph", "20 mph", "25 mph"],
    correctIndex: 1,
    explanation: "Default limit is 15 mph when approaching a school crosswalk.",
  },
  {
    id: "q21",
    topic: "signs-signals-lanes",
    prompt: "If no speed limit is posted in a business or residential district, the limit is:",
    choices: ["15 mph", "25 mph", "35 mph", "45 mph"],
    correctIndex: 1,
    explanation: "Default limit is 25 mph in any business or residential district.",
  },
  {
    id: "q22",
    topic: "signs-signals-lanes",
    prompt: "Vehicles approaching a roundabout must:",
    choices: [
      "Enter at highway speed to keep traffic flowing",
      "Yield to vehicles already in the roundabout",
      "Stop in the circle until their exit clears",
      "Always turn left around the island",
    ],
    correctIndex: 1,
    explanation:
      "Enter to the right of the central island and yield to traffic already in the roundabout (and large vehicles entering with you).",
  },
  {
    id: "q23",
    topic: "signs-signals-lanes",
    prompt: "Traffic entering a freeway must:",
    choices: [
      "Have absolute right-of-way",
      "Yield to traffic already on the freeway",
      "Stop on the ramp until a police officer waves them on",
      "Use the left lane immediately",
    ],
    correctIndex: 1,
    explanation: "Entering traffic must yield right-of-way to traffic already on the freeway.",
  },
  {
    id: "q24",
    topic: "signs-signals-lanes",
    prompt: "A double solid white line between same-direction lanes means:",
    choices: [
      "Passing is encouraged",
      "Crossing is prohibited",
      "Only trucks may cross",
      "It marks opposite-direction traffic",
    ],
    correctIndex: 1,
    explanation: "Crossing a double solid white line is prohibited.",
  },
  {
    id: "q25",
    topic: "signs-signals-lanes",
    prompt: "A two-way left turn center lane may be used to:",
    choices: [
      "Pass slow traffic",
      "Travel as a through lane when congested",
      "Make left turns (not for passing or through travel)",
      "Park briefly during peak hours",
    ],
    correctIndex: 2,
    explanation:
      "The center two-way left turn lane is only for left turns—not passing, through traffic, or accelerating to merge.",
  },
  {
    id: "q26",
    topic: "sharing-the-road",
    prompt: "When a school bus displays alternating flashing lights and an extended stop-sign arm on an undivided road, you must:",
    choices: [
      "Slow to 15 mph and pass carefully",
      "Stop completely before reaching the bus from either direction until the signals stop",
      "Honk and proceed if no children are visible",
      "Stop only if you are behind the bus",
    ],
    correctIndex: 1,
    explanation:
      "On undivided roadways you must stop from either direction until the bus moves or the stop arm/lights are no longer shown.",
  },
  {
    id: "q27",
    topic: "sharing-the-road",
    prompt: "You are not required to stop for a school bus traveling the opposite direction when:",
    choices: [
      "There are painted yellow lines only",
      "The roadway is physically divided by a barrier, curb, fence, or separated pavement",
      "You are late for work",
      "The bus is more than two cars ahead",
    ],
    correctIndex: 1,
    explanation:
      "On a physically divided roadway, opposite-direction traffic need not stop. Striping alone is not a physical separation.",
  },
  {
    id: "q28",
    topic: "sharing-the-road",
    prompt: "Arizona’s Move Over Law requires you to:",
    choices: [
      "Always stop behind any parked car",
      "Move over one lane when safe for vehicles with flashing lights on the roadside, or slow and use caution",
      "Speed up to clear the area quickly",
      "Only move over for fire trucks",
    ],
    correctIndex: 1,
    explanation:
      "Move over one lane when safe; if not possible, slow down and use caution for any vehicle with flashing lights on the side of the road.",
  },
  {
    id: "q29",
    topic: "sharing-the-road",
    prompt: "When following a fire department vehicle responding to an emergency, stay at least:",
    choices: ["100 feet behind", "200 feet behind", "300 feet behind", "500 feet behind"],
    correctIndex: 3,
    explanation:
      "Maintain at least 500 feet behind a fire department vehicle responding to an emergency (300 feet for police).",
  },
  {
    id: "q30",
    topic: "sharing-the-road",
    prompt: "Why should you avoid the “No-Zone” around large trucks?",
    choices: [
      "Trucks cannot use turn signals",
      "Those areas are large blind spots where the truck driver may not see you",
      "It is illegal to drive near trucks",
      "Trucks always travel under 25 mph",
    ],
    correctIndex: 1,
    explanation:
      "Trucks have large blind spots around the front, sides, and rear. Do not hang out in the No-Zone.",
  },
  {
    id: "q31",
    topic: "sharing-the-road",
    prompt: "If a truck ahead signals a right turn and leaves space on the right, you should:",
    choices: [
      "Pass quickly on the right",
      "Squeeze into the gap to get ahead",
      "Not pass on the right—trucks need room for wide right turns",
      "Honk so the truck waits",
    ],
    correctIndex: 2,
    explanation:
      "Trucks make wide right turns and may leave space on the right. Do not pass there if a right turn is possible.",
  },
  {
    id: "q32",
    topic: "weather-and-emergencies",
    prompt: "In a severe dust storm, after pulling safely off the roadway you should:",
    choices: [
      "Keep headlights and foot brake on so others see you",
      "Turn lights off, take your foot off the brake, stay buckled, and wait",
      "Walk to the nearest exit",
      "Stop in the travel lane with flashers only",
    ],
    correctIndex: 1,
    explanation:
      "ADOT guidance: get fully off the highway, turn lights off, foot off the brake, stay buckled, and wait for the storm to pass.",
  },
  {
    id: "q33",
    topic: "weather-and-emergencies",
    prompt: "During heavy rain, a good practice is to:",
    choices: [
      "Maintain normal dry-road following distance",
      "Increase following distance (about 6 seconds) and reduce speed",
      "Drive in others’ blind spots to save space",
      "Use cruise control on standing water",
    ],
    correctIndex: 1,
    explanation:
      "In bad weather, double following distance and slow appropriately. The first 30 minutes of rain can be especially slick.",
  },
  {
    id: "q34",
    topic: "weather-and-emergencies",
    prompt: "If you miss your freeway exit, you should:",
    choices: [
      "Stop and back up in the gore area",
      "Make a U-turn across the median",
      "Continue to the next exit—never back up on the freeway",
      "Cross the solid line into the exit late",
    ],
    correctIndex: 2,
    explanation: "If you miss an exit, do not stop or back up. Take the next exit and re-enter correctly.",
  },
  {
    id: "q35",
    topic: "weather-and-emergencies",
    prompt: "Driving through a gore area (the space between a through lane and a ramp) is:",
    choices: ["Recommended when traffic is heavy", "Against the law", "Required for HOV access", "Only illegal at night"],
    correctIndex: 1,
    explanation: "It is against the law to drive over or park in any part of a gore area.",
  },
  {
    id: "q36",
    topic: "alcohol-and-judgment",
    prompt: "For drivers 21 and older, Arizona’s BAC legal limit is 0.08. Driving with a lower BAC:",
    choices: [
      "Is always completely legal and safe",
      "Can still lead to a DUI arrest because impairment can begin below 0.08",
      "Is only illegal on freeways",
      "Requires a warning citation only",
    ],
    correctIndex: 1,
    explanation:
      "Being under 0.08 does not mean it is legal or safe to drive; you can still be arrested for DUI.",
  },
  {
    id: "q37",
    topic: "alcohol-and-judgment",
    prompt: "For drivers under 21, Arizona’s alcohol policy is best described as:",
    choices: [
      "The same 0.08 limit as adults",
      "Zero tolerance—any impairing alcohol/drugs can bring serious penalties including lengthy suspension",
      "Allowed with a parent in the car",
      "Legal under 0.02 BAC only on weekends",
    ],
    correctIndex: 1,
    explanation:
      "Under 21: zero tolerance. Any trace of impairing alcohol/drugs can mean stiff penalties and a 2-year suspension.",
  },
  {
    id: "q38",
    topic: "alcohol-and-judgment",
    prompt: "An open container of spirituous liquor in the passenger compartment on a public roadway is:",
    choices: [
      "Legal if the driver is sober",
      "Illegal for driver and passengers (with limited vehicle-type exemptions)",
      "Legal only after 10 p.m.",
      "Legal in the glove box",
    ],
    correctIndex: 1,
    explanation:
      "Open container possession/consumption in the passenger compartment on public roadways is illegal, with limited exemptions (bus, limo, taxi, motorhome living area).",
  },
  {
    id: "q39",
    topic: "alcohol-and-judgment",
    prompt: "Aggressive driving in Arizona can involve exceeding the speed limit and committing two listed violations while creating an immediate hazard. A possible first-offense result is:",
    choices: [
      "No penalty if nobody is hurt",
      "Traffic Survival School and possible 30-day suspension",
      "Automatic lifetime revocation",
      "Only a written warning",
    ],
    correctIndex: 1,
    explanation:
      "First offense: Traffic Survival School may be required and the license may be suspended for 30 days.",
  },
  {
    id: "q40",
    topic: "key-numbers",
    prompt: "What score is required to pass the Arizona driver license written examination?",
    choices: ["70%", "75%", "80% or higher", "90% or higher"],
    correctIndex: 2,
    explanation: "ADOT states a score of 80 percent or higher is required to pass the examination.",
  },
  {
    id: "q41",
    topic: "before-you-drive",
    prompt: "It is illegal to park within how many feet of a fire hydrant?",
    choices: ["5 feet", "10 feet", "15 feet", "25 feet"],
    correctIndex: 2,
    explanation: "Parking within 15 feet of a fire hydrant is prohibited.",
  },
  {
    id: "q42",
    topic: "before-you-drive",
    prompt: "Do not park within how many feet of a railroad crossing?",
    choices: ["15 feet", "20 feet", "30 feet", "50 feet"],
    correctIndex: 3,
    explanation: "Parking within 50 feet of a railroad crossing is prohibited.",
  },
  {
    id: "q43",
    topic: "signs-signals-lanes",
    prompt: "At a T-intersection, which driver must yield?",
    choices: [
      "Drivers on the through street",
      "The driver on the street that ends",
      "Whoever arrives second",
      "Larger vehicles only",
    ],
    correctIndex: 1,
    explanation: "At a T-intersection, the driver on the street which ends must yield to vehicles on the cross street.",
  },
  {
    id: "q44",
    topic: "sharing-the-road",
    prompt: "When an emergency vehicle with lights/siren approaches, you should:",
    choices: [
      "Speed up to clear the intersection first",
      "Yield, move to the right, and stop until it passes",
      "Follow closely to get through traffic",
      "Stop in the left lane",
    ],
    correctIndex: 1,
    explanation:
      "Yield the right-of-way, move right, and stop until the emergency vehicle has passed.",
  },
  {
    id: "q45",
    topic: "safe-driving",
    prompt: "Signaling a turn:",
    choices: [
      "Gives you the absolute right-of-way",
      "Does not give you the right-of-way",
      "Is optional under 25 mph",
      "Is only required at night",
    ],
    correctIndex: 1,
    explanation: "Signaling lets others know your plan—it does not give you the right-of-way.",
  },
];

export function getQuestionsByIds(ids: string[]) {
  const map = new Map(questions.map((q) => [q.id, q]));
  return ids.map((id) => map.get(id)).filter(Boolean) as Question[];
}

export function pickExamQuestions(count = 30) {
  const pool = [...questions];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}
