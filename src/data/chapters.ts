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

/**
 * Lessons reorganized around AZ_MVD_Permit_Test_Animated_Study_Guide.pdf:
 * key-number strip, 60-second memory map, then theme clusters from the
 * 120 rapid flashcards (Sets 1–4).
 */
export const chapters: Chapter[] = [
  {
    slug: "memory-map-numbers",
    title: "How this guide works & key numbers",
    eyebrow: "Study map",
    summary:
      "The animated study guide’s opener: how each flashcard works, plus the number strip worth memorizing first.",
    minutes: 5,
    sections: [
      {
        heading: "How the guide studies",
        blocks: [
          {
            type: "p",
            text: "Each flashcard gives a question, the answer, a one-line reason, and a short memory hook. The PDF repeats items on purpose—repetition is part of the drill.",
          },
          {
            type: "callout",
            title: "Study trick from the guide",
            text: "Read the question, cover the answer, say your answer out loud, then check. Repeat any card you miss twice.",
          },
          {
            type: "p",
            text: "This app turns those cards into short lessons and multiple-choice practice. Items are study-guide practice aids—not official MVD exam questions.",
          },
        ],
      },
      {
        heading: "Key numbers strip",
        blocks: [
          { type: "key", label: "Address change", value: "10 days to notify MVD" },
          { type: "key", label: "Fire hydrant / crosswalk parking", value: "15 feet" },
          { type: "key", label: "School crosswalk speed", value: "20 mph" },
          { type: "key", label: "Unposted business/residential", value: "25 mph" },
          { type: "key", label: "Turn signal", value: "100 feet before turning" },
          { type: "key", label: "High beams when following", value: "Dim within 200 feet" },
          {
            type: "key",
            label: "High beams for oncoming / emergency follow",
            value: "500 feet",
          },
          { type: "key", label: "Following distance", value: "3-second gap" },
        ],
      },
    ],
  },
  {
    slug: "sign-shapes",
    title: "Sign shapes & what they mean",
    eyebrow: "Memory map",
    summary:
      "Octagon, triangle, diamond, pennant, and the guide’s most-tested warning and regulatory meanings.",
    minutes: 7,
    sections: [
      {
        heading: "Shape shortcuts",
        blocks: [
          {
            type: "ul",
            items: [
              "Octagon = STOP",
              "Triangle (point down) = YIELD",
              "Diamond = WARNING",
              "Pennant = NO PASSING ZONE",
            ],
          },
          {
            type: "callout",
            title: "Memory hooks",
            text: "OCTAGON = STOP · TRIANGLE = YIELD · PENNANT = NO PASS. If you only remember shapes, you can still decode a foggy sign.",
          },
        ],
      },
      {
        heading: "Flashcard meanings to lock in",
        blocks: [
          {
            type: "ul",
            items: [
              "School-shaped pedestrian sign = school crossing",
              "Pedestrian-shaped diamond = pedestrian crossing",
              "Slippery-road (wavy tire) sign = slippery when wet",
              "Lane-ending sign = lane ends / merge",
              "Divided-highway-begins sign = divided highway starts",
              "Crossed left-turn symbol = no left turn permitted",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "lights-and-signals",
    title: "Lights, arrows & hand signals",
    eyebrow: "Memory map",
    summary:
      "Flashing red/yellow, arrows, right-on-red, and the three classic arm signals from the flashcards.",
    minutes: 7,
    sections: [
      {
        heading: "Traffic lights",
        blocks: [
          {
            type: "ul",
            items: [
              "Flashing red = stop, then proceed when clear (like a stop sign)",
              "Flashing yellow = slow down, check traffic, proceed with caution",
              "Red arrow = wait; do not turn that way until allowed",
              "Green arrow = go in the arrow’s direction when clear",
              "Right turn on red = allowed after a complete stop unless a sign prohibits it",
            ],
          },
        ],
      },
      {
        heading: "Hand signals",
        blocks: [
          {
            type: "ul",
            items: [
              "Arm straight out = left turn",
              "Arm upward = right turn",
              "Arm downward = slow or stop",
            ],
          },
          {
            type: "callout",
            title: "Memory hooks",
            text: "FLASHING RED = STOP · FLASHING YELLOW = SLOW · ARM STRAIGHT OUT = LEFT.",
          },
        ],
      },
    ],
  },
  {
    slug: "lanes-and-passing",
    title: "Lane lines, passing & blind spots",
    eyebrow: "Memory map",
    summary:
      "Yellow vs white lines, when you may pass, how to return after passing, and the shoulder-check habit.",
    minutes: 8,
    sections: [
      {
        heading: "Line language",
        blocks: [
          {
            type: "ul",
            items: [
              "Yellow center lines = opposing traffic",
              "Broken yellow = passing allowed when safe",
              "Double solid yellow = no passing",
              "Broken yellow beside solid yellow = pass only if the broken line is on your side",
              "Broken white = same-direction lanes; you may change lanes when safe",
            ],
          },
        ],
      },
      {
        heading: "Passing & lane changes",
        blocks: [
          {
            type: "ul",
            items: [
              "Lane change = mirrors, then turn your head for a shoulder check",
              "Return after passing when you can see both headlights of the passed vehicle in your inside rearview mirror",
              "Left turns follow the proper turning path into the matching lane (the guide’s Lane 1 diagram)",
            ],
          },
          {
            type: "callout",
            title: "Memory hooks",
            text: "BOTH HEADLIGHTS = RETURN · LANE CHANGE = SHOULDER CHECK · BROKEN LINE ON YOUR SIDE = PASS.",
          },
        ],
      },
    ],
  },
  {
    slug: "parking-wheels",
    title: "Parking rules & hill wheels",
    eyebrow: "Memory map",
    summary:
      "Hydrant distance, accessible spaces, and the uphill/downhill wheel rules the guide hammers.",
    minutes: 6,
    sections: [
      {
        heading: "Where not to park",
        blocks: [
          {
            type: "ul",
            items: [
              "Illegal to park within 15 feet of a fire hydrant",
              "Accessible (wheelchair) spaces are reserved with no exceptions for unauthorized vehicles",
            ],
          },
          { type: "key", label: "Hydrant rule", value: "15 feet — HYDRANT = 15 FT" },
        ],
      },
      {
        heading: "Hill parking wheel positions",
        blocks: [
          {
            type: "ul",
            items: [
              "Uphill with a curb = turn wheels left (away from the curb)",
              "Downhill = turn wheels right (toward the edge/curb)",
              "Uphill with no curb = turn wheels right, toward the edge of the road",
            ],
          },
          {
            type: "callout",
            title: "Memory hooks",
            text: "UPHILL + CURB = LEFT · DOWNHILL = RIGHT · NO CURB = WHEELS RIGHT.",
          },
        ],
      },
    ],
  },
  {
    slug: "buses-emergency-row",
    title: "Buses, emergency vehicles & right-of-way",
    eyebrow: "Memory map",
    summary:
      "School-bus stop arms, divided highways, emergency-vehicle yield, pedestrians, and uncontrolled intersections.",
    minutes: 8,
    sections: [
      {
        heading: "School buses",
        blocks: [
          {
            type: "ul",
            items: [
              "When a bus is picking up/dropping off with the stop arm extended, stop until the bus moves or the arm is no longer extended",
              "On a divided highway, traffic traveling the same direction as the bus must stop; opposite-direction traffic on a physically divided road is treated differently in the guide’s divided-road card",
              "Watch for children crossing in front of or behind the bus",
            ],
          },
          {
            type: "callout",
            title: "Memory hooks",
            text: "BUS ARM OUT = STOP · DIVIDED ROAD = SAME DIRECTION.",
          },
        ],
      },
      {
        heading: "Emergency vehicles & other ROW",
        blocks: [
          {
            type: "ul",
            items: [
              "Emergency vehicle with lights/siren: move right and stop until it passes",
              "Yield to pedestrians in crosswalks or intersections (guide’s broad pedestrian answer)",
              "Straight-through traffic has priority over a left-turning vehicle in the guide’s illustrated conflict",
              "At an uncontrolled intersection when arriving together, yield to the vehicle on your right (guide diagram: Car 3)",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "weather-visibility-control",
    title: "Visibility, weather & vehicle control",
    eyebrow: "Memory map",
    summary:
      "Dust storms, fog, wet roads, headlight dimming, blowouts, skids, and locked wheels—straight from the control strip.",
    minutes: 8,
    sections: [
      {
        heading: "See and be seen",
        blocks: [
          {
            type: "ul",
            items: [
              "Fog = use low beams",
              "Dim high beams within 500 feet of oncoming traffic",
              "Dim high beams within 200 feet when following another vehicle",
              "Severe dust storm = reduce speed and pull off the road safely",
              "Wet roads = reduce speed (guide: by at least one third)",
            ],
          },
        ],
      },
      {
        heading: "Control emergencies",
        blocks: [
          {
            type: "ul",
            items: [
              "Tire blowout = do not hard-brake; slow down and pull off",
              "Hydroplane / lose traction feel = lift off the accelerator",
              "Skid = stay off the brakes and steer into the skid",
              "Locked wheels on ice = ease off the brakes",
              "When backing = turn and look out the rear window (don’t rely on mirrors alone)",
              "Stay aware behind you by checking the rearview mirror often",
            ],
          },
          {
            type: "callout",
            title: "Memory hooks",
            text: "BLOWOUT = NO BRAKE · DUST = SLOW + OFF ROAD · SKID = STEER INTO IT · WET = SLOW 1/3 · FOG = LOW BEAMS.",
          },
        ],
      },
    ],
  },
  {
    slug: "everyday-rules",
    title: "Everyday rules the cards repeat",
    eyebrow: "Flashcard set themes",
    summary:
      "Bicyclists, child seats, under-21 alcohol, crashes with injuries, mirrors, and the numbers that keep coming back.",
    minutes: 6,
    sections: [
      {
        heading: "People & responsibility",
        blocks: [
          {
            type: "ul",
            items: [
              "Bicyclists must obey the same traffic laws as motor vehicles (BIKE = SAME RULES)",
              "Child safety seats required for a child under age 5 (UNDER 5 = SEAT)",
              "A person under 21 is ‘under the influence’ at any measurable alcohol amount (UNDER 21 = ANY AMOUNT)",
              "If you are in a crash with injuries, remain at the scene (INJURY CRASH = STAY)",
            ],
          },
        ],
      },
      {
        heading: "Numbers to say out loud",
        blocks: [
          {
            type: "ul",
            items: [
              "Following distance: at least 3 seconds",
              "Signal continuously at least 100 feet before a turn",
              "Notify MVD of an address change within 10 days",
              "School crosswalk approach: 20 mph",
              "Unposted business/residential: 25 mph",
            ],
          },
          {
            type: "callout",
            title: "Official manual supplement",
            text: "Where this flashcard guide is thin (permit ages, Class G night limits, insurance minimums, Move Over details), lessons elsewhere in Arizona Permit Path may still cite the official ADOT Driver License Manual so rules stay complete and safe.",
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
