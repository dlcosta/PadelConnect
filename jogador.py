from src.models.user import db

# Tabela de associação para relacionamento many-to-many entre Jogador e Categoria
jogador_categoria = db.Table('jogador_categoria',
    db.Column('jogador_id', db.Integer, db.ForeignKey('jogadores.id'), primary_key=True),
    db.Column('categoria_id', db.Integer, db.ForeignKey('categorias.id'), primary_key=True)
)

class Jogador(db.Model):
    __tablename__ = 'jogadores'
    
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    nome_completo = db.Column(db.String(150), nullable=False)
    telefone = db.Column(db.String(20), nullable=True)
    clube_id = db.Column(db.Integer, db.ForeignKey('clubes.id'), nullable=True)
    
    # Relacionamentos
    usuario = db.relationship('User', backref='jogador', uselist=False)
    clube = db.relationship('Clube', backref='jogadores')
    categorias = db.relationship('Categoria', secondary=jogador_categoria, backref='jogadores')
    
    def __repr__(self):
        return f'<Jogador {self.nome_completo}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'usuario_id': self.usuario_id,
            'nome_completo': self.nome_completo,
            'telefone': self.telefone,
            'clube_id': self.clube_id,
            'clube_nome': self.clube.nome if self.clube else None,
            'cidade_id': self.clube.cidade_id if self.clube else None,
            'cidade_nome': self.clube.cidade.nome if self.clube and self.clube.cidade else None,
            'categorias': [cat.to_dict() for cat in self.categorias]
        }

