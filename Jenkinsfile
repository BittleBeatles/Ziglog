pipeline {
    agent any

    stages {
        stage('Git Pull') {
            steps {
                git branch: 'dev/be', credentialsId: 'ParkYeongseo', url: 'https://lab.ssafy.com/s09-final/S09P31A407.git	'
            }
        }
        stage('Pre Build Clean up') {
            steps {
                script {
                    if (fileExists('backend/build')) {
                        echo 'Build directory exists. REMOVING'
                        fileOperations([folderDeleteOperation('backend/build')])
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(credentialsId: 'PYS_SONAR', installationName: 'DevOps') {
                    sh '''
                        cd "${WORKSPACE}"/backend
                        ./gradlew sonar
                    '''
                }
            }
        }
        stage('build jar') {
            steps{
                sh '''
                    cd "${WORKSPACE}"/backend
                    ./gradlew bootjar
                '''
            }
        }
        stage('Dockerize'){
            steps{
                script {
                    sh '''
                        docker compose down --rmi all
                        docker compose up -d
                    '''
                }
            }
        }
    }
}
