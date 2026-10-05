export type CourseKey = 'luz' | 'click' | 'adf';

export interface BFProduct {
  id: string;
  name: string;
  de: number;
  por: number;
  x12: number;
  courses: CourseKey[];
  tag?: string;
  benefits: string[];
}

export const products: BFProduct[] = [
  { id: 'ebook', name: 'e-book antes da foto', de: 197, por: 97, x12: 10.03, courses: [], benefits: ['E-book em PDF', 'Acesso imediato', 'Atualizações incluídas'] },
  { id: 'adf', name: 'antes da foto', de: 297, por: 147, x12: 15.2, courses: ['adf'], tag: 'Lançamento', benefits: ['E-book + masterclass', 'Fichas de briefing editáveis', 'Acesso imediato'] },
  { id: 'luz', name: 'luz na prática', de: 450, por: 217, x12: 22.44, courses: ['luz'], benefits: ['6 módulos em vídeo', 'Encontro mensal ao vivo', 'Certificado'] },
  { id: 'luz+adf', name: 'luz na prática + antes da foto', de: 747, por: 347, x12: 35.89, courses: ['luz', 'adf'], tag: 'Combo', benefits: ['Curso completo de luz', 'E-book + masterclass', 'Certificado'] },
  { id: 'click', name: 'mais que um click', de: 997, por: 497, x12: 51.4, courses: ['click'], benefits: ['5 módulos em vídeo', 'Comunidade fechada', 'Certificado'] },
  { id: 'click+luz', name: 'mais que um click + luz na prática', de: 1297, por: 647, x12: 66.91, courses: ['click', 'luz'], tag: 'Mais escolhido', benefits: ['Os dois cursos online', 'Comunidade fechada', 'Certificado duplo'] },
  { id: 'all', name: 'completo', de: 1594, por: 697, x12: 72.09, courses: ['click', 'luz', 'adf'], tag: 'Completo', benefits: ['Os três produtos', 'Todos os encontros ao vivo', 'Certificados'] },
];

export const courseNames: Record<CourseKey, string> = {
  luz: 'luz na prática',
  click: 'mais que um click',
  adf: 'antes da foto',
};

const comboMap: Record<string, string> = {
  luz: 'luz',
  click: 'click',
  adf: 'adf',
  'click+luz': 'click+luz',
  'luz+adf': 'luz+adf',
  'click+adf': 'all',
  'click+luz+adf': 'all',
};

export function resolvePackage(selected: CourseKey[]) {
  const key = (['click', 'luz', 'adf'] as CourseKey[]).filter((k) => selected.includes(k)).join('+');
  if (!key) return null;
  const product = products.find((p) => p.id === comboMap[key])!;
  const completed = product.courses.length > selected.length;
  return { product, completed };
}

export type PhaseId = 'espera' | 'aberto' | 'semana' | 'h24' | 'encerrado';

export interface Phase {
  id: PhaseId;
  label: string;
  tag: string;
  dates: string;
  base: 'preto' | 'papel';
  counter: Array<'dias' | 'horas' | 'min' | 'seg'> | null;
  counterText?: string;
  target?: string;
  cta: string;
  line: string;
}

export const phases: Phase[] = [
  { id: 'espera', label: 'lista de espera', tag: 'Lista de espera · abre em', dates: '17.10 – 31.10', base: 'preto', counter: ['dias', 'horas', 'min'], counterText: 'a black friday começa em', target: '2026-11-01T00:00:00', cta: 'entrar na lista', line: '50% na black friday' },
  { id: 'aberto', label: 'aberto', tag: 'Aberto', dates: '01.11 – 20.11', base: 'preto', counter: null, cta: 'garantir com 50%', line: '50% em todos os cursos, até 27.11' },
  { id: 'semana', label: 'última semana', tag: 'Última semana · termina em', dates: '21.11 – 26.11', base: 'papel', counter: ['dias', 'horas', 'min', 'seg'], counterText: 'o desconto de black friday acaba em', target: '2026-11-27T23:59:59', cta: 'garantir com 50%', line: 'São os últimos dias pra garantir a sua vaga com 50% de desconto.' },
  { id: 'h24', label: 'últimas 24h', tag: 'Últimas 24h', dates: '27.11 até 23h59', base: 'preto', counter: ['horas', 'min', 'seg'], counterText: 'o desconto de black friday acaba em', target: '2026-11-27T23:59:59', cta: 'garantir com 50%', line: 'Hoje é o último dia pra garantir a sua vaga com 50% de desconto.' },
  { id: 'encerrado', label: 'encerrado', tag: 'Encerrado', dates: 'a partir de 28.11', base: 'papel', counter: null, cta: 'entrar na lista', line: 'A black friday terminou. Entre na lista para o próximo lançamento.' },
];
