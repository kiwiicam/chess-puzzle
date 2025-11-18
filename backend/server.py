from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()

# Now import routes (these rely on the env variables)
from routes.authroute import auth_bp
from routes.exampleroute import example_bp
from routes.databaseRoutes import database_bp

app = Flask(__name__)

# Register blueprints 
app.register_blueprint(auth_bp)
app.register_blueprint(example_bp)
app.register_blueprint(database_bp)

if __name__ == '__main__':
    

    app.run(host='0.0.0.0', port=5000, debug=True)
