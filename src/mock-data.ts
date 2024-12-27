export const mockData = {
  overviewAnalytics: {
    analytics: {
      average_score: 0.5,
      median_score: 0.5,
      total_comments: 0,
      resolved_comments: 0,
      recent_users: ["meiazero", "EricmesquiBR"],
      developers_count: 0,
      classification_count: [
        {
          incivility: "vulgarity",
          count: 2,
        },
        {
          incivility: "neutral",
          count: 5,
        },
      ],
      moderation_types: 0,
      likes_dislikes_insights: {
        likes: 3,
        dislikes: 5,
      },
    },
  },
  githubRespositoryAnalytics: [
    {
      analytics: {
        average_score: 0.5,
        median_score: 0.5,
        total_comments: 0,
        resolved_comments: 0,
        recent_users: ["meiazero", "EricmesquiBR"],
        developers_count: 0,
        classification_count: [
          {
            incivility: "vulgarity",
            count: 2,
          },
          {
            incivility: "neutral",
            count: 5,
          },
        ],
        moderation_types: 0,
        likes_dislikes_insights: {
          likes: 3,
          dislikes: 5,
        },
      },
    },
  ],

  userProfile: {
    profile: {
      name: "John Doe",
      login: "johndoe",
      avatar_url: "https://avatar.vercel.sh/user.svg?text=US",
      email: "john@doe.com",
      github_id: "252352",
    },
  },
  githubRepositories: [
    {
      repository_id: "835944294",
      repository_name: "meiazero.dev",
      repository_full_name: "meiazero/meiazero.dev",
      permissions: {
        admin: true,
        maintain: true,
        push: true,
        triage: true,
        pull: true,
      },
      user_id: "76269418",
    },
    {
      repository_id: "886268432",
      repository_name: "s2t-whisper",
      repository_full_name: "meiazero/s2t-whisper",
      permissions: {
        admin: true,
        maintain: true,
        push: true,
        triage: true,
        pull: true,
      },
      user_id: "76269418",
    },
  ],
  githubComments: [
    {
      comment_id: "2518368089",
      github_id: "174073720",
      repo_id: "826011337",
      login: "thepeacemakerbot[bot]",
      repo_full_name: "ThePeacemakerBot/peacemaker-test-repo",
      comment:
        "@ThePeacemakerBot Hi there! We noticed some potentially concerning language in your recent comment. Would you mind reviewing our guidelines at https://github.com/apps/thepeacemakerbot? Let's work together to maintain a positive atmosphere.",
      classification: "neutral",
      toxicity_score: 0.017341165,
      friendly_comment:
        "Hello! I apologize if my previous comment came across as concerning. I'll make sure to review the guidelines at https://github.com/apps/thepeacemakerbot to ensure our conversation remains productive and respectful.",
      solved: false,
      solution: null,
    },
    {
      comment_id: "2518368963",
      github_id: "174073720",
      repo_id: "826011337",
      login: "thepeacemakerbot[bot]",
      repo_full_name: "ThePeacemakerBot/peacemaker-test-repo",
      comment:
        "@thepeacemakerbot[bot] Hi there! We noticed some potentially concerning language in your recent comment. Would you mind reviewing our guidelines at https://github.com/apps/thepeacemakerbot? Let's work together to maintain a positive atmosphere.",
      classification: "neutral",
      toxicity_score: 0.019477395,
      friendly_comment:
        "Hi! I'd be happy to review the guidelines at https://github.com/apps/thepeacemakerbot to ensure our conversation remains respectful and constructive. Let's focus on maintaining a positive atmosphere and fostering a collaborative environment.",
      solved: false,
      solution: null,
    },
  ],
  githubCommentsDetail: [
    {
      comment_id: "2518374236",
      github_id: "174073720",
      repo_id: "826011337",
      login: "thepeacemakerbot[bot]",
      repo_full_name: "ThePeacemakerBot/peacemaker-test-repo",
      comment:
        "@thepeacemakerbot[bot] Hi there! We noticed some potentially concerning language in your recent comment. Would you mind reviewing our guidelines at https://github.com/apps/thepeacemakerbot? Let's work together to maintain a positive atmosphere.",
      classification: "neutral",
      toxicity_score: 0.019477395,
      friendly_comment:
        "Hi! We noticed some language in your recent comment that might concern others. Would you mind reviewing our guidelines at https://github.com/apps/thepeacemakerbot? Let's collaborate to maintain a respectful and inclusive environment.",
      solved: false,
      solution: null,
    },
  ],
  githubSuggestions: [
    {
      id: "234234",
      content: "A suggestion for this incivility comment",
    },
    {
      id: "234234",
      content: "Another suggestion for this incivility comment",
    },
    {
      id: "234234",
      content: "Yet another suggestion for this incivility comment",
    },
  ],
};
