import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { MapPin, Users, Trophy, Search, Plus, LogOut, User } from 'lucide-react'
import './App.css'

// Componente de Login
function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login'
      const body = isRegister ? { nome, email, senha } : { email, senha }

      const response = await fetch(`https://60h5imceejjj.manus.space${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.usuario))
          onLogin(data.usuario)
        }
      } else {
        alert(data.error || 'Erro ao fazer login/cadastro')
      }
    } catch (error) {
      alert('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-700">PadelConnect</CardTitle>
          <CardDescription>
            {isRegister ? 'Crie sua conta' : 'Entre na sua conta'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Carregando...' : (isRegister ? 'Cadastrar' : 'Entrar')}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Já tem conta? Faça login' : 'Não tem conta? Cadastre-se'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente principal da aplicação
function Dashboard({ user, onLogout }) {
  const [cidades, setCidades] = useState([])
  const [clubes, setClubes] = useState([])
  const [categorias, setCategorias] = useState([])
  const [jogadores, setJogadores] = useState([])
  const [filtros, setFiltros] = useState({
    cidade_id: '',
    clube_id: '',
    categoria_id: ''
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    carregarDados()
  }, [])

  useEffect(() => {
    buscarJogadores()
  }, [filtros])

  const carregarDados = async () => {
    try {
      // Carregar cidades
      const cidadesRes = await fetch('https://60h5imceejjj.manus.space/api/cidades')
      const cidadesData = await cidadesRes.json()
      setCidades(cidadesData)

      // Carregar categorias
      const categoriasRes = await fetch('https://60h5imceejjj.manus.space/api/categorias')
      const categoriasData = await categoriasRes.json()
      setCategorias(categoriasData)

      // Carregar clubes
      const clubesRes = await fetch('https://60h5imceejjj.manus.space/api/clubes')
      const clubesData = await clubesRes.json()
      setClubes(clubesData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    }
  }

  const buscarJogadores = async () => {
    try {
      const params = new URLSearchParams()
      if (filtros.cidade_id) params.append('cidade_id', filtros.cidade_id)
      if (filtros.clube_id) params.append('clube_id', filtros.clube_id)
      if (filtros.categoria_id) params.append('categoria_id', filtros.categoria_id)

      const response = await fetch(`https://60h5imceejjj.manus.space/api/jogadores?${params}`)
      const data = await response.json()
      setJogadores(data)
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error)
    }
  }

  const clubesFiltrados = filtros.cidade_id 
    ? clubes.filter(clube => clube.cidade_id == filtros.cidade_id)
    : clubes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-green-600" />
              <h1 className="text-xl font-bold text-gray-900">PadelConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Olá, {user.nome}</span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Buscar Jogadores
            </CardTitle>
            <CardDescription>
              Encontre jogadores por localização e categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Select 
                  value={filtros.cidade_id} 
                  onValueChange={(value) => setFiltros({...filtros, cidade_id: value, clube_id: ''})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma cidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as cidades</SelectItem>
                    {cidades.map(cidade => (
                      <SelectItem key={cidade.id} value={cidade.id.toString()}>
                        {cidade.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="clube">Clube</Label>
                <Select 
                  value={filtros.clube_id} 
                  onValueChange={(value) => setFiltros({...filtros, clube_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um clube" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os clubes</SelectItem>
                    {clubesFiltrados.map(clube => (
                      <SelectItem key={clube.id} value={clube.id.toString()}>
                        {clube.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Select 
                  value={filtros.categoria_id} 
                  onValueChange={(value) => setFiltros({...filtros, categoria_id: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as categorias</SelectItem>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria.id} value={categoria.id.toString()}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Jogadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jogadores.map(jogador => (
            <Card key={jogador.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {jogador.nome_completo}
                </CardTitle>
                {jogador.telefone && (
                  <CardDescription>{jogador.telefone}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {jogador.cidade_nome && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {jogador.cidade_nome}
                    </div>
                  )}
                  {jogador.clube_nome && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      {jogador.clube_nome}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {jogador.categorias.map(categoria => (
                      <Badge key={categoria.id} variant="secondary">
                        {categoria.nome}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {jogadores.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">Nenhum jogador encontrado com os filtros selecionados.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um usuário logado
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-12 w-12 mx-auto text-green-600 mb-4" />
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        {user ? (
          <Dashboard user={user} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  )
}

export default App

