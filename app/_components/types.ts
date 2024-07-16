export interface Sala {
  id: number;
  created_at: string;
  nome: string;
  descrição: string;
  imagem: string;
  capacidade: number;
  televisão: boolean;
  internet: boolean;
}

export interface Usuario {
  id: number;
  created_at: string;
  nome: string;
  email: string;
  admin: boolean;
}

export interface Agendamento {
  id: number;
  created_at: string;
  dia: Date;
  horarioEntrada: Date;
  horarioSaida: Date;
  idSala: number;
  idUsuario: number;
}
