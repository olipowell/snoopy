export type LiveUpdate = {
  id: string
  time: string
  headline: string
  paragraphs: string[]
  bullets?: string[]
  author?: {
    name: string
    image: string
  }
  usefulCount: number
}

export type LiveArticle = {
  topic: string
  headline: string
  updatedLabel: string
  heroImage: string
  heroAlt: string
  summaries: string[]
  updates: LiveUpdate[]
}

export const liveArticle: LiveArticle = {
  topic: "UK Weather",
  headline:
    "Storm Boelo brings 85mph gusts and travel disruption with amber weather warnings in effect",
  updatedLabel: "Updated just now",
  heroImage: "storm-boelo-hero.jpg",
  heroAlt: "Waves breaking over a coastal road during Storm Boelo",
  summaries: [
    "Storm Boelo has brought gusts of up to 85mph, with amber weather warnings still in force across parts of the UK",
    "Trains have been cancelled, roads closed by fallen trees and flooding, and ferry services suspended",
    "Thousands of homes across the island of Ireland are without electricity as the storm moves through",
    "Flood warnings remain active across England, Scotland and Wales, with further heavy rain forecast",
  ],
  updates: [
    {
      id: "cumbrian-coast",
      time: "09:01",
      headline: "Storm Boelo batters Cumbrian coastal communities overnight",
      paragraphs: [
        "In Maryport on the West Cumbrian coast, communities are seeing the effects of a night of strong winds, localised flooding and travel disruption.",
        "Several red flood warnings are in place along the coast. Floodgates have been closed to help protect waterfronts, homes and businesses, while gusts approached 78mph at nearby St Bees Head.",
      ],
      usefulCount: 184,
    },
    {
      id: "england-flood-warnings",
      time: "08:53",
      headline:
        "Flood warnings in place across north of England as some urged to act",
      paragraphs: [
        "Ten flood warnings and 66 flood alerts are active in England. A warning is the more serious category and means flooding is expected.",
        "People in affected areas are being advised to follow local guidance and begin acting on their flood plans where necessary.",
      ],
      usefulCount: 129,
    },
    {
      id: "cardiff-trains",
      time: "08:41",
      headline:
        "Heavy flooding disrupts Cardiff train services as warnings issued across Wales",
      paragraphs: [
        "Transport for Wales says services between Cardiff Central and Pontyclun may be delayed because of flooding on the railway.",
        "Passengers are being asked to check before travelling as weather warnings remain in place.",
      ],
      usefulCount: 96,
    },
    {
      id: "power-cuts",
      time: "08:25",
      headline: "Thousands without electricity across island of Ireland",
      paragraphs: [
        "Thousands of homes are without power as Storm Boelo crosses the island of Ireland, with warnings still covering parts of Northern Ireland and County Donegal.",
        "Among the areas most affected are Springfield, Bushmills and Milford, where network operators are working to restore supplies.",
      ],
      usefulCount: 142,
    },
    {
      id: "scotland-power",
      time: "08:14",
      headline: "Power cuts reported in 57 places across Scotland",
      paragraphs: [
        "The power network company SSEN is logging dozens of unplanned outages, mainly in the Western Isles, the west Highlands, and Argyll and Bute.",
        "There are also reports of flooding along the Clyde coast in Largs and Saltcoats.",
      ],
      usefulCount: 118,
    },
    {
      id: "travel-routes",
      time: "08:02",
      headline: "Multiple train and ferry routes disrupted because of storm",
      paragraphs: [
        "National Rail says the storm is affecting several operators and routes. Ferry services are also disrupted as high winds and rough seas continue.",
      ],
      bullets: [
        "Avanti West Coast advises passengers not to travel north of Preston",
        "LNER advises against travel between Edinburgh and Aberdeen",
        "Passengers should check their journey before setting off",
      ],
      usefulCount: 207,
    },
    {
      id: "rainfall",
      time: "07:54",
      headline: "Almost 7cm of rain fell in 24 hours in some parts of UK",
      paragraphs: [
        "Rain fell across the whole of the UK at some point on Saturday, with the wettest locations recording close to 7cm in 24 hours.",
        "Saturated ground is increasing the risk of surface-water flooding and disruption in areas receiving further showers.",
      ],
      usefulCount: 83,
    },
    {
      id: "forecast",
      time: "07:42",
      headline:
        "Winds not easing until overnight in the north as Scotland faces more heavy rain",
      paragraphs: [
        "The strongest winds have generally been across north-western parts of the UK, particularly Scotland, while an 85mph gust was also recorded on the Isle of Wight.",
        "Winds should ease in southern areas during the afternoon, but northern areas will remain exposed until overnight and Scotland has more heavy rain to come.",
      ],
      usefulCount: 231,
    },
    {
      id: "weather-warnings",
      time: "07:15",
      headline: "What you need to know about UK weather warnings",
      paragraphs: [
        "The Met Office issues yellow, amber and red warnings when dangerous weather is forecast. The level reflects both the expected impact and how likely it is to happen.",
      ],
      bullets: [
        "Yellow: weather may cause some disruption",
        "Amber: disruption is likely and conditions may pose a risk",
        "Red: dangerous weather is expected and action should be taken",
      ],
      usefulCount: 312,
    },
  ],
}
