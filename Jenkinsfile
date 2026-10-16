
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Tests') {
            steps {
                withCredentials([string(
                    credentialsId: 'mysql-root-password',
                    variable: 'DB_PASSWORD'
                )]) {
                    dir('backend') {
                        bat 'npm ci'
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat '"C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\cli-plugins\\docker-compose.exe" build backend'
                }
        }

        stage('Deploy') {
    steps {
        withCredentials([string(
            credentialsId: 'root',
            variable: 'MYSQL_ROOT_PASSWORD'
        )]) {
            bat '''
                set "MYSQL_ROOT_PASSWORD=%MYSQL_ROOT_PASSWORD%"
                "C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\cli-plugins\\docker-compose.exe" up -d --build
            '''
        }
    }
}

        stage('Verify Deployment') {
            steps {
                bat 'powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok = $false; for ($i = 0; $i -lt 12; $i++) { try { $r = Invoke-RestMethod -Uri http://localhost:5002/api/health -TimeoutSec 5; if ($r.success) { $ok = $true; break } } catch { Start-Sleep -Seconds 5 } }; if (-not $ok) { & \'C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\cli-plugins\\docker-compose.exe\' logs backend; exit 1 }; Write-Output \'Backend health check passed\'"'
                }
        }
    }

    post {
        always {
            bat '"C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\cli-plugins\\docker-compose.exe" ps'
            }

        success {
            echo 'Docker build and deployment completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs for details.'
            bat '"C:\\Users\\user\\AppData\\Local\\Programs\\DockerDesktop\\resources\\cli-plugins\\docker-compose.exe" logs --tail=100 backend'
            }
    }
}
