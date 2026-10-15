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
                dir('backend') {
                    bat 'npm ci'
                    bat 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker compose build backend'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker compose up -d --build'
            }
        }

        stage('Verify Deployment') {
            steps {
                bat 'powershell -NoProfile -ExecutionPolicy Bypass -Command "$ok = $false; for ($i = 0; $i -lt 12; $i++) { try { $r = Invoke-RestMethod -Uri http://localhost:5002/api/health -TimeoutSec 5; if ($r.success) { $ok = $true; break } } catch { Start-Sleep -Seconds 5 } }; if (-not $ok) { docker compose logs backend; exit 1 }; Write-Output \\"Backend health check passed\\""'
            }
        }
    }

    post {
        always {
            bat 'docker compose ps'
        }
        success {
            echo 'Docker build and deployment completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs for details.'
            bat 'docker compose logs --tail=100 backend'
        }
    }
}