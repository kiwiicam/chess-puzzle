from flask import Flask
from routes.exampleroute import example_bp
from routes.databaseRoutes import database_bp

app = Flask(__name__)
app.register_blueprint(example_bp)
app.register_blueprint(database_bp)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
