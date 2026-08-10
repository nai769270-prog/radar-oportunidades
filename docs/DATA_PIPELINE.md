# Pipeline de dados

1. Usuário define um problema, produto ou serviço.
2. O Radar gera consultas de alta intenção.
3. Adaptadores consultam somente fontes públicas ou APIs oficialmente autorizadas.
4. Cada resultado mantém URL/origem e evidência para auditoria.
5. Resultados são normalizados e deduplicados.
6. O motor identifica intenção e calcula score.
7. Só oportunidades relevantes seguem para enriquecimento B2B.
8. Contatos passam pela política de contato público antes de serem salvos.
9. O usuário decide se deseja abordar a oportunidade.

## Regra de origem
Nunca apresentar um resultado coletado como real sem `sourceUrl`/evidência verificável. Resultados de demonstração devem permanecer identificados como demo.

## Redes sociais
Instagram, WhatsApp e outras plataformas devem usar APIs oficiais/autorizadas quando a automação exigir acesso de plataforma. O sistema não deve contornar autenticação, controles de acesso ou limites da plataforma.
