// ESL Speaking Questions Database
// Target Grammars: Present Modals, Present Perfect, Past Simple, Past Perfect, & Mixed Contrasts

const ESL_QUESTIONS = [
  // ==========================================
  // PRESENT MODALS (Obligation, Advice, Ability, Possibility, Deduction)
  // ==========================================
  {
    id: "pm-1",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Advice & Recommendations",
    title: "The Career Crossroads",
    question: "A close friend wants to quit their stable job to start a risky new online business. What advice should you give them, and what factors must they consider before making the leap?",
    followUps: [
      "What ought they to do if their business doesn't make a profit in the first six months?",
      "Can anyone become a successful entrepreneur today, or do you have to have a specific personality?"
    ],
    level: "B2",
    theme: "Work & Ambition",
    grammarTip: "Use 'should', 'ought to', and 'had better' for giving advice; use 'must' or 'have to' for strong obligations and necessary conditions.",
    sentenceStarters: [
      "In my opinion, they really should / ought to...",
      "Before making such a drastic choice, they must take into account...",
      "They had better not quit until they have...",
      "You have to be prepared for the fact that..."
    ],
    targetKeywords: ["should", "ought to", "must", "have to", "had better", "can"]
  },
  {
    id: "pm-2",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Obligation & Rules",
    title: "Workplace & Study Culture",
    question: "What strict rules must people follow at your school or workplace? Are there any rules that people don't have to follow strictly, or rules that should be changed?",
    followUps: [
      "What happens if an employee or student can't meet their daily deadlines?",
      "Do you think company dress codes ought to be abolished completely?"
    ],
    level: "B1",
    theme: "Work & Ambition",
    grammarTip: "Distinguish between 'must' / 'have to' (obligation), 'mustn't' (prohibition), and 'don't have to' (lack of obligation).",
    sentenceStarters: [
      "At my workplace / university, everyone must...",
      "However, employees don't have to...",
      "Under no circumstances can / may someone...",
      "I believe management should definitely change the rule about..."
    ],
    targetKeywords: ["must", "have to", "mustn't", "don't have to", "can't", "should"]
  },
  {
    id: "pm-3",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Speculation & Deduction",
    title: "The Unexplained Mystery",
    question: "Imagine you arrive home late at night and notice your neighbor's front door is wide open, with all the lights blazing inside. What might have happened? What must or can't be true?",
    followUps: [
      "What steps should you take immediately? Could it be dangerous to investigate yourself?",
      "How would you feel in that situation, and what would you tell the police?"
    ],
    level: "B2",
    theme: "Mystery & Deduction",
    grammarTip: "Use 'must be' for high certainty (95%+ true), 'can't be' for impossibility, and 'might / may / could be' for possibilities.",
    sentenceStarters: [
      "They must be inside because...",
      "It can't be a simple mistake, because...",
      "They might / could be having an emergency...",
      "You definitely shouldn't go inside alone; you should..."
    ],
    targetKeywords: ["must be", "can't be", "might be", "could be", "may be", "should"]
  },
  {
    id: "pm-4",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Ability & Potential",
    title: "Superhuman Talents",
    question: "If every human could instantly master one complex skill today, which one do you think everyone should learn, and what can society achieve with it?",
    followUps: [
      "Can artificial intelligence completely replace human creativity in your field?",
      "What is something you can do effortlessly today that you couldn't do five years ago?"
    ],
    level: "B1",
    theme: "Hypothetical & Advice",
    grammarTip: "Use 'can / can't' to express present ability, and 'could' for hypothetical ability or polite possibilities.",
    sentenceStarters: [
      "If you ask me, everyone should learn how to...",
      "With this ability, ordinary people can...",
      "We might even be able to solve...",
      "I don't think technology can ever replace..."
    ],
    targetKeywords: ["can", "can't", "could", "should", "might", "be able to"]
  },
  {
    id: "pm-5",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Advice & Health",
    title: "Digital Detox & Well-being",
    question: "Many people feel addicted to their smartphones and social media. What practical habits must people build to maintain their mental health, and what shouldn't they do before going to sleep?",
    followUps: [
      "Should governments or schools impose daily screen-time limits on teenagers?",
      "What can someone do right now to reduce their daily screen time by 50%?"
    ],
    level: "B1",
    theme: "Life & Experiences",
    grammarTip: "Use 'should / shouldn't' for healthy lifestyle recommendations and 'must / have to' for vital self-discipline.",
    sentenceStarters: [
      "To protect your sleep quality, you shouldn't...",
      "Instead, you ought to establish a routine where...",
      "You have to be intentional with your notifications because...",
      "One simple rule you can adopt is..."
    ],
    targetKeywords: ["should", "shouldn't", "ought to", "have to", "must", "can"]
  },
  {
    id: "pm-6",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Logical Deduction",
    title: "The Silent Island",
    question: "A wealthy billionaire has just purchased a remote, uninhabited volcanic island. What could their real intentions be? What must they build first to survive there?",
    followUps: [
      "Can money buy true peace and isolation, or must everyone remain connected to society?",
      "What dangers might they face on such an isolated island?"
    ],
    level: "C1",
    theme: "Mystery & Deduction",
    grammarTip: "Speculate using modal verbs of probability: 'might/may well be', 'could potentially be', 'must require', 'cannot possibly be'.",
    sentenceStarters: [
      "They must be planning an exclusive retreat or...",
      "It cannot possibly be just a holiday home because...",
      "To make the island habitable, they must first generate...",
      "They might well encounter severe weather issues..."
    ],
    targetKeywords: ["must be", "cannot be", "might well", "could potentially", "have to"]
  },
  {
    id: "pm-7",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Social Dilemmas",
    title: "Borrowing and Lending Money",
    question: "A friend asks to borrow a substantial amount of money from you for an emergency. Under what conditions should you lend it to them, and when must you say no?",
    followUps: [
      "Can money ruin genuine friendships? Why or why not?",
      "What ought a person to do if a borrower refuses to pay back what they owe?"
    ],
    level: "B2",
    theme: "Relationships & Society",
    grammarTip: "Express conditionality and boundaries using modals: 'You should only lend if...', 'You must insist that...'.",
    sentenceStarters: [
      "You should only ever lend money if you can afford to...",
      "You must establish clear expectations from the start...",
      "If they have a history of bad debts, you have to say no...",
      "A true friend ought to understand your boundaries..."
    ],
    targetKeywords: ["should", "must", "ought to", "can", "have to", "can't"]
  },

  // ==========================================
  // PRESENT PERFECT (Experiences, Unfinished Time, Recent News, Present Results)
  // ==========================================
  {
    id: "pp-1",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Life Experiences (Ever / Never)",
    title: "Uncharted Horizons",
    question: "What is the most breathtaking or memorable place you have ever visited? Have you ever experienced culture shock while traveling?",
    followUps: [
      "Have you ever tried an extreme sport or done something truly adventurous?",
      "Is there a country you have always wanted to visit but haven't had the chance to yet?"
    ],
    level: "B1",
    theme: "Travel & Adventure",
    grammarTip: "Use 'have/has + past participle' with 'ever' for questions and 'never' for negative life experiences up to now.",
    sentenceStarters: [
      "The most incredible destination I have ever visited is...",
      "I have never felt so fascinated as when I...",
      "I've traveled to a few countries, but I haven't yet been to...",
      "Ever since that journey, I have had a great appreciation for..."
    ],
    targetKeywords: ["have ever", "have never", "have visited", "haven't had", "since"]
  },
  {
    id: "pp-2",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Unfinished Time (Since / For)",
    title: "Passions & Long-term Habits",
    question: "What hobby, skill, or interest have you pursued for several years? How long have you lived in your current neighborhood?",
    followUps: [
      "How has your perspective on this skill changed since you first began practicing it?",
      "Have you noticed your daily habits improving or declining recently?"
    ],
    level: "B1",
    theme: "Life & Experiences",
    grammarTip: "Use 'since' + starting point in time (since 2018, since childhood) and 'for' + duration of time (for five years, for months).",
    sentenceStarters: [
      "I have practiced / studied... for about... years now.",
      "Since I started this hobby, I have gained...",
      "I have lived in my current area since...",
      "Over the past few years, my interests have shifted towards..."
    ],
    targetKeywords: ["have pursued", "for years", "since", "have lived", "have noticed"]
  },
  {
    id: "pp-3",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Recent Actions & Present Results (Just / Already / Yet)",
    title: "Today's Accomplishments",
    question: "What important tasks have you already completed today, and what goals haven't you finished yet? Have you heard any breaking news this week?",
    followUps: [
      "Has someone in your circle just shared exciting personal news with you recently?",
      "What book or movie has made a powerful impression on you recently?"
    ],
    level: "B1",
    theme: "Work & Ambition",
    grammarTip: "Use 'just' for very recent actions, 'already' for completed sooner than expected, and 'yet' in questions and negatives at sentence end.",
    sentenceStarters: [
      "So far today, I have already managed to...",
      "I haven't had time to finish... yet, but I plan to do so tonight.",
      "I have just received an update regarding...",
      "Recently, a friend of mine has announced that..."
    ],
    targetKeywords: ["have already", "haven't yet", "have just", "has made", "so far"]
  },
  {
    id: "pp-4",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Personal Transformation",
    title: "Growth & Milestones",
    question: "In what ways have you changed as a person over the last five years? What major accomplishments has your family or community celebrated recently?",
    followUps: [
      "Have you overcome any fears or challenges that used to intimidate you?",
      "What valuable life lessons has your career or education taught you so far?"
    ],
    level: "B2",
    theme: "Life & Experiences",
    grammarTip: "Use present perfect to show changes that have taken place over a period leading up to the present moment.",
    sentenceStarters: [
      "Over the past five years, I have become much more...",
      "My priorities in life have completely transformed because...",
      "I have learned to handle stressful situations by...",
      "Our community has made impressive strides in..."
    ],
    targetKeywords: ["have changed", "have become", "have learned", "has taught", "so far"]
  },
  {
    id: "pp-5",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Unfinished Time Periods",
    title: "The Year in Review",
    question: "What memorable milestones have you reached this year? Has this year been more demanding or more rewarding than previous ones?",
    followUps: [
      "How many new people have you met this month?",
      "Have you achieved any of the New Year's resolutions you set for yourself?"
    ],
    level: "B2",
    theme: "Life & Experiences",
    grammarTip: "Use present perfect with unfinished time frames like 'this year', 'this month', 'this morning' (when the morning is still ongoing).",
    sentenceStarters: [
      "This year has been exceptionally eventful because...",
      "So far this year, I have successfully achieved...",
      "I haven't met as many new colleagues this month as I would like, but...",
      "I have already checked off several key goals..."
    ],
    targetKeywords: ["this year has been", "have reached", "have met", "have achieved"]
  },
  {
    id: "pp-6",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Global Trends & Technology",
    title: "The Tech Revolution",
    question: "How has the rise of smartphone technology and remote communication affected human relationships over the past two decades?",
    followUps: [
      "Have people become more isolated or more interconnected globally?",
      "What new convenience has made your everyday life drastically easier?"
    ],
    level: "C1",
    theme: "Relationships & Society",
    grammarTip: "Describe broader historical and societal trends that started in the recent past and continue to shape our present world.",
    sentenceStarters: [
      "Technological advancements have fundamentally altered how we...",
      "Society has become far more reliant on digital tools, which has led to...",
      "While people have gained instant access to global networks, they have also...",
      "Human interaction has undeniably evolved over recent decades..."
    ],
    targetKeywords: ["has altered", "has become", "have gained", "have lost", "has evolved"]
  },

  // ==========================================
  // PAST SIMPLE (Finished Actions, Specific Past Dates, Storytelling, Childhood)
  // ==========================================
  {
    id: "ps-1",
    grammar: "past-simple",
    categoryLabel: "Past Simple: Memorable Events & Specific Dates",
    title: "An Unforgettable Celebration",
    question: "Think of a memorable wedding, festival, or birthday party you attended in the past. When was it, who did you go with, and what made it so special?",
    followUps: [
      "What did you wear, and what delicious food did you eat on that occasion?",
      "Did anything surprising or funny happen during the celebration?"
    ],
    level: "B1",
    theme: "Life & Experiences",
    grammarTip: "Use regular (-ed) and irregular past verb forms to recount completed actions with specific past time references (e.g. 'last summer', 'in 2022', 'three years ago').",
    sentenceStarters: [
      "About three years ago, I attended...",
      "I went there with my closest friends, and we...",
      "The atmosphere was electric because the organizers prepared...",
      "At one point during the night, someone suddenly..."
    ],
    targetKeywords: ["went", "attended", "was", "were", "ate", "happened", "celebrated"]
  },
  {
    id: "ps-2",
    grammar: "past-simple",
    categoryLabel: "Past Simple: Childhood Anecdotes & Habits",
    title: "Childhood Adventures",
    question: "Where did you grow up, and what games or activities did you use to play when you were eight or nine years old? Who was your childhood best friend?",
    followUps: [
      "Did you ever get into trouble at school or at home? What happened?",
      "What was your favorite book, toy, or television show when you were little?"
    ],
    level: "B1",
    theme: "Life & Experiences",
    grammarTip: "Use past simple questions with 'did + base verb' (e.g. 'Where did you grow up?') and answer with affirmative past forms (e.g. 'I grew up in...').",
    sentenceStarters: [
      "I grew up in a cozy town where children spent hours...",
      "Every afternoon after school, my friends and I played...",
      "Once, when I was around eight, I accidentally broke...",
      "My teachers got quite annoyed because I forgot to..."
    ],
    targetKeywords: ["grew up", "played", "spent", "did", "was", "broke", "loved"]
  },
  {
    id: "ps-3",
    grammar: "past-simple",
    categoryLabel: "Past Simple: Overcoming Obstacles",
    title: "The First Challenge",
    question: "Describe your very first job interview, driving test, or public speech. How nervous were you, and how did you prepare the night before?",
    followUps: [
      "What exact question or challenge caught you off guard?",
      "How did you celebrate or react when you heard the final outcome?"
    ],
    level: "B2",
    theme: "Work & Ambition",
    grammarTip: "Notice how past simple narrations chain sequential past actions together: 'First I entered, then the interviewer asked me...'.",
    sentenceStarters: [
      "I remember my first interview very clearly; it took place back in...",
      "The night before, I stayed up late and practiced...",
      "When I walked into the room, my palms were sweating, but I...",
      "The interviewer asked me a tricky question about..."
    ],
    targetKeywords: ["took place", "stayed", "practiced", "walked", "felt", "asked", "answered"]
  },
  {
    id: "ps-4",
    grammar: "past-simple",
    categoryLabel: "Past Simple: Travel Adventures & Mishaps",
    title: "The Travel Misadventure",
    question: "Tell the story of a journey or vacation where things did not go according to plan. What went wrong, and how did you resolve the situation?",
    followUps: [
      "Did the locals help you when you were in trouble?",
      "Looking back now, do you find the experience amusing or stressful?"
    ],
    level: "B2",
    theme: "Travel & Adventure",
    grammarTip: "Pay attention to irregular verbs: 'lost', 'caught', 'missed', 'found', 'drove', 'flew', 'slept'.",
    sentenceStarters: [
      "Last summer, my friends and I decided to take a road trip to...",
      "Unfortunately, halfway through the trip, our car broke down and...",
      "We didn't have any cell service, so we walked to the nearest...",
      "In the end, a kind local mechanic fixed the problem, and we..."
    ],
    targetKeywords: ["decided", "broke down", "didn't have", "walked", "fixed", "arrived"]
  },
  {
    id: "ps-5",
    grammar: "past-simple",
    categoryLabel: "Past Simple: Historical Turning Points",
    title: "A Day in History",
    question: "Choose a historical figure or pivotal world event from the 20th century. What did this person accomplish, or how did that event change everyday life?",
    followUps: [
      "What challenges did they face at the time?",
      "Why did this particular event leave such a profound mark on history?"
    ],
    level: "C1",
    theme: "Relationships & Society",
    grammarTip: "Use past simple with historical time markers like 'in 1969', 'during the mid-twentieth century', 'shortly after the war ended'.",
    sentenceStarters: [
      "Back in the mid-20th century, scientists made a breakthrough when...",
      "This iconic figure stood up against injustice and inspired millions by...",
      "Despite severe public opposition, they refused to back down and...",
      "Their courageous actions paved the way for modern..."
    ],
    targetKeywords: ["made", "stood", "inspired", "refused", "paved", "changed"]
  },

  // ==========================================
  // PAST PERFECT (Action before another past action, Flashbacks, Regrets, Causes)
  // ==========================================
  {
    id: "ppf-1",
    grammar: "past-perfect",
    categoryLabel: "Past Perfect: The Story Flashback (Had + V3)",
    title: "The Forgotten Item",
    question: "Describe an embarrassing or stressful day when you arrived somewhere important (like the airport or an exam) only to realize you had left something vital behind.",
    followUps: [
      "What had happened earlier that morning that caused you to rush?",
      "Had you already checked your bag before leaving home?"
    ],
    level: "B2",
    theme: "Life & Experiences",
    grammarTip: "Use Past Perfect ('had + past participle') for the earlier event, and Past Simple for the later event: 'When I arrived (later), I realized I had left my passport at home (earlier)'.",
    sentenceStarters: [
      "When I finally reached the boarding gate, I realized that I had left my...",
      "Earlier that morning, my alarm hadn't gone off, so I had rushed out of...",
      "I was convinced that I had packed everything the night before, but...",
      "By the time I checked my pockets, the taxi had already driven away..."
    ],
    targetKeywords: ["had left", "had forgotten", "had already", "had rushed", "by the time"]
  },
  {
    id: "ppf-2",
    grammar: "past-perfect",
    categoryLabel: "Past Perfect: Cause & Effect in the Past",
    title: "The Exhausting Week",
    question: "Recall a specific moment in your past when you felt completely exhausted, thrilled, or shocked. What had happened in the hours or days beforehand to make you feel that way?",
    followUps: [
      "How long had you been awake or preparing prior to that moment?",
      "Had anyone warned you about how demanding it would be?"
    ],
    level: "B2",
    theme: "Work & Ambition",
    grammarTip: "Use past perfect to explain the backstory or reason behind a past emotional state: 'I was ecstatic because I had passed all my tests'.",
    sentenceStarters: [
      "I felt completely drained because I had worked overtime for three consecutive days...",
      "By Friday afternoon, we had completed the entire project, so...",
      "I hadn't slept properly for almost 48 hours because my team had faced...",
      "When the news finally broke, nobody was surprised because rumors had circulated for weeks..."
    ],
    targetKeywords: ["had worked", "had completed", "hadn't slept", "had faced", "because"]
  },
  {
    id: "ppf-3",
    grammar: "past-perfect",
    categoryLabel: "Past Perfect: Expectations vs. Reality",
    title: "A Surprising Destination",
    question: "Talk about a city, movie, or novel that turned out to be completely different from what you had anticipated. What had you imagined before experiencing it?",
    followUps: [
      "What reviews or opinions had you read or heard before you went?",
      "Had you ever had similar expectations shattered in the past?"
    ],
    level: "B2",
    theme: "Travel & Adventure",
    grammarTip: "Contrast your prior expectations ('I had expected / had imagined') with the actual past outcome ('It turned out to be...').",
    sentenceStarters: [
      "Before I landed in the city, I had envisioned a quiet, rustic town...",
      "My friends had told me glowing stories about the food, but when I arrived...",
      "It was far more modern and vibrant than I had imagined...",
      "I had built up such high expectations because critics had praised it endlessly..."
    ],
    targetKeywords: ["had envisioned", "had told", "had imagined", "had expected", "had praised"]
  },
  {
    id: "ppf-4",
    grammar: "past-perfect",
    categoryLabel: "Past Perfect: Regrets & Missed Opportunities",
    title: "The Missed Chance",
    question: "Have you ever missed a train, a concert, or a golden opportunity because of an unforeseen delay? What series of events had occurred leading up to that moment?",
    followUps: [
      "If you had woken up just thirty minutes earlier, would the outcome have been different?",
      "What lesson did that experience teach you about punctuality?"
    ],
    level: "C1",
    theme: "Hypothetical & Advice",
    grammarTip: "Express sequence of events with 'by the time' + past simple, alongside past perfect: 'By the time I got to the station, the doors had already slammed shut'.",
    sentenceStarters: [
      "By the time I reached the concert venue, the headliner had already performed their opening song...",
      "I got stuck in gridlock traffic because an accident had occurred on the highway...",
      "If I had checked the real-time schedule earlier, I would have avoided the delay...",
      "I hadn't anticipated how heavy the holiday traffic would be..."
    ],
    targetKeywords: ["had already performed", "had occurred", "had checked", "hadn't anticipated"]
  },
  {
    id: "ppf-5",
    grammar: "past-perfect",
    categoryLabel: "Past Perfect: Mystery & Deduction",
    title: "The Mystery at the Cabin",
    question: "Imagine two hikers stumbled upon an abandoned cabin in the snowy woods. The kettle on the stove was still warm, but no one was there. What had the inhabitant done right before leaving?",
    followUps: [
      "Why had they left so abruptly without taking their warm coat?",
      "What clues had they left behind on the wooden table?"
    ],
    level: "C1",
    theme: "Mystery & Deduction",
    grammarTip: "Construct a narrative timeline: explain evidence found in the past by deducing what had taken place prior to that moment.",
    sentenceStarters: [
      "The inhabitant had clearly boiled water just minutes before hearing...",
      "They had evidently left in a state of panic because they hadn't even locked...",
      "Judging by the open drawer, someone had grabbed a few documents before...",
      "By all indications, they had received an urgent warning message..."
    ],
    targetKeywords: ["had boiled", "had left", "hadn't locked", "had grabbed", "had received"]
  },

  // ==========================================
  // MIXED & CONTRAST CHALLENGES (Comparing Tenses in Conversation)
  // ==========================================
  {
    id: "mx-1",
    grammar: "mixed-contrast",
    categoryLabel: "Contrast: Present Perfect vs. Past Simple",
    title: "Life Adventures vs. Exact Stories",
    question: "Have you ever traveled to another country or tried exotic street food? If yes, when exactly did you go, who did you meet, and what happened on that day?",
    followUps: [
      "What is something you haven't done yet, but you planned to do last year?",
      "Why do English speakers switch to Past Simple as soon as they mention a specific time?"
    ],
    level: "B1",
    theme: "Travel & Adventure",
    grammarTip: "Switch from Present Perfect to introduce the experience ('I have been to Japan') to Past Simple for specific details and exact dates ('I went in 2022 and visited Kyoto').",
    sentenceStarters: [
      "Yes, I have actually been to... once before.",
      "I went there back in [year] with a couple of friends...",
      "While we were there, we visited several historic sites and ate...",
      "I haven't been back since, but I would love to return."
    ],
    targetKeywords: ["have been", "went", "visited", "ate", "haven't been", "since"]
  },
  {
    id: "mx-2",
    grammar: "mixed-contrast",
    categoryLabel: "Contrast: Past Simple vs. Past Perfect",
    title: "The Disastrous Dinner Party",
    question: "You hosted a dinner party for your friends. When the guests rang the doorbell, what had you already finished preparing, and what went disastrously wrong after they sat down?",
    followUps: [
      "Had anyone offered to help before the disaster happened?",
      "How did your guests react, and what did you end up ordering instead?"
    ],
    level: "B2",
    theme: "Life & Experiences",
    grammarTip: "Anchor the timeline: use Past Simple for the main narrative events ('they arrived', 'the dish burned') and Past Perfect for what was already done before ('I had set the table').",
    sentenceStarters: [
      "By the time the doorbell rang, I had already set the table and baked...",
      "However, I had forgotten to turn down the oven timer, so the main roast...",
      "When the guests entered the dining room, smoke filled the air, and we all...",
      "Fortunately, everyone laughed it off, and we ordered pizza instead..."
    ],
    targetKeywords: ["had already set", "had forgotten", "rang", "entered", "filled", "ordered"]
  },
  {
    id: "mx-3",
    grammar: "mixed-contrast",
    categoryLabel: "Contrast: Present Modals vs. Past Reflection",
    title: "Solving Modern Stress",
    question: "Think about a stressful period in your past. What mistakes did you make back then, and what advice should you give to someone who has to cope with that same pressure right now?",
    followUps: [
      "What could you have done differently in the past?",
      "What must a student or professional do today to avoid burnout?"
    ],
    level: "B2",
    theme: "Hypothetical & Advice",
    grammarTip: "Combine Past Simple for recounting past missteps ('I worked 14 hours a day') and Present Modals for current advice and obligations ('You should take breaks, you must not isolate yourself').",
    sentenceStarters: [
      "Back when I was preparing for my university exams, I neglected my sleep and...",
      "In hindsight, that was a mistake because I burned out quickly.",
      "If someone is in that position today, they should prioritize...",
      "They must remember that you can't perform well if your body is exhausted..."
    ],
    targetKeywords: ["neglected", "was", "should prioritize", "must remember", "can't perform"]
  },
  {
    id: "mx-4",
    grammar: "mixed-contrast",
    categoryLabel: "Grand Challenge: All Four Tenses in One Narrative",
    title: "The Ultimate Language Journey",
    question: "How long have you studied English? What inspired you to start, what difficulties had you encountered before finding your best learning method, and what must you do now to reach fluency?",
    followUps: [
      "What skills can you practice every single day without spending money?",
      "Which grammar point among these four has been the most challenging for you to master?"
    ],
    level: "C1",
    theme: "Life & Experiences",
    grammarTip: "Integrate all four structures: Present Perfect (duration), Past Simple (starting point), Past Perfect (earlier roadblocks), and Present Modals (current strategy).",
    sentenceStarters: [
      "I have studied English for approximately [number] years now...",
      "I first fell in love with the language when I watched a movie in...",
      "Before I discovered conversational practice, I had struggled with rigid textbook rules...",
      "To reach native-level fluency today, I must immerse myself in English content and I should..."
    ],
    targetKeywords: ["have studied", "fell in love", "had struggled", "must immerse", "should"]
  },

  // ==========================================
  // ADDITIONAL CHALLENGES
  // ==========================================
  {
    id: "pm-8",
    grammar: "present-modals",
    categoryLabel: "Present Modals: Ethical Workplace Dilemma",
    title: "The Confidential Leak",
    question: "Suppose you accidentally discover that your company or school is hiding an important safety issue. What should you do? Under what circumstances must you speak out publicly, and when can't you keep quiet?",
    followUps: [
      "Could speaking out ruin your career? How can someone protect themselves as a whistleblower?",
      "Ought colleagues to support each other even when the boss disapproves?"
    ],
    level: "C1",
    theme: "Work & Ambition",
    grammarTip: "Express ethical obligations with 'must', 'have to', 'ought to', and caution with 'should consider', 'had better'.",
    sentenceStarters: [
      "In such a delicate dilemma, an employee must first...",
      "You should never jump to conclusions; you ought to verify...",
      "However, if lives are at risk, you cannot simply remain silent...",
      "They had better consult legal advice before taking..."
    ],
    targetKeywords: ["must", "should", "ought to", "cannot", "had better", "could"]
  },
  {
    id: "pp-7",
    grammar: "present-perfect",
    categoryLabel: "Present Perfect: Bucket List & Unfulfilled Dreams",
    title: "The Ultimate Bucket List",
    question: "What is an audacious dream or ambition you have had since you were a teenager? Have you taken any concrete steps toward making it a reality yet?",
    followUps: [
      "Has anyone you know ever inspired you to chase an unconventional path?",
      "What is something you haven't dared to attempt so far in your life?"
    ],
    level: "B2",
    theme: "Hypothetical & Advice",
    grammarTip: "Connect long-standing ambitions ('I have dreamt of...', 'I have wanted...') to present action ('so far I have saved...', 'I haven't enrolled yet').",
    sentenceStarters: [
      "Ever since I was in high school, I have harbored a dream of...",
      "Over the years, I have gathered information and saved...",
      "Although I haven't officially launched the project yet, I have...",
      "Several people have told me that it's risky, but I have always believed..."
    ],
    targetKeywords: ["have had", "have dreamt", "haven't yet", "have taken", "so far"]
  },
  {
    id: "ps-6",
    grammar: "past-simple",
    categoryLabel: "Past Simple: Serendipitous Encounters",
    title: "The Coincidental Meeting",
    question: "Did you ever bump into someone unexpectedly in a foreign city, or meet someone who changed the course of your life? How did that encounter happen?",
    followUps: [
      "What did the two of you talk about when you first met?",
      "Did you realize at that moment how significant that meeting was going to be?"
    ],
    level: "B2",
    theme: "Relationships & Society",
    grammarTip: "Narrate the encounter using spontaneous past actions: 'I was standing...', 'Suddenly I saw...', 'We immediately started talking...'.",
    sentenceStarters: [
      "It happened three years ago when I was traveling in...",
      "I walked into a quiet café, and out of nowhere, I saw...",
      "We both froze in disbelief, and then we spent hours talking about...",
      "That single conversation opened up an unexpected opportunity for me to..."
    ],
    targetKeywords: ["happened", "walked", "saw", "spent", "opened", "met", "did"]
  },
  {
    id: "ppf-6",
    grammar: "past-perfect",
    categoryLabel: "Past Perfect: The Broken Promise",
    title: "A Regrettable Misunderstanding",
    question: "Recall a time when a plan or promise fell apart because someone had forgotten a detail or had misinterpreted an instruction. What had gone wrong behind the scenes?",
    followUps: [
      "Had anyone verified the plan before setting off?",
      "How did everyone feel once they discovered what had actually occurred?"
    ],
    level: "B2",
    theme: "Relationships & Society",
    grammarTip: "Explain misunderstandings by tracing prior errors with Past Perfect: 'We waited for an hour because he had written down the wrong address'.",
    sentenceStarters: [
      "We stood waiting outside the station because our colleague had confused...",
      "Apparently, the manager had sent an email, but none of us had received it...",
      "We realized that somebody had accidentally double-booked the room...",
      "If we had just made a quick phone call beforehand, we wouldn't have wasted..."
    ],
    targetKeywords: ["had confused", "had sent", "had received", "had double-booked", "had forgotten"]
  },
  {
    id: "mx-5",
    grammar: "mixed-contrast",
    categoryLabel: "Contrast: Past Experience vs. Present Recommendations",
    title: "The Survival Guide for Newcomers",
    question: "When you first moved to your current city or started your current field of study, what challenges did you face? What had you prepared before arriving, and what advice must newcomers know today?",
    followUps: [
      "How have your habits changed since those early days?",
      "What is one thing people shouldn't worry about when moving somewhere new?"
    ],
    level: "B2",
    theme: "Life & Experiences",
    grammarTip: "Blend past narrative (Past Simple & Past Perfect: 'I arrived...', 'I had read about...') with ongoing advice (Present Modals: 'You must register...', 'You should connect with...').",
    sentenceStarters: [
      "When I first arrived here, I struggled with navigation because...",
      "Before moving, I had researched the neighborhoods, but nothing prepared me for...",
      "Since that first year, I have adapted and discovered great local spots...",
      "Anyone relocating today must ensure they have... and they should avoid..."
    ],
    targetKeywords: ["arrived", "had researched", "have adapted", "must ensure", "should avoid"]
  }
];

// Grammar Categories metadata for filter buttons, badges, and learning guides
const GRAMMAR_CATEGORIES = {
  "all": {
    id: "all",
    label: "All Prompts",
    badge: "Full Collection",
    color: "#6366f1",
    description: "Practice all grammar points across everyday and professional speaking topics."
  },
  "present-modals": {
    id: "present-modals",
    label: "Present Modals",
    badge: "Can / Should / Must",
    color: "#3b82f6",
    formula: "Modal + Base Verb (e.g., should study, must leave, might rain)",
    usage: "Use for advice, obligation, prohibition, ability, permission, and logical deduction in the present.",
    cheatSheet: [
      { rule: "Advice / Recommendation", markers: "should, ought to, had better", eg: "You should get more sleep." },
      { rule: "Obligation / Necessity", markers: "must, have to, need to", eg: "You have to show your ID." },
      { rule: "Prohibition", markers: "mustn't, can't", eg: "You mustn't touch the wire." },
      { rule: "Present Deduction (Certain)", markers: "must be, can't be", eg: "He's not here; he must be sick." },
      { rule: "Possibility (Uncertain)", markers: "might, may, could", eg: "It could rain later this afternoon." }
    ]
  },
  "present-perfect": {
    id: "present-perfect",
    label: "Present Perfect",
    badge: "Have / Has + V3",
    color: "#10b981",
    formula: "have / has + Past Participle (V3)",
    usage: "Connects the past to the present: life experiences (ever/never), duration continuing until now (since/for), and recent actions with present results (just/already/yet).",
    cheatSheet: [
      { rule: "Life Experiences", markers: "ever, never, before", eg: "Have you ever traveled alone?" },
      { rule: "Unfinished Duration", markers: "since (point in time), for (duration)", eg: "I have lived here for 4 years." },
      { rule: "Recent Actions & News", markers: "just, already, yet, recently", eg: "She has just received a promotion." },
      { rule: "Present Result", markers: "so far, up to now", eg: "I have lost my key (so I can't enter now)." }
    ]
  },
  "past-simple": {
    id: "past-simple",
    label: "Past Simple",
    badge: "Verb-ed / V2",
    color: "#f59e0b",
    formula: "Subject + Past Verb (V2) / did + Base Verb for negatives & questions",
    usage: "Use for actions finished at a specific, definite point in the past. Time markers are usually stated or implied.",
    cheatSheet: [
      { rule: "Specific Past Time", markers: "yesterday, last night, in 2020, 2 days ago", eg: "We visited Rome in 2019." },
      { rule: "Story Sequence", markers: "first, then, after that, suddenly", eg: "He opened the door and walked inside." },
      { rule: "Past Habit / State", markers: "when I was young, always, used to", eg: "I played soccer every Saturday." },
      { rule: "Negatives & Questions", markers: "didn't + V1, Did you + V1?", eg: "Did you enjoy the movie last night?" }
    ]
  },
  "past-perfect": {
    id: "past-perfect",
    label: "Past Perfect",
    badge: "Had + V3",
    color: "#8b5cf6",
    formula: "had + Past Participle (V3)",
    usage: "The 'past before the past'. Use when you are already talking about the past and want to refer back to an earlier event or cause.",
    cheatSheet: [
      { rule: "Earlier Past Event", markers: "before, by the time, already, after", eg: "By the time I arrived, the train had left." },
      { rule: "Explaining Past Reasons", markers: "because, as, since", eg: "He was nervous because he hadn't slept." },
      { rule: "Unfulfilled Hopes / Regrets", markers: "had hoped, had planned, wish I had", eg: "I had planned to call you, but I forgot." },
      { rule: "Third Conditional", markers: "If + had + V3, would have + V3", eg: "If I had known, I would have warned you." }
    ]
  },
  "mixed-contrast": {
    id: "mixed-contrast",
    label: "Mixed & Contrasts",
    badge: "Fluency Switcher",
    color: "#ec4899",
    formula: "Contrasting multiple tenses in natural conversation",
    usage: "Master the subtle transitions between general experiences (Present Perfect), concrete details (Past Simple), background timeline (Past Perfect), and advice/opinion (Present Modals).",
    cheatSheet: [
      { rule: "Experience -> Specific Story", markers: "Present Perfect -> Past Simple", eg: "Have you ever been to Paris? Yes, I went there in 2021." },
      { rule: "Sequence & Background", markers: "Past Simple & Past Perfect", eg: "When I woke up, the snow had already covered the road." },
      { rule: "Past Experience -> Present Advice", markers: "Past Simple -> Present Modals", eg: "I failed my first test, so you should study early." }
    ]
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ESL_QUESTIONS, GRAMMAR_CATEGORIES };
}
