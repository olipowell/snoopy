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
  media?: {
    type: "image" | "video"
    src: string
    alt: string
    poster?: string
  }
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
  topic: "Budget 2026",
  headline:
    "Gas bill standing charges to be scrapped, chancellor says ahead of Budget",
  updatedLabel: "Updated 1 minute ago",
  heroImage: "storm-boelo-hero.jpg",
  heroAlt: "Live coverage ahead of the chancellor's Budget",
  summaries: [
    "Standing charges are to be scrapped from household gas bills for millions, says Chancellor John Healey, hours before he delivers his first Budget",
    "The move is due to take effect next year or as soon as possible and will save 60% of households an average of £45 per year, according to the Treasury",
    "There will be winners and losers as the costs are added to the unit price of gas, meaning higher users will pay more than they currently do",
    "Healey is due to set out the government's tax and spending plans in full at 12:30 GMT",
  ],
  updates: [
    {
      id: "standing-charge-removal-analysis",
      time: "09:36",
      headline:
        "Standing charge removal will be popular - but may not come in time for big bill rises in January",
      author: {
        name: "BBC News",
      },
      paragraphs: [
        "This morning's announcement about abolishing standing charges on gas bills is likely to be popular. The fixed daily fee is paid before a household uses a single unit of gas.",
        "Moving that cost into the unit price means the less gas you use, the less you will pay. Lower-use households should pay a little less, while higher-use households will pay more.",
        "But with gas prices currently three times what they were this time last year, and average bills set to comfortably exceed £2,000 in January, the change may feel more like bills being lower than they otherwise would have been.",
      ],
      comments: [
        {
          id: "budget-comment-1",
          author: "You",
          avatar: "profile-avatar-snoopy.png",
          timestamp: "2 mins ago",
          text: "Who lost £500m? Asking for a friend",
        },
        {
          id: "budget-comment-2",
          author: "Alex Morgan",
          avatar: "49a3a.png",
          timestamp: "6 mins ago",
          text: "Moving the charge into the unit price seems fairer for people who have already cut their usage as much as they can.",
        },
        {
          id: "budget-comment-3",
          author: "Sophie Rahman",
          avatar: "3cc5a.png",
          timestamp: "9 mins ago",
          text: "I hope the targeted support for larger low-income households is in place before this starts.",
        },
        {
          id: "budget-comment-4",
          author: "Daniel Hughes",
          avatar: "f2dfd.png",
          timestamp: "12 mins ago",
          text: "The detail on who gains and who pays more will matter much more than the headline saving.",
        },
        {
          id: "budget-comment-5",
          author: "Priya Shah",
          avatar: "5716f.png",
          timestamp: "16 mins ago",
          text: "January is very close. It would be useful to know whether any support is coming before then.",
        },
        {
          id: "budget-comment-6",
          author: "Tom Bennett",
          avatar: "ad18a.png",
          timestamp: "19 mins ago",
          text: "Energy efficiency help would make this policy much more useful in the long term.",
        },
      ],
      usefulCount: 226,
    },
    {
      id: "standing-charge-experts",
      time: "09:28",
      headline:
        "Gas standing charge 'sensible' but 'comes with risks', say experts",
      author: {
        name: "BBC News",
      },
      paragraphs: [
        'The scrapping of standing charges is "a sensible idea", but will not benefit everyone, says Richard Neudegg, director at comparison firm Uswitch.',
        "Households that use less gas, including people in smaller homes, should benefit. But moving fixed costs to the unit price will leave heavy gas users worse off.",
        "Citizens Advice says the move could be positive but must be accompanied by targeted support that takes account of people's circumstances.",
      ],
      media: {
        type: "image",
        src: "budget/standing-charge-experts.webp",
        alt: "A household energy meter and gas bill",
      },
      usefulCount: 171,
    },
    {
      id: "cabinet-ahead-of-budget",
      time: "09:25",
      headline: "John Healey addresses Cabinet ahead of the Budget",
      author: {
        name: "BBC News",
      },
      paragraphs: [
        "It is a big day for ministers, who gathered at No 10 for a Cabinet meeting before John Healey delivers his first Budget as chancellor.",
      ],
      media: {
        type: "video",
        src: "budget/john-healey-cabinet.mp4",
        poster: "budget/john-healey-cabinet.jpg",
        alt: "Chancellor John Healey addressing Cabinet ahead of the Budget",
      },
      usefulCount: 203,
    },
    {
      id: "reduce-fuel-duty",
      time: "08:54",
      headline: "'The best thing they could do is remove or reduce fuel duty'",
      author: {
        name: "BBC News",
      },
      paragraphs: [
        'Professional driver Dave Herbert says fuel prices have been "crazy" this year. He spends around £350 a month on petrol for work and personal use - up 40% to 50% since the start of the year.',
        "He says finding the extra money from an already tight budget is difficult and wants the chancellor to remove or reduce fuel duty for a period of time.",
      ],
      media: {
        type: "image",
        src: "budget/fuel-duty-driver.webp",
        alt: "Professional driver Dave Herbert beside his car",
      },
      usefulCount: 148,
    },
    {
      id: "healey-audiences",
      time: "08:38",
      headline: "Healey has several audiences to impress today",
      author: {
        name: "Harry Farley",
        role: "Political correspondent",
      },
      paragraphs: [
        "The public is the chancellor's main audience. Can he maintain the popularity bounce Labour has enjoyed since Andy Burnham took over, or is this the moment the shine begins to come off?",
        "Financial markets are another key audience, while Labour MPs will also need convincing that the limited scale of the Budget is the right approach.",
      ],
      media: {
        type: "image",
        src: "budget/healey-audiences.webp",
        alt: "The entrance to Downing Street on Budget morning",
      },
      usefulCount: 112,
    },
    {
      id: "fuel-duty-freeze",
      time: "08:13",
      headline:
        "Fuel duty freeze seems likely after a painful year for drivers",
      author: {
        name: "Theo Leggett",
        role: "International business correspondent",
      },
      paragraphs: [
        "The cost of filling a family car with diesel has risen by around £30 since late February, while a tankful of petrol costs about £23 more.",
        "Fuel duty is due to rise by 5p next year as a discount introduced in 2022 ends. But an increase is highly unlikely, with another freeze appearing to be the most likely option.",
      ],
      media: {
        type: "image",
        src: "budget/fuel-prices.webp",
        alt: "A driver refuelling a car at a petrol station",
      },
      usefulCount: 194,
    },
    {
      id: "ofgem-standing-charges",
      time: "08:03",
      headline: "Standing charges are not a new puzzle for Ofgem",
      author: {
        name: "Kevin Peachey",
        role: "Cost of living correspondent",
      },
      paragraphs: [
        "Ofgem has been grappling with how to scrap standing charges for some time and is already trialling low-standing-charge tariffs.",
        "The chancellor's move comes at no direct cost to the government, but some high gas users - notably larger low-income families - may pay more, making the detail of mitigation important.",
      ],
      media: {
        type: "image",
        src: "budget/gas-bill.webp",
        alt: "A household gas bill and calculator",
      },
      usefulCount: 156,
    },
    {
      id: "minimum-wage-rise",
      time: "06:44",
      headline:
        "Minimum wage set to rise - but 18-20 year-olds will get lower increase than last few years",
      author: {
        name: "BBC News",
      },
      paragraphs: [
        "A rise in the minimum wage is expected in the Budget, but 18-to-20-year-olds are set to see a lower increase than in the previous two years, the BBC understands.",
        "Pay for younger workers will rise in line with the increase for employees aged 21 and over, although age bands will remain.",
      ],
      media: {
        type: "image",
        src: "budget/minimum-wage.webp",
        alt: "A young worker serving a customer",
      },
      usefulCount: 267,
    },
  ],
}
