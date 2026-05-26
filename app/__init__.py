from flask import Flask
from config import config

def create_app(env='development'):
    app = Flask(__name__)
    app.config.from_object(config[env])
    
    from .routes import main_bp
    app.register_blueprint(main_bp)
    
    return app
