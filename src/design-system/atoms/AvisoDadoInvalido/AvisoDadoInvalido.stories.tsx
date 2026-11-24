import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { useValidacao } from "../../context/ValidacaoDeDados"
import {
  faseDaCampanha,
  formatarMoeda,
  formatarParcela,
  resumoDePreco,
  validarCampanha,
  validarOferta,
  type DatasDaCampanha,
  type Oferta,
} from "../../dados/index"
import { CAMPANHA_INVALIDA_MOCK, OFERTA_INVALIDA_MOCK } from "../../mocks/invalidos"
import { PRECOS_NORMAIS_MOCK } from "../../mocks/ofertas"
import { AvisoDadoInvalido } from "./AvisoDadoInvalido"

const meta = {
  title: "Atoms/AvisoDadoInvalido",
  component: AvisoDadoInvalido,
  parameters: {
    docs: {
      description: {
        component:
          "RF5: aviso de dado inválido. Um componente chama `useValidacao(validarOferta(oferta))` e renderiza o que o hook devolve ao lado do conteúdo, que continua visível. O Storybook liga o modo `aviso` (decorator global); fora dele, o padrão é `console`: sem aviso, com `console.error`. Uma story troca o modo por `parameters.validacao.modo`.",
      },
    },
  },
  args: {
    origem: "oferta",
    problemas: ["precoBlack menor que precoNormal", "descontoBlack: inteiro entre 0 e 100"],
  },
} satisfies Meta<typeof AvisoDadoInvalido>

export default meta
type Story = StoryObj<typeof meta>

/** Fundo do tema do manual, para ver o fio de aviso no escuro e no claro. */
function NoTema({ tema, children }: { tema: "dg" | "dg-claro"; children: ReactNode }) {
  return (
    <div data-tema={tema} style={{ background: "var(--fundo)", color: "var(--texto)", padding: "var(--esp-6)" }}>
      {children}
    </div>
  )
}

export const Escuro: Story = {
  render: (args) => (
    <NoTema tema="dg">
      <AvisoDadoInvalido {...args} />
    </NoTema>
  ),
}

export const Claro: Story = {
  render: (args) => (
    <NoTema tema="dg-claro">
      <AvisoDadoInvalido {...args} />
    </NoTema>
  ),
}

export const UmProblema: Story = {
  args: { origem: "campanha", problemas: ["inicioUltimaSemana antes de abertura"] },
  render: (args) => (
    <NoTema tema="dg">
      <AvisoDadoInvalido {...args} />
    </NoTema>
  ),
}

/** Demonstração: o "conteúdo" de uma oferta, validado pelo hook. */
function PrecoDaOferta({ oferta }: { oferta: Oferta }) {
  const aviso = useValidacao(validarOferta(oferta), "oferta")
  const resumo = resumoDePreco(oferta, PRECOS_NORMAIS_MOCK, true)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--esp-4)" }}>
      {aviso}
      <div data-testid="conteudo-validado">
        <p>{oferta.nome} · Black</p>
        <p>{formatarMoeda(resumo.preco)}</p>
        <p>{formatarParcela(resumo.parcela)}</p>
      </div>
    </div>
  )
}

/** Demonstração: a fase de uma campanha, validada pelo hook. */
function FaseDaCampanha({ datas }: { datas: DatasDaCampanha }) {
  const aviso = useValidacao(validarCampanha(datas), "campanha")
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--esp-4)" }}>
      {aviso}
      <p data-testid="conteudo-validado">
        Fase em 25/11/2026: {faseDaCampanha(datas, new Date("2026-11-25T12:00:00-03:00"))}
      </p>
    </div>
  )
}

/** CA3: preço da Black acima do normal e porcentagem com fração. */
export const OfertaInvalida: Story = {
  render: () => (
    <NoTema tema="dg">
      <PrecoDaOferta oferta={OFERTA_INVALIDA_MOCK} />
    </NoTema>
  ),
}

/** CA4: abertura depois do fim da Black. */
export const CampanhaInvalida: Story = {
  render: () => (
    <NoTema tema="dg-claro">
      <FaseDaCampanha datas={CAMPANHA_INVALIDA_MOCK} />
    </NoTema>
  ),
}

/** CA4: fora do Storybook (modo console), o mesmo dado não mostra aviso; o erro vai para o console. */
export const ModoConsole: Story = {
  parameters: { validacao: { modo: "console" } },
  render: () => (
    <NoTema tema="dg-claro">
      <FaseDaCampanha datas={CAMPANHA_INVALIDA_MOCK} />
    </NoTema>
  ),
}
