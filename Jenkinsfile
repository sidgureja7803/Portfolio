pipeline {
    agent any

    tools {
        nodejs 'node18'  // use the name you gave in Global Tool Config
    }

    stages {
        stage('Clone Repo') {
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
                sh 'npm run dev &'
            }
        }
    }
}
