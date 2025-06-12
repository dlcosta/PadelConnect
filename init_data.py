import os
import sys
# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from src.models.user import db
from src.models.categoria import Categoria

def init_categorias():
    """Inicializa as categorias padrão do padel"""
    categorias_padrao = [
        'Categoria 6',
        'Categoria 5', 
        'Categoria 4',
        'Categoria 3',
        'Categoria 2',
        'Open'
    ]
    
    for nome_categoria in categorias_padrao:
        categoria_existente = Categoria.query.filter_by(nome=nome_categoria).first()
        if not categoria_existente:
            nova_categoria = Categoria(nome=nome_categoria)
            db.session.add(nova_categoria)
    
    db.session.commit()
    print("Categorias padrão inicializadas com sucesso!")

if __name__ == '__main__':
    from src.main import app
    with app.app_context():
        init_categorias()

