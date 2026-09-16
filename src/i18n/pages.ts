import type { Lang } from './ui';

export const pages: Record<
  Lang,
  Record<'about' | 'methodology' | 'corrections' | 'contact', { title: string; html: string }>
> = {
  en: {
    about: {
      title: 'About ToTo Global Desk',
      html: `<p>ToTo Global Desk is an independent newsroom for international news, intelligence, and investigations. It is built to show evidence, not to recycle rumor.</p>
<p>This local site is a working newsroom template. All current stories are <strong>DEMO</strong> until reporters replace them with sourced work.</p>
<p>The desk is not a government, party, or corporate communications channel. The same evidence standard applies to every subject.</p>`,
    },
    methodology: {
      title: 'Methodology',
      html: `<p>Every important claim is labeled: Verified, Strongly Supported, Reported/Unconfirmed, Disputed, False/Misleading, or Unknown.</p>
<p>Sources are marked as primary, secondary, or lead-only. A social post is a lead, not proof.</p>
<p>Investigations open with a question, not a verdict. We log evidence that weakens a theory as well as evidence that supports it.</p>
<p>We do not call something corruption, fraud, or a crime without a proper evidentiary basis: official records, court findings, or independently verified documents.</p>
<p>Right-to-reply: before publishing serious criticism of a named subject, the desk prepares numbered questions and records the response or the lack of a response by deadline. “Refused to comment” is used only when the subject explicitly refuses.</p>`,
    },
    corrections: {
      title: 'Corrections',
      html: `<p>There are no live corrections yet because every article on this build is DEMO content.</p>
<p>When real reporting is published, factual errors will be corrected in the story, dated, and listed on this page. We do not silently rewrite history.</p>
<p>To request a correction, use the contact page. Include the URL, the passage, and the evidence you believe we missed.</p>`,
    },
    contact: {
      title: 'Contact and tips',
      html: `<p><strong>This page does not provide anonymity or encryption.</strong> Email and this website are ordinary internet channels. Do not send passwords, identity documents, or material that would put you at risk if intercepted.</p>
<p>If you need a safer path, use a method you already trust and understand. We will not pretend this form is SecureDrop, Signal, or a confidential legal privilege.</p>
<p>Editorial contact for this local build: the site owner. There is no automated tip inbox on this static site. Nothing you type here is transmitted to a server.</p>
<p>For DEMO purposes only, you may copy a note to your own records:</p>`,
    },
  },
  'pt-br': {
    about: {
      title: 'Sobre o ToTo Global Desk',
      html: `<p>O ToTo Global Desk é uma redação independente de notícias internacionais, inteligência e investigações. Foi feito para mostrar evidência, não para reciclar rumor.</p>
<p>Este site local é um modelo de redação. Todas as histórias atuais são <strong>DEMO</strong> até serem substituídas por apuração com fontes.</p>
<p>A bancada não é canal de governo, partido ou empresa. O mesmo padrão de evidência vale para qualquer alvo.</p>`,
    },
    methodology: {
      title: 'Metodologia',
      html: `<p>Toda afirmação importante recebe um rótulo: Verificado, Fortemente sustentado, Relatado/Não confirmado, Disputado, Falso/Enganoso ou Desconhecido.</p>
<p>Fontes são marcadas como primária, secundária ou apenas pista. Post em rede social é pista, não prova.</p>
<p>Investigações abrem com uma pergunta, não com um veredito. Registramos evidência que enfraquece a tese e evidência que a sustenta.</p>
<p>Não chamamos algo de corrupção, fraude ou crime sem base adequada: registro oficial, decisão judicial ou documentos verificados de forma independente.</p>
<p>Direito de resposta: antes de crítica grave a um alvo nomeado, a bancada prepara perguntas numeradas e registra a resposta ou a ausência de resposta no prazo. “Recusou comentar” só vale se houver recusa explícita.</p>`,
    },
    corrections: {
      title: 'Correções',
      html: `<p>Ainda não há correções ao vivo porque todo artigo desta build é conteúdo DEMO.</p>
<p>Quando houver reportagem real, erros factuais serão corrigidos no texto, datados e listados nesta página. Não reescrevemos o histórico em silêncio.</p>
<p>Para pedir correção, use a página de contato. Inclua o URL, o trecho e a evidência que acredita ter faltado.</p>`,
    },
    contact: {
      title: 'Contato e denúncias',
      html: `<p><strong>Esta página não oferece anonimato nem criptografia.</strong> E-mail e este site são canais comuns da internet. Não envie senhas, documentos de identidade ou material que o coloque em risco se for interceptado.</p>
<p>Se precisar de um caminho mais seguro, use um método que você já compreende. Não vamos fingir que este formulário é SecureDrop, Signal ou sigilo legal.</p>
<p>Contato editorial desta build local: o dono do site. Não há caixa de denúncias automática neste site estático. Nada do que você digitar aqui é enviado a um servidor.</p>
<p>Só para DEMO, você pode copiar uma nota para o seu próprio arquivo:</p>`,
    },
  },
};
