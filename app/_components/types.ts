export interface Sala {
  id: number;
  created_at: string;
  nome: string;
  descrição: string;
  imagem: string;
}

export interface Usuario {
  id: number;
  created_at: string;
  nome: string;
  email: string;
  admin: boolean;
}
