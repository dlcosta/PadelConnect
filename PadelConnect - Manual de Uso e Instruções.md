# PadelConnect - Manual de Uso e Instruções

## Sobre o Projeto

O **PadelConnect** é uma plataforma web completa para conectar jogadores de padel, permitindo busca e organização por localização e nível de jogo.

## URLs de Acesso

- **Frontend (Site)**: https://gbbhdkxw.manus.space
- **Backend (API)**: https://60h5imceejjj.manus.space

## Funcionalidades Principais

### 1. Sistema de Autenticação
- **Cadastro de usuários**: Criação de conta com nome, email e senha
- **Login seguro**: Autenticação com JWT tokens
- **Gerenciamento de sessão**: Logout automático e manual

### 2. Gerenciamento de Dados
- **Cidades**: Cadastro e listagem de cidades
- **Clubes**: Cadastro de clubes vinculados a cidades
- **Categorias**: Sistema pré-definido (Categoria 6, 5, 4, 3, 2 e Open)
- **Jogadores**: Perfis completos com múltiplas categorias

### 3. Sistema de Busca
- **Filtro por cidade**: Encontre jogadores em sua região
- **Filtro por clube**: Busque por clube específico
- **Filtro por categoria**: Encontre jogadores do seu nível
- **Busca combinada**: Use múltiplos filtros simultaneamente

## Como Usar

### Primeiro Acesso
1. Acesse https://gbbhdkxw.manus.space
2. Clique em "Não tem conta? Cadastre-se"
3. Preencha nome, email e senha
4. Clique em "Cadastrar"

### Fazendo Login
1. Na tela inicial, insira email e senha
2. Clique em "Entrar"
3. Você será direcionado ao dashboard principal

### Buscando Jogadores
1. No dashboard, use os filtros disponíveis:
   - **Cidade**: Selecione uma cidade específica
   - **Clube**: Escolha um clube (filtrado pela cidade selecionada)
   - **Categoria**: Selecione o nível de jogo desejado
2. Os resultados são atualizados automaticamente
3. Visualize informações dos jogadores encontrados

## Estrutura Técnica

### Backend (Flask)
- **Framework**: Flask com SQLAlchemy
- **Banco de dados**: SQLite (desenvolvimento) / PostgreSQL (produção)
- **Autenticação**: JWT tokens
- **API REST**: Endpoints para todas as operações CRUD

### Frontend (React)
- **Framework**: React com Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Ícones**: Lucide React
- **Roteamento**: React Router DOM

### Endpoints da API

#### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário

#### Cidades
- `GET /api/cidades` - Listar cidades
- `POST /api/cidades` - Criar cidade (requer autenticação)
- `PUT /api/cidades/{id}` - Atualizar cidade (requer autenticação)
- `DELETE /api/cidades/{id}` - Deletar cidade (requer autenticação)

#### Clubes
- `GET /api/clubes` - Listar clubes
- `GET /api/clubes?cidade_id={id}` - Listar clubes por cidade
- `POST /api/clubes` - Criar clube (requer autenticação)
- `PUT /api/clubes/{id}` - Atualizar clube (requer autenticação)
- `DELETE /api/clubes/{id}` - Deletar clube (requer autenticação)

#### Categorias
- `GET /api/categorias` - Listar categorias
- `POST /api/categorias` - Criar categoria (requer autenticação)
- `PUT /api/categorias/{id}` - Atualizar categoria (requer autenticação)
- `DELETE /api/categorias/{id}` - Deletar categoria (requer autenticação)

#### Jogadores
- `GET /api/jogadores` - Listar jogadores
- `GET /api/jogadores?cidade_id={id}` - Filtrar por cidade
- `GET /api/jogadores?clube_id={id}` - Filtrar por clube
- `GET /api/jogadores?categoria_id={id}` - Filtrar por categoria
- `POST /api/jogadores` - Criar perfil de jogador (requer autenticação)
- `PUT /api/jogadores/{id}` - Atualizar perfil (requer autenticação)
- `DELETE /api/jogadores/{id}` - Deletar perfil (requer autenticação)
- `GET /api/meu-perfil` - Obter perfil do usuário logado

## Manutenção e Desenvolvimento

### Estrutura de Arquivos

#### Backend (/padel-app)
```
src/
├── models/          # Modelos do banco de dados
│   ├── user.py      # Modelo de usuário
│   ├── cidade.py    # Modelo de cidade
│   ├── clube.py     # Modelo de clube
│   ├── categoria.py # Modelo de categoria
│   └── jogador.py   # Modelo de jogador
├── routes/          # Rotas da API
│   ├── auth.py      # Autenticação
│   ├── cidade.py    # CRUD de cidades
│   ├── clube.py     # CRUD de clubes
│   ├── categoria.py # CRUD de categorias
│   └── jogador.py   # CRUD de jogadores
├── database/        # Banco de dados
│   └── app.db       # Arquivo SQLite
├── main.py          # Arquivo principal
└── init_data.py     # Script de inicialização
```

#### Frontend (/padel-frontend)
```
src/
├── components/      # Componentes React
├── assets/          # Arquivos estáticos
├── App.jsx          # Componente principal
└── main.jsx         # Ponto de entrada
```

### Comandos Úteis

#### Backend
```bash
cd padel-app
source venv/bin/activate
python src/main.py                    # Executar servidor
python src/init_data.py              # Inicializar dados
pip freeze > requirements.txt        # Atualizar dependências
```

#### Frontend
```bash
cd padel-frontend
pnpm run dev                         # Servidor de desenvolvimento
pnpm run build                       # Build para produção
```

## Próximas Melhorias Sugeridas

1. **Perfil de Jogador Completo**
   - Foto de perfil
   - Histórico de jogos
   - Avaliações e comentários

2. **Sistema de Agendamento**
   - Criação de partidas
   - Convites para jogadores
   - Calendário de eventos

3. **Chat e Mensagens**
   - Comunicação entre jogadores
   - Grupos por clube/categoria

4. **Sistema de Rankings**
   - Pontuação por vitórias
   - Classificações por categoria

5. **Notificações**
   - Novos jogadores na região
   - Convites para partidas
   - Atualizações do sistema

## Suporte

Para dúvidas ou problemas técnicos, consulte:
- Documentação da API: https://60h5imceejjj.manus.space
- Código fonte: Disponível nos diretórios do projeto
- Logs do sistema: Verificar console do navegador e logs do servidor

