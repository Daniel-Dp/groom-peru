from flask import Blueprint, render_template, send_from_directory, current_app
import os

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """Landing page Groom Perú."""
    return render_template('index.html')

@main_bp.route('/dermatologia')
def dermatologia():
    return render_template('dermatologia.html')

@main_bp.route('/sitemap.xml')
def sitemap():
    """Ruta para servir el sitemap desde la carpeta static."""
    return send_from_directory(
        os.path.join(current_app.root_path, 'static'), 
        'sitemap.xml', 
        mimetype='application/xml'
    )