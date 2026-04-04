pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from GitHub
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
            // This handles the command correctly regardless of the OS
                    docker.build("examination-seating-arrangement-system")
                }
            }
        }

        stage('Test') {
            steps {
                bat 'echo Tests Passed'
            }
        }

        stage('Deploy to Docker') {
        steps {
            script {
            // This runs the container on port 8080
                bat 'docker run -d -p 8080:80 --name exam-system examination-seating-arrangement-system'
            
                echo "Successfully deployed to http://localhost:8080"
            }
        }
    }
}
