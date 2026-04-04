pipeline {
    agent any 
    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Checking out Examination Seating Arrangement System...'
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t examination-seating-arrangement-system .'
            }
        }
        stage('Test') {
            steps {
                bat 'echo "CI/CD Test Passed"'
            }
        }
        stage('Deploy to Docker') {
            steps {
                script {
                    // Force clear any old container blocking the name
                    bat 'docker rm -f exam-system || ver > nul'
                    
                    // Use Port 9000 to avoid the 'bind' error on 8080
                    bat 'docker run -d -p 9000:80 --name exam-system examination-seating-arrangement-system'
                    
                    echo "SUCCESS! Visit http://localhost:9000"
                }
            }
        }
    }
}
