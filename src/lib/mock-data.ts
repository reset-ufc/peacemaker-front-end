import type {
  Comment,
  CommentCategory,
  Parent,
  Repository,
  Suggestion,
  User,
} from "./types";

// ----------------------
// Mock Data
// ----------------------

export const mockUsers: User[] = [
  {
    _id: "642bb0e99f4305001a50f001",
    gh_id: "76269418",
    username: "meiazero",
    avatar_url: "https://avatars.githubusercontent.com/u/76269418?v=4",
    encripted_token: "ENCRYPTED_TOKEN_EXAMPLE",
    created_at: "2025-01-18T14:10:43Z",
  },
  {
    _id: "642bb0e99f4305001a50f002",
    gh_id: "1234567",
    username: "bob",
    avatar_url: "https://avatars.githubusercontent.com/u/1234567?v=4",
    created_at: "2025-02-01T10:05:00Z",
  },
];

export const mockRepositories: Repository[] = [
  {
    _id: "642bb0e99f4305001a50f003",
    gh_id: "918463959",
    gh_url: "https://github.com/meiazero/blob",
    private: "true",
    owner_gh_id: "76269418",
    created_at: "2025-01-18T02:06:35Z",
  },
  {
    _id: "642bb0e99f4305001a50f004",
    gh_id: "555888777",
    gh_url: "https://github.com/bob/awesome-project",
    private: "false",
    owner_gh_id: "1234567",
    created_at: "2025-02-15T09:30:00Z",
  },
];

export const mockParents: Parent[] = [
  {
    _id: "642bb0e99f4305001a50f007",
    gh_comment_id: "2705307245",
    gh_id: "2796998338",
    title: "s3",
    html_url: "https://github.com/meiazero/blob/issues/4",
    is_open: true,
    type: "issue",
    created_at: "2025-01-18T14:10:43Z",
  },
];

export const mockSuggestions: Suggestion[] = [
  {
    _id: "642bb0e99f4305001a50f008",
    gh_comment_id: "2705307245",
    content:
      'Please consider rephrasing to be more constructive: "This code needs some improvements to run properly."',
    is_edited: false,
    created_at: "2025-03-07T02:00:00Z",
  },
];

// Comentários originais do mock
const originalComments: Comment[] = [
  {
    _id: "642bb0e99f4305001a50f005",
    gh_id: "2705307245",
    gh_repository_id: "918463959",
    gh_comment_sender_id: "76269418",
    content:
      "@meiazero Fuck your shit code, this don't run in any place, rewrite all this shit!",
    event_type: "issue_comment",
    toxicity_score: 0.85,
    classification: "toxic",
    solutioned: false,
    suggestions: undefined,
    created_at: "2025-03-07T01:28:51Z",
    updated_at: "2025-03-07T01:28:51Z",
    comment_html_url:
      "https://github.com/meiazero/blob/issues/4#issuecomment-2705307245",
    issue_id: "2796998338",
  },
  {
    _id: "642bb0e99f4305001a50f006",
    gh_id: "2705309999",
    gh_repository_id: "555888777",
    gh_comment_sender_id: "1234567",
    content:
      "Hey, I think we should refactor this module for better readability.",
    event_type: "issue_comment",
    toxicity_score: 0.2,
    classification: "civil",
    solutioned: true,
    suggestions: undefined,
    created_at: "2025-03-10T10:00:00Z",
    updated_at: "2025-03-10T10:15:00Z",
    comment_html_url:
      "https://github.com/bob/awesome-project/issues/2#issuecomment-2705309999",
    issue_id: "2797000000",
  },
];

// Comentários adicionais para ter mais exemplos
const additionalComments: Partial<Comment>[] = [
  {
    _id: "642bb0e99f4305001a50f009",
    gh_id: "2705310001",
    gh_repository_id: "918463959",
    gh_comment_sender_id: "76269418",
    content:
      "This PR is a joke. I've been waiting for months for someone to fix this and you submit this garbage? Are you even trying?",
    event_type: "pull_request_comment",
    toxicity_score: 0.78,
    classification: "toxic",
    solutioned: false,
    created_at: "2025-03-12T14:22:10Z",
    comment_html_url:
      "https://github.com/meiazero/blob/pull/7#issuecomment-2705310001",
  },
  {
    _id: "642bb0e99f4305001a50f010",
    gh_id: "2705310002",
    gh_repository_id: "555888777",
    gh_comment_sender_id: "1234567",
    content:
      "I don't understand why you keep ignoring my suggestions. This is the third time I've pointed out this issue and nobody seems to care.",
    event_type: "issue_comment",
    toxicity_score: 0.45,
    classification: "uncivil",
    solutioned: false,
    created_at: "2025-03-14T09:15:33Z",
    comment_html_url:
      "https://github.com/bob/awesome-project/issues/5#issuecomment-2705310002",
  },
  {
    _id: "642bb0e99f4305001a50f011",
    gh_id: "2705310003",
    gh_repository_id: "918463959",
    gh_comment_sender_id: "76269418",
    content:
      "You clearly have no idea what you're talking about. This implementation is standard practice and your objections make no sense.",
    event_type: "pull_request_comment",
    toxicity_score: 0.62,
    classification: "uncivil",
    solutioned: true,
    created_at: "2025-03-15T16:40:22Z",
    comment_html_url:
      "https://github.com/meiazero/blob/pull/9#issuecomment-2705310003",
  },
  {
    _id: "642bb0e99f4305001a50f012",
    gh_id: "2705310004",
    gh_repository_id: "555888777",
    gh_comment_sender_id: "1234567",
    content:
      "WHAT THE HELL? You merged this without review? This breaks everything in production! Are you insane?",
    event_type: "pull_request_comment",
    toxicity_score: 0.88,
    classification: "toxic",
    solutioned: false,
    created_at: "2025-03-16T10:05:17Z",
    comment_html_url:
      "https://github.com/bob/awesome-project/pull/12#issuecomment-2705310004",
  },
  {
    _id: "642bb0e99f4305001a50f013",
    gh_id: "2705310005",
    gh_repository_id: "918463959",
    gh_comment_sender_id: "76269418",
    content:
      "I've been waiting for a response for two weeks now. Is anyone actually maintaining this repository?",
    event_type: "issue_comment",
    toxicity_score: 0.35,
    classification: "uncivil",
    solutioned: false,
    created_at: "2025-03-17T11:30:45Z",
    comment_html_url:
      "https://github.com/meiazero/blob/issues/11#issuecomment-2705310005",
  },
  {
    _id: "642bb0e99f4305001a50f014",
    gh_id: "2705310006",
    gh_repository_id: "555888777",
    gh_comment_sender_id: "1234567",
    content:
      "This documentation is completely useless. It's like it was written by someone who's never used the API.",
    event_type: "issue_comment",
    toxicity_score: 0.58,
    classification: "uncivil",
    solutioned: true,
    created_at: "2025-03-18T14:20:33Z",
    comment_html_url:
      "https://github.com/bob/awesome-project/issues/8#issuecomment-2705310006",
  },
  {
    _id: "642bb0e99f4305001a50f015",
    gh_id: "2705310007",
    gh_repository_id: "918463959",
    gh_comment_sender_id: "76269418",
    content:
      "Stop wasting everyone's time with these pointless feature requests. Read the contributing guidelines before posting.",
    event_type: "issue_comment",
    toxicity_score: 0.65,
    classification: "uncivil",
    solutioned: false,
    created_at: "2025-03-19T09:45:12Z",
    comment_html_url:
      "https://github.com/meiazero/blob/issues/15#issuecomment-2705310007",
  },
  {
    _id: "642bb0e99f4305001a50f016",
    gh_id: "2705310008",
    gh_repository_id: "555888777",
    gh_comment_sender_id: "1234567",
    content:
      "I'm sorry, but I have to disagree with the approach here. Could we consider an alternative implementation that might be more efficient?",
    event_type: "pull_request_comment",
    toxicity_score: 0.05,
    classification: "civil",
    solutioned: true,
    created_at: "2025-03-20T15:10:27Z",
    comment_html_url:
      "https://github.com/bob/awesome-project/pull/18#issuecomment-2705310008",
  },
];

// Mapeamento de classificação para categoria
const classificationToCategory: Record<string, CommentCategory> = {
  toxic: "vulgarity",
  uncivil: "bitter_frustration",
  civil: "neutral",
};

// Definição do tipo ToxicityLevel
type ToxicityLevel = "high" | "medium" | "low";

// Mapeamento de pontuação de toxicidade para nível
const getToxicityLevel = (score: number): ToxicityLevel => {
  if (score >= 0.7) return "high";
  if (score >= 0.4) return "medium";
  return "low";
};

// Categorias específicas baseadas no conteúdo
const getSpecificCategory = (
  content: string,
  classification: string
): CommentCategory => {
  const lowerContent = content.toLowerCase();

  if (classification === "toxic") {
    if (
      lowerContent.includes("fuck") ||
      lowerContent.includes("shit") ||
      lowerContent.includes("hell")
    )
      return "vulgarity";
    if (
      lowerContent.includes("idiot") ||
      lowerContent.includes("stupid") ||
      lowerContent.includes("garbage")
    )
      return "insulting";
  }

  if (classification === "uncivil") {
    if (
      lowerContent.includes("waiting") ||
      lowerContent.includes("weeks") ||
      lowerContent.includes("months")
    )
      return "impatience";
    if (lowerContent.includes("no idea") || lowerContent.includes("clearly"))
      return "mocking";
    if (lowerContent.includes("wasting") || lowerContent.includes("pointless"))
      return "bitter_frustration";
  }

  return classificationToCategory[classification] || "neutral";
};

// Combinar e enriquecer os comentários
export const mockComments: Comment[] = [
  ...originalComments,
  ...(additionalComments as Comment[]),
].map(comment => {
  // Adicionar campos para UI
  const category = getSpecificCategory(comment.content, comment.classification);
  const toxicityLevel = getToxicityLevel(comment.toxicity_score);

  return {
    ...comment,
    category,
    toxicityLevel,
    history: comment.solutioned
      ? [
          {
            action: "Comentário detectado",
            date: comment.created_at,
            note: "Detectado automaticamente pelo sistema",
          },
          {
            action: `Classificado como ${comment.classification}`,
            date: comment.updated_at || comment.created_at,
            note: `Pontuação: ${(comment.toxicity_score * 100).toFixed(0)}%`,
          },
          {
            action: "Marcado como resolvido",
            date: new Date(
              new Date(comment.created_at).getTime() + 86400000
            ).toISOString(),
            note: "Usuário foi contatado e esclareceu a situação",
          },
        ]
      : [
          {
            action: "Comentário detectado",
            date: comment.created_at,
            note: "Detectado automaticamente pelo sistema",
          },
          {
            action: `Classificado como ${comment.classification}`,
            date: comment.updated_at || comment.created_at,
            note: `Pontuação: ${(comment.toxicity_score * 100).toFixed(0)}%`,
          },
        ],
  };
});
