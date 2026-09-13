export type LessonBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "key"; label: string; value: string };

export type Chapter = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  minutes: number;
  sections: { heading: string; blocks: LessonBlock[] }[];
};

export const chapters: Chapter[] = [
  {
    slug: "permits-and-licenses",
    title: "Permits, licenses & who can drive",
    eyebrow: "Getting started",
    summary:
      "Ages, permit rules, Class G night and passenger limits, and what Arizona expects before you hit the road.",
    minutes: 8,
    sections: [
      {
        heading: "Instruction permits",
        blocks: [
          {
            type: "p",
            text: "Arizona issues graduated and motorcycle instruction permits starting at 15 years and 6 months. An operator permit requires age 18.",
          },
          {
            type: "ul",
            items: [
              "Graduated or operator permit: you must be accompanied by a Class A, B, C, or D licensed driver who is at least 21 and sits beside you.",
              "These permits are valid for 12 months.",
              "Motorcycle permit: no passengers; no freeway/interstate riding between sunset and sunrise or when you cannot clearly see 500 feet ahead. Valid 7 months; renewable once in 24 months.",
            ],
          },
          {
            type: "callout",
            title: "Written test first",
            text: "Applicants must pass the Division’s written test before receiving an Arizona instruction permit (commercial learner’s permits are treated separately).",
          },
        ],
      },
      {
        heading: "Graduated license (Class G)",
        blocks: [
          {
            type: "p",
            text: "Issued to drivers at least 16 and under 18. For the first 6 months, night and passenger limits apply.",
          },
          {
            type: "key",
            label: "Night curfew",
            value: "Midnight–5:00 a.m. (with parent/guardian or limited exceptions)",
          },
          {
            type: "ul",
            items: [
              "No driving midnight–5:00 a.m. unless a parent/legal guardian with a valid Class A–D license is in the front seat, or you are going directly to/from school activity, work, religious activity, or a family emergency.",
              "No more than one passenger under 18 unless they are siblings or a parent/guardian with a valid Class A–D license is in the front seat.",
              "Hold an Arizona instruction permit at least 6 months (must be valid at application).",
              "Complete approved driver education, or parent certification of supervised practice (typically 30 hours with 10 at night, or 20 hours with 6 at night after TSS/Defensive Driving).",
            ],
          },
        ],
      },
      {
        heading: "Insurance & residency basics",
        blocks: [
          {
            type: "ul",
            items: [
              "Minimum liability: $25,000 bodily injury (one person), $50,000 (two or more), $15,000 property damage.",
              "Keep proof of current Arizona insurance in the vehicle.",
              "Notify MVD within 10 days of a name or address change.",
              "Resident triggers include working in Arizona, staying 7+ months in a calendar year, voting here, and other statutory factors.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "before-you-drive",
    title: "Before you drive",
    eyebrow: "Vehicle & passengers",
    summary:
      "Required equipment, seat belts, child restraints, and the checks that keep a vehicle legal and safe.",
    minutes: 7,
    sections: [
      {
        heading: "Buckle up Arizona",
        blocks: [
          {
            type: "p",
            text: "Front-seat occupants must wear a properly adjusted lap and shoulder belt (or lap belt if that is all that is installed). Drivers must require all passengers under 16 to buckle up.",
          },
          {
            type: "ul",
            items: [
              "Children under 5 must be in a proper child restraint system.",
              "Ages 5–8 must use a child restraint until at least 4 feet 9 inches tall.",
              "Children 12 and under should not ride in the front seat when an air bag is present.",
            ],
          },
        ],
      },
      {
        heading: "Required equipment",
        blocks: [
          {
            type: "ul",
            items: [
              "Working brakes (foot and parking), horn audible ~200 feet, muffler, seat belts (post-1972), turn signals, windshield/wipers, tires in good condition.",
              "If rear view is blocked, at least one outside driver-side mirror showing 200 feet behind.",
              "Hazard flashers when stopped on the roadway or shoulder.",
              "Secure and cover loads so nothing drops, sifts, or leaks onto the road.",
            ],
          },
          {
            type: "callout",
            title: "Tire check",
            text: "Use the door-jamb PSI and the penny tread test: Lincoln’s head should be partly covered by tread. Arizona heat, monsoon storms, and high-country ice reward good tires.",
          },
        ],
      },
    ],
  },
  {
    slug: "safe-driving",
    title: "Safe driving habits",
    eyebrow: "Space & attention",
    summary:
      "Defensive scanning, following distance, blind spots, signaling, and Arizona’s handheld device rules.",
    minutes: 8,
    sections: [
      {
        heading: "Space cushion & scanning",
        blocks: [
          {
            type: "p",
            text: "Use a 3–6 second following gap. Pick a landmark the vehicle ahead passes, then count. If you reach it too soon, you are too close. Need more space in rain, snow, ice, or behind large vehicles.",
          },
          {
            type: "ul",
            items: [
              "Look about one city block ahead and keep eyes moving.",
              "Check mirrors often; look over your shoulder before lane changes.",
              "Leave at least 3 feet when sharing a lane with a bicycle.",
              "Avoid lingering in another driver’s blind spot—including motorcycles.",
            ],
          },
        ],
      },
      {
        heading: "Signals & distractions",
        blocks: [
          {
            type: "key",
            label: "Signal early",
            value: "At least 100 feet (~4 seconds) before turning or changing lanes",
          },
          {
            type: "p",
            text: "Signaling does not give you the right-of-way. If you will turn beyond an intersection, wait to signal until you are in the intersection so others do not pull into your path.",
          },
          {
            type: "callout",
            title: "Wireless devices",
            text: "Arizona prohibits holding or supporting a wireless device while driving, reading/writing text-based communication, and watching/recording/broadcasting video. Hands-free or voice-to-text is allowed. Emergency reporting is an exception. Pull off safely to use a phone.",
          },
        ],
      },
      {
        heading: "Passing & parking essentials",
        blocks: [
          {
            type: "ul",
            items: [
              "Pass on the left when safe; return only after seeing the entire front/both headlights of the vehicle you passed.",
              "Do not pass within 100 feet of a crossing, railroad crossing, or bridge/tunnel/underpass with blocked view—or where a solid line/double solid forbids it.",
              "Illegal parking includes within 15 feet of a fire hydrant, 20 feet of a crosswalk at an intersection, 50 feet of a railroad crossing, on sidewalks, or blocking driveways.",
              "Downhill with curb: wheels toward curb. Uphill with curb: wheels left, roll to rest against curb. No curb: wheels right.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "signs-signals-lanes",
    title: "Signs, signals & lanes",
    eyebrow: "Roadway language",
    summary:
      "Lights, arrows, pavement markings, right-of-way, and default speed limits when signs are absent.",
    minutes: 10,
    sections: [
      {
        heading: "Traffic lights",
        blocks: [
          {
            type: "ul",
            items: [
              "Green: go if clear; still yield to traffic already in the intersection.",
              "Yellow: caution—stop if you have not entered; clear if already inside. Beating the light is illegal.",
              "Red: full stop before the intersection, stop line, or crosswalk. Right on red allowed after a complete stop unless signed otherwise, when clear of traffic and pedestrians.",
              "Flashing red = stop sign. Flashing yellow = slow and proceed with caution.",
              "Red arrow: no turn that way until green. Flashing yellow arrow: turn with caution after yielding.",
              "Dead signals: treat as a 4-way stop; if arriving together, the driver on the left yields to the right.",
            ],
          },
        ],
      },
      {
        heading: "Right-of-way & pedestrians",
        blocks: [
          {
            type: "p",
            text: "The law says who must yield—it does not “give” anyone the right to take a crash risk. Yield to pedestrians in marked or unmarked crosswalks. Stop for occupied school crossings. Do not pass a vehicle stopped for a pedestrian.",
          },
          {
            type: "ul",
            items: [
              "At a T-intersection, traffic on the ending street yields to the through street.",
              "Enter roundabouts to the right of the island; yield to traffic already inside and to large vehicles entering with you. Design speeds are often 15–20 mph.",
              "Freeway entrants yield to traffic already on the freeway. Never stop or back up on the freeway if you miss an exit.",
            ],
          },
        ],
      },
      {
        heading: "Default speed limits (no posted limit)",
        blocks: [
          {
            type: "ul",
            items: [
              "15 mph approaching a school crosswalk",
              "25 mph in business or residential districts",
              "55 mph on open highways or city freeways",
              "65 mph on designated open highways",
              "75 mph on rural freeways",
            ],
          },
          {
            type: "callout",
            title: "Conditions matter",
            text: "Posted limits assume good conditions. In bad weather, slow appropriately and double following distance. Do not impede traffic—keep right and let faster traffic pass.",
          },
        ],
      },
      {
        heading: "Lane lines (quick read)",
        blocks: [
          {
            type: "ul",
            items: [
              "Broken white: same-direction lanes—cross when safe after signaling.",
              "Solid white: right edge / same-direction separator—cross mainly for emergency or HOV merge rules.",
              "Double solid white: do not cross.",
              "Yellow lines separate opposite directions; two-way left-turn center lanes are for left turns only—not for passing or through travel.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sharing-the-road",
    title: "Sharing the road",
    eyebrow: "Others on AZ roads",
    summary:
      "Bicycles, motorcycles, trucks, school buses, emergency vehicles, and Move Over AZ.",
    minutes: 9,
    sections: [
      {
        heading: "Vulnerable users",
        blocks: [
          {
            type: "ul",
            items: [
              "Give bicyclists at least 3 feet when passing. Do not honk to pass—it can startle them.",
              "Motorcycles get a full lane. Never share the same lane. They can be harder to see and judge for speed/distance.",
              "Lane filtering (when legal/safe): motorcycle may pass stopped same-direction traffic if ≥2 adjacent same-direction lanes, posted limit ≤45 mph, and motorcycle ≤15 mph.",
            ],
          },
        ],
      },
      {
        heading: "Trucks & buses",
        blocks: [
          {
            type: "ul",
            items: [
              "Do not cut in front—trucks need roughly twice the stopping distance.",
              "Stay out of the No-Zone blind spots around the front, sides, and rear.",
              "Trucks make wide right turns; never squeeze on the right when a truck may turn.",
            ],
          },
        ],
      },
      {
        heading: "Emergency vehicles, Move Over, school buses",
        blocks: [
          {
            type: "p",
            text: "Yield to emergency vehicles with lights/siren: move right and stop until they pass. Stay at least 500 feet behind a fire vehicle and 300 feet behind a police vehicle responding to an emergency.",
          },
          {
            type: "callout",
            title: "Move Over Law",
            text: "When any vehicle with flashing lights is on the side of the road, move over one lane if safe. If not, slow down and use caution. Applies statewide on multi-lane roads and city streets.",
          },
          {
            type: "ul",
            items: [
              "School bus with alternating flashers and stop arm out: stop from either direction on undivided roads until the bus moves or signals stop.",
              "On a physically divided roadway, you need not stop for a bus traveling the opposite direction—but still use extreme caution.",
              "Road striping alone is not a physical divider.",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "weather-and-emergencies",
    title: "Weather & emergencies",
    eyebrow: "Arizona conditions",
    summary:
      "Dust storms, rain and hydroplaning, freeway emergencies, and staying calm when conditions change.",
    minutes: 6,
    sections: [
      {
        heading: "Dust storms: pull aside, stay alive",
        blocks: [
          {
            type: "ul",
            items: [
              "Slow immediately when visibility drops—do not wait until you cannot see.",
              "Drive completely off the highway as far right as possible.",
              "Stop out of travel and emergency lanes; turn lights off; take your foot off the brake.",
              "Stay buckled in the vehicle until the storm passes.",
            ],
          },
        ],
      },
      {
        heading: "Rain, glare, and freeways",
        blocks: [
          {
            type: "ul",
            items: [
              "First 30 minutes of rain: oil and grime make roads especially slick—slow down and use ~6 seconds following distance.",
              "Hydroplaning risk rises around 50 mph in heavy rain; slow down and keep tires healthy.",
              "If disabled on a freeway: right shoulder as far as possible, flashers/hood/dome light, wait for help—do not walk the freeway.",
              "Never drive in a gore area (the painted triangle between a ramp and through lanes).",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "alcohol-and-judgment",
    title: "Alcohol, drugs & judgment",
    eyebrow: "Zero room for risk",
    summary:
      "Impairment, open containers, under-21 zero tolerance, and why 0.08 is not a green light.",
    minutes: 6,
    sections: [
      {
        heading: "Impairment is a crime",
        blocks: [
          {
            type: "p",
            text: "Alcohol, marijuana, medications, and illegal drugs reduce reflexes, vehicle control, and hazard recognition—and create false confidence. Over-the-counter allergy/cold meds can impair too—read labels.",
          },
          {
            type: "key",
            label: "Legal limit (21+)",
            value: "0.08 BAC — you can still be arrested for DUI below that level",
          },
          {
            type: "ul",
            items: [
              "Under 21: zero tolerance—any impairing alcohol/drugs can bring stiff penalties and a 2-year license suspension.",
              "Open container of spirituous liquor in the passenger compartment on a public roadway is illegal for drivers and passengers (limited exemptions for bus/limo/taxi/motorhome living area).",
              "Best practice: Zero-Tolerance…No Alcohol when you will drive.",
            ],
          },
        ],
      },
      {
        heading: "Aggressive driving & emotions",
        blocks: [
          {
            type: "p",
            text: "Aggressive driving can be charged when you create an immediate hazard, exceed the speed limit, and commit two listed violations in one continuous drive (examples: ignoring signals, unsafe lane change, following too closely, failing to yield to emergency vehicles).",
          },
          {
            type: "callout",
            title: "Fit to drive",
            text: "Anger, illness, fatigue, and distraction all degrade decisions. Wait until you are calm and well enough—or let someone else drive.",
          },
        ],
      },
    ],
  },
  {
    slug: "key-numbers",
    title: "Key numbers to memorize",
    eyebrow: "Quick drill",
    summary:
      "A compact list of distances, ages, fees, and limits that show up again and again on practice tests.",
    minutes: 5,
    sections: [
      {
        heading: "Distances & timing",
        blocks: [
          {
            type: "ul",
            items: [
              "Signal ≥ 100 feet before turning",
              "Following distance: 3–6 seconds (double in bad weather)",
              "Bike pass clearance: 3 feet",
              "No pass within 100 feet of intersections, RR crossings, or view-blocked bridges/tunnels",
              "No parking within 15 ft of hydrant, 20 ft of crosswalk at intersection, 50 ft of RR crossing",
              "Emergency follow gaps: 500 ft fire / 300 ft police responding",
              "Horn / bike headlamp visibility references often use 200–500 feet in the manual",
            ],
          },
        ],
      },
      {
        heading: "Ages, scores & money",
        blocks: [
          {
            type: "ul",
            items: [
              "Permit age: 15½ (graduated/motorcycle); operator permit: 18",
              "Written exam pass score: 80% or higher",
              "Class G first-6-months curfew: midnight–5:00 a.m.",
              "Child seats: under 5; booster rules through 8 or 4'9\"",
              "Insurance minima: $25k / $50k / $15k",
              "Report address/name changes within 10 days",
            ],
          },
          {
            type: "callout",
            title: "Exam shape",
            text: "Arizona’s knowledge exam is multiple choice. Official practice tests and the real exam expect at least 80%. This app’s full practice set mirrors a 30-question, optionally timed session.",
          },
        ],
      },
    ],
  },
];

export function getChapter(slug: string) {
  return chapters.find((c) => c.slug === slug);
}

export function chapterIndex(slug: string) {
  return chapters.findIndex((c) => c.slug === slug);
}
