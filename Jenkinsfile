pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'Default'  // Matches the name in Jenkins global tool config
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
                    sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner"
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
