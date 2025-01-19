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
      comment_id: "25992730725",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/blob",
      created_at: "2025-01-18T14:05:27Z",
      content:
        "you should be fuck you! test render image with markdown ![image test](https://pbs.twimg.com/media/GhpF8POXkAASMFl?format=jpg&name=large)",
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
      comment_id: "259903725",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/meiazero.dev",
      created_at: "2025-01-18T15:17:11.345Z",
      content:
        'Test with video tag! \n\n <video width="320" height="240" controls>  <source src="https://www.youtube.com/watch?v=YxNJWzutNqQ" type="video/mp4"></video>',
      toxicity: "0.9563754",
      suggestions: {
        corrected_comment: "let's focus on having a respectful conversation.",
      },
      classification: "vulgarity",
      solutioned: true,
      solution: "",
    },
    {
      comment_id: "26004384722",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/blob",
      created_at: "2025-01-19T01:58:22Z",
      content:
        'you should be able to change this shit code, using the `Bun` globals instance. use your damn brain mtf\n\n```ts\nconst client = new Bun.S3Client({\n  accessKeyId: "your-access-key",\n  secretAccessKey: "your-secret-key",\n  bucket: "my-bucket",\n});\n```',
      toxicity: "0.7856813",
      suggestions: {
        corrected_comment:
          "I think it's possible to refactor this code using the `Bun` globals instance. Let's utilize its capabilities to create a more efficient solution. For instance, we could initialize the S3 client with the access key, secret key, and bucket name as follows: `const client = new Bun.S3Client({...}).` Would you like to explore this approach further?",
      },
      classification: "insulting",
      solutioned: false,
      solution: "",
    },
    {
      comment_id: "25991730725",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/blob",
      created_at: "2025-01-18T14:05:27Z",
      content:
        "Test with video tag! \n\n ![[video](https://www.youtube.com/watch?v=YxNJWzutNqQ)]",
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
      comment_id: "253990725",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/meiazero.dev",
      created_at: "2025-01-18T15:17:11.345Z",
      content:
        '# you should be to `fuck you`. use your [damn brain](https://www.youtube.com/watch?v=dQw4w9WgXcQ) mtf\n\n```ts\nconst client = new Bun.S3Client({\n  accessKeyId: "your-access-key",\n  secretAccessKey: "your-secret-key",\n  bucket: "my-bucket",\n});\n```',
      toxicity: "0.9563754",
      suggestions: {
        corrected_comment: "let's focus on having a respectful conversation.",
      },
      classification: "vulgarity",
      solutioned: true,
      solution: "",
    },
    {
      comment_id: "26004438722",
      user_id: "76269418",
      repository_id: "918463959",
      login: "meiazero",
      repo_full_name: "meiazero/blob",
      created_at: "2025-01-19T01:58:22Z",
      content:
        'you should be able to change this shit code, using the `Bun` globals instance. use your damn brain mtf\n\n```ts\nconst client = new Bun.S3Client({\n  accessKeyId: "your-access-key",\n  secretAccessKey: "your-secret-key",\n  bucket: "my-bucket",\n});\n```',
      toxicity: "0.7856813",
      suggestions: {
        corrected_comment:
          "I think it's possible to refactor this code using the `Bun` globals instance. Let's utilize its capabilities to create a more efficient solution. For instance, we could initialize the S3 client with the access key, secret key, and bucket name as follows: `const client = new Bun.S3Client({...}).` Would you like to explore this approach further?",
      },
      classification: "insulting",
      solutioned: false,
      solution: "",
    },
  ],
};
