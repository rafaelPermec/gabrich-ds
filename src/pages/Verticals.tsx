'use client';
import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../design-system/atoms/Button';
import { Badge } from '../design-system/atoms/Badge';
import { ProgressBar } from '../design-system/atoms/ProgressBar';
import { Stat } from '../design-system/molecules/Stat';
import { Table } from '../design-system/molecules/Table';
import { Alert } from '../design-system/molecules/Alert';
import { Accordion } from '../design-system/molecules/Accordion';
import { HeroSection } from '../design-system/organisms/HeroSection';
import { PortfolioGrid } from '../design-system/organisms/PortfolioGrid';
import { StepIndicator } from '../design-system/organisms/StepIndicator';
import { VerticalProvider, useVertical } from '../design-system/context/VerticalContext';
import { submarcas, type DGVertical, type SubmarcaId } from '../design-system/tokens/index';
import { PHOTOS, img } from './verticals/shared';
import { submarcaCases, Wordmark } from './verticals/Submarcas';
import { SubScope } from './verticals/shared';
import { bfCases } from './verticals/BlackFriday';
import styles from './Verticals.module.css';

/* ───────────────────────── Casos: portfólio (base preta) ───────────────────────── */

function PortfolioSite() {
  return (
    <div className={styles.siteFrame}>
      <HeroSection
        dark
        eyebrow="Fotografia de produtos · São Paulo"
        title="luz que vende"
        titleAccent="o objeto."
        body="Direção criativa e fotografia para marcas de óculos, cosméticos e objetos. Briefing, set e entrega em 10 dias úteis."
        primaryAction={<Button size="lg">Pedir proposta</Button>}
        secondaryAction={<Button size="lg" variant="outline">Ver portfólio</Button>}
      />
      <PortfolioGrid
        dark
        columns={3}
        categories={['Óculos', 'Cosméticos', 'Objetos']}
        items={[
          { id: '1', title: 'Coleção Verão 26', category: 'Óculos', label: 'Ótica Lume', imageSrc: img(PHOTOS.sunglasses, 600, 750) },
          { id: '2', title: 'Acetato Tartaruga', category: 'Óculos', label: 'Ótica Lume', imageSrc: img(PHOTOS.glasses, 600, 750) },
          { id: '3', title: 'Linha Névoa', category: 'Cosméticos', label: 'Atelier Sol', imageSrc: img(PHOTOS.bottle, 600, 750) },
          { id: '4', title: 'Vaso Barro Cru', category: 'Objetos', label: 'Casa Terra', imageSrc: img(PHOTOS.vase, 600, 750) },
          { id: '5', title: 'Escultura Cogumelo', category: 'Objetos', label: 'Galeria Pó', imageSrc: img(PHOTOS.studio, 600, 750) },
          { id: '6', title: 'Praia Dourada', category: 'Óculos', label: 'Campanha', imageSrc: img(PHOTOS.beach, 600, 750) },
        ]}
      />
    </div>
  );
}

function PortfolioPost() {
  return (
    <div className={styles.postRow}>
      <figure className={styles.post}>
        <img src={img(PHOTOS.glasses, 720, 900)} alt="Óculos de acetato sobre fundo claro" />
        <div className={styles.postFade} />
        <figcaption>
          <span className={styles.mono}>carrossel · lâmina 1/5</span>
          <strong>a luz escolhe <em>o óculos</em></strong>
          <span className={styles.mono}>f/8 · 1/125 · ISO 100</span>
        </figcaption>
        <span className={styles.perf} aria-hidden="true" />
      </figure>
      <div className={styles.postNotes}>
        <Stat dark value="4:5" label="formato do post de feed" />
        <Stat dark value="62%" label="degradê do preto, de baixo para cima" />
        <Stat dark value="1" label="palavra em ocre por peça" />
        <p className={styles.note}>
          A linha de dados é sempre o metadado real do arquivo. Uma peça, uma configuração — nunca inventada.
        </p>
      </div>
    </div>
  );
}

function PortfolioMethod() {
  const [step, setStep] = useState(1);
  return (
    <div className={styles.methodWrap}>
      <StepIndicator
        dark
        currentStep={step}
        steps={[
          { label: 'Briefing', description: 'Produto, canal, referências e prazo em uma conversa de 30 minutos.' },
          { label: 'Set', description: 'Luz desenhada para o material: brilho, transparência ou textura.' },
          { label: 'Entrega', description: 'Seleção tratada, recortes por canal e esquema de luz documentado.' },
        ]}
      />
      <div className={styles.rowActions}>
        <Button variant="outline" size="sm" onClick={() => setStep((s) => Math.max(0, s - 1))}>Etapa anterior</Button>
        <Button size="sm" onClick={() => setStep((s) => Math.min(2, s + 1))}>Avançar etapa</Button>
      </div>
    </div>
  );
}

/* ───────────────────────── Casos: documento (base papel) ───────────────────────── */

type Row = Record<string, unknown>;

function DocProposal() {
  const [accepted, setAccepted] = useState(false);
  const rows: Row[] = [
    { item: 'Fotografia de produto — fundo infinito', qty: '24 fotos', price: 'R$ 4.800' },
    { item: 'Fotografia lifestyle — set montado', qty: '8 fotos', price: 'R$ 3.200' },
    { item: 'Tratamento e recortes por canal', qty: '32 arquivos', price: 'R$ 1.600' },
    { item: 'Direção criativa e moodboard', qty: '1 projeto', price: 'R$ 1.400' },
  ];
  return (
    <div className={styles.paperSheet}>
      <header className={styles.sheetHead}>
        <span className={styles.mono}>proposta nº 0142 · lâmina 3/9</span>
        <span className={styles.mono}>Ótica Lume</span>
      </header>
      <h3 className={styles.sheetTitle}>Escopo e investimento</h3>
      <Table
        striped
        columns={[
          { key: 'item', label: 'Entrega' },
          { key: 'qty', label: 'Volume' },
          { key: 'price', label: 'Valor' },
        ]}
        data={rows}
      />
      <div className={styles.sheetFoot}>
        <Stat value="R$ 11.000" label="investimento total · 50% na aprovação" />
        {accepted ? (
          <Alert variant="success" title="Proposta aprovada" description="Enviamos o contrato e a data do set para o seu e-mail." />
        ) : (
          <Button size="lg" onClick={() => setAccepted(true)}>Aprovar proposta</Button>
        )}
      </div>
    </div>
  );
}

function DocTerms() {
  return (
    <div className={styles.paperSheet}>
      <header className={styles.sheetHead}>
        <span className={styles.mono}>termos de uso de imagem</span>
        <Badge color="caramel">v2026.1</Badge>
      </header>
      <Alert variant="info" title="Licença vigente" description="Uso em e-commerce, redes sociais e site por 24 meses." />
      <Accordion
        defaultOpen={['uso']}
        items={[
          { id: 'uso', title: 'Onde as imagens podem ser usadas', content: 'Site, marketplaces, redes sociais e mídia paga digital. Impresso em grande formato exige adendo.' },
          { id: 'prazo', title: 'Prazo e renovação', content: 'A licença vale por 24 meses a partir da entrega. Renovação com 30 dias de antecedência.' },
          { id: 'rev', title: 'Revisões incluídas', content: 'Uma rodada de ajustes de tratamento em até 5 dias úteis após a entrega.' },
        ]}
      />
    </div>
  );
}

function DocDelivery() {
  return (
    <div className={styles.paperSheet}>
      <header className={styles.sheetHead}>
        <span className={styles.mono}>acompanhamento · projeto Lume SS26</span>
        <Badge color="ink">em tratamento</Badge>
      </header>
      <StepIndicator
        currentStep={2}
        steps={[
          { label: 'Aprovação' },
          { label: 'Set' },
          { label: 'Tratamento' },
          { label: 'Entrega' },
        ]}
      />
      <div className={styles.progressStack}>
        <ProgressBar label="Seleção de 32 fotos" value={100} color="ink" showLabel />
        <ProgressBar label="Tratamento" value={62} color="caramel" showLabel />
        <ProgressBar label="Recortes por canal" value={18} color="caramel" showLabel />
      </div>
    </div>
  );
}

/* ───────────────────────── Estrutura ───────────────────────── */

interface UseCase {
  id: string;
  title: string;
  scenario: string;
  uses: string[];
  rule: string;
  render: (sub: SubmarcaId) => ReactNode;
}

interface VerticalDef {
  id: DGVertical;
  name: string;
  base: string;
  medium: string;
  lede: string;
  rules: string[];
  cases: UseCase[];
}

const verticals: VerticalDef[] = [
  {
    id: 'portfolio',
    name: 'portfólio',
    base: 'preto tinta',
    medium: 'capa · post · story · site de campanha',
    lede: 'Onde a imagem fala primeiro. Base preta, ocre como único destaque e a foto sempre no centro.',
    rules: ['Preto = prioridade de base', 'Ocre: no máx. 1 palavra por peça', 'Texto sempre sobre bloco de cor, nunca solto na foto'],
    cases: [
      {
        id: 'site',
        title: 'Site de portfólio filtrável',
        scenario: 'Primeira dobra de um estúdio que precisa converter visitante em pedido de proposta, com galeria filtrável por categoria de produto.',
        uses: ['HeroSection', 'PortfolioGrid', 'FilterBar', 'Button'],
        rule: 'Dobra 1: chamada com prova visual. Dobra 2: portfólio filtrável. Versão preta para temporada e campanha.',
        render: () => <PortfolioSite />,
      },
      {
        id: 'post',
        title: 'Capa de carrossel com ficha técnica',
        scenario: 'Peça de rede social que mostra o resultado e ensina: título curto, foto limpa e os dados reais do disparo.',
        uses: ['Stat', 'Faixa de perfuração', 'Typography'],
        rule: 'Foto escura → degradê preto até 62% da altura. Título em papel; ocre destaca uma palavra.',
        render: () => <PortfolioPost />,
      },
      {
        id: 'method',
        title: 'Método em três etapas',
        scenario: 'Seção que explica o processo de trabalho e reduz a incerteza de quem está pedindo o primeiro orçamento.',
        uses: ['StepIndicator', 'Button'],
        rule: 'Briefing, set, entrega — sempre três. O estado atual usa ocre; as concluídas viram preenchidas.',
        render: () => <PortfolioMethod />,
      },
    ],
  },
  {
    id: 'document',
    name: 'documento',
    base: 'papel',
    medium: 'proposta · orçamento · contrato · acompanhamento',
    lede: 'Onde a decisão é tomada. Papel, caramelo como acento e tabelas que carregam o peso do argumento.',
    rules: ['Papel = base clara para documento e proposta', 'Ocre/caramelo: 1 dado por lâmina', 'Nada de manuscrita em peça de venda'],
    cases: [
      {
        id: 'proposal',
        title: 'Lâmina de escopo e investimento',
        scenario: 'Cliente recebe a proposta em 16:9 e aprova no próprio documento, sem trocar três e-mails.',
        uses: ['Table', 'Stat', 'Alert', 'Button'],
        rule: 'Nome do cliente e nº da lâmina sempre no canto superior. Um único valor em destaque.',
        render: () => <DocProposal />,
      },
      {
        id: 'terms',
        title: 'Termos de uso de imagem',
        scenario: 'Cláusulas longas que o cliente precisa consultar em poucos segundos, sem abrir um PDF de 12 páginas.',
        uses: ['Accordion', 'Alert', 'Badge'],
        rule: 'Parágrafo sempre sobre bloco de cor plana; Manrope 15–17px, máx. 68 caracteres por linha.',
        render: () => <DocTerms />,
      },
      {
        id: 'delivery',
        title: 'Acompanhamento de entrega',
        scenario: 'Painel enviado ao cliente durante o projeto para mostrar em que etapa cada arquivo está.',
        uses: ['StepIndicator', 'ProgressBar', 'Badge'],
        rule: 'Linha simples sempre 1px. Peso vira barra sólida de 4px, nunca linha grossa.',
        render: () => <DocDelivery />,
      },
    ],
  },
  {
    id: 'course',
    name: 'cursos',
    base: 'submarcas',
    medium: 'no estúdio · luz na prática · mais que um click · antesdafoto.',
    lede: 'Quatro cursos, quatro identidades. Cada submarca tem campo, fonte e acento próprios; o que os une é Space Mono, os 70 ícones e a assinatura “um curso Débora Gabrich”.',
    rules: ['Um grafismo e um círculo de seleção por peça', 'Um botão de acento por dobra', 'A logo da marca mãe só aparece na seção “sobre”'],
    cases: [
      {
        id: 'identity',
        title: 'Ficha da submarca',
        scenario: 'Referência rápida para quem produz peças do curso: logo, paleta com função de cada cor, tipografia e o que nunca fazer.',
        uses: ['Typography', 'Tokens de cor', 'Space Mono'],
        rule: 'Cada submarca troca cor de campo, fonte de display e ícone. A paleta tem uma única cor de ação.',
        render: submarcaCases.identity,
      },
      {
        id: 'cover',
        title: 'Página de apresentação do curso',
        scenario: 'O aluno chega de um post, entende o que vai aprender em 10 segundos e decide se começa. O grafismo do fundo é o da submarca.',
        uses: ['Stat', 'Button', 'Wordmark'],
        rule: 'Texto de apoio sobre bloco de cor, em primeira pessoa no botão. Um botão de acento por dobra.',
        render: submarcaCases.cover,
      },
      {
        id: 'modules',
        title: 'Módulos com progresso',
        scenario: 'Dentro do curso, o aluno vê o que concluiu, o que falta e retoma de onde parou.',
        uses: ['ProgressBar', 'ListItem', 'Button'],
        rule: 'Numeração em Space Mono com duas casas. A etapa concluída vira ação ghost, não some.',
        render: submarcaCases.modules,
      },
      {
        id: 'enroll',
        title: 'Inscrição e lista de espera',
        scenario: 'Formulário curto com o essencial abaixo da dobra. Rótulo sempre visível, consentimento sem caixa pré-marcada.',
        uses: ['Tabs', 'FormField', 'Input', 'Alert'],
        rule: 'Só o que é necessário para enviar o acesso. Nome do curso sempre em minúscula.',
        render: submarcaCases.enroll,
      },
    ],
  },
  {
    id: 'blackfriday',
    name: 'black friday',
    base: 'preto + papel',
    medium: 'campanha 2026 · 17.10 → 27.11 · feed, site, e-mail, páginas',
    lede: '50% em todos os produtos, à vista ou em até 12x. Zero canto arredondado, um único acento (ocre) e cinco fases que mudam o que a peça pode mostrar.',
    rules: ['Raio 0 em tudo, exceto o quiz', 'Ocre no papel só como área, nunca como texto', 'Contador só em 17.10–31.10 e 21.11–27.11'],
    cases: [
      {
        id: 'phases',
        title: 'Fases da campanha e contador',
        scenario: 'A mesma peça muda de base, etiqueta, contador e botão conforme a fase. Troque a fase para ver o que a regra permite.',
        uses: ['Badge', 'Button', 'Faixa rolante', 'Contador'],
        rule: 'Uma fase por peça. Preto marca os picos (abertura e últimas 24h); papel as fases intermediárias.',
        render: bfCases.phases,
      },
      {
        id: 'price',
        title: 'Box de preço',
        scenario: 'Sete boxes, um por produto e combo. Ordem fixa: “de R$ X por”, 12x, à vista. O combo mais escolhido ganha fio ocre.',
        uses: ['Badge', 'Wordmark', 'Button', 'Trama'],
        rule: 'Combo sempre com logos, nunca nome escrito. Valor nunca em peso light ou regular. Trama só na faixa do preço.',
        render: bfCases.price,
      },
      {
        id: 'simulator',
        title: 'Monte a sua Black Friday',
        scenario: 'A pessoa marca o que quer levar. O preço só aparece no resumo, somado, com a economia e o próximo item que mais compensa.',
        uses: ['Checkbox redondo', 'Wordmark', 'Button'],
        rule: 'O curso da página atual vem primeiro. Se a combinação não existe, completa com o pacote mais barato que contém tudo.',
        render: bfCases.simulator,
      },
      {
        id: 'course-bf',
        title: 'Black Friday dentro de um curso',
        scenario: 'Na peça de um curso, o curso manda. A Black Friday entra só pela etiqueta traçada ocre, acima do preço.',
        uses: ['Tabs', 'Wordmark', 'Button'],
        rule: 'Preço na voz de número do curso. Nunca selo da BF sobre logo ou título; nunca trocar fundo, fonte ou botão.',
        render: bfCases.course,
      },
    ],
  },
];

function Switcher() {
  const { vertical, setVertical } = useVertical();
  return (
    <div className={styles.switcher} role="tablist" aria-label="Vertical da marca">
      {verticals.map((v, i) => {
        const active = v.id === vertical;
        return (
          <button
            key={v.id}
            role="tab"
            id={`vtab-${v.id}`}
            aria-selected={active}
            aria-controls="vertical-stage"
            tabIndex={active ? 0 : -1}
            className={[styles.tab, active ? styles.tabActive : ''].join(' ')}
            onClick={() => setVertical(v.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const next = verticals[(i + (e.key === 'ArrowRight' ? 1 : verticals.length - 1)) % verticals.length];
                setVertical(next.id);
                document.getElementById(`vtab-${next.id}`)?.focus();
              }
            }}
          >
            <span className={styles.tabNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.tabName}>{v.name}</span>
            <span className={styles.tabBase}>{v.base}</span>
          </button>
        );
      })}
    </div>
  );
}

function Stage() {
  const { vertical } = useVertical();
  const def = verticals.find((v) => v.id === vertical)!;
  const [caseId, setCaseId] = useState<Record<DGVertical, string>>({
    portfolio: 'site',
    document: 'proposal',
    course: 'identity',
    blackfriday: 'phases',
  });
  const [sub, setSub] = useState<SubmarcaId>('luz');
  const active = def.cases.find((c) => c.id === caseId[vertical]) ?? def.cases[0];

  return (
    <section
      id="vertical-stage"
      role="tabpanel"
      aria-labelledby={`vtab-${vertical}`}
      className={['vertical-' + vertical, styles.stage].join(' ')}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={vertical}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.32, 0, 0.15, 1] }}
          className={styles.stageInner}
        >
          <div className={styles.stageHead}>
            <div>
              <p className={styles.mono}>{def.medium}</p>
              <h2 className={styles.stageTitle}>{def.name}</h2>
              <p className={styles.stageLede}>{def.lede}</p>
            </div>
            <ul className={styles.rules} aria-label="Regras da vertical">
              {def.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          {vertical === 'course' && (
            <div className={styles.subPicker} role="radiogroup" aria-label="Submarca">
              {(Object.keys(submarcas) as SubmarcaId[]).map((id) => (
                <button
                  key={id}
                  role="radio"
                  aria-checked={sub === id}
                  className={[styles.subBtn, sub === id ? styles.subOn : ''].join(' ')}
                  onClick={() => setSub(id)}
                >
                  <SubScope theme={submarcas[id].theme} className={styles.subLogo}>
                    <Wordmark id={id} size="sm" />
                  </SubScope>
                  <span className={styles.mono}>{submarcas[id].kind}</span>
                </button>
              ))}
            </div>
          )}

          <div className={styles.caseNav} role="group" aria-label="Casos de uso">
            {def.cases.map((c, i) => (
              <button
                key={c.id}
                aria-pressed={c.id === active.id}
                className={[styles.caseBtn, c.id === active.id ? styles.caseBtnActive : ''].join(' ')}
                onClick={() => setCaseId((s) => ({ ...s, [vertical]: c.id }))}
              >
                <span className={styles.mono}>caso {String(i + 1).padStart(2, '0')}</span>
                <span>{c.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.case}>
            <aside className={styles.caseMeta}>
              <h3>{active.title}</h3>
              <p>{active.scenario}</p>
              <p className={styles.mono}>componentes</p>
              <div className={styles.chips}>
                {active.uses.map((u) => (
                  <Badge key={u} variant="outline" color={vertical === 'document' ? 'caramel' : 'ochre'}>
                    {u}
                  </Badge>
                ))}
              </div>
              <p className={styles.mono}>regra da marca</p>
              <p className={styles.ruleText}>{active.rule}</p>
            </aside>
            <div className={styles.specimen} key={vertical + active.id}>
              {active.render(sub)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export function Verticals() {
  return (
    <VerticalProvider defaultVertical="portfolio">
      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.mono}>Verticais da marca</p>
          <h1 className={styles.title}>
            três jeitos de <span>usar</span> o mesmo sistema.
          </h1>
          <p className={styles.introLede}>
            Portfólio vende pela imagem, documento fecha pelo argumento, curso ensina pelo ritmo. Cada vertical troca a base
            e o acento via tokens; os componentes são os mesmos. Escolha uma e navegue pelos casos de uso.
          </p>
        </header>
        <Switcher />
        <Stage />
      </main>
    </VerticalProvider>
  );
}
