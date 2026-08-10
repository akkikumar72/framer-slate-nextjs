export type AgentikArticleBlock =
  | { type: "heading"; text: string }
  | {
      type: "paragraph";
      text?: string;
      lead?: string;
      breakAfterLead?: boolean;
    }
  | {
      type: "list";
      ordered?: boolean;
      items: Array<{ text: string; lead?: string }>;
    }
  | { type: "quote"; paragraphs: readonly string[] };

export type AgentikArticleDocument = {
  description: string;
  blocks: readonly AgentikArticleBlock[];
};

export const AGENTIK_ARTICLES: Record<string, AgentikArticleDocument> = {
  "how-we-saved-a-logistics-company-200-hours-a-month": {
    description:
      "Greenfield Logistics was growing fast. New contracts, more drivers, bigger warehouses. But their backend hadn't kept up.",
    blocks: [
      { type: "heading", text: "The problem" },
      {
        type: "paragraph",
        text: "Greenfield Logistics was growing fast. New contracts, more drivers, bigger warehouses. But their backend hadn't kept up. The ops team was buried in spreadsheets — manually tracking inventory, dispatching drivers via group chats, and pulling together weekly reports that took an entire Friday afternoon.",
      },
      {
        type: "paragraph",
        text: "They had 14 people doing admin work that should have taken three. Mistakes were creeping in. Shipments were going to the wrong depots. Invoices were late. And the team was burning out.",
      },
      {
        type: "paragraph",
        text: "When they came to us, the brief was simple: help us stop drowning.",
      },
      { type: "heading", text: "What we found" },
      {
        type: "paragraph",
        text: "We started with a one-week discovery sprint. Sat with the ops team, watched how they worked, mapped every process end to end. Three things stood out immediately:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          {
            lead: "Inventory tracking was entirely manual.",
            text: "Stock counts were done on paper, typed into a spreadsheet, then emailed to the warehouse manager. By the time anyone saw the numbers, they were already outdated.",
          },
          {
            lead: "Dispatch was chaos.",
            text: "Drivers were assigned jobs through a WhatsApp group. No visibility on who was available, who was closest, or what the most efficient route was.",
          },
          {
            lead: "Reporting took days.",
            text: "Every Friday, someone spent 4-5 hours pulling data from three different systems into a single spreadsheet. By Monday, the numbers were already stale.",
          },
        ],
      },
      { type: "heading", text: "What we built" },
      {
        type: "paragraph",
        text: "We didn't rip anything out. We plugged AI into the tools they were already using and automated the repetitive work.",
      },
      {
        type: "paragraph",
        lead: "Inventory automation",
        breakAfterLead: true,
        text: "We built a system that connects their warehouse scanners directly to a live dashboard. Every time stock moves — in or out — the numbers update instantly. Low stock triggers automatic reorder alerts. No more paper counts. No more outdated spreadsheets.",
      },
      {
        type: "paragraph",
        lead: "Smart dispatch",
        breakAfterLead: true,
        text: "We replaced the WhatsApp chaos with an AI dispatch agent. It knows which drivers are available, where they are, and what the fastest routes look like. Jobs are assigned automatically based on location, vehicle type, and delivery windows. Drivers get a notification. The ops team gets a live map.",
      },
      {
        type: "paragraph",
        lead: "Automated reporting",
        breakAfterLead: true,
        text: "We connected their CRM, warehouse system, and accounts software to an AI that generates reports on demand. Weekly summaries, monthly breakdowns, custom queries — all generated in under a minute. That Friday afternoon job is gone.",
      },
      { type: "heading", text: "The results" },
      {
        type: "paragraph",
        text: "We tracked performance over the first 90 days:",
      },
      {
        type: "list",
        items: [
          { lead: "200+ hours", text: "saved per month across the ops team" },
          { lead: "£42,000", text: "annual cost saving from reduced manual work" },
          {
            lead: "3x faster",
            text: "dispatch times — jobs assigned in seconds not hours",
          },
          { lead: "98% inventory accuracy", text: "— up from 74%" },
          { lead: "Zero", text: "Friday afternoons lost to reporting" },
        ],
      },
      {
        type: "paragraph",
        text: "The ops team went from 14 people doing admin to 14 people actually running operations. Two team members were redeployed to client management — a role that directly brings in revenue.",
      },
      {
        type: "quote",
        paragraphs: [
          '"We knew we were wasting time but we didn\'t realise how much until we saw the numbers. The AI doesn\'t sleep, doesn\'t make mistakes, and doesn\'t need a tea break. We should have done this a year ago."',
          "— James Walker, Operations Director at Greenfield Logistics",
        ],
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "Greenfield didn't need a massive digital transformation. They didn't need to change platforms or retrain their entire team. They just needed someone to look at how they worked and automate the parts that were slowing them down.",
      },
      {
        type: "paragraph",
        text: "That's what we do. If your team is spending hours on work that a machine could handle in seconds, you're leaving time and money on the table.",
      },
    ],
  },
  "why-voice-agents-are-the-next-big-thing-for-agencies": {
    description:
      "Voice agents join meetings, handle calls, capture leads, and give agencies back the time lost to repetitive communication work.",
    blocks: [
      { type: "heading", text: "The shift nobody's talking about" },
      {
        type: "paragraph",
        text: "Everyone's focused on chatbots and workflow automation. And fair enough — they're proven, they work, they save time. But there's something bigger coming that most agencies haven't caught onto yet.",
      },
      { type: "paragraph", text: "Voice agents." },
      {
        type: "paragraph",
        text: "Not the clunky phone bots that make you press 1 for sales and 2 for support. We're talking about AI that joins your meetings, speaks naturally, takes notes, follows up with action items, and even handles client calls when your team is stretched thin.",
      },
      {
        type: "paragraph",
        text: "It sounds like science fiction. It's not. It's happening right now and the agencies that move first are going to have a serious edge.",
      },
      { type: "heading", text: "What a voice agent actually does" },
      {
        type: "paragraph",
        text: "Think of it as a team member that never takes a day off, never forgets a detail, and never needs to be briefed twice.",
      },
      { type: "paragraph", text: "Here's what they can do today:" },
      { type: "paragraph", lead: "In meetings:" },
      {
        type: "list",
        items: [
          { text: "Join video calls and take notes in real time" },
          { text: "Flag key decisions and action items automatically" },
          { text: "Send a summary to every attendee the moment the call ends" },
          { text: "Track what was promised and remind people when deadlines approach" },
        ],
      },
      { type: "paragraph", lead: "On the phone:" },
      {
        type: "list",
        items: [
          { text: "Answer inbound calls and qualify leads before they reach your team" },
          { text: "Book appointments directly into your calendar" },
          { text: "Handle common questions using your FAQs and service info" },
          { text: "Transfer to a real person when the conversation needs a human touch" },
        ],
      },
      { type: "paragraph", lead: "After hours:" },
      {
        type: "list",
        items: [
          { text: "Take calls and messages outside of business hours" },
          { text: "Capture leads at 11pm on a Sunday when nobody's at their desk" },
          { text: "Send follow-up emails based on what was discussed" },
        ],
      },
      { type: "paragraph", lead: "Why agencies should care" },
      {
        type: "paragraph",
        text: "Agencies run on time. Every hour spent in a meeting that could have been an email, every lead that goes cold because nobody followed up fast enough, every Friday spent writing recap reports — that's money left on the table.",
      },
      {
        type: "paragraph",
        text: "Voice agents fix three specific problems:",
      },
      {
        type: "paragraph",
        lead: "1. Meeting overload",
        breakAfterLead: true,
        text: "The average agency employee spends 15+ hours a week in meetings. Voice agents don't replace those meetings — they make them productive. Every call gets documented, every action item gets tracked, every follow-up gets sent. No more \"can you remind me what we agreed on?\"",
      },
      {
        type: "paragraph",
        lead: "2. Slow lead response",
        breakAfterLead: true,
        text: "Speed wins deals. If a potential client calls and gets a voicemail, there's a good chance they're calling your competitor next. A voice agent picks up instantly, qualifies the lead, and books a meeting with your sales team before the prospect has time to think twice.",
      },
      {
        type: "paragraph",
        lead: "3. Client communication gaps",
        breakAfterLead: true,
        text: "Clients hate chasing. A voice agent can proactively update clients on project progress, send reminders about upcoming deadlines, and handle routine check-ins — all without your account managers lifting a finger.",
      },
      { type: "heading", text: "What the early adopters are seeing" },
      {
        type: "paragraph",
        text: "We've rolled out voice agents for a handful of agency clients over the past six months. The numbers speak for themselves:",
      },
      {
        type: "list",
        items: [
          { lead: "60% reduction", text: "in time spent on meeting admin" },
          { lead: "3x faster", text: "lead response times" },
          { lead: "35% increase", text: "in booked discovery calls" },
          { lead: "Zero", text: "missed after-hours enquiries" },
        ],
      },
      {
        type: "paragraph",
        text: "One client — a 12-person marketing agency — told us their voice agent handles what used to take a full-time receptionist and a project coordinator combined. They didn't fire anyone. They redeployed those people into client-facing work that actually generates revenue.",
      },
      { type: "heading", text: "The tech is ready. Most agencies aren't." },
      {
        type: "paragraph",
        text: "The barrier isn't the technology. Voice agents are available today, they integrate with the tools agencies already use, and they're affordable enough for a 5-person team.",
      },
      {
        type: "paragraph",
        text: "The barrier is awareness. Most agency owners still think of AI as chatbots on a website. They haven't seen what a voice agent can do in a live meeting or on a real phone call.",
      },
      {
        type: "paragraph",
        text: "That's changing fast. And the agencies that figure it out now — while their competitors are still taking manual meeting notes — are going to be very hard to catch.",
      },
    ],
  },
  "a-beginner-s-guide-to-automating-your-sales-pipeline": {
    description:
      "A practical, stage-by-stage guide to automating lead capture, qualification, follow-up, booking, and sales handoff.",
    blocks: [
      { type: "heading", text: "The problem with most sales pipelines" },
      {
        type: "paragraph",
        text: "You're generating leads. They're coming in through your website, social media, referrals, maybe even cold outreach. But somewhere between that first enquiry and closing the deal, things fall apart.",
      },
      {
        type: "paragraph",
        text: "Leads sit in an inbox for two days before someone responds. Follow-ups get forgotten. Nobody knows which prospects are hot and which went cold three weeks ago. Your CRM is half empty because nobody has time to update it.",
      },
      {
        type: "paragraph",
        text: "Sound familiar? You're not alone. Most small businesses lose deals not because their product is wrong but because their process is broken.",
      },
      {
        type: "paragraph",
        text: "The fix isn't hiring more salespeople. It's automating the parts of your pipeline that don't need a human.",
      },
      { type: "heading", text: 'What "automating your pipeline" actually means' },
      {
        type: "paragraph",
        text: "Let's be clear — we're not talking about replacing your sales team with robots. We're talking about removing the repetitive tasks that slow them down so they can focus on the one thing only humans can do: building relationships and closing deals.",
      },
      {
        type: "paragraph",
        text: "Here's what an automated pipeline looks like from start to finish.",
      },
      { type: "paragraph", lead: "Stage 1: Lead capture" },
      {
        type: "paragraph",
        text: "Right now, a lead fills in your contact form and... what happens? Maybe an email lands in someone's inbox. Maybe it gets missed.",
      },
      { type: "paragraph", lead: "With automation:" },
      {
        type: "list",
        items: [
          { text: "Lead fills in a form on your website" },
          { text: "Their details are instantly added to your CRM" },
          { text: "They receive a personalised welcome email within 60 seconds" },
          { text: "Your sales team gets a Slack notification with the lead's details" },
          { text: "The lead is scored based on their answers (budget, company size, urgency)" },
        ],
      },
      {
        type: "paragraph",
        text: "Time taken by your team: zero. The lead feels looked after. Your team knows exactly who to call first.",
      },
      { type: "paragraph", lead: "Stage 2: Qualification" },
      {
        type: "paragraph",
        text: "Not every lead is a good fit. But figuring that out usually means a 20-minute phone call that could have been avoided.",
      },
      { type: "paragraph", lead: "With automation:" },
      {
        type: "list",
        items: [
          { text: "An AI chatbot or email sequence asks qualifying questions" },
          { text: "Budget, timeline, company size, specific needs — all captured automatically" },
          { text: "High-scoring leads get fast-tracked to a sales call" },
          { text: "Low-scoring leads enter a nurture sequence instead of being forgotten" },
          { text: "Your team only speaks to people who are genuinely ready to buy" },
        ],
      },
      {
        type: "paragraph",
        text: "No more wasting an afternoon on calls that go nowhere. Your team talks to the right people at the right time.",
      },
      { type: "paragraph", lead: "Stage 3: Follow-up" },
      {
        type: "paragraph",
        text: "This is where most businesses lose the most deals. A lead shows interest, your team means to follow up, and then... life gets in the way. Three days pass. The lead's gone cold. They've already signed with someone else.",
      },
      { type: "paragraph", lead: "With automation:" },
      {
        type: "list",
        items: [
          { text: "Every lead gets a follow-up sequence triggered automatically" },
          { text: "Day 1: personalised email referencing their specific enquiry" },
          { text: "Day 3: case study or testimonial relevant to their industry" },
          { text: "Day 7: gentle check-in asking if they have questions" },
          { text: "Day 14: final nudge with a limited-time offer or incentive" },
          { text: "If they reply at any point, the sequence stops and your team takes over" },
        ],
      },
      {
        type: "paragraph",
        text: "Your leads never go cold. Your team never has to remember to send that email. It just happens.",
      },
      { type: "paragraph", lead: "Stage 4: Booking" },
      {
        type: "paragraph",
        text: "The lead is interested. They want to talk. Now they need to book a call. In most businesses this turns into a four-email tennis match trying to find a time that works.",
      },
      { type: "paragraph", lead: "With automation:" },
      {
        type: "list",
        items: [
          { text: "A booking link is included in every follow-up email" },
          { text: "The lead picks a time that suits them from your live calendar" },
          { text: "A confirmation email goes out with a meeting link" },
          { text: "A reminder is sent 24 hours and 1 hour before the call" },
          { text: "The meeting is added to your CRM with all the lead's details attached" },
        ],
      },
      {
        type: "paragraph",
        text: "No back and forth. No no-shows. Your calendar fills itself.",
      },
      { type: "paragraph", lead: "Stage 5: Handoff and close" },
      {
        type: "paragraph",
        text: "Your salesperson jumps on the call. But instead of going in blind, they have everything they need.",
      },
      { type: "paragraph", lead: "With automation:" },
      {
        type: "list",
        items: [
          { text: "A pre-call brief is generated automatically — lead score, company info, qualifying answers, email history" },
          { text: "After the call, the voice agent sends a summary with action items" },
          { text: "If a proposal is needed, a draft is generated from a template with the lead's details pre-filled" },
          { text: "Contract sent, signed, and filed — all tracked in the CRM" },
        ],
      },
      {
        type: "paragraph",
        text: "Your salesperson walks in prepared and walks out with everything documented. No manual data entry. No forgotten follow-ups.",
      },
      { type: "paragraph", lead: "What this looks like in practice" },
      {
        type: "paragraph",
        text: "Here's a real example from one of our clients — a B2B consultancy with a 6-person sales team:",
      },
      { type: "paragraph", lead: "Before automation:" },
      {
        type: "list",
        items: [
          { text: "Average lead response time: 26 hours" },
          { text: "Follow-up rate: 40% of leads got a second touchpoint" },
          { text: "CRM updated: maybe once a week if someone remembered" },
          { text: "Close rate: 12%" },
        ],
      },
      { type: "paragraph", lead: "After automation:" },
      {
        type: "list",
        items: [
          { text: "Average lead response time: 90 seconds" },
          { text: "Follow-up rate: 100% of leads get the full sequence" },
          { text: "CRM updated: instantly, every time, no exceptions" },
          { text: "Close rate: 28%" },
        ],
      },
      {
        type: "paragraph",
        text: "Same team. Same product. Same market. The only difference was removing the manual work that was slowing them down.",
      },
    ],
  },
  "five-ai-tools-every-small-business-should-use-in-2026": {
    description:
      "Five practical AI tools that help small businesses automate repetitive work, capture knowledge, and support customers.",
    blocks: [
      { type: "heading", text: "Why this matters" },
      {
        type: "paragraph",
        text: "AI isn't just for big companies with big budgets anymore. The tools available today are affordable, easy to set up, and built for people who don't have a tech team. The problem isn't access — it's knowing which ones are actually worth your time.",
      },
      {
        type: "paragraph",
        text: "We've worked with dozens of small businesses over the past year and these five tools come up again and again. They're the ones our clients get the most value from — and the ones we'd recommend to anyone just getting started.",
      },
      { type: "heading", text: "1. ChatGPT for daily operations" },
      {
        type: "paragraph",
        text: "You've probably heard of it. You might have even used it to write an email or two. But most small businesses are barely scratching the surface.",
      },
      {
        type: "paragraph",
        text: "We set up custom GPTs for our clients that are trained on their business — their tone of voice, their products, their FAQs. Instead of a generic chatbot, they get an assistant that actually sounds like them.",
      },
      {
        type: "paragraph",
        lead: "Use it for:",
        text: "Drafting emails, writing proposals, summarising meeting notes, creating social media content, answering internal questions.",
      },
      {
        type: "paragraph",
        lead: "Why it works:",
        text: "It handles the small tasks that eat up 30 minutes here and there. Over a week, that adds up to hours.",
      },
      { type: "heading", text: "2. Zapier for workflow automation" },
      {
        type: "paragraph",
        text: "Zapier connects your apps together so they talk to each other without you doing anything. New lead comes in? It gets added to your CRM, your sales team gets a Slack notification, and a welcome email goes out — all automatically.",
      },
      {
        type: "paragraph",
        text: "No code. No developer. Just pick a trigger, pick an action, and let it run.",
      },
      {
        type: "paragraph",
        lead: "Use it for:",
        text: "Lead follow-ups, invoice reminders, data syncing between apps, onboarding sequences, social media posting.",
      },
      {
        type: "paragraph",
        lead: "Why it works:",
        text: "It kills the copy-paste busywork. The stuff you do ten times a day that feels small but wastes hours by the end of the week.",
      },
      { type: "heading", text: "3. Fireflies for meetings" },
      {
        type: "paragraph",
        text: "Fireflies joins your calls, records them, transcribes everything, and pulls out the key action items. No more scribbling notes while trying to listen. No more forgetting what was agreed on last Tuesday.",
      },
      {
        type: "paragraph",
        text: "It integrates with Zoom, Google Meet, and Teams — and sends a clean summary to your inbox the moment the call ends.",
      },
      {
        type: "paragraph",
        lead: "Use it for:",
        text: "Client calls, internal meetings, sales calls, interviews, brainstorming sessions.",
      },
      {
        type: "paragraph",
        lead: "Why it works:",
        text: "The average professional spends 23 hours a week in meetings. Fireflies makes sure those hours actually produce something useful.",
      },
      { type: "heading", text: "4. Notion AI for knowledge management" },
      {
        type: "paragraph",
        text: "Every small business has information scattered everywhere. Google Docs, spreadsheets, Slack threads, someone's notebook. Notion brings it all into one place — and the AI layer makes it searchable and smart.",
      },
      {
        type: "paragraph",
        text: "Ask it to find that client brief from three months ago. Ask it to summarise your project tracker. Ask it to draft a process doc based on your notes. It just works.",
      },
      {
        type: "paragraph",
        lead: "Use it for:",
        text: "Internal wikis, project management, process documentation, meeting notes, content planning.",
      },
      {
        type: "paragraph",
        lead: "Why it works:",
        text: "It turns your scattered knowledge into something your whole team can actually find and use.",
      },
      { type: "heading", text: "5. Tidio for customer support" },
      {
        type: "paragraph",
        text: "Tidio gives you an AI chatbot that lives on your website and handles customer questions around the clock. It learns from your FAQs and product pages, so it can answer most queries without a human stepping in.",
      },
      {
        type: "paragraph",
        text: "When something needs a real person, it hands the conversation over seamlessly. Your customers get instant answers. Your team only handles the complex stuff.",
      },
      {
        type: "paragraph",
        lead: "Use it for:",
        text: "Website FAQs, order tracking, booking enquiries, product recommendations, lead capture.",
      },
      {
        type: "paragraph",
        lead: "Why it works:",
        text: "79% of customers expect an instant response when they visit a website. Tidio makes that possible without hiring a support team.",
      },
      { type: "heading", text: "Where to start" },
      {
        type: "paragraph",
        text: "You don't need all five on day one. Pick the one that solves your biggest headache right now.",
      },
      {
        type: "paragraph",
        text: "If your team wastes time on repetitive tasks — start with Zapier. If meetings are a black hole — try Fireflies. If customer queries are piling up — set up Tidio.",
      },
      {
        type: "paragraph",
        text: "The point isn't to use AI everywhere. It's to use it where it actually saves you time and makes you money.",
      },
    ],
  },
};

export function getAgentikArticle(slug: string) {
  return AGENTIK_ARTICLES[slug];
}
