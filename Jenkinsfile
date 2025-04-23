pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/sidgureja7803/Portfolio.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start Dev Server') {
            steps {
                echo 'Starting the development server...'
                sh 'npm run dev &'
                // Optionally sleep if needed to let server start
                // sh 'sleep 10'
            }
        }
    }
}
