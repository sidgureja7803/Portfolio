pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/sidgureja7803/Portfolio.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                // Add deploy commands here
            }
        }
    }
}
