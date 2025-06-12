from src.models.user import db

class Clube(db.Model):
    __tablename__ = 'clubes'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(200), nullable=True)
    cidade_id = db.Column(db.Integer, db.ForeignKey('cidades.id'), nullable=False)
    
    def __repr__(self):
        return f'<Clube {self.nome}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'endereco': self.endereco,
            'cidade_id': self.cidade_id,
            'cidade_nome': self.cidade.nome if self.cidade else None
        }

