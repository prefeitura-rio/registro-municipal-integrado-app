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
  exhibition_type: 'clinical_exam' | 'default'
  clinical_exams: {
    type: 'Laboratório' | 'Imagem'
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
