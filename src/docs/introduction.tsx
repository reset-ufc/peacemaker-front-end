import { useTranslation } from "react-i18next";

export function Introduction() {
  const { t } = useTranslation();
  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <div className='mb-12 text-center'>
        <h1 className='mb-4 text-4xl font-bold dark:text-gray-100'>
          {t("Ajuda & Onboarding do Peacemaker Bot")}
        </h1>
        <p className='text-xl dark:text-gray-100'>
          {t("Aprenda, passo a passo, como começar a usar o")}{" "}
          <span className='font-bold dark:text-blue-100'>
            {t("Peacemaker Bot")}
          </span>{" "}
          {t(
            "para monitorar e manter a civilidade nos seus repositórios GitHub."
          )}
        </p>
      </div>

      <div className='space-y-6'>
        <div className='section-card  rounded-lg p-6 shadow-md'>
          <div className='accordion-header flex cursor-pointer items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-gray-100'>
              {t("1. Instalar o Bot no GitHub")}
            </h2>
            <i className='fas fa-chevron-down text-gray-500'></i>
          </div>
          <div className='accordion-content mt-4'>
            <p className='mb-4 dark:text-gray-100'>
              {t(
                "O primeiro passo é adicionar o Peacemaker Bot como um GitHub App no seu repositório:"
              )}
            </p>
            <ul className='list-disc space-y-2 pl-6 text-gray-100'>
              <li className='text-gray-800 dark:text-gray-100'>
                {t("Clique no link de instalação:")}{" "}
                <a
                  href='https://github.com/apps/thepeacemakerbot'
                  className='font-medium text-blue-700 underline hover:text-blue-800'
                >
                  Instalar Peacemaker Bot
                </a>
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t(
                  "Autentique-se no GitHub e escolha o(s) repositório(s) onde o bot terá permissão para atuar."
                )}
              </li>
            </ul>
            <div className='mt-4 rounded-lg bg-neutral-200 p-4'>
              <p className='text-blue-800'>
                <i className='fas fa-lightbulb mr-2'></i>
                {t(
                  "Dica você pode instalar em mais de um repositório, mas lembre-se de escolher apenas aqueles que deseja monitorar."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='section-card rounded-lg p-6 shadow-md'>
          <div className='accordion-header flex cursor-pointer items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-gray-100'>
              {t("2. Configurando seu LLM")}
            </h2>
            <i className='fas fa-chevron-down text-gray-500'></i>
          </div>
          <div className='accordion-content mt-4'>
            <p className='mb-4 dark:text-gray-100'>
              {t(
                "Para começar a usar o Peacemaker Bot, você precisa configurar um LLM (Large Language Model) de sua preferência. Siga estes passos:"
              )}
            </p>

            <ol className='list-decimal space-y-4 pl-6 text-gray-100'>
              <li className='text-gray-800 dark:text-gray-100'>
                <p className='mb-2 font-semibold'>{t("Acesse seu perfil")}</p>
                <p>
                  {t(
                    "Clique na sua foto de perfil no canto superior direito da tela."
                  )}
                </p>
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                <p className='mb-2 font-semibold'>{t("Selecione o LLM")}</p>
                <p>
                  {t(
                    "No menu que aparece, clique em 'Selecionar LLM' para configurar seu modelo preferido."
                  )}
                </p>
              </li>
            </ol>

            <div className='mt-6 space-y-6'>
              <div className='rounded-lg bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-800'>
                  {t("Configurando OpenAI")}
                </h3>
                <ol className='list-decimal space-y-2 pl-6 text-blue-700'>
                  <li>
                    {t("Acesse")}{" "}
                    <a
                      href='https://platform.openai.com/api-keys'
                      className='underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      platform.openai.com/api-keys
                    </a>
                  </li>
                  <li>{t("Faça login na sua conta OpenAI")}</li>
                  <li>{t("Clique em 'Create new secret key'")}</li>
                  <li>
                    {t("Dê um nome para sua chave e copie o token gerado")}
                  </li>
                  <li>
                    {t(
                      "Cole o token no campo correspondente no Peacemaker Bot"
                    )}
                  </li>
                </ol>
              </div>

              <div className='rounded-lg bg-purple-50 p-4'>
                <h3 className='mb-2 font-semibold text-purple-800'>
                  {t("Configurando Groq")}
                </h3>
                <ol className='list-decimal space-y-2 pl-6 text-purple-700'>
                  <li>
                    {t("Acesse")}{" "}
                    <a
                      href='https://console.groq.com/keys'
                      className='underline'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      console.groq.com/keys
                    </a>
                  </li>
                  <li>{t("Faça login na sua conta Groq")}</li>
                  <li>{t("Clique em 'Create API Key'")}</li>
                  <li>
                    {t("Dê um nome para sua chave e copie o token gerado")}
                  </li>
                  <li>
                    {t(
                      "Cole o token no campo correspondente no Peacemaker Bot"
                    )}
                  </li>
                </ol>
              </div>
            </div>

            <div className='mt-4 rounded-lg bg-yellow-50 p-4'>
              <p className='text-yellow-800'>
                <i className='fas fa-exclamation-triangle mr-2'></i>{" "}
                {t(
                  "Importante: Mantenha seu token em segurança e nunca o compartilhe. Se você suspeitar que seu token foi comprometido, revogue-o imediatamente e gere um novo."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='section-card  rounded-lg p-6 shadow-md'>
          <div className='accordion-header flex cursor-pointer items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-gray-100'>
              {t("3. Primeiro comentário incivilizado")}
            </h2>
            <i className='fas fa-chevron-down text-gray-500'></i>
          </div>
          <div className='accordion-content mt-4'>
            <p className='mb-4 dark:text-gray-100'>
              {t(
                "Assim que alguém (inclusive você!) fizer um comentário com linguagem considerada incivilizada "
              )}
              <span className='font-bold dark:text-blue-100'>
                {t("num dos repositórios permitidos")}
              </span>
              {t(", o bot irá:")}
            </p>
            <ol className='list-decimal space-y-2 pl-6 text-gray-100'>
              <li className='text-gray-800 dark:text-gray-100'>
                {t("Detectar o comentário e calcular um score de toxicidade.")}
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t("Classificar o comentário como incivil ou civil.")}
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t(
                  "Gerar sugestões de reformulação para tornar o texto mais amigável."
                )}
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t(
                  "Exibir, na aba Incivilities, o comentário original, a classificação de incivilidade e as sugestões."
                )}
              </li>
            </ol>
            <div className='mt-6'>
              <p className='mb-2 dark:text-gray-100'>
                {t(
                  "Na aba Incivilities, você tem três opções para cada sugestão:"
                )}
              </p>
              <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='rounded-lg bg-green-50 p-4'>
                  <h3 className='font-semibold text-green-800'>
                    {t("Aceitar")}
                  </h3>
                  <p className='text-green-700'>
                    {t("confirma a sugestão e substitui o texto no GitHub.")}
                  </p>
                </div>
                <div className='rounded-lg bg-yellow-50 p-4'>
                  <h3 className='font-semibold text-yellow-800'>
                    {t("Editar")}
                  </h3>
                  <p className='text-yellow-700'>
                    {t("ajusta a sugestão manualmente antes de aplicar.")}
                  </p>
                </div>
                <div className='rounded-lg bg-red-50 p-4'>
                  <h3 className='font-semibold text-red-800'>{t("Recusar")}</h3>
                  <p className='text-red-700'>
                    {t("descarta aquela sugestão e gera uma nova.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='section-card  rounded-lg p-6 shadow-md'>
          <div className='accordion-header flex cursor-pointer items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-gray-100'>
              {t("4. Configurando seu Token Pessoal do GitHub")}
            </h2>

            <i className='fas fa-chevron-down text-gray-500'></i>
          </div>
          <div className='accordion-content mt-4'>
            <p className='mb-4 dark:text-gray-100'>
              {t(
                "Antes de aceitar qualquer sugestão automática, você precisa fornecer um Personal Access Token (PAT) do GitHub com permissão para modificar comentários. Sem ele, o bot não conseguirá substituir o texto."
              )}
            </p>
            <ol className='list-decimal space-y-2 pl-6 text-gray-100'>
              <li className='text-gray-800 dark:text-gray-100'>
                {t(
                  "Acesse sua conta no GitHub e vá em: Settings Developer settings  Personal access tokens."
                )}
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t(
                  "Clique em Generate new token e selecione o escopo repo (ou apenas public_repo, se for um repositório público)."
                )}
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t("Copie o token gerado e salve-o em um local seguro.")}
              </li>
              <li className='text-gray-800 dark:text-gray-100'>
                {t(
                  "No painel do Peacemaker Bot, abra Configurações (ícone de engrenagem no perfil) e cole seu token."
                )}
              </li>
            </ol>
            <div className='mt-4 rounded-lg bg-blue-50 p-4'>
              <p className='text-blue-800'>
                <i className='fas fa-link mr-2'></i> Link útil:{" "}
                <a
                  href='https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
                  className='text-blue-700 underline hover:text-blue-800'
                >
                  Documentação oficial de PATs do GitHub
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className='section-card rounded-lg bg-white p-6 shadow-md'>
          <div className='accordion-header flex cursor-pointer items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-gray-800 '>
              {t("5. Edição de sugestões & reavaliação")}
            </h2>
            <i className='fas fa-chevron-down text-gray-500'></i>
          </div>
          <div className='accordion-content mt-4'>
            <p className='mb-4 text-gray-800'>
              {t("Quando você edita e submete uma sugestão:")}
            </p>
            <ol className='list-decimal space-y-2 pl-6 text-gray-800'>
              <li>
                {t(
                  "O bot reanalisa o texto editado em busca de traços de incivilidade."
                )}
              </li>
              <li>{t("Existem dois caminhos possíveis:")}</li>
            </ol>

            <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div className='rounded-lg bg-red-50 p-4'>
                <h3 className='mb-2 font-semibold text-red-800'>
                  {t("A. Ainda incivilizado")}
                </h3>
                <ul className='list-disc space-y-2 pl-6 text-red-700'>
                  <li>
                    {t(
                      "Você vê um alerta informando que o texto ainda não está ok."
                    )}
                  </li>
                  <li>
                    {t("Novas sugestões são geradas para melhorar novamente.")}
                  </li>
                  <li>
                    {t(
                      "Se, após duas edições, ainda houver incivilidade, o bot para de sugerir e exibe um alerta final."
                    )}
                  </li>
                </ul>
              </div>
              <div className='rounded-lg bg-green-50 p-4'>
                <h3 className='mb-2 font-semibold text-green-800'>
                  {t("B. Resolvido")}
                </h3>
                <ul className='list-disc space-y-2 pl-6 text-green-700'>
                  <li>
                    {t(
                      "O bot não detecta mais incivilidade e marca o comentário como resolvido."
                    )}
                  </li>
                  <li>{t("Parabéns! A conversa está num tom saudável.")}</li>
                </ul>
              </div>
            </div>

            <div className='mt-4 rounded-lg bg-yellow-50 p-4'>
              <p className='text-yellow-800'>
                <i className='fas fa-exclamation-triangle mr-2'></i>{" "}
                {t(
                  "Atenção: esse fluxo evita que você fique num ciclo infinito de edições sem sair do lugar."
                )}
              </p>
            </div>
          </div>
        </div>

        <div className='section-card rounded-lg bg-white p-6 shadow-md'>
          <div className='accordion-header flex cursor-pointer items-center justify-between'>
            <h2 className='text-2xl font-semibold dark:text-gray-800'>
              {t("6. Explorando a Dashboard")}
            </h2>
            <i className='fas fa-chevron-down text-gray-500'></i>
          </div>
          <div className='accordion-content mt-4'>
            <p className='mb-4 text-gray-800'>
              {t("Por fim, visite a")} <strong>{t("Dashboard")}</strong>{" "}
              {t("para acompanhar métricas e relatórios:")}
            </p>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='rounded-lg bg-purple-50 p-4'>
                <h3 className='mb-2 font-semibold text-purple-800'>
                  {t("Filtros de período")}
                </h3>
                <p className='text-purple-700'>
                  {t("Escolha entre últimos 24h, 7d e 30d.")}
                </p>
              </div>
              <div className='rounded-lg bg-blue-50 p-4'>
                <h3 className='mb-2 font-semibold text-blue-800'>
                  {t("Visão geral")}
                </h3>
                <p className='text-blue-700'>
                  {t(
                    "Cartões com média/mediana de toxicidade, total de comentários, itens resolvidos, etc."
                  )}
                </p>
              </div>
              <div className='rounded-lg bg-green-50 p-4'>
                <h3 className='mb-2 font-semibold text-green-800'>
                  {t("Gráficos interativos")}
                </h3>
                <p className='text-green-700'>
                  {t(
                    "Atividade de moderação, incivilidades por tipo, categorias e ações tomadas."
                  )}
                </p>
              </div>
              <div className='rounded-lg bg-yellow-50 p-4'>
                <h3 className='mb-2 font-semibold text-yellow-800'>
                  {t("Filtro por repositório")}
                </h3>
                <p className='text-yellow-700'>
                  {t(
                    "Foque em um projeto específico ou visualize todos de uma vez."
                  )}
                </p>
              </div>
            </div>
            <p className='mt-6 text-gray-800'>
              {t(
                "Use esses dados para entender tendências, treinar sua equipe e manter a comunidade engajada num ambiente respeitoso."
              )}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-12 text-center'>
        <h2 className='mb-4 text-2xl font-bold dark:text-gray-100'>
          {t("Pronto para começar?")}
        </h2>
        <p className='dark:text-gray-100'>
          {t(
            "Se algo ainda não ficou claro, volte aqui ou abra um issue no próprio repositório do bot. Estamos sempre melhorando!"
          )}
        </p>
        <p className='text-primary mt-4 font-medium'>
          {t("Bom trabalho e feliz moderação!")}
        </p>
      </div>
    </div>
  );
}
