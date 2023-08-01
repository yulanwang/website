const strings = {
  AboutBlock: {
    title: "What's Oasis?",
    body: "Oasis is an eight-week program that helps students learn to build their first website or app, no experience required! To do this, we pair you with a team and a mentor, and teach you the skills you need through Hack Sessions every Sunday. At each Hack Session you receive a 30-minute workshop, and then spend 90 minutes with your team building your project.",
  },
  ContactBlock: {
    title: "Contact Us!",
    headline: "Send us a message!",
    body: "Have a question we haven't managed to answer? Have a proposition you want us to take a look at? Either send us an ",
  },
  Eboard: {
    title: "Our Team",
    members: [
      {
        name: "Frank Anderson",
        role: "Co-Director",
        src: "https://media.licdn.com/dms/image/C5603AQE4cFVm1SqYVA/profile-displayphoto-shrink_400_400/0/1619473083418?e=1694044800&v=beta&t=OsnukuN1UNawaMzGeUmKFS98rE20gU2L9zqBkynfk2M",
      },
      {
        name: "Sama Zaki",
        role: "Co-Director",
        src: "https://media.licdn.com/dms/image/D4E03AQE5J8ppdIAqvg/profile-displayphoto-shrink_400_400/0/1674609169174?e=1694044800&v=beta&t=Fw40zg0EdBV7q0mxy2xTJ9Cer-9kcrZgy_rwcSKJymg",
      },
      {
        name: "Rei Masuya",
        role: "Brand Designer",
        src: "https://media.licdn.com/dms/image/C4D03AQGGDCMyVe9oaw/profile-displayphoto-shrink_400_400/0/1663201359913?e=1694044800&v=beta&t=WdDVU2dnzr3UrQekk7hhTSruSjcS4BuuDX17yteweVk",
      },
      {
        name: "Allen Lin",
        role: "Mentor Lead",
        src: "https://media.licdn.com/dms/image/D4E03AQG-mtpC03TCYQ/profile-displayphoto-shrink_400_400/0/1673326565124?e=1694044800&v=beta&t=XC00zLk6FzYOcqTk3IFlRJOLFU6X8wE8jNvCFwQaDW4",
      },
      {
        name: "Laith Taher",
        role: "Events Director",
        src: "https://media.licdn.com/dms/image/D4E03AQECes9egjScKw/profile-displayphoto-shrink_400_400/0/1668552656586?e=1694044800&v=beta&t=LNNNVXFMaGa36fNqeW0T5PJ7H2Mtwl_QfpEPkCGEQzA",
      },
      {
        name: "Caitlin Flynn",
        role: "Operations Director",
        src: "https://media.licdn.com/dms/image/D5603AQFRJFAPnl4Ntg/profile-displayphoto-shrink_400_400/0/1675653304238?e=1694044800&v=beta&t=WzXPo7CSkjXQEDn6nefxmSwhLQo6HIlIKHVfla2SrTI",
      },
      { name: "Isha Chadalavada", role: "Marketing Director", src: "" },
    ],
  },
  EnrollmentTimeline: {
    title: "Enrollment Timeline",
    body: "Each semester we welcome a new cohort of students. We're limited in how many students we can accept due to a limited number of available mentors. This process is subject to change each semester, but this is the typical series of events.",
    headline:
      "Acceptance is is first-come-first-serve; it is not based on your technical experience or background.",
    steps: [
      {
        num: "1",
        tag: "Info Session + Registration",
        time: "1st Sunday of the semester",
        desc: "Learn more about what Oasis is, our Hack Session timeline, new changes for this year, and meet our Eboard. At the end of the Info Session, Registration will open. Please keep in mind that it is unlikely you'll be able to join if you're not present at the Info Session.",
      },
      {
        num: "2",
        tag: "Confirmation",
        time: "Within a week after the Info Session",
        desc: "If you've registered and we have a space available for you, you'll receive a form to complete in order to confirm your spot as a Participant for the coming semester. Completing this form reserves your space.",
      },
      {
        num: "3",
        tag: "Hack Session 0 (open to all!)",
        time: "2nd Sunday of the semester",
        desc: "Hack Session 0 is our Git and React basics workshop. It's open to all students, regardless of Enrollment status, and is a great way to launch your web development journey!",
      },
      {
        num: "4",
        tag: "Hack Sessions begin",
        time: "3rd Sunday of the Semester",
        desc: "Once the enrollment process is complete weekly Sunday Hack Sessions begin. Unfortunately, attendance at Hack Sessions is restricted to accepted students only. For students still looking to get involved, we host Explore Events roughly once a month.",
      },
    ],
  },
  FeaturedProjects: {
    title: "Featured Projects",
    button: "See All Projects",
    projects: [
      {
        title: "How Busy is Marino",
        desc: "Rollup Marino activity over time into graphical predictions for future capacity at Marino!",
        link: "https://www.notion.so/How-Busy-Is-Marino-806c07c8bcd142219a01f88015b67497?pvs=4",
        src: "/images/Projects/HowBusyIsMarino.png",
        width: 874,
        height: 308,
      },
      {
        title: "Roomie Hub",
        desc: "The essential tool to track chores, groceries, schedules, and more with your roommate!",
        link: "https://www.notion.so/Roomie-Hub-664267296b84424a97e18944eadf74d4?pvs=4",
        src: "/images/Projects/RoomieHub.png",
        width: 1670,
        height: 1214,
      },
      {
        title: "TransitNU",
        desc: "Help students track the locations of MBTA trains in and around Boston using their API.",
        link: "https://www.notion.so/TransitNU-37f3b4ed2c8c48a6b8b57d309c5480d1?pvs=4",
        src: "/images/Projects/TransitNU.png",
        width: 506,
        height: 434,
      },
    ],
  },
  Footer: {
    links: [
      { title: "Home", dest: "/" },
      { title: "About", dest: "/about" },
      { title: "Join", dest: "/join" },
      { title: "Mentor", dest: "/mentor" },
      { title: "Resources", dest: "/resources" },
      { title: "Contact", dest: "/contact" },
    ],
  },
  HackSessionTimeline: {
    title: "Session by Session",
    days: [
      { num: "0", hook: "Git-ing Started" },
      { num: "1", hook: "Shoot Your Shot" },
      { num: "2", hook: "Data and Design" },
      { num: "3", hook: "(API) Call and Response" },
      { num: "4", hook: "Data-BASED" },
      { num: "5", hook: "Mid-Semester Showcase" },
      { num: "6", hook: "Reeling things in" },
      { num: "7", hook: "Mindset to Grindset" },
      { num: "8", hook: "Presentation Preparation" },
      { num: "D", hook: "Demo Day!" },
    ],
  },
  HistoryBlock: {
    title: "History",
    body: "Oasis was founded in the Fall of 2020 as a Sandbox program. Originally it was a series of virtual workshops and a network of mentors and project groups to help each other out. Over time, it's evolved into the project accelerator and larger organization it is today and became an independent club in Spring 2023.",
  },
  Hook: {
    tagline: "Ready to make your ideas reality?",
  },
  ImageParagraph: {},
  JoinFaqQuestion: {},
  JoinFaqs: {
    questions: [
      {
        q: "How do you assess applications?",
        a: "We don't asses them in the traditional sense. We pride ourselves on being open to students from all backgrounds and experience levels, so our application is first-come first-serve to keep it simple and fair for everybody.",
      },
      {
        q: "How many students are in a normal cohort?",
        a: "A typical semester is roughly 80 students. We target 10 mentors each semester, and each mentor works with two groups of four students each.",
      },
      {
        q: "Do I have to be at the Info Session?",
        a: "Sort of. We don't require you come to the Info Session, but we would like to warn that it's highly unlikely you'll be able to reserve a spot if you're not because we open Registration at the Info Session.",
      },
      // {
      //   q: "What technologies and languages will I learn with Oasis?",
      //   a: "TO DO",
      // },
      {
        q: "What is the expected weekly time commitment?",
        a: "We require that all students be present at each Sunday at the two-hour Hack Sessions. You're welcome to work on your project outside of that team if you would like, but it's not required. ",
      },
    ],
  },
  Logo: {},
  MentorBlock: {
    title: "Mentor",
    body: "Teach participants how to learn the skills they need to bring their projects to life! You'll guide two groups from brainstorming through delivery by teaching them how to research technologies relevant to their project, how to weigh options between features based on deadlines, and you'll help them debug as issues crop up. If you've completed a co-op and are free from 12-2pm on Sundays, then you're ready to mentor.",
    points: [
      {
        title: "Why",
        tagline:
          "Teach participants how to learn the skills they need to bring their projects to life! If you've completed a co-op and are free from 12-2pm on Sundays, then you're ready to mentor.",
      },
      {
        title: "Who",
        tagline:
          "Any Northeastern student who has started at least one computer science co-op. Both graduate and undergraduate students are welcome!",
      },
      {
        title: "What",
        tagline:
          "Mentors work with two teams of four students each to guide them through their making first web apps.",
      },
      {
        title: "Why",
        tagline:
          "A low-commitment chance to mentor students and help them make their ideas into reality!",
      },
    ],
  },
  MissionBlock: {},
  NavBar: {
    destinations: [
      { name: "Home", link: "/" },
      { name: "About", link: "/about" },
      { name: "Project Series", link: "/join" },
      { name: "Explorer Series", link: "/join/explorer" },
      { name: "Mentor", link: "/mentor" },
      {
        name: "Resources",
        link: "/resources",
        target: "_blank",
      },
      { name: "Contact", link: "/contact" },
    ],
  },
  OasisNumbers: {
    title: "By the Numbers",
    stats: [
      { count: 72, content: "Total Oasis Projects" },
      { count: 272, content: "Total Oasis Participants" },
      { count: 44, content: "Participants this Semester" },
      { count: 12, content: "Projects this Semester" },
    ],
  },
  OasisTypewriter: {},
  PageWrapper: {},
  Unsubscribe: {
   instruction: "Enter your email to unsubscribe from our mailing list.",
   confirmation: "You've been successfully unsubscribed."
  },
  Sock: {
    title: "Join our mailing list!",
    body: "Sign up to get the latest updates on Oasis, including application dates for both mentors and participants.",
    call: "Enter your email:"
  },
  WhyJoin: {
    title: "Why join?",
    tagline:
      "With support from our mentors, your group, and the Oasis community, bring your software idea to life.",
  },
  Series: {
    project: "Project Series",
    projectBody: "A semester-long curriculum to help you build your first full-stack project!",
    projectSecondary: "Join the cohort at the start of each semester.",
    projectButton: "Join the cohort!",
    explorer: "Explorer Series",
    explorerBody: "Workshops, employer events, networking, and more!",
    explorerSecondary: "Open to all, no application required.",
    explorerButton: "Find the next event!"
  }
};

export default strings;
