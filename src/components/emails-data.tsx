import type { Email, EmailAttachment } from "./email-app";

const attachments: EmailAttachment[] = [
  {
    id: "1",
    name: "Q4_Financial_Report.pdf",
    size: "2.4 MB",
    type: "pdf",
    url: "#",
  },
  {
    id: "2",
    name: "Project_Timeline.xlsx",
    size: "1.8 MB",
    type: "xlsx",
    url: "#",
  },
  {
    id: "3",
    name: "Team_Photo.jpg",
    size: "3.2 MB",
    type: "jpg",
    url: "#",
  },
  {
    id: "4",
    name: "Meeting_Notes.docx",
    size: "156 KB",
    type: "docx",
    url: "#",
  },
  {
    id: "5",
    name: "Budget_2024.xlsx",
    size: "890 KB",
    type: "xlsx",
    url: "#",
  },
];

const createEmail = (
  id: string,
  from: { name: string; email: string },
  subject: string,
  message: string,
  time: string,
  labels: string[] = [],
  read = true,
  starred = false,
  important = false,
  folder: string = "inbox",
  emailAttachments: EmailAttachment[] = [],
  thread?: Email[]
): Email => ({
  id,
  from: {
    ...from,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  to: {
    name: "Alex Morgan",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  subject,
  message,
  time,
  labels,
  read,
  starred,
  important,
  attachments: emailAttachments,
  folder,
  thread,
});

// 50 emails with multiple replies
export const initialEmails: Email[] = [
  // Email 1: Team Dinner - with 3 replies
  createEmail(
    "1",
    { name: "Sophia White", email: "sophiawhite@example.com" },
    "Team Dinner Next Week",
    `Hi Alex,

Let's have a team dinner next week to celebrate our success. We've achieved some significant milestones, and it's time to acknowledge our hard work and dedication.

I've made reservations at Bistro Garden for Thursday at 7:00 PM. The restaurant has a great ambiance and excellent menu options.

Please confirm your availability and any dietary preferences. Looking forward to a fun and memorable dinner with the team!

Best regards,
Sophia`,
    "Today, 10:32 AM",
    ["work", "meeting"],
    false,
    true,
    true,
    "inbox",
    [attachments[2]],
    [
      createEmail(
        "1-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Team Dinner Next Week",
        `Thanks Sophia! This sounds great. I'm available Thursday at 7:00 PM.

No dietary restrictions for me. Looking forward to it!

Best,
Alex`,
        "Today, 11:15 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "1-2",
        { name: "Sophia White", email: "sophiawhite@example.com" },
        "Re: Team Dinner Next Week",
        `Perfect! I've confirmed for 6 people.

Just a reminder: Bistro Garden, Thursday at 7:00 PM.

See you there!

Sophia`,
        "Today, 11:30 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "1-3",
        { name: "Daniel Johnson", email: "daniel@example.com" },
        "Re: Team Dinner Next Week",
        `Count me in too! Can't wait to celebrate with everyone.

Daniel`,
        "Today, 12:00 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 2: Q4 Financial Report - with 2 replies
  createEmail(
    "2",
    { name: "Daniel Johnson", email: "daniel@example.com" },
    "Feedback Request on Q4 Financial Report",
    `Hello Alex,

I'd like your feedback on the latest Q4 financial report. We've made significant progress, and I value your input.

The report shows a 15% increase in revenue compared to Q3, with particularly strong performance in our new product lines.

Could you please provide your thoughts by Friday?

Thanks,
Daniel`,
    "Yesterday, 4:15 PM",
    ["work", "finance"],
    true,
    false,
    true,
    "inbox",
    [attachments[0]],
    [
      createEmail(
        "2-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Feedback Request on Q4 Financial Report",
        `Hi Daniel,

I've reviewed the report - excellent work! The 15% increase is impressive.

A few suggestions:
1. Consider breaking out international vs domestic revenue
2. Add more detail on the new product line growth

Otherwise, looks great!

Alex`,
        "Yesterday, 5:30 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "2-2",
        { name: "Daniel Johnson", email: "daniel@example.com" },
        "Re: Feedback Request on Q4 Financial Report",
        `Thanks Alex! Great suggestions. I'll incorporate them into the final version.

Will send updated report by Monday.

Daniel`,
        "Yesterday, 6:00 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 3: Project Timeline - with 4 replies
  createEmail(
    "3",
    { name: "Ava Taylor", email: "ava@example.com" },
    "Project Timeline Update",
    `Hi Alex,

Here's the updated timeline for our project. I've included all the key milestones and deadlines.

The development phase is scheduled to complete by the end of this month, followed by two weeks of testing. We should be ready for the soft launch by the 15th of next month.

Please review and let me know if you have any concerns or suggestions.

Best,
Ava`,
    "May 10, 2:30 PM",
    ["project", "work"],
    true,
    true,
    false,
    "inbox",
    [attachments[1]],
    [
      createEmail(
        "3-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Project Timeline Update",
        `Thanks Ava,

The timeline looks tight but achievable. I have a concern about the testing phase - two weeks might not be enough for comprehensive testing.

Can we consider extending it to three weeks?

Alex`,
        "May 10, 3:45 PM",
        ["project", "work"],
        true,
        false,
        false
      ),
      createEmail(
        "3-2",
        { name: "Ava Taylor", email: "ava@example.com" },
        "Re: Project Timeline Update",
        `Good point Alex. Let me check with the team.

I'll get back to you with an adjusted timeline tomorrow.

Ava`,
        "May 10, 4:00 PM",
        ["project", "work"],
        true,
        false,
        false
      ),
      createEmail(
        "3-3",
        { name: "Ava Taylor", email: "ava@example.com" },
        "Re: Project Timeline Update",
        `Update from the team: We can extend testing to 3 weeks, but that would push the soft launch to the 22nd.

Is that acceptable?

Ava`,
        "May 11, 9:00 AM",
        ["project", "work"],
        true,
        false,
        false
      ),
      createEmail(
        "3-4",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Project Timeline Update",
        `That works for me. Let's go with the 22nd for the soft launch.

Thanks for checking with the team!

Alex`,
        "May 11, 9:30 AM",
        ["project", "work"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 4: Product Launch Strategy - with 2 replies
  createEmail(
    "4",
    { name: "William Anderson", email: "william@example.com" },
    "Product Launch Strategy Meeting",
    `Dear Alex,

I'd like to schedule a meeting to discuss our product launch strategy. The development team has made excellent progress.

During the meeting, we'll cover:
- Marketing campaign timeline
- Press release strategy
- Social media rollout
- Customer feedback collection methods

Would Wednesday at 2:00 PM work for you?

Regards,
William`,
    "May 8, 11:20 AM",
    ["meeting", "work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "4-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Product Launch Strategy Meeting",
        `Wednesday at 2:00 PM works perfectly for me.

I'll prepare some questions about the social media rollout.

Looking forward to it!

Alex`,
        "May 8, 11:45 AM",
        ["meeting", "work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "4-2",
        { name: "William Anderson", email: "william@example.com" },
        "Re: Product Launch Strategy Meeting",
        `Great! I'll send a calendar invite.

I'll also bring some initial mock-ups for the marketing materials.

William`,
        "May 8, 12:00 PM",
        ["meeting", "work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 5: Vacation Plans - with 3 replies
  createEmail(
    "5",
    { name: "Mia Harris", email: "mia@example.com" },
    "Vacation Plans for Next Month",
    `Hey Alex,

Just wanted to confirm our vacation plans for next month. I've booked the flights and accommodations.

We'll be flying out on the 10th at 11:00 AM and returning on the 20th. The beach house looks amazing!

I've also made a list of activities and restaurants we might want to try.

Can't wait!
Mia`,
    "May 5, 9:45 AM",
    ["personal", "travel"],
    true,
    true,
    false,
    "inbox",
    [],
    [
      createEmail(
        "5-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Vacation Plans for Next Month",
        `This is exciting! Thanks for handling all the bookings.

Any specific dress code for the restaurants?

Alex`,
        "May 5, 10:30 AM",
        ["personal", "travel"],
        true,
        false,
        false
      ),
      createEmail(
        "5-2",
        { name: "Mia Harris", email: "mia@example.com" },
        "Re: Vacation Plans for Next Month",
        `Most places are casual, but there's one fancy restaurant where we might want to dress up a bit.

I'll pack a nice outfit just in case!

Mia`,
        "May 5, 11:00 AM",
        ["personal", "travel"],
        true,
        false,
        false
      ),
      createEmail(
        "5-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Vacation Plans for Next Month",
        `Perfect! Can't wait to relax and enjoy the beach.

Only a few more weeks to go!

Alex`,
        "May 5, 11:15 AM",
        ["personal", "travel"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 6: Monthly Budget Review - with 2 replies
  createEmail(
    "6",
    { name: "James Wilson", email: "james@example.com" },
    "Monthly Budget Review",
    `Hello Alex,

It's time for our monthly budget review. I've analyzed the expenses for the past month.

Overall, we're within our projected budget, but there are a couple of areas where we might need to make adjustments. The marketing expenses were slightly higher than anticipated.

Let me know when you're available to go through the details.

Best,
James`,
    "May 3, 3:20 PM",
    ["finance", "work"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "6-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Monthly Budget Review",
        `Hi James,

I'm free tomorrow afternoon at 2:00 PM if that works for you.

The higher marketing expenses aren't surprising - we did increase our ad spend this month. As long as we're seeing good ROI, I'm okay with it.

Alex`,
        "May 3, 4:00 PM",
        ["finance", "work"],
        true,
        false,
        false
      ),
      createEmail(
        "6-2",
        { name: "James Wilson", email: "james@example.com" },
        "Re: Monthly Budget Review",
        `2:00 PM tomorrow works great.

And yes, the ROI on the marketing spend has been excellent - we've seen a 40% increase in leads. I'll prepare the detailed report.

See you tomorrow!

James`,
        "May 3, 4:15 PM",
        ["finance", "work"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 7: Weekend Hiking Trip - with 2 replies
  createEmail(
    "7",
    { name: "Emma Clark", email: "emma@example.com" },
    "Weekend Hiking Trip",
    `Hi Alex,

Are you still up for the hiking trip this weekend? The weather forecast looks perfect - sunny with a high of 75°F.

I've mapped out a trail that should take about 4 hours to complete, with some beautiful viewpoints along the way.

We can meet at my place at 8:00 AM and drive together.

Don't forget to bring plenty of water and some snacks!

Cheers,
Emma`,
    "May 1, 10:15 AM",
    ["personal"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "7-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Weekend Hiking Trip",
        `Absolutely! I've been looking forward to this all week.

I'll bring water, trail mix, and some sandwiches for lunch.

What time should I be at your place?

Alex`,
        "May 1, 11:00 AM",
        ["personal"],
        true,
        false,
        false
      ),
      createEmail(
        "7-2",
        { name: "Emma Clark", email: "emma@example.com" },
        "Re: Weekend Hiking Trip",
        `7:45 AM would be perfect so we can hit the trail by 8:00 AM.

See you Saturday!

Emma`,
        "May 1, 11:30 AM",
        ["personal"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 8: New Client Proposal - with 3 replies
  createEmail(
    "8",
    { name: "Noah Martinez", email: "noah@example.com" },
    "New Client Proposal",
    `Dear Alex,

I've drafted a proposal for the new client we discussed last week. The scope includes website redesign, SEO optimization, and a three-month social media campaign.

Based on their requirements and our initial discussions, I've estimated the project timeline to be approximately 12 weeks. The budget aligns with similar projects we've done in the past.

Please review and let me know if you'd like to make any changes before I send it to the client.

Regards,
Noah`,
    "Apr 28, 2:45 PM",
    ["work", "project"],
    true,
    true,
    true,
    "inbox",
    [],
    [
      createEmail(
        "8-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: New Client Proposal",
        `Hi Noah,

Overall, this looks solid. A few suggestions:

1. Consider adding a milestone-based payment schedule
2. Include a clause for scope change management
3. The 12-week timeline seems a bit aggressive - can we make it 14 weeks to be safe?

Otherwise, ready to send!

Alex`,
        "Apr 28, 3:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "8-2",
        { name: "Noah Martinez", email: "noah@example.com" },
        "Re: New Client Proposal",
        `Good points Alex. I'll incorporate all three suggestions.

I think 14 weeks is more realistic too. I'll update the timeline and send you the revised version for final approval.

Noah`,
        "Apr 28, 4:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "8-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: New Client Proposal",
        `Perfect! Once I have the revised version, I'll give it one final review and then we can send it over.

Thanks for putting this together so quickly!

Alex`,
        "Apr 28, 4:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 9: API Documentation Review - with 2 replies
  createEmail(
    "9",
    { name: "Chen Wei", email: "chen@example.com" },
    "API Documentation Review",
    `Hi Alex,

The API documentation is ready for review. I've updated all endpoints to reflect the latest changes from the v2 release.

Key updates:
- 15 new endpoints
- Updated authentication flow
- New rate limiting documentation
- Improved error response examples

Please take a look when you have a chance and let me know if you have any questions or suggestions.

Best,
Chen`,
    "Apr 25, 3:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "9-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: API Documentation Review",
        `Great job on the documentation, Chen!

A few minor suggestions:
1. Add more examples for the authentication flow
2. Include code samples in Python and JavaScript
3. Consider adding a quick start guide

Otherwise, looks comprehensive!

Alex`,
        "Apr 25, 4:15 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "9-2",
        { name: "Chen Wei", email: "chen@example.com" },
        "Re: API Documentation Review",
        `Thanks Alex! I'll add those additional resources.

Should be updated by end of day tomorrow.

Chen`,
        "Apr 25, 4:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 10: Customer Feedback Summary - with 2 replies
  createEmail(
    "10",
    { name: "Lisa Park", email: "lisa@example.com" },
    "Q1 Customer Feedback Summary",
    `Dear Team,

I've compiled the customer feedback from Q1. Here are the key takeaways:

Positive:
- 87% customer satisfaction
- Praised product reliability
- Good customer service ratings

Areas for Improvement:
- Request for more customization options
- Some users find the UI complex
- Faster response time on support tickets

I'll send the detailed report tomorrow. Let me know if you need anything specific highlighted.

Best,
Lisa`,
    "Apr 22, 10:00 AM",
    ["work", "important"],
    true,
    true,
    false,
    "inbox",
    [attachments[3]],
    [
      createEmail(
        "10-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Q1 Customer Feedback Summary",
        `Thanks Lisa! The 87% satisfaction rate is excellent.

The UI complexity concern is something we should address. Let's discuss this in our next product meeting.

Alex`,
        "Apr 22, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "10-2",
        { name: "Lisa Park", email: "lisa@example.com" },
        "Re: Q1 Customer Feedback Summary",
        `Agreed! I've scheduled a UX review session for next week to specifically address the UI concerns.

I'll invite the design team as well.

Lisa`,
        "Apr 22, 11:30 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 11: Server Maintenance - with 2 replies
  createEmail(
    "11",
    { name: "Raj Patel", email: "raj@example.com" },
    "Scheduled Server Maintenance",
    `Hi Alex,

We need to schedule server maintenance for the production environment. The maintenance will include:

- Security patches
- Database optimization
- Server upgrades

This will require approximately 2 hours of downtime. I'm suggesting we do this on Sunday at 2:00 AM to minimize impact.

Please let me know if this works for you or if you'd prefer a different time.

Thanks,
Raj`,
    "Apr 20, 9:00 AM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "11-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Scheduled Server Maintenance",
        `Sunday at 2:00 AM works perfectly.

Make sure to:
1. Send notification to all users at least 48 hours in advance
2. Have a rollback plan ready
3. Monitor closely for 24 hours after the maintenance

Alex`,
        "Apr 20, 9:45 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "11-2",
        { name: "Raj Patel", email: "raj@example.com" },
        "Re: Scheduled Server Maintenance",
        `Will do! I'll prepare the rollback plan and schedule the notification email.

Thanks for the guidance, Alex.

Raj`,
        "Apr 20, 10:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 12: Team Building Event - with 3 replies
  createEmail(
    "12",
    { name: "Sarah Johnson", email: "sarah@example.com" },
    "Team Building Event Ideas",
    `Hi Alex,

I'm planning our quarterly team building event and have a few ideas:

1. Escape Room Challenge
2. Cooking Class
3. Outdoor Adventure Course
4. Trivia Night

I'd love to get your input and any other suggestions you might have. Budget is $150 per person.

Let me know your thoughts!

Best,
Sarah`,
    "Apr 18, 2:00 PM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "12-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Team Building Event Ideas",
        `Great ideas, Sarah! I really like the Escape Room and Outdoor Adventure Course options.

Let's do a quick poll with the team to see which one they prefer.

Alex`,
        "Apr 18, 3:00 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "12-2",
        { name: "Sarah Johnson", email: "sarah@example.com" },
        "Re: Team Building Event Ideas",
        `Perfect! I'll create a poll and send it out today.

I'll also include the Outdoor Adventure Course as a second choice for a follow-up event.

Sarah`,
        "Apr 18, 3:30 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "12-3",
        { name: "Sarah Johnson", email: "sarah@example.com" },
        "Re: Team Building Event Ideas",
        `Poll results are in! Escape Room won with 12 votes.

I'll book it for next Friday afternoon.

Sarah`,
        "Apr 19, 10:00 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 13: Design Review - with 2 replies
  createEmail(
    "13",
    { name: "Mike Thompson", email: "mike@example.com" },
    "New Dashboard Designs",
    `Hey Alex,

The new dashboard designs are ready for review! We've incorporated all the feedback from the last round.

Key improvements:
- Cleaner layout
- Better data visualization
- Improved navigation
- Dark mode support

Let me know when you'd like to go over them together.

Best,
Mike`,
    "Apr 15, 11:00 AM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "13-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: New Dashboard Designs",
        `Great to hear they're ready! How about we review them tomorrow at 10:00 AM?

I'm particularly interested in seeing the dark mode version.

Alex`,
        "Apr 15, 12:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "13-2",
        { name: "Mike Thompson", email: "mike@example.com" },
        "Re: New Dashboard Designs",
        `Tomorrow at 10:00 AM works perfectly.

I'll make sure the dark mode version is polished and ready to show.

See you then!

Mike`,
        "Apr 15, 12:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 14: Code Review Request - with 3 replies
  createEmail(
    "14",
    { name: "David Kim", email: "david@example.com" },
    "Code Review: Payment Module",
    `Hi Alex,

I've completed the payment module refactoring. The changes include:

- Cleaned up old legacy code
- Improved error handling
- Added unit tests
- Optimized performance

Could you please review the PR when you have a chance? I think this is ready to merge, but I'd appreciate your input.

PR Link: #1234

Thanks,
David`,
    "Apr 12, 3:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "14-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Code Review: Payment Module",
        `Hi David,

I've reviewed the PR - great work! I have a few minor comments:

1. Line 234: Consider using async/await for better readability
2. The error handling looks good, but add more specific error messages
3. Unit tests are comprehensive!

Once you address these minor issues, I'm happy to approve.

Alex`,
        "Apr 12, 4:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "14-2",
        { name: "David Kim", email: "david@example.com" },
        "Re: Code Review: Payment Module",
        `Thanks for the feedback, Alex! I've made the changes:

1. Converted to async/await
2. Added more specific error messages
3. Left the unit tests as is

Updated PR: #1234

David`,
        "Apr 12, 5:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "14-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Code Review: Payment Module",
        `Perfect! I've approved the PR. Nice work on this refactoring!

Let's discuss the next module in our standup tomorrow.

Alex`,
        "Apr 13, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 15: Conference Registration - with 2 replies
  createEmail(
    "15",
    { name: "Emily Chen", email: "emily@example.com" },
    "Tech Conference Registration",
    `Hi Alex,

Early bird registration for TechCon 2024 is open until the end of the month. I'd like to register our team.

Details:
- Date: June 15-17
- Location: San Francisco
- Early bird price: $399 per person

We have 5 team members interested. Should I proceed with registration?

Best,
Emily`,
    "Apr 10, 2:00 PM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "15-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Tech Conference Registration",
        `Yes, let's register all 5! The early bird pricing is a good deal.

Also, please book travel and accommodations. We'll need:
- 5 hotel rooms for 3 nights
- Flight arrangements

Let me know the total budget once you have everything.

Alex`,
        "Apr 10, 2:30 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "15-2",
        { name: "Emily Chen", email: "emily@example.com" },
        "Re: Tech Conference Registration",
        `Done! I've registered all 5 team members and booked the hotel.

Flights are slightly more expensive than expected due to high demand. Total budget will be around $8,500.

Is that within our allocation?

Emily`,
        "Apr 11, 10:00 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 16: Security Audit Results - with 2 replies
  createEmail(
    "16",
    { name: "Tom Wilson", email: "tom@example.com" },
    "Security Audit Results",
    `Hi Alex,

The external security audit is complete. Here's a summary:

Overall: Good
- No critical vulnerabilities found
- 3 medium severity issues
- 5 low severity issues

The medium issues need to be addressed within 30 days. I'll create tickets for each one.

Full report is attached for your review.

Best,
Tom`,
    "Apr 8, 10:00 AM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [attachments[0]],
    [
      createEmail(
        "16-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Security Audit Results",
        `Thanks for the summary, Tom. Overall, this is good news!

Let's prioritize the medium severity issues. Please:
1. Assign them to the appropriate team members
2. Set deadlines for each
3. Schedule a follow-up audit in 6 months

Alex`,
        "Apr 8, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "16-2",
        { name: "Tom Wilson", email: "tom@example.com" },
        "Re: Security Audit Results",
        `Will do! I'll assign them today and track progress in our security dashboard.

I've also scheduled the follow-up audit for October.

Tom`,
        "Apr 8, 11:30 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 17: Performance Metrics - with 2 replies
  createEmail(
    "17",
    { name: "Jennifer Lee", email: "jennifer@example.com" },
    "Q1 Performance Metrics",
    `Dear Alex,

I've compiled the Q1 performance metrics for the team. Here are the highlights:

- 98% uptime achieved (target: 99%)
- Average response time: 145ms (target: 200ms)
- 99.9% of requests completed within SLA
- Zero critical incidents

We fell slightly short on uptime but exceeded all other targets. I'll attach the detailed report.

Best,
Jennifer`,
    "Apr 5, 9:00 AM",
    ["work", "finance"],
    true,
    true,
    false,
    "inbox",
    [attachments[4]],
    [
      createEmail(
        "17-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Q1 Performance Metrics",
        `Excellent work, Jennifer! The response time improvement is impressive.

Regarding the uptime - do we know what caused the 1% downtime? Let's investigate and put measures in place to hit 99% in Q2.

Alex`,
        "Apr 5, 10:00 AM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "17-2",
        { name: "Jennifer Lee", email: "jennifer@example.com" },
        "Re: Q1 Performance Metrics",
        `Good question. The downtime was due to a scheduled maintenance window that ran longer than expected.

I've updated our maintenance procedures to ensure better time estimates going forward.

Jennifer`,
        "Apr 5, 10:30 AM",
        ["work", "finance"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 18: User Testing Feedback - with 3 replies
  createEmail(
    "18",
    { name: "Rachel Green", email: "rachel@example.com" },
    "User Testing Results",
    `Hi Alex,

We completed user testing with 15 participants. Here are the key findings:

What users loved:
- Clean, intuitive interface
- Fast page load times
- Mobile responsiveness

What needs improvement:
- Onboarding flow could be clearer
- Some features are hard to discover
- Search functionality needs enhancement

I have video recordings and detailed notes if you'd like to review them.

Best,
Rachel`,
    "Apr 2, 2:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "18-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: User Testing Results",
        `Thanks Rachel! These insights are valuable.

Let's prioritize:
1. Onboarding flow improvement
2. Feature discoverability

I'd like to see the video recordings. Can you share a link?

Alex`,
        "Apr 2, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "18-2",
        { name: "Rachel Green", email: "rachel@example.com" },
        "Re: User Testing Results",
        `I've uploaded the videos to our shared drive: [link]

I've also created highlight clips for the most common issues.

Rachel`,
        "Apr 2, 3:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "18-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: User Testing Results",
        `Great! I'll review these and then we can discuss improvements in our next design sprint.

Thanks for organizing this testing session!

Alex`,
        "Apr 3, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 19: Team Onboarding - with 2 replies
  createEmail(
    "19",
    { name: "Maria Garcia", email: "maria@example.com" },
    "New Team Member Onboarding",
    `Hi Alex,

We have 3 new team members starting next Monday:
- John Smith (Developer)
- Emily Davis (Designer)
- Michael Brown (Product Manager)

I've prepared the onboarding schedule and materials. I'd like your input on the plan before we finalize it.

When are you available for a quick review?

Best,
Maria`,
    "Mar 30, 11:00 AM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "19-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: New Team Member Onboarding",
        `Great news! 3 new team members will be a great addition.

How about we review the onboarding plan tomorrow at 2:00 PM? I want to make sure they have a smooth first week.

Alex`,
        "Mar 30, 12:00 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "19-2",
        { name: "Maria Garcia", email: "maria@example.com" },
        "Re: New Team Member Onboarding",
        `Tomorrow at 2:00 PM works perfectly.

I've prepared a comprehensive plan including:
- Team introductions
- Product training
- Tool setup
- Mentor assignments

See you then!

Maria`,
        "Mar 30, 12:30 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 20: Database Migration - with 2 replies
  createEmail(
    "20",
    { name: "Kevin Zhang", email: "kevin@example.com" },
    "Database Migration Plan",
    `Hi Alex,

I've prepared the database migration plan for moving to PostgreSQL. The migration will involve:

1. Schema conversion
2. Data migration
3. Application updates
4. Testing and validation

Total estimated time: 2 weekends

I'd like to walk you through the plan and get your approval before we start.

Best,
Kevin`,
    "Mar 28, 3:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "20-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Database Migration Plan",
        `Thanks Kevin. This is a significant migration, so I want to make sure we're thorough.

Can you provide:
1. Rollback plan
2. Risk assessment
3. Performance comparison

Let's schedule a review meeting for Friday.

Alex`,
        "Mar 28, 4:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "20-2",
        { name: "Kevin Zhang", email: "kevin@example.com" },
        "Re: Database Migration Plan",
        `Good points! I'll prepare the rollback plan, risk assessment, and performance benchmarks by Thursday.

I'll send the updated plan before our meeting.

Kevin`,
        "Mar 28, 4:30 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 21: Marketing Campaign Launch - with 3 replies
  createEmail(
    "21",
    { name: "Amy White", email: "amy@example.com" },
    "Spring Marketing Campaign Launch",
    `Hi Alex,

The spring marketing campaign is ready to launch! Here's the overview:

Channels:
- Email marketing
- Social media ads
- Content marketing
- Influencer partnerships

Budget: $50,000
Duration: 6 weeks
Target: Increase brand awareness by 30%

I need your final approval before we go live.

Best,
Amy`,
    "Mar 25, 10:00 AM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "21-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Spring Marketing Campaign Launch",
        `Hi Amy,

The campaign looks comprehensive. A few questions:
1. What's our KPI tracking plan?
2. Do we have a contingency plan if initial results aren't as expected?
3. How are we measuring brand awareness?

Once I have these answers, I'll give my approval.

Alex`,
        "Mar 25, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "21-2",
        { name: "Amy White", email: "amy@example.com" },
        "Re: Spring Marketing Campaign Launch",
        `Great questions, Alex! Here are the answers:

1. KPIs: Reach, engagement, click-through rate, conversions
2. Contingency: We'll reallocate budget to best-performing channels weekly
3. Brand awareness: Measured through surveys and social mentions

Does this address your concerns?

Amy`,
        "Mar 25, 12:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "21-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Spring Marketing Campaign Launch",
        `Yes, this looks solid! You have my approval to launch.

Let's schedule a weekly check-in to review performance and adjust as needed.

Great work on this campaign, Amy!

Alex`,
        "Mar 25, 2:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 22: Product Roadmap Review - with 2 replies
  createEmail(
    "22",
    { name: "Brian Martinez", email: "brian@example.com" },
    "Product Roadmap Q2-Q3",
    `Hi Alex,

I've updated the product roadmap for Q2 and Q3. Key highlights:

Q2:
- Mobile app v2.0
- Enhanced reporting
- API v2 launch

Q3:
- Enterprise features
- Advanced analytics
- Marketplace integration

I'd like to get your input on the priorities and timeline.

Best,
Brian`,
    "Mar 22, 2:00 PM",
    ["work", "project"],
    true,
    true,
    false,
    "inbox",
    [],
    [
      createEmail(
        "22-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Product Roadmap Q2-Q3",
        `Hi Brian,

The roadmap looks good. A few thoughts:
- Mobile app v2.0 should be top priority
- Can we move API v2 launch to early Q2 instead of mid-Q2?
- Enterprise features will need more time than allocated - consider extending into Q4

What's your take on these adjustments?

Alex`,
        "Mar 22, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "22-2",
        { name: "Brian Martinez", email: "brian@example.com" },
        "Re: Product Roadmap Q2-Q3",
        `I agree with your suggestions! Let's adjust:

1. Mobile app v2.0 - Priority 1
2. API v2 - Move to early Q2
3. Enterprise features - Extend into Q4

I'll update the roadmap and share the revised version.

Brian`,
        "Mar 22, 4:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 23: Training Session Schedule - with 2 replies
  createEmail(
    "23",
    { name: "Susan Miller", email: "susan@example.com" },
    "Upcoming Training Sessions",
    `Hi Alex,

I'm organizing training sessions for the team. Here are the upcoming topics:

1. Cloud Security (Apr 15)
2. Agile Methodologies (Apr 22)
3. Data Privacy Compliance (Apr 29)

Each session will be 2 hours. I'd like to know which ones you'd like to attend so I can schedule accordingly.

Best,
Susan`,
    "Mar 20, 10:00 AM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "23-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Upcoming Training Sessions",
        `Hi Susan,

I'd like to attend all three sessions. They're all relevant to our current initiatives.

Please schedule me for:
- Cloud Security (Apr 15)
- Agile Methodologies (Apr 22)
- Data Privacy Compliance (Apr 29)

Alex`,
        "Mar 20, 11:00 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "23-2",
        { name: "Susan Miller", email: "susan@example.com" },
        "Re: Upcoming Training Sessions",
        `Perfect! I've added you to all three sessions.

I'll send calendar invites with meeting room details closer to the dates.

Susan`,
        "Mar 20, 11:30 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 24: Client Meeting Request - with 2 replies
  createEmail(
    "24",
    { name: "Robert Chen", email: "robert@example.com" },
    "Client Meeting Request",
    `Dear Alex,

Our client, Acme Corporation, has requested a meeting to discuss expanding our engagement. They're interested in:

- Additional modules
- Priority support
- Custom integrations

They're available next week. Could you check your calendar and suggest some times?

Best regards,
Robert`,
    "Mar 18, 3:00 PM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "24-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Client Meeting Request",
        `Hi Robert,

I have the following availability next week:
- Tuesday 10:00 AM - 12:00 PM
- Wednesday 2:00 PM - 4:00 PM
- Thursday 10:00 AM - 11:00 AM

Which works best for the client?

Alex`,
        "Mar 18, 4:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "24-2",
        { name: "Robert Chen", email: "robert@example.com" },
        "Re: Client Meeting Request",
        `The client prefers Wednesday 2:00 PM - 4:00 PM.

I'll confirm with them and send a calendar invite. I'll also prepare the proposal for the expanded engagement.

Robert`,
        "Mar 19, 9:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 25: System Backup Failure - with 2 replies
  createEmail(
    "25",
    { name: "IT Support", email: "support@company.com" },
    "System Backup Failure Alert",
    `Hi Alex,

We experienced a failure in last night's backup system. The backup of the production database did not complete successfully.

We've identified the issue and are working on a fix. In the meantime, we're running manual backups to ensure data safety.

Expected resolution: Within 4 hours

I'll keep you updated on our progress.

Best,
IT Support Team`,
    "Mar 15, 9:00 AM",
    ["work", "important"],
    false,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "25-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: System Backup Failure Alert",
        `Thanks for the notification. A few questions:

1. What was the root cause?
2. How are we preventing this from happening again?
3. Do we need to notify stakeholders about the risk?

Please update me once you have answers.

Alex`,
        "Mar 15, 9:30 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "25-2",
        { name: "IT Support", email: "support@company.com" },
        "Re: System Backup Failure Alert",
        `Update:

1. Root cause: Storage space issue during peak backup time
2. Prevention: Implementing better storage monitoring and cleanup
3. Stakeholder notification: Not needed - manual backups are in place

The issue has been resolved and tonight's backup should proceed normally.

IT Support Team`,
        "Mar 15, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 26: Contract Renewal - with 2 replies
  createEmail(
    "26",
    { name: "Legal Department", email: "legal@company.com" },
    "Vendor Contract Renewal",
    `Dear Alex,

The contract with CloudHost Inc. for our hosting services is up for renewal next month.

Current terms:
- Annual cost: $120,000
- Service level: 99.9% uptime
- Support: 24/7

They've proposed a 5% increase for the new term. Please let me know if we should:
1. Accept the renewal with increase
2. Negotiate for better terms
3. Explore alternative vendors

Best,
Legal Department`,
    "Mar 12, 10:00 AM",
    ["work", "finance"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "26-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Vendor Contract Renewal",
        `Let's explore alternatives before accepting the increase. I'd like to see:

1. At least 2 other vendor quotes
2. A comparison of services and pricing
3. Negotiation points we can use with CloudHost

Please prepare this information by next week.

Alex`,
        "Mar 12, 11:00 AM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "26-2",
        { name: "Legal Department", email: "legal@company.com" },
        "Re: Vendor Contract Renewal",
        `Will do! I'll reach out to potential vendors and prepare a comparison document.

I'll also identify our key negotiation points with CloudHost.

Legal Department`,
        "Mar 12, 11:30 AM",
        ["work", "finance"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 27: Feature Request from Customer - with 3 replies
  createEmail(
    "27",
    { name: "Customer Support", email: "support@company.com" },
    "Feature Request: Bulk Export",
    `Hi Alex,

We've received a feature request from a key customer requesting bulk export functionality. They need to export:

- 10,000+ records at once
- Multiple formats (CSV, Excel, PDF)
- Custom field selection
- Scheduled exports

This has been requested by several other customers as well. Should we prioritize this for the next sprint?

Best,
Customer Support Team`,
    "Mar 10, 2:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "27-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Feature Request: Bulk Export",
        `This is a high-value feature. Let's prioritize it.

Please:
1. Gather detailed requirements from key customers
2. Estimate development effort
3. Identify potential technical challenges

I'd like to see a proposal by Friday.

Alex`,
        "Mar 10, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "27-2",
        { name: "Customer Support", email: "support@company.com" },
        "Re: Feature Request: Bulk Export",
        `I've gathered requirements from 5 key customers. Here's the summary:

- Must support CSV, Excel, and PDF
- Need custom field selection UI
- Scheduled exports require background jobs
- Performance: 10k records in under 2 minutes

Development estimate: 3-4 weeks

I'll prepare the full proposal.

Customer Support Team`,
        "Mar 11, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "27-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Feature Request: Bulk Export",
        `Thanks for the research! Let's add this to the next sprint.

3-4 weeks seems reasonable. I'll assign the development team and schedule regular check-ins.

Alex`,
        "Mar 11, 10:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 28: Holiday Party Planning - with 2 replies
  createEmail(
    "28",
    { name: "HR Department", email: "hr@company.com" },
    "Annual Holiday Party Planning",
    `Hi Alex,

It's time to start planning our annual holiday party! Here are the initial details:

Date: December 15th
Venue: To be determined
Budget: $25,000
Expected attendees: 150

I need your input on:
1. Venue preferences
2. Theme ideas
3. Entertainment options

Please let me know your thoughts so we can start booking.

Best,
HR Department`,
    "Mar 8, 11:00 AM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "28-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Annual Holiday Party Planning",
        `Great! Some initial thoughts:

Venue: Hotel ballroom or event center
Theme: "Winter Wonderland" or "Roaring Twenties"
Entertainment: Live band + photo booth

Let's look at 2-3 venue options and compare.

Alex`,
        "Mar 8, 12:00 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "28-2",
        { name: "HR Department", email: "hr@company.com" },
        "Re: Annual Holiday Party Planning",
        `Excellent suggestions! I'll research venues that can accommodate 150 people within our budget.

I love the "Winter Wonderland" theme - very elegant and festive.

I'll have venue options for you by next week.

HR Department`,
        "Mar 8, 12:30 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 29: Office Relocation Update - with 2 replies
  createEmail(
    "29",
    { name: "Facilities Team", email: "facilities@company.com" },
    "Office Relocation Update",
    `Hi Alex,

Update on the office relocation project:

Timeline:
- Site visits completed: 3 locations reviewed
- Final selection: Downtown location
- Lease negotiation: In progress
- Expected move date: July 1st

Next steps:
1. Finalize lease
2. Plan office layout
3. Coordinate IT infrastructure
4. Communicate with team

I'll keep you updated as we progress.

Best,
Facilities Team`,
    "Mar 5, 2:00 PM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "29-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Office Relocation Update",
        `Thanks for the update. The downtown location sounds good.

Please ensure:
1. We have adequate space for team growth
2. Commute accessibility for all team members
3. Modern IT infrastructure
4. Good amenities

When can I see the floor plans?

Alex`,
        "Mar 5, 3:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "29-2",
        { name: "Facilities Team", email: "facilities@company.com" },
        "Re: Office Relocation Update",
        `Great points! The downtown location meets all your criteria:
- Space for 200 employees (currently 120)
- Excellent public transport access
- State-of-the-art IT infrastructure
- Gym, cafeteria, and rooftop terrace

I'll share floor plans by the end of the week.

Facilities Team`,
        "Mar 6, 9:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 30: Budget Approval Request - with 3 replies
  createEmail(
    "30",
    { name: "Finance Team", email: "finance@company.com" },
    "Q2 Budget Approval Request",
    `Dear Alex,

Please review and approve the Q2 budget proposal:

Total Budget: $2.5M
Key allocations:
- Engineering: $1.2M
- Marketing: $500K
- Operations: $400K
- R&D: $300K
- Contingency: $100K

This represents a 10% increase over Q1, mainly due to new hires and increased marketing spend.

Your approval is needed by Friday.

Best,
Finance Team`,
    "Mar 1, 10:00 AM",
    ["work", "finance"],
    true,
    false,
    true,
    "inbox",
    [attachments[4]],
    [
      createEmail(
        "30-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Q2 Budget Approval Request",
        `I've reviewed the budget. A few questions:

1. What's the expected ROI on the increased marketing spend?
2. Can we break down the engineering allocation?
3. Why is R&D decreasing compared to Q1?

Please provide this information before I approve.

Alex`,
        "Mar 1, 11:00 AM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "30-2",
        { name: "Finance Team", email: "finance@company.com" },
        "Re: Q2 Budget Approval Request",
        `Great questions, Alex! Here are the answers:

1. Marketing ROI: Expected 3x return based on Q1 results
2. Engineering breakdown: 60% salaries, 25% tools/services, 15% infrastructure
3. R&D: Actually 5% increase - Q1 had a large one-time project

Does this address your concerns?

Finance Team`,
        "Mar 1, 2:00 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "30-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Q2 Budget Approval Request",
        `Yes, this clarifies things. The budget looks reasonable and well-justified.

You have my approval to proceed with the Q2 budget as proposed.

Alex`,
        "Mar 1, 4:00 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 31: Partner Collaboration Proposal - with 2 replies
  createEmail(
    "31",
    { name: "Partnerships Team", email: "partnerships@company.com" },
    "Strategic Partnership Opportunity",
    `Hi Alex,

TechCorp Inc. has approached us about a strategic partnership. They're proposing:

- Joint product development
- Cross-marketing initiatives
- Shared customer base
- Revenue sharing model

This could significantly expand our market reach. I've prepared a preliminary assessment.

Should we pursue this opportunity?

Best,
Partnerships Team`,
    "Feb 28, 9:00 AM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "31-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Strategic Partnership Opportunity",
        `Interesting proposal. Before we decide, I need to understand:

1. TechCorp's market position and reputation
2. Potential synergies with our products
3. Risks and mitigations
4. Expected timeline for integration

Please prepare a detailed analysis.

Alex`,
        "Feb 28, 10:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "31-2",
        { name: "Partnership Team", email: "partnerships@company.com" },
        "Re: Strategic Partnership Opportunity",
        `I've completed the analysis:

1. TechCorp: Market leader, excellent reputation
2. Synergies: Strong - complementary products
3. Risks: Integration complexity, brand alignment
4. Timeline: 6-8 months for full integration

My recommendation: Pursue with a pilot program first.

What do you think?

Partnerships Team`,
        "Mar 1, 9:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 32: Employee Recognition - with 2 replies
  createEmail(
    "32",
    { name: "HR Department", email: "hr@company.com" },
    "Employee Recognition Awards",
    `Hi Alex,

It's time for our quarterly employee recognition awards. Here are the nominations:

Employee of the Quarter: Sarah Johnson
Rising Star: Michael Chen
Team Player: Emily Rodriguez
Innovation Award: David Park

I need your approval on the final selections. Each award comes with a $1,000 bonus.

Please review and confirm.

Best,
HR Department`,
    "Feb 25, 11:00 AM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "32-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Employee Recognition Awards",
        `Excellent selections! I fully approve all four awards.

Sarah has been outstanding this quarter, and Michael shows great promise. Emily and David are well-deserved too.

Let's make the announcements at the next all-hands meeting.

Alex`,
        "Feb 25, 12:00 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "32-2",
        { name: "HR Department", email: "hr@company.com" },
        "Re: Employee Recognition Awards",
        `Perfect! I'll prepare the awards and announcements.

I'll also arrange a small celebration for the recipients.

Thank you for your quick approval!

HR Department`,
        "Feb 25, 12:30 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 33: Product Beta Testing - with 3 replies
  createEmail(
    "33",
    { name: "Product Team", email: "product@company.com" },
    "Beta Testing Program Launch",
    `Hi Alex,

We're ready to launch the beta testing program for our new product. Here's the plan:

Phase 1: Internal testing (50 users)
Phase 2: Friendly customers (100 users)
Phase 3: Public beta (500 users)

Each phase will last 2 weeks. We've prepared feedback forms and tracking systems.

I need your go-ahead to start Phase 1.

Best,
Product Team`,
    "Feb 22, 2:00 PM",
    ["work", "project"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "33-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Beta Testing Program Launch",
        `Good plan! Before we start, please ensure:

1. All critical bugs from QA are resolved
2. Feedback forms are comprehensive
3. We have a process for prioritizing feedback
4. Communication plan for beta testers

Once these are in place, you have my go-ahead.

Alex`,
        "Feb 22, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "33-2",
        { name: "Product Team", email: "product@company.com" },
        "Re: Beta Testing Program Launch",
        `All items checked:

1. Critical bugs: ✓ Resolved
2. Feedback forms: ✓ Comprehensive and tested
3. Feedback prioritization: ✓ Process documented
4. Communication: ✓ Templates ready

Starting Phase 1 tomorrow!

Product Team`,
        "Feb 23, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "33-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Beta Testing Program Launch",
        `Excellent! Keep me updated on the beta testing progress.

I'm particularly interested in:
- User satisfaction scores
- Bug discovery rate
- Feature usage analytics

Send me weekly summaries.

Alex`,
        "Feb 23, 10:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 34: Training Material Update - with 2 replies
  createEmail(
    "34",
    { name: "Learning & Development", email: "lnd@company.com" },
    "Training Material Refresh",
    `Hi Alex,

It's time to refresh our training materials. The current content is 18 months old and needs updates for:

- New product features
- Updated processes and workflows
- Recent compliance requirements
- Best practices

I estimate this project will take 4-6 weeks with the help of subject matter experts.

Should we proceed?

Best,
Learning & Development Team`,
    "Feb 20, 10:00 AM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "34-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Training Material Refresh",
        `Yes, this is important. Let's proceed with a focused approach:

1. Prioritize the most critical training modules
2. Work with SMEs from each team
3. Consider interactive elements (videos, quizzes)
4. Plan for quarterly updates going forward

What's your proposed timeline?

Alex`,
        "Feb 20, 11:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "34-2",
        { name: "Learning & Development", email: "lnd@company.com" },
        "Re: Training Material Refresh",
        `Great approach! Here's my proposed timeline:

Phase 1 (Weeks 1-2): Core product training
Phase 2 (Weeks 3-4): Processes and compliance
Phase 3 (Weeks 5-6): Interactive elements and review

I'll start reaching out to SMEs today.

Learning & Development Team`,
        "Feb 20, 12:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 35: Vendor Performance Review - with 2 replies
  createEmail(
    "35",
    { name: "Procurement", email: "procurement@company.com" },
    "Q1 Vendor Performance Review",
    `Hi Alex,

I've completed the Q1 vendor performance reviews. Here are the key findings:

Top Performers:
- CloudHost Inc.: 99.95% uptime, excellent support
- DesignStudio: High quality, on-time delivery
- DataSync: Reliable, fast

Needs Improvement:
- MarketingPro: Inconsistent deliverables
- SupportHub: Response time variability

I have recommendations for each. When can we discuss?

Best,
Procurement Team`,
    "Feb 18, 3:00 PM",
    ["work", "finance"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "35-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Q1 Vendor Performance Review",
        `Thanks for the review. For the vendors needing improvement:

1. Set clear performance expectations and timelines
2. Schedule regular check-ins
3. Prepare contingency plans if they don't improve

Let's discuss tomorrow at 10:00 AM.

Alex`,
        "Feb 18, 4:00 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "35-2",
        { name: "Procurement", email: "procurement@company.com" },
        "Re: Q1 Vendor Performance Review",
        `Will do! I've already drafted improvement plans for both vendors.

I'll research alternative vendors as backup options.

See you tomorrow at 10:00 AM.

Procurement Team`,
        "Feb 18, 4:30 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 36: Compliance Audit - with 3 replies
  createEmail(
    "36",
    { name: "Compliance Team", email: "compliance@company.com" },
    "Annual Compliance Audit",
    `Hi Alex,

The annual compliance audit is scheduled for next month. Here's what we need to prepare:

Documentation:
- Data privacy policies
- Security procedures
- Employee training records
- Incident response plans

Assessments:
- Access control review
- Data classification audit
- Third-party risk assessment

I've created a checklist and timeline. Please review.

Best,
Compliance Team`,
    "Feb 15, 10:00 AM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "36-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Annual Compliance Audit",
        `Thanks for the preparation. A few additional items to include:

1. Recent security incident reports and resolutions
2. Updated third-party vendor agreements
3. Employee acknowledgment forms
4. Disaster recovery test results

When is the auditor visiting?

Alex`,
        "Feb 15, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "36-2",
        { name: "Compliance Team", email: "compliance@company.com" },
        "Re: Annual Compliance Audit",
        `Good additions! I'll include all of them.

The auditor will be here March 15-17. That gives us about 4 weeks to prepare.

I've scheduled weekly check-ins to track progress.

Compliance Team`,
        "Feb 15, 12:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "36-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Annual Compliance Audit",
        `Perfect. Let's make sure we're fully prepared.

I'll attend the weekly check-ins and address any issues that come up.

Thanks for organizing this!

Alex`,
        "Feb 15, 2:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 37: Team Outing Planning - with 2 replies
  createEmail(
    "37",
    { name: "Social Committee", email: "social@company.com" },
    "Team Outing - Escape Room",
    `Hi Alex,

The social committee is planning a team outing to an escape room! Here are the details:

Date: Saturday, March 15th
Time: 2:00 PM
Location: PuzzleMaster Escape Rooms
Theme: "The Heist"
Cost: $35 per person

We have 20 spots available. Please let me know if you'd like to join and if you're okay with the team covering the cost.

Best,
Social Committee`,
    "Feb 12, 2:00 PM",
    ["personal", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "37-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Team Outing - Escape Room",
        `Sounds fun! I'd love to join.

I'm okay with the company covering the cost - it's a great team-building activity.

Count me in!

Alex`,
        "Feb 12, 3:00 PM",
        ["personal", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "37-2",
        { name: "Social Committee", email: "social@company.com" },
        "Re: Team Outing - Escape Room",
        `Great! You're spot #1 confirmed.

I'll send out the invitation to the team tomorrow. I think it's going to be a lot of fun!

Social Committee`,
        "Feb 12, 3:30 PM",
        ["personal", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 38: System Upgrade Notification - with 2 replies
  createEmail(
    "38",
    { name: "IT Operations", email: "itops@company.com" },
    "System Upgrade Notification",
    `Hi Alex,

We're planning a major system upgrade for the weekend of February 24th:

Upgrades:
- Operating system patches
- Database version update
- Application server upgrade
- Security enhancements

Expected downtime: Saturday 10:00 PM - Sunday 6:00 AM

This is critical for security and performance. Please confirm if this timing works.

Best,
IT Operations`,
    "Feb 10, 10:00 AM",
    ["work", "important"],
    true,
    false,
    true,
    "inbox",
    [],
    [
      createEmail(
        "38-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: System Upgrade Notification",
        `That timing works well - minimal business impact.

Please ensure:
1. Complete backup before upgrade
2. Rollback plan tested
3. On-call team available during upgrade
4. Post-upgrade monitoring

Send me the detailed plan.

Alex`,
        "Feb 10, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "38-2",
        { name: "IT Operations", email: "itops@company.com" },
        "Re: System Upgrade Notification",
        `Will do! I'll prepare:

1. Full backup to secondary location
2. Tested rollback procedures
3. On-call team scheduled
4. 24-hour monitoring plan

I'll send the detailed plan by Friday.

IT Operations`,
        "Feb 10, 12:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 39: Remote Work Policy - with 3 replies
  createEmail(
    "39",
    { name: "HR Department", email: "hr@company.com" },
    "Remote Work Policy Update",
    `Hi Alex,

We're updating our remote work policy based on team feedback and industry best practices. Key changes:

- 3 days office, 2 days remote (flexible)
- Remote work stipend: $100/month
- Core hours: 10 AM - 3 PM
- Monthly team in-person day

I need your approval before we implement this policy.

Best,
HR Department`,
    "Feb 8, 9:00 AM",
    ["work", "important"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "39-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Remote Work Policy Update",
        `This is a good direction. A few considerations:

1. How will we handle different time zones?
2. What's the equipment budget for remote workers?
3. How do we measure productivity?
4. What about fully remote positions?

Let's discuss these in our next leadership meeting.

Alex`,
        "Feb 8, 10:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "39-2",
        { name: "HR Department", email: "hr@company.com" },
        "Re: Remote Work Policy Update",
        `Good points! Here are my thoughts:

1. Core hours accommodate most time zones
2. $1,000 equipment budget for remote workers
3. Productivity: Output-based metrics, not hours
4. Fully remote: Case-by-case approval needed

I'll add these to the policy.

HR Department`,
        "Feb 8, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "39-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Remote Work Policy Update",
        `Looks good! Once you've updated it, send it to me for final review.

I want to make sure all managers are aligned before we announce.

Alex`,
        "Feb 8, 12:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 40: Project Milestone Celebration - with 2 replies
  createEmail(
    "40",
    { name: "Project Team", email: "project@company.com" },
    "Project Milestone Achieved!",
    `Hi Alex,

Great news! We've successfully completed the first major milestone of Project Phoenix:

✅ Core infrastructure deployed
✅ API endpoints implemented
✅ Initial user testing complete
✅ Performance targets met

The team has worked incredibly hard to achieve this. We'd like to celebrate with the team.

Can we organize a team lunch or happy hour?

Best,
Project Team`,
    "Feb 5, 2:00 PM",
    ["work", "project", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "40-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Project Milestone Achieved!",
        `This is fantastic news! Congratulations to the entire team!

Let's celebrate! A team lunch this Friday would be perfect. I'll cover the cost.

Please book a restaurant that can accommodate the whole team.

Alex`,
        "Feb 5, 3:00 PM",
        ["work", "project", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "40-2",
        { name: "Project Team", email: "project@company.com" },
        "Re: Project Milestone Achieved!",
        `That's amazing! The team will be thrilled.

I've booked The Garden Bistro for Friday at 12:30 PM. They can accommodate all of us.

I'll send out the calendar invite today.

Project Team`,
        "Feb 6, 9:00 AM",
        ["work", "project", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 41: Customer Survey Results - with 2 replies
  createEmail(
    "41",
    { name: "Customer Success", email: "success@company.com" },
    "Annual Customer Survey Results",
    `Hi Alex,

The annual customer survey results are in! Here are the highlights:

Overall Satisfaction: 8.7/10 (up from 8.2 last year)
NPS Score: 62 (up from 55)
Customer Retention: 94% (up from 91%)

Top positive feedback:
- Product reliability
- Customer support quality
- Ease of use

Areas for improvement:
- Response time on tickets
- Feature requests
- Documentation clarity

I've attached the full report.

Best,
Customer Success Team`,
    "Feb 3, 10:00 AM",
    ["work", "important"],
    true,
    true,
    false,
    "inbox",
    [attachments[0]],
    [
      createEmail(
        "41-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Annual Customer Survey Results",
        `Excellent results! The improvement across all metrics is outstanding.

For the improvement areas, let's:
1. Analyze ticket response times and set targets
2. Create a feature request prioritization system
3. Update documentation with more examples

When can we discuss action items?

Alex`,
        "Feb 3, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "41-2",
        { name: "Customer Success", email: "success@company.com" },
        "Re: Annual Customer Survey Results",
        `Great! I'm preparing action plans for all three areas.

How about we meet this Thursday to review and assign ownership?

I'll invite the relevant team leads.

Customer Success Team`,
        "Feb 3, 12:00 PM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 42: Interview Schedule - with 2 replies
  createEmail(
    "42",
    { name: "Recruiting", email: "recruiting@company.com" },
    "Senior Developer Interviews",
    `Hi Alex,

We have 3 strong candidates for the Senior Developer position. Here's the schedule:

John Smith: Tuesday 10:00 AM
Emily Chen: Wednesday 2:00 PM
Michael Brown: Thursday 11:00 AM

Each interview will be 1 hour. I'd like you to participate in the final round.

All candidates have strong technical skills and good cultural fit.

Which interviews would you like to join?

Best,
Recruiting Team`,
    "Feb 1, 9:00 AM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "42-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Senior Developer Interviews",
        `I'd like to join all three interviews. Please send me:
1. Each candidate's resume
2. Technical assessment results
3. Interview questions

Looking forward to meeting them!

Alex`,
        "Feb 1, 10:00 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "42-2",
        { name: "Recruiting", email: "recruiting@company.com" },
        "Re: Senior Developer Interviews",
        `Perfect! I'll send you all the materials before each interview.

I've also scheduled team members to join the interviews for different perspectives.

See you Tuesday!

Recruiting Team`,
        "Feb 1, 11:00 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 43: Infrastructure Scaling - with 3 replies
  createEmail(
    "43",
    { name: "Infrastructure Team", email: "infra@company.com" },
    "Infrastructure Scaling Proposal",
    `Hi Alex,

Based on our growth projections, we need to scale our infrastructure. Here's the proposal:

Current:
- 50 servers
- 100TB storage
- 1TB RAM total

Proposed:
- 100 servers
- 250TB storage
- 4TB RAM total
- Load balancer upgrade

Estimated cost: $500K/year
Implementation time: 2 months

Should we proceed?

Best,
Infrastructure Team`,
    "Jan 30, 2:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "43-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Infrastructure Scaling Proposal",
        `This is necessary for our growth. Before we proceed:

1. Can we optimize current infrastructure first?
2. What's the ROI on this investment?
3. Can we phase the implementation?
4. Any alternative approaches (cloud vs. on-prem)?

Please provide this analysis.

Alex`,
        "Jan 30, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "43-2",
        { name: "Infrastructure Team", email: "infra@company.com" },
        "Re: Infrastructure Scaling Proposal",
        `Good questions! Here are the answers:

1. Optimization: Already done - 15% improvement, not enough
2. ROI: 3x in performance, supports 3x growth
3. Phasing: Yes - can do in 3 phases over 6 months
4. Alternatives: Cloud hybrid - considered, cost is higher long-term

Recommendation: Proceed with phased on-prem expansion.

Infrastructure Team`,
        "Jan 31, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "43-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Infrastructure Scaling Proposal",
        `I'm convinced. Let's proceed with the phased approach.

Please prepare a detailed implementation plan with:
- Phase breakdown
- Timeline
- Budget per phase
- Risk mitigation

I'll review next week.

Alex`,
        "Jan 31, 10:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 44: Brand Guidelines Update - with 2 replies
  createEmail(
    "44",
    { name: "Marketing Team", email: "marketing@company.com" },
    "Brand Guidelines Update",
    `Hi Alex,

We've updated our brand guidelines to reflect our evolved identity. Key changes:

Visual:
- Updated color palette
- New typography
- Refreshed logo usage
- Modern photography style

Voice:
- More conversational tone
- Clearer messaging
- Consistent terminology

I'd like your approval before we roll this out company-wide.

Best,
Marketing Team`,
    "Jan 28, 10:00 AM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "44-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Brand Guidelines Update",
        `This looks good! The evolution makes sense.

Before approval, I'd like to see:
1. Before/after examples
2. Implementation timeline
3. Training plan for teams
4. Cost of updating all materials

When can you present this?

Alex`,
        "Jan 28, 11:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "44-2",
        { name: "Marketing Team", email: "marketing@company.com" },
        "Re: Brand Guidelines Update",
        `I'll prepare a presentation with all of this information.

How about we meet on Wednesday to review together? I'll have the examples, timeline, and budget ready.

Marketing Team`,
        "Jan 28, 12:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 45: Knowledge Base Expansion - with 2 replies
  createEmail(
    "45",
    { name: "Documentation Team", email: "docs@company.com" },
    "Knowledge Base Expansion",
    `Hi Alex,

We're planning to expand our knowledge base to include:

- Video tutorials
- Interactive guides
- Community Q&A
- Advanced troubleshooting

This will improve self-service and reduce support ticket volume by an estimated 30%.

Budget needed: $75,000
Timeline: 4 months

Should we proceed?

Best,
Documentation Team`,
    "Jan 25, 2:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "45-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Knowledge Base Expansion",
        `Great initiative! A 30% reduction in tickets would be significant.

Before we proceed:
1. What's the current ticket volume?
2. How will we measure success?
3. Who will maintain the content?
4. Can we start with a pilot phase?

Let me know your thoughts.

Alex`,
        "Jan 25, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "45-2",
        { name: "Documentation Team", email: "docs@company.com" },
        "Re: Knowledge Base Expansion",
        `Good points! Here are the answers:

1. Current volume: 2,000 tickets/month
2. Success metrics: Ticket volume, self-service rate, satisfaction
3. Maintenance: Dedicated content writer + SME contributions
4. Pilot: Yes, can start with top 50 FAQs and tutorials

Recommendation: Start with 2-month pilot, then expand.

Documentation Team`,
        "Jan 26, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 46: Community Event - with 2 replies
  createEmail(
    "46",
    { name: "Community Team", email: "community@company.com" },
    "Developer Community Meetup",
    `Hi Alex,

We're planning our first developer community meetup! Here's the plan:

Topic: "Building Scalable Applications"
Date: February 20th
Time: 6:00 PM - 9:00 PM
Location: Our office
Expected attendees: 100

We have 3 speakers lined up from our team. I'd love for you to give the opening remarks.

Can you join us?

Best,
Community Team`,
    "Jan 22, 10:00 AM",
    ["work", "meeting"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "46-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Developer Community Meetup",
        `I'd love to! This is a great initiative for building our developer community.

For the opening remarks, I'll focus on:
- Our commitment to developers
- The value of community
- What's coming next

Let me know how long you'd like me to speak.

Alex`,
        "Jan 22, 11:00 AM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
      createEmail(
        "46-2",
        { name: "Community Team", email: "community@company.com" },
        "Re: Developer Community Meetup",
        `Perfect! 5-10 minutes would be ideal for the opening remarks.

I'll make sure you're scheduled right after the welcome.

We're expecting a great turnout - registrations are already at 75!

Community Team`,
        "Jan 22, 12:00 PM",
        ["work", "meeting"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 47: Performance Bonus Calculation - with 2 replies
  createEmail(
    "47",
    { name: "HR Department", email: "hr@company.com" },
    "Q4 Performance Bonus Calculation",
    `Hi Alex,

I've calculated the Q4 performance bonuses for the team. Here's the summary:

Total bonus pool: $250,000
Eligible employees: 50
Average bonus: $5,000
Range: $2,000 - $15,000

Calculations are based on:
- Individual performance
- Team achievements
- Company goals met

I need your final approval before we distribute.

Best,
HR Department`,
    "Jan 20, 10:00 AM",
    ["work", "finance"],
    true,
    false,
    false,
    "inbox",
    [attachments[4]],
    [
      createEmail(
        "47-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Q4 Performance Bonus Calculation",
        `The calculations look fair and well-justified.

Before final approval, I'd like to see:
1. Top 10 performers and their bonuses
2. Distribution by department
3. Comparison with Q3

Please provide this information.

Alex`,
        "Jan 20, 11:00 AM",
        ["work", "finance"],
        true,
        false,
        false
      ),
      createEmail(
        "47-2",
        { name: "HR Department", email: "hr@company.com" },
        "Re: Q4 Performance Bonus Calculation",
        `Here's the information:

Top 10:
1. Sarah Johnson: $15,000
2. David Park: $12,000
3. Emily Chen: $11,500
[...full list in attached document]

Department distribution is balanced. Overall, bonuses are 15% higher than Q3.

HR Department`,
        "Jan 20, 2:00 PM",
        ["work", "finance"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 48: Accessibility Improvements - with 3 replies
  createEmail(
    "48",
    { name: "Design Team", email: "design@company.com" },
    "Accessibility Improvements",
    `Hi Alex,

We've completed an accessibility audit of our products. Here are the key findings:

Current Compliance: WCAG 2.1 AA
Issues Found:
- 15 high priority
- 30 medium priority
- 45 low priority

We've created a remediation plan to achieve WCAG 2.2 AAA compliance.

Estimated effort: 6 weeks
Budget: $75,000

Should we proceed?

Best,
Design Team`,
    "Jan 18, 2:00 PM",
    ["work", "project"],
    true,
    false,
    false,
    "inbox",
    [],
    [
      createEmail(
        "48-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Accessibility Improvements",
        `Accessibility is important to me. I want to understand:

1. What are the most critical issues affecting users?
2. How will this impact our development timeline?
3. Can we integrate this into regular development?
4. What's the maintenance plan going forward?

Please prepare this analysis.

Alex`,
        "Jan 18, 3:00 PM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "48-2",
        { name: "Design Team", email: "design@company.com" },
        "Re: Accessibility Improvements",
        `Great questions! Here are the answers:

1. Critical issues: Screen reader compatibility, keyboard navigation, color contrast
2. Timeline impact: Can be integrated - adds 20% to each sprint
3. Regular development: Yes, accessibility reviews in each PR
4. Maintenance: Automated testing + quarterly audits

Recommendation: Integrate into development rather than separate project.

Design Team`,
        "Jan 19, 9:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
      createEmail(
        "48-3",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Accessibility Improvements",
        `I agree! Integrating into development is the right approach.

Let's:
1. Train the team on accessibility best practices
2. Set up automated testing
3. Create accessibility guidelines for all new features

Thank you for bringing this to my attention!

Alex`,
        "Jan 19, 10:00 AM",
        ["work", "project"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 49: Investor Update - with 2 replies
  createEmail(
    "49",
    { name: "Finance Team", email: "finance@company.com" },
    "Quarterly Investor Update",
    `Hi Alex,

I've prepared the quarterly investor update. Key highlights:

Financials:
- Revenue: $12.5M (up 25% QoQ)
- Profit: $2.8M (up 30% QoQ)
- Cash on hand: $8.2M

Milestones:
- Launched 3 new products
- Expanded to 2 new markets
- Signed 5 enterprise deals

Please review and let me know if you have any edits.

Best,
Finance Team`,
    "Jan 15, 10:00 AM",
    ["work", "finance", "important"],
    true,
    false,
    true,
    "inbox",
    [attachments[4]],
    [
      createEmail(
        "49-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: Quarterly Investor Update",
        `Excellent results! The growth is impressive.

A few suggestions for the update:
1. Highlight customer growth metrics
2. Include product roadmap preview
3. Add team growth statistics
4. Mention our sustainability initiatives

Once updated, I'll give final approval.

Alex`,
        "Jan 15, 11:00 AM",
        ["work", "finance", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "49-2",
        { name: "Finance Team", email: "finance@company.com" },
        "Re: Quarterly Investor Update",
        `Great suggestions! I've incorporated all of them:

- Customer growth: 45% increase to 50,000
- Roadmap preview: 3 major features in Q2
- Team growth: From 100 to 120 employees
- Sustainability: Carbon neutral by 2025

I'll send the final version for your approval.

Finance Team`,
        "Jan 15, 12:00 PM",
        ["work", "finance", "important"],
        true,
        false,
        false
      ),
    ]
  ),

  // Email 50: Year in Review - with 2 replies
  createEmail(
    "50",
    { name: "Executive Team", email: "executive@company.com" },
    "2023 Year in Review",
    `Dear Alex,

As we close out the year, here's a recap of our achievements:

Business:
- Revenue: $45M (up 40% YoY)
- Customers: 15,000 (up 60% YoY)
- Employees: 120 (up 50% YoY)

Product:
- Launched 8 new features
- 99.9% uptime
- 4.8/5 customer rating

Team:
- Grew to 120 amazing people
- Won 5 industry awards
- Published 10 research papers

It's been an incredible year!

Best,
Executive Team`,
    "Jan 10, 9:00 AM",
    ["work", "important"],
    true,
    true,
    true,
    "inbox",
    [],
    [
      createEmail(
        "50-1",
        { name: "Alex Morgan", email: "alex@example.com" },
        "Re: 2023 Year in Review",
        `This is incredible! The growth and achievements are outstanding.

Thank you to everyone for their hard work and dedication.

Let's make 2024 even better! I'm excited about what we can accomplish together.

Alex`,
        "Jan 10, 10:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
      createEmail(
        "50-2",
        { name: "Executive Team", email: "executive@company.com" },
        "Re: 2023 Year in Review",
        `We couldn't agree more! 2024 is going to be our best year yet.

We're planning a company-wide celebration in February to recognize everyone's contributions.

Here's to a fantastic 2024!

Executive Team`,
        "Jan 10, 11:00 AM",
        ["work", "important"],
        true,
        false,
        false
      ),
    ]
  ),
];
