export type InlineComment = {
  id: string
  author: string
  avatar: string
  timestamp: string
  text: string
}

export type LiveUpdate = {
  id: string
  time: string
  headline: string
  paragraphs: string[]
  bullets?: string[]
  author?: {
    name: string
    role?: string
    image?: string
  }
  comments?: InlineComment[]
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
  topic: "Weather",
  headline: "Storm Boelo batters Scotland and causes chaos across UK",
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
      id: "more-rain-and-strong-winds",
      time: "19:32",
      headline: "More rain and strong winds on the way",
      author: {
        name: "Annie Flury",
        role: "BBC Weather",
      },
      paragraphs: [
        "We're ending our live coverage of Storm Boelo, but the unsettled weather remains - and there's more to come.",
        "While Storm Boelo will move away overnight, Monday morning will bring yet more rain to many parts of south-west England, Wales and Northern Ireland.",
        "The rain will move quickly north-eastwards, reaching central, eastern and northern England, as well as most of Scotland, by around lunchtime.",
        "Another deep area of low pressure is already approaching from the Atlantic. As this moves to the north-west of the country during Monday and Tuesday it will bring another dose of rain and gales.",
      ],
      comments: [
        {
          id: "comment-1",
          author: "Maya Thompson",
          avatar: "profile-avatar.png",
          timestamp: "2 mins ago",
          text: "😤Rain, rain, go away, come again another day",
        },
        {
          id: "comment-2",
          author: "Alex Morgan",
          avatar: "49a3a.png",
          timestamp: "6 mins ago",
          text: "The wind has eased where I am, but there is still a lot of standing water on the roads.",
        },
        {
          id: "comment-3",
          author: "Sophie Rahman",
          avatar: "3cc5a.png",
          timestamp: "9 mins ago",
          text: "Thanks for keeping the forecast clear and in one place. The timing for Monday morning is especially helpful.",
        },
        {
          id: "comment-4",
          author: "Daniel Hughes",
          avatar: "f2dfd.png",
          timestamp: "12 mins ago",
          text: "It would be good to see the warning area on a map alongside this update.",
        },
        {
          id: "comment-5",
          author: "Priya Shah",
          avatar: "5716f.png",
          timestamp: "16 mins ago",
          text: "Our trains are running again this evening, although the station is still advising everyone to check before travelling.",
        },
        {
          id: "comment-6",
          author: "Tom Bennett",
          avatar: "ad18a.png",
          timestamp: "19 mins ago",
          text: "The next area of low pressure sounds concerning after such a difficult weekend.",
        },
        {
          id: "comment-7",
          author: "Ellie Foster",
          avatar: "ade29.png",
          timestamp: "23 mins ago",
          text: "We have family in south-west England, so the early Monday forecast is very useful.",
        },
        {
          id: "comment-8",
          author: "Marcus Green",
          avatar: "feeaf.png",
          timestamp: "27 mins ago",
          text: "Conditions are much calmer on the coast now, but clean-up work is only just beginning.",
        },
        {
          id: "comment-9",
          author: "Hannah Cole",
          avatar: "80216.png",
          timestamp: "31 mins ago",
          text: "Please keep the travel advice prominent if the rain moves north-east as forecast.",
        },
        {
          id: "comment-10",
          author: "Jamie Wilson",
          avatar: "49a3a.png",
          timestamp: "35 mins ago",
          text: "The detail about warmer air in the south is interesting given how unsettled everything still feels.",
        },
        {
          id: "comment-11",
          author: "Amina Yusuf",
          avatar: "3cc5a.png",
          timestamp: "41 mins ago",
          text: "Appreciate the update. Hoping power can be restored quickly for everyone still affected.",
        },
        {
          id: "comment-12",
          author: "Chris Walker",
          avatar: "f2dfd.png",
          timestamp: "48 mins ago",
          text: "A difficult few days for communities across the country. Thanks to the crews working through the weather.",
        },
      ],
      usefulCount: 184,
    },
    {
      id: "storm-boelo-latest",
      time: "19:15",
      headline: "Storm Boelo batters Scotland and causes chaos across UK",
      author: {
        name: "Rachel Flynn",
        role: "Live reporter",
        image: "authors/rachel-flynn.webp",
      },
      paragraphs: [
        "Storm Boelo brought chaos to the UK on Sunday, with a top wind gust of 85mph recorded in the Scottish village of Machrihanish.",
        "Scotland bore the brunt. An amber wind warning remained in place across large parts of Scotland and northern England, while a 60-year-old man was killed after being hit by a tree near Castle Douglas.",
        "Large parts of the UK and the island of Ireland experienced strong winds and heavy rainfall, with widespread power outages.",
        "The Energy Networks Association said 161,400 properties remained without power at 15:00 GMT.",
      ],
      usefulCount: 129,
    },
    {
      id: "scotrail-services",
      time: "19:01",
      headline:
        "ScotRail says 'vast majority' of services to run on Monday - but warns to check before you travel",
      author: {
        name: "Rachel Grant",
        role: "BBC Scotland",
      },
      paragraphs: [
        'ScotRail faced a day of disruption across its routes, but says the "vast majority" of services were expected to run as normal on Monday.',
        "Fallen trees and debris have been cleared from tracks, overhead lines repaired, and floods and power cuts tackled.",
        "Network Rail says its teams will continue throughout the night to get the railway ready for Monday morning, but passengers should check their journeys before setting off.",
      ],
      usefulCount: 96,
    },
    {
      id: "wind-gusts-and-heavy-rain",
      time: "18:51",
      headline: "Very high wind gusts and heavy rain for all UK nations today",
      author: {
        name: "Annie Flury",
        role: "BBC Weather",
      },
      paragraphs: [
        "The ferocious winds haven't abated as the day has gone on and all nations of the UK have experienced some very high wind gusts along with heavy rain.",
        "The biggest figures recorded in Scotland were 85mph gusts in Machrihanish and 131mm of rain at Cluanie Inn in the Highlands.",
        "In England, 85mph gusts were recorded at the Needles on the Isle of Wight, while 115mm of rain fell at White Barrow in Wiltshire.",
      ],
      usefulCount: 142,
    },
    {
      id: "properties-without-power",
      time: "18:36",
      headline:
        "More than 160,000 properties without power Sunday afternoon, industry body says",
      paragraphs: [
        "Latest data from the Energy Networks Association shows that 838,700 properties across the UK have been affected by power cuts during Storm Boelo and Storm Austen.",
        "The association, which represents operators in the UK and Ireland, says 161,400 properties remained without power at 15:00 GMT.",
      ],
      usefulCount: 118,
    },
    {
      id: "police-scotland-warning",
      time: "18:31",
      headline:
        "'Remain focused and vigilant' with further disruption expected, Police Scotland say",
      author: {
        name: "Rachel Grant",
        role: "BBC Scotland",
      },
      paragraphs: [
        'Police Scotland have advised people to "remain focused and vigilant" and consider whether journeys are "really necessary".',
        "A high risk of disruption remained, with a number of roads closed because of debris and fallen trees.",
        "Police attended incidents across the country, particularly in the south-west of Scotland, and helped 15 people stuck at a flooded caravan park in Ballantrae.",
      ],
      usefulCount: 207,
    },
    {
      id: "mid-kelton-flooding",
      time: "18:18",
      headline: "Flooded roads and tree debris near where man killed",
      author: {
        name: "Nichola Rutherford",
        role: "Reporting from Mid Kelton",
        image: "authors/nichola-rutherford.webp",
      },
      paragraphs: [
        "A 60-year-old man died after being hit by a tree on a minor road near Mid Kelton in Dumfries and Galloway.",
        "The road into the rural hamlet was closed, with flooding and tree debris reported on roads around Castle Douglas.",
        "There have been reports of trees blocking roads across the region, but the tragedy in Mid Kelton will come as a shock to local people.",
      ],
      usefulCount: 83,
    },
    {
      id: "dumbarton-flooding",
      time: "18:08",
      headline: "Dumbarton High Street counts the cost from severe flooding",
      author: {
        name: "Shiona McCallum",
        role: "Reporting from Dumbarton",
        image: "authors/shiona-mccallum.webp",
      },
      paragraphs: [
        "Many shops and cafés on Dumbarton High Street are closed because of the storm, with workers already beginning the clean-up at some businesses.",
        "Wet leaves, bottles and boxes lie scattered across the floor at Holland & Barrett, while muddy water covers the aisles at Boots.",
        "Storm Boelo has caused serious damage here, and it will be some time before these businesses can get back to normal.",
      ],
      usefulCount: 231,
    },
    {
      id: "dog-charity-flood",
      time: "17:49",
      headline: "Clean-up at dog charity after 'terrifying' flood",
      author: {
        name: "Liz Copper",
        role: "Reporting from Kidsgrove",
        image: "authors/liz-copper.webp",
      },
      paragraphs: [
        "A clean-up is under way at a dog rescue charity in north Staffordshire after its kennels flooded during Storm Austen, which swept through before Storm Boelo.",
        "Greyhound Gap, near Kidsgrove, cares for nearly 50 dogs, but 15 had to be evacuated and moved to other kennels on Friday.",
        'Assistant manager Sarah Partridge says staff were "fantastic", moving dogs into vehicles and spare kennels as the water rose.',
      ],
      usefulCount: 312,
    },
  ],
}
