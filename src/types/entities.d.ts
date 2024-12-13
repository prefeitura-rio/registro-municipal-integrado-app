export type Person = {
  deceased: boolean
  registration_name: string
  social_name: string | null
  cpf: string
  cns: string | null
  birth_date: string | null
  gender: string | null
  race: string | null
  phone: string | null
  family_clinic: {
    cnes: string | null
    name: string | null
    phone: string | null
  }
  family_health_team: {
    ine_code: string | null
    name: string | null
    phone: string | null
  }
  medical_responsible: {
    name: string
    registry: string
  }[]
  nursing_responsible: {
    name: string
    registry: string
  }[]
  validated: boolean
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
  id_membro_familia: string
  id_familia: string
  dados: {
    cpf_valido_indicador: boolean
    nome: string
    raca_cor: string
    sexo: string
    municipio_nascimento: string
    sigla_uf_municipio_nascimento: string
    estado_cadastral: string
    parentesco_responsavel_familia: string
    data_nascimento: string
    data_ultima_atualizacao: string
    data_cadastro: string
    nome_mae: string
    nome_pai: string
    condicao_rua: boolean
    trabalho_infantil: string
    numeros_membros_familia: number
  }
  deficiencia: {
    tem_deficiencia: boolean
    tipo_deficiencia: boolean
  }
  domicilio: {
    especie_domicilio: string
    iluminacao: string
    comodosinteger
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
    renda_media_familia: number
    renda_outras_rendas: number
    renda_emprego_ultimo_mes: number
    renda_aposentadoria: number
    renda_bruta_12_meses: number
    renda_doacao: number
    renda_pensao_alimenticia: number
    renda_seguro_desemprego: number
    nao_recebe_remuneracao: number
    funcao_principal_trabalho: number
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
