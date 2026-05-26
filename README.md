# GROOM PERÚ — Landing Web

Pet Salón premium en Lima. Dos sedes: San Miguel y Jesús María.

## Stack
- Python + Flask
- HTML/CSS/JS estático servido por Flask
- Deploy en Render con Gunicorn

## Estructura
```
groom_peru_flask/
├── app/
│   ├── __init__.py
│   ├── routes.py
│   ├── templates/
│   │   └── index.html
│   └── static/
│       ├── css/styles.css
│       ├── js/app.js
│       └── img/  (todas las imágenes)
├── config.py
├── run.py
├── requirements.txt
├── Procfile
└── render.yaml
```

## Correr local
```bash
pip install -r requirements.txt
python run.py
```
Abre: http://localhost:5000

## Deploy en Render
1. Sube este repo a GitHub
2. En Render → New Web Service → conecta el repo
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn run:app`
5. ¡Listo! Render te da el link público.
