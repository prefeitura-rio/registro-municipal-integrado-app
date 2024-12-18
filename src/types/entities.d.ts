export type Person = {
  cadastros_conflitantes_indicador: boolean | null
  cns: string[]
  dados: {
    nome: string | null
    nome_social: string | null
    data_nascimento: string | null
    genero: string | null
    raca: string | null
    obito_indicador: boolean | null
    obito_data: string | null
    mae_nome: string | null
    pai_nome: string | null
    identidade_validada_indicador: boolean | null
    cpf_valido_indicador: boolean | null
  } | null
  equipe_saude_familia: [
    {
      id_ine: string | null
      nome: string | null
      telefone: string | null
      medicos: [
        {
          id_profissional_sus: string | null
          nome: string | null
        },
      ]
      enfermeiros: [
        {
          id_profissional_sus: string | null
          nome: string | null
        },
      ]
      clinica_familia: {
        id_cnes: string | null
        nome: string | null
        telefone: string | null
      }
      datahora_ultima_atualizacao: string | null
      rank: number | null
    },
  ]
  contato: {
    telefone: [
      {
        ddd: string | null
        valor: string | null
        sistema: string | null
        rank: number | null
      },
    ]
    email: [
      {
        valor: string | null
        sistema: string | null
        rank: number | null
      },
    ]
  }
  endereco: [
    {
      cep: string | null
      tipo_logradouro: string | null
      logradouro: string | null
      numero: string | null
      complemento: string | null
      bairro: string | null
      cidade: string | null
      estado: string | null
      datahora_ultima_atualizacao: string | null
      sistema: string | null
      rank: number | null
    },
  ]
  prontuario: [
    {
      sistema: string | null
      id_cnes: string | null
      id_paciente: string | null
      rank: number | null
    },
  ]
  metadados: {
    processed_at: string | null
  }
}

export type Profile = {
  id: string
  username: string
  full_name: string
  cpf: string
  registration: string
  agency: string
  sector: string
  email: string
  is_admin: boolean
}

export type ClinicalEpisode = {
  cpf: string
  id_episodio: string
  entry_datetime: string
  exit_datetime: string | null
  location: string
  deceased: boolean
  type: string
  subtype: string | null
  cids: {
    description: string
    status: string | null
  }[]
  cids_summarized: string[]
  procedures: string | null
  responsible: {
    name: string
    role: string
  } | null
  clinical_motivation: string | null
  clinical_outcome: string | null
  filter_tags: string[]
  exhibition_type: string
  clinical_exams: {
    type: string
    description: string
  }[]
  exibicao: {
    indicador: boolean
    episodio_sem_informacao: boolean
    paciente_restrito: boolean
    paciente_sem_cpf: boolean
    subtipo_proibido_vitacare: boolean
    episodio_vacinacao: boolean
    exame_sem_subtipo: boolean
  }
  medicines_administered: string | null
  provider: string
  prescription: string | null
}

export type Metadata = {
  filter_tags: {
    tag: string
    description: string
  }[]
}

export type Interaction1746 = {
  id_chamado: string
  id_origem_ocorrencia: string
  data_inicio: string
  data_fim: string
  id_bairro: string
  id_territorialidade: string
  id_logradouro: string
  numero_logradouro: string
  id_unidade_organizacional: string
  nome_unidade_organizacional: string
  id_unidade_organizacional_mae: string
  unidade_organizacional_ouvidoria: string
  categoria: string
  id_tipo: string
  tipo: string
  id_subtipo: string
  subtipo: string
  status: string
  longitude: number
  latitude: number
  data_alvo_finalizacao: string
  data_alvo_diagnostico: string
  data_real_diagnostico: string
  tempo_prazo: number
  prazo_unidade: string
  prazo_tipo: string
  dentro_prazo: string
  situacao: string
  tipo_situacao: string
  justificativa_status: string
  reclamacoes: number
  descricao: string
  data_particao: string
}

export type CadUnicoInfo = {
  id_membro_familia: string | null
  id_familia: string | null
  dados: {
    cpf_valido_indicador: boolean
    nome: string | null
    raca_cor: string | null
    sexo: string | null
    municipio_nascimento: string | null
    sigla_uf_municipio_nascimento: string | null
    estado_cadastral: string | null
    parentesco_responsavel_familia: string | null
    data_nascimento: string | null
    data_ultima_atualizacao: string | null
    data_cadastro: string | null
    nome_mae: string | null
    nome_pai: string | null
    condicao_rua: boolean | null
    trabalho_infantil: string | null
    numeros_membros_familia: number | null
  } | null
  deficiencia: {
    tem_deficiencia: boolean | null
    tipo_deficiencia: boolean | null
  } | null
  domicilio: {
    especie_domicilio: string | null
    iluminacao: string | null
    comodos: number | null
    forma_abastecimento_agua: string | null
    possui_agua_encanada: string | null
    escoamento_sanitario: string | null
    local: string | null
    despesa_agua_esgoto: number | null
    despesa_alimentacao: number | null
    despesa_aluguel: number | null
    despesa_energia: number | null
    despesa_gas: number | null
    despesa_transporte: number | null
  } | null
  escolaridade: {
    sabe_ler_escrever: string | null
    curso_mais_elevado_frequentou: string | null
  } | null
  membros:
    | {
        cpf: string
        id_membro_familia: string
        nome: string
        parentesco_responsavel_familia: string
      }[]
    | null
  renda: {
    renda_media_familia: number | null
    renda_outras_rendas: number | null
    renda_emprego_ultimo_mes: number | null
    renda_aposentadoria: number | null
    renda_bruta_12_meses: number | null
    renda_doacao: number | null
    renda_pensao_alimenticia: number | null
    renda_seguro_desemprego: number | null
    nao_recebe_remuneracao: number | null
    funcao_principal_trabalho: number | null
  } | null
}

export type PublicTransportEvent = {
  data: string
  hora: number
  datetime_transacao: string
  datetime_processamento: string
  datetime_captura: string
  modo: string
  id_consorcio: string
  consorcio: string
  id_operadora: string
  operadora: string
  id_servico_jae: string
  servico_jae: string
  descricao_servico_jae: string
  sentido: string
  id_veiculo: string
  id_validador: string
  id_transacao: string
  tipo_pagamento: string
  tipo_transacao: string
  tipo_transacao_smtr: string
  tipo_gratuidade: string
  latitude: number
  longitude: number
  valor_transacao: number
  versao: string
  datetime_ultima_atualizacao: string
}

export type PublicTransportFrequentRoute = [
  {
    hora: number
    bairro: string
    sentido: 'ida'
    quantidade: number
  },
  {
    hora: number
    bairro: string
    sentido: 'volta'
    quantidade: number
  },
]

export type Company = {
  data: string | null
  cnpj: string | null
  cnpj_basico: string | null
  cnpj_ordem: string | null
  cnpj_dv: string | null
  identificador_matriz_filial: string | null
  nome_fantasia: string | null
  situacao_cadastral: string | null
  data_situacao_cadastral: string | null
  motivo_situacao_cadastral: string | null
  nome_cidade_exterior: string | null
  pais: string | null
  data_inicio_atividade: string | null
  tipo_logradouro: string | null
  logradouro: string | null
  numero: string | null
  complemento: string | null
  bairro: string | null
  cep: string | null
  ddd_1: string | null
  telefone_1: string | null
  ddd_2: string | null
  telefone_2: string | null
  ddd_fax: string | null
  fax: string | null
  email: string | null
  situacao_especial: string | null
  data_situacao_especial: string | null
  cnae:
    | [
        {
          cnae: string | null
          descricao_subclasse: string | null
          descricao_classe: string | null
          descricao_grupo: string | null
          descricao_divisao: string | null
          descricao_secao: string | null
        },
      ]
    | null
  socios:
    | [
        {
          tipo: string | null
          nome: string | null
          documento: string | null
          qualificacao: string | null
          data_entrada_sociedade: string | null
          pais: string | null
          cpf_representante_legal: string | null
          nome_representante_legal: string | null
          qualificacao_representante_legal: string | null
          faixa_etaria: string | null
        },
      ]
    | null
  cnpj_particao: number | null
}
