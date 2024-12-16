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
    numeros_membros_familia: number
  }
  deficiencia: {
    tem_deficiencia: boolean
    tipo_deficiencia: boolean
  }
  domicilio: {
    especie_domicilio: string
    iluminacao: string
    comodos: number
    forma_abastecimento_agua: string
    possui_agua_encanada: string
    escoamento_sanitario: string
    local: string
    despesa_agua_esgoto: number
    despesa_alimentacao: number
    despesa_aluguel: number
    despesa_energia: number
    despesa_gas: number
    despesa_transporte: number
  }
  escolaridade: {
    sabe_ler_escrever: string
    curso_mais_elevado_frequentou: string
  }
  membros: {
    cpf: string
    id_membro_familia: string
    nome: string
    parentesco_responsavel_familia: string
  }[]
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
  }
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
