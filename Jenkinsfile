pipeline {
    agent any

    tools {
        nodejs 'node18'  // Ensure this matches Global Tools
    }

    environment {
        SCANNER_HOME = tool 'SonarScanner'  // Match name in Global Tool Config
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

        stage('Run SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${env.SCANNER_HOME}/bin/sonar-scanner"
                }
            }
        }

        stage('Start Dev Server') {
            steps {
                sh 'npm run dev &'
            }
        }
    }
}
