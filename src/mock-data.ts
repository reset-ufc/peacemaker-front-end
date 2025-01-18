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
      comment_id: "2599730225",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/blob",
      created_at: "2025-01-18T14:05:27Z",
      content: "you should be fuck you!",
      toxicity: "0.9563754",
      suggestions: {
        corrected_comment:
          "I understand that you're upset, but let's focus on having a respectful conversation.",
      },
      classification: "vulgarity",
      solutioned: false,
      solution: "",
    },
    {
      comment_id: "25990225",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/meiazero.dev",
      created_at: "2025-01-18T15:17:11.345Z",
      content: "you should be fuck you!",
      toxicity: "0.9563754",
      suggestions: {
        corrected_comment: "let's focus on having a respectful conversation.",
      },
      classification: "vulgarity",
      solutioned: true,
      solution: "",
    },
  ],
};
