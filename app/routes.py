from flask import Blueprint, render_template

main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    """Landing page Groom Perú."""
    return render_template('index.html')

@main_bp.route('/dermatologia')
def dermatologia():
    return render_template('dermatologia.html')
