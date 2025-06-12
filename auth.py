from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.user import db, User
from src.models.jogador import Jogador
import jwt
import datetime
import os

auth_bp = Blueprint('auth', __name__)

SECRET_KEY = os.environ.get('SECRET_KEY', 'asdf#FGSgvasgf$5$WGT')

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validar dados obrigatórios
        if not data.get('nome') or not data.get('email') or not data.get('senha'):
            return jsonify({'error': 'Nome, email e senha são obrigatórios'}), 400
        
        # Verificar se o email já existe
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Email já cadastrado'}), 400
        
        # Criar novo usuário
        novo_usuario = User(
            nome=data['nome'],
            email=data['email'],
            tipo=data.get('tipo', 'jogador')
        )
        novo_usuario.set_password(data['senha'])
        
        db.session.add(novo_usuario)
        db.session.commit()
        
        return jsonify({
            'message': 'Usuário cadastrado com sucesso',
            'usuario': novo_usuario.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('senha'):
            return jsonify({'error': 'Email e senha são obrigatórios'}), 400
        
        usuario = User.query.filter_by(email=data['email']).first()
        
        if not usuario or not usuario.check_password(data['senha']):
            return jsonify({'error': 'Email ou senha inválidos'}), 401
        
        # Gerar token JWT
        token = jwt.encode({
            'user_id': usuario.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'token': token,
            'usuario': usuario.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def token_required(f):
    """Decorator para rotas que requerem autenticação"""
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'error': 'Token de acesso requerido'}), 401
        
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            
            if not current_user:
                return jsonify({'error': 'Token inválido'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401
        
        return f(current_user, *args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

