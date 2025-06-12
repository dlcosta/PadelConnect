from src.models.user import db

class Cidade(db.Model):
    __tablename__ = 'cidades'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
    
    # Relacionamento com clubes
    clubes = db.relationship('Clube', backref='cidade', lazy=True)
    
    def __repr__(self):
        return f'<Cidade {self.nome}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome
        }

