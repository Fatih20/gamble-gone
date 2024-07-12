import { prisma } from "@/lib/prisma";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { Value } from "@udecode/plate";
import { hash } from "bcrypt";

const main = async () => {
  const gamblingStories: string[] = [
    "I started gambling online as a way to pass the time, but what began as a harmless hobby quickly spiraled out of control. I lost significant amounts of money, strained my relationships, and found myself lying to loved ones to cover up my losses. Realizing I needed help, I sought support and began the difficult journey to reclaim my life.",
    "As a single mother, I initially turned to online gambling to escape the stresses of daily life. The thrill of occasional wins kept me hooked, but soon I was chasing my losses, spending more time and money than I could afford. After maxing out my credit cards and risking my family's stability, I reached out to a local support group to start my recovery.",
    "My fascination with online poker started during my college years. I believed I had a knack for the game, but as my debts mounted, I realized I was in over my head. The constant financial strain and anxiety led me to seek professional counseling, which helped me break free from my addiction.",
    "As a successful professional, I began gambling online as a way to unwind after work. However, what started as a casual activity quickly consumed my evenings and weekends. When I started missing work deadlines and borrowing money from friends, I knew it was time to get help. Joining a rehab program, I learned to cope with my addiction and rebuild my life.",
    "As a retired veteran, I found solace in online betting after losing my wife. The excitement of the bets temporarily masked my grief, but soon I was losing more than I could handle. My wake-up call came when my daughter confronted me about the dwindling family savings. With her support, I entered a recovery program and began to heal from my addiction and loss.",
  ];

  const reasonStops: string[] = [
    "I decided to stop gambling when I realized how much my addiction was affecting my family. My spouse and children were suffering because of my constant absences and financial instability. The look of disappointment in their eyes was a wake-up call, and I knew I had to change for their sake.",
    "My turning point came when I almost lost my job due to my gambling habit. I had been missing deadlines and making mistakes because I was too preoccupied with my next bet. Facing the prospect of unemployment, I knew I needed to seek help before it was too late.",
    "After maxing out my credit cards and being unable to pay my bills, I hit rock bottom. The stress and anxiety of mounting debt were overwhelming. Realizing I couldn't continue living this way, I sought out financial counseling and support groups to help me break free from gambling.",
    "Seeing a close friend lose everything to gambling made me take a hard look at my own life. Their descent into despair and isolation was a mirror of what could happen to me if I didn't stop. This sobering realization pushed me to seek help and commit to quitting.",
    "I knew I had to stop gambling when I started lying to the people I cared about. Deceiving my friends and family to cover up my losses was tearing me apart inside. I didn't want to be that person anymore, so I decided to seek professional help and turn my life around.",
  ];

  const password = await hash("P4$sword!", 10);

  const reviews: string[] = [
    "This app has been a lifesaver for me. The daily reminders and motivational messages helped me stay focused on my goal of quitting gambling. The community support feature was also a huge plus, as it made me feel less alone in my struggle.",
    "I can't thank this app enough for helping me regain control over my life. The tracking tools allowed me to see my progress and understand my triggers. With the help of this app, I was able to stay away from gambling and improve my financial situation.",
    "This app provided me with the support I desperately needed. The real-time chat with counselors and access to resources made a world of difference. I've been gambling-free for six months now, and I couldn't have done it without this app.",
    "I was skeptical at first, but this app really works! The budgeting tools helped me see how much money I was wasting on gambling, and the daily journal feature allowed me to reflect on my progress. It's an essential tool for anyone looking to overcome gambling addiction.",
    "The app's guided meditation sessions were a game-changer for me. They helped me manage stress and anxiety, which were major triggers for my gambling. Thanks to this app, I feel more in control and optimistic about my future.",
    "I love how this app combines practical advice with emotional support. The goal-setting feature kept me motivated, and the supportive community was always there to lift me up when I felt down. This app truly changed my life.",
    "This app was instrumental in my recovery journey. The step-by-step program and regular check-ins kept me accountable. I'm now more aware of my triggers and have learned healthier ways to cope with stress.",
    "The educational content in this app is top-notch. It helped me understand the psychological aspects of my addiction and provided me with strategies to overcome it. I'm proud to say I've been gamble-free for over a year now, thanks to this app.",
    "What I appreciate most about this app is the sense of community it fosters. Connecting with others who are going through the same struggle made a huge difference. The app's tools and resources are incredibly helpful, and I finally feel like I have control over my life again.",
  ];

  const blogPosts: Array<{
    title: string;
    previewText: string;
    content: Value;
  }> = [
    {
      title:
        "Setting Goals and Seeking Support: Key Steps in Overcoming Gambling Addiction",
      previewText:
        "Overcoming gambling addiction requires a multifaceted approach. Learn how setting goals, seeking support, and using practical tools can help you regain control of your life.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Overcoming gambling addiction requires a multifaceted approach. Setting clear goals is a crucial first step. By defining what you want to achieve, whether it's financial stability or improved relationships, you create a roadmap for your recovery journey.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Seeking support from friends, family, and support groups can make a significant difference. Sharing your struggles and successes with others who understand can provide emotional relief and practical advice. It's important to remember that you don't have to fight this battle alone.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Utilizing practical tools such as budgeting apps and self-exclusion programs can help you manage your finances and avoid triggers. These tools are designed to support your efforts and keep you accountable. Combining these resources with professional counseling can enhance your chances of success.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Staying motivated is essential. Regularly reminding yourself of your goals and the reasons you want to quit gambling can strengthen your resolve. Celebrate your milestones, no matter how small, and use them as motivation to keep going.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Finally, be patient with yourself. Recovery is a gradual process, and setbacks may occur. It's important to view these setbacks as learning opportunities rather than failures. With persistence and the right support, you can overcome gambling addiction and build a healthier, happier future.",
            },
          ],
        },
      ],
    },
    {
      title:
        "Managing Emotional and Psychological Impacts of Gambling Addiction",
      previewText:
        "Discover the emotional and psychological impacts of gambling addiction and learn effective strategies to cope with and overcome these challenges.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Gambling addiction can have profound emotional and psychological impacts. Feelings of guilt, shame, and anxiety are common among those struggling with this addiction. Understanding these emotions is the first step towards healing.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Coping with these feelings requires effective strategies. Engaging in mindfulness and relaxation techniques can help manage stress and reduce the urge to gamble. Practices such as deep breathing exercises, meditation, and yoga can promote emotional well-being.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Therapy and counseling are also valuable resources. Speaking with a mental health professional can provide insights into the underlying causes of your addiction and help develop coping mechanisms. Cognitive-behavioral therapy (CBT) is particularly effective in addressing addictive behaviors.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Building a strong support network is crucial. Friends and family can offer emotional support and encouragement. Joining support groups where you can share experiences and advice with others facing similar challenges can also be incredibly beneficial.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Lastly, setting realistic goals and celebrating your progress can boost your confidence and motivation. Recovery is a journey with ups and downs, but with determination and the right strategies, you can overcome the emotional and psychological hurdles of gambling addiction.",
            },
          ],
        },
      ],
    },
    {
      title:
        "Financial Recovery: Steps to Regain Control After Gambling Addiction",
      previewText:
        "Financial recovery from gambling addiction is possible. Learn how to manage your finances, create a budget, and rebuild your financial stability step by step.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Financial recovery from gambling addiction is possible with the right approach. The first step is to assess your current financial situation. Take an honest look at your debts, expenses, and income to understand the full extent of the impact.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Creating a budget is essential for managing your finances. List all your monthly expenses and compare them with your income. Prioritize necessary expenses such as housing, utilities, and food, and allocate any remaining funds towards paying off debts.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Seeking professional financial advice can be beneficial. Financial counselors can help you develop a debt repayment plan and provide guidance on managing your money effectively. They can also offer strategies to avoid falling back into gambling-related financial troubles.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Rebuilding your savings is another important aspect of financial recovery. Even small, regular contributions to a savings account can add up over time. Having an emergency fund can provide a financial cushion and reduce the temptation to gamble in times of stress.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Lastly, consider using financial management apps and tools. These can help you track your spending, set financial goals, and monitor your progress. By staying organized and proactive, you can regain financial stability and move forward with confidence.",
            },
          ],
        },
      ],
    },
    {
      title: "Identifying and Managing Triggers to Prevent Gambling Relapse",
      previewText:
        "Understanding the triggers of gambling addiction is key to overcoming it. Learn how to identify and manage your triggers to prevent relapse and maintain your recovery.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Understanding the triggers of gambling addiction is key to overcoming it. Triggers are the thoughts, feelings, or situations that prompt the urge to gamble. Identifying these triggers is the first step in managing them effectively.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Common triggers include stress, boredom, and financial pressure. Keeping a journal can help you track when and why you feel the urge to gamble. Noting the patterns can provide valuable insights into your behavior.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Once you've identified your triggers, developing coping strategies is crucial. Engaging in alternative activities such as exercise, hobbies, or spending time with loved ones can help distract you from the urge to gamble. Finding healthy ways to deal with stress is particularly important.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Avoiding environments and situations that trigger gambling is also essential. If certain places or people make you want to gamble, try to stay away from them. Instead, surround yourself with supportive individuals who encourage your recovery.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Finally, consider seeking professional help. Therapists and counselors can work with you to develop personalized strategies for managing your triggers. With their support and your commitment, you can prevent relapse and maintain your recovery journey.",
            },
          ],
        },
      ],
    },
    {
      title: "Rebuilding Trust with Loved Ones After Gambling Addiction",
      previewText:
        "Learn how to rebuild trust with your loved ones after overcoming gambling addiction. These strategies can help you mend relationships and foster a supportive environment for recovery.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Rebuilding trust with your loved ones after overcoming gambling addiction is a vital part of the recovery process. Acknowledging the impact of your actions and sincerely apologizing is the first step. Honest communication about your struggles and progress can help repair damaged relationships.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Consistency in your actions is crucial. Demonstrating reliability and responsibility over time shows your commitment to change. This might involve sticking to a budget, attending support meetings, or seeking professional help.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Patience is key when rebuilding trust. Understand that your loved ones may need time to heal and regain confidence in you. Be open to their concerns and willing to address any doubts they may have.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Involve your loved ones in your recovery journey. Sharing your milestones and setbacks with them can foster a sense of teamwork and mutual support. Their encouragement and understanding can significantly aid your progress.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Finally, focus on creating positive experiences together. Engage in activities that strengthen your bond and provide new, healthy memories. Rebuilding trust takes effort and time, but with dedication and love, it is possible to mend relationships and build a brighter future.",
            },
          ],
        },
      ],
    },
    {
      title: "The Importance of Self-Care in Gambling Addiction Recovery",
      previewText:
        "Discover the importance of self-care in recovering from gambling addiction. Implementing these self-care practices can enhance your well-being and support your journey to recovery.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Self-care is an essential component of recovering from gambling addiction. Prioritizing your physical and mental health can significantly enhance your overall well-being. Start by establishing a routine that includes regular exercise, a balanced diet, and sufficient sleep.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Engaging in activities that bring you joy and relaxation is equally important. Hobbies, creative pursuits, and social interactions can provide a positive outlet for your energy and emotions. Finding new passions can help fill the void left by gambling.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Mindfulness practices such as meditation and yoga can reduce stress and increase self-awareness. These techniques help you stay present and manage the urge to gamble. Regular practice can improve your emotional resilience and overall mental health.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Seeking professional support is a crucial aspect of self-care. Therapists and counselors can provide personalized strategies and emotional support. Joining a support group can also offer a sense of community and shared understanding.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Lastly, be kind to yourself throughout your recovery journey. Acknowledge your progress and celebrate your achievements, no matter how small. Self-compassion and patience are key to maintaining long-term recovery and building a fulfilling, healthy life.",
            },
          ],
        },
      ],
    },
    {
      title: "Creating a Sustainable Financial Plan Post-Gambling Addiction",
      previewText:
        "Financial planning is crucial for recovering from gambling addiction. Learn how to create a sustainable financial plan to regain control over your finances and build a stable future.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Financial planning is crucial for recovering from gambling addiction. The first step is to assess your financial situation honestly. Calculate your total debt, monthly expenses, and income to understand your financial standing.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Creating a budget is essential for managing your finances. List all necessary expenses and allocate funds accordingly. Prioritize paying off debts and avoid unnecessary spending. This disciplined approach can help you regain control over your money.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Consider seeking professional financial advice. Financial counselors can help you develop a realistic repayment plan and offer strategies to manage your money more effectively. They can also provide guidance on rebuilding your credit score and savings.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Building an emergency fund is another important aspect of financial planning. Set aside a small portion of your income regularly to create a financial cushion. This fund can provide security and reduce the temptation to gamble in times of stress.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Lastly, use financial management apps and tools to track your spending and stay organized. These resources can help you monitor your progress and stay accountable. With careful planning and commitment, you can achieve financial stability and move forward with confidence.",
            },
          ],
        },
      ],
    },
    {
      title:
        "Exploring New Hobbies and Interests to Aid Gambling Addiction Recovery",
      previewText:
        "Exploring alternative hobbies and interests can aid in recovering from gambling addiction. Discover new activities that can provide fulfillment and joy without the risks associated with gambling.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Exploring alternative hobbies and interests can aid in recovering from gambling addiction. Finding new activities that bring fulfillment and joy can help fill the void left by gambling. Hobbies provide a healthy outlet for your time and energy.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Consider engaging in physical activities such as sports, hiking, or dancing. Physical exercise not only improves your health but also releases endorphins, which boost your mood and reduce stress. Group activities can also foster social connections and support.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Creative pursuits such as painting, writing, or playing a musical instrument can be deeply satisfying. These activities allow you to express yourself and develop new skills. They also provide a constructive way to manage emotions and reduce the urge to gamble.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Volunteering is another excellent way to find purpose and meaning. Helping others can boost your self-esteem and provide a sense of accomplishment. It also shifts your focus away from gambling and towards making a positive impact in your community.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Finally, consider joining clubs or groups that align with your interests. Whether it's a book club, gardening group, or cooking class, these social activities can provide companionship and support. By exploring new hobbies, you can build a fulfilling, balanced life without gambling.",
            },
          ],
        },
      ],
    },
    {
      title: "The Role of Therapy in Gambling Addiction Recovery",
      previewText:
        "Understanding the role of therapy in gambling addiction recovery is crucial. Discover how different types of therapy can help you overcome addiction and maintain long-term recovery.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              text: "Understanding the role of therapy in gambling addiction recovery is crucial. Therapy provides a structured environment to explore the underlying causes of your addiction. It offers strategies to manage triggers and develop healthier coping mechanisms.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Cognitive-behavioral therapy (CBT) is one of the most effective approaches. CBT helps you identify and change negative thought patterns that contribute to gambling behavior. It equips you with practical tools to handle cravings and prevent relapse.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Motivational interviewing (MI) is another valuable technique. MI focuses on enhancing your motivation to change by exploring your values and goals. It helps you resolve ambivalence and commit to recovery.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Family therapy can also play a significant role in recovery. It addresses the impact of addiction on relationships and fosters open communication. Involving family members in the recovery process can provide additional support and understanding.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Group therapy offers a sense of community and shared experience. Connecting with others who are facing similar challenges can reduce feelings of isolation. Group sessions provide mutual support and the opportunity to learn from others' experiences.",
            },
          ],
        },
      ],
    },
  ];

  // Generate 10 users data
  const generatedUsers: Prisma.UserUncheckedCreateInput[] = Array.from(
    { length: 9 },
    () => ({
      id: faker.string.uuid(),
      username: faker.internet.userName(),
      password: password,
      name: faker.person.fullName(),
      gender: faker.person.gender(),
      birthDate: faker.date.birthdate(),
      gamblingStory:
        gamblingStories[
          faker.number.int({ min: 0, max: gamblingStories.length - 1 })
        ],
      gamblingDuration: faker.number.int({ min: 1, max: 24 }),
      whyStop:
        reasonStops[faker.number.int({ min: 0, max: reasonStops.length - 1 })],
      totalPoints: faker.number.int({ min: 0, max: 600 }),
    }),
  );

  // For each of the user, generate a review
  const generatedReviews: Prisma.ReviewUncheckedCreateInput[] =
    generatedUsers.map((user, idx) => ({
      rating: faker.number.int({ min: 3, max: 5 }),
      review: reviews[idx],
      isAnonymous: faker.datatype.boolean(),
      userId: user.id as string,
    }));

  // Generate 9 blog posts
  const generatedBlogPosts: Prisma.PostUncheckedCreateInput[] = blogPosts.map(
    (blog) => ({
      title: blog.title,
      previewText: blog.previewText,
      content: blog.content as Prisma.JsonArray,
      isAnonymous: faker.datatype.boolean(),
      userId: generatedUsers[
        faker.number.int({ min: 0, max: generatedUsers.length - 1 })
      ].id as string,
    }),
  );

  const tasks: Array<{
    taskName: string;
    taskPoints: number;
    taskDescription: string;
  }> = [
    {
      taskName: "Daily Journal Writing",
      taskPoints: 3,
      taskDescription:
        "Write about your experiences and feelings daily for self-reflection.",
    },
    {
      taskName: "Reading Motivational Articles",
      taskPoints: 3,
      taskDescription:
        "Read articles that provide motivation to stop gambling.",
    },
    {
      taskName: "Joining Online Support Groups",
      taskPoints: 3,
      taskDescription:
        "Join online support groups to get support from others with the same goals.",
    },
    {
      taskName: "Meditation Practice",
      taskPoints: 4,
      taskDescription: "Practice daily meditation to calm the mind.",
    },
    {
      taskName: "Watching Educational Videos",
      taskPoints: 4,
      taskDescription:
        "Watch educational videos about the negative effects of gambling.",
    },
    {
      taskName: "Creating a Financial Plan",
      taskPoints: 4,
      taskDescription:
        "Create and adhere to a financial plan to manage personal finances better.",
    },
    {
      taskName: "Attending Counseling Sessions",
      taskPoints: 5,
      taskDescription:
        "Attend counseling sessions with a therapist experienced in handling addiction.",
    },
    {
      taskName: "Joining Self-Development Workshops",
      taskPoints: 5,
      taskDescription:
        "Join workshops or seminars focused on self-development.",
    },
    {
      taskName: "Noting Gambling Triggers",
      taskPoints: 5,
      taskDescription:
        "Note the things that trigger the urge to gamble and find ways to overcome them.",
    },
    {
      taskName: "Building New Hobbies",
      taskPoints: 6,
      taskDescription:
        "Develop new positive hobbies to divert attention from gambling.",
    },
    {
      taskName: "Engaging in Physical Activity",
      taskPoints: 6,
      taskDescription:
        "Engage in regular physical activity to maintain body and mind health.",
    },
    {
      taskName: "Creating a Long-Term Plan",
      taskPoints: 6,
      taskDescription:
        "Create a long-term plan for a better life without gambling.",
    },
  ];

  // For each user, generate 3-5 daily tasks
  const generatedDailyTasks: Prisma.DailyTaskUncheckedCreateInput[] =
    generatedUsers
      .map((user) => {
        return Array.from(
          { length: faker.number.int({ min: 3, max: 5 }) },
          () => {
            // Pick random task
            const task =
              tasks[faker.number.int({ min: 0, max: tasks.length - 1 })];
            return {
              taskName: task.taskName,
              taskPoints: task.taskPoints,
              taskDescription: task.taskDescription,
              taskStatus: faker.datatype.boolean(),
              userId: user.id as string,
            };
          },
        );
      })
      .flat();

  // For each user, generate 3-5 transactions
  await prisma.$transaction(async (tx) => {
    // Reset the database
    await tx.post.deleteMany();
    await tx.review.deleteMany();
    await tx.dailyTask.deleteMany();
    await tx.user.deleteMany();
    // Seed
    await tx.user.createMany({ data: generatedUsers });
    await tx.review.createMany({ data: generatedReviews });
    await tx.post.createMany({ data: generatedBlogPosts });
    await tx.dailyTask.createMany({ data: generatedDailyTasks });
  });
};

main();
