pipeline{
    agent any

    environment {
        STATIC_ADDRESS = "http://localhost:8080"
        SKIP_SAST = "false"
        SKIP_CONTAINER_SCAN = "false"
        SKIP_SCA = "false"
        DOCKER_IMAGE = "angular_pipeline"
        DOCKER_TAG = "latest"
    }

    stages{
        stage("Compile"){
            agent {
                docker { image "node :20.17.0 - alpine" }
            }
            steps {
                sh "npm install"
                sh "npm run build"
                archiveArtifacts artifacts : "dist /**" , allowEmptyArchive : true // // Partage les artefacts de build
                stash includes : "node_modules /**" , name : "node - modules" // Partage des d p e n d a n c e s i n s t a l l e s 
            }
        }
        stage(" Unit Test"){
            agent {
                docker { image "node :20.17.0 - alpine" }
            }
            steps {
                unstash "node - modules"
                sh "npm run test"
            }
        }
        stage("Docker Build and Push"){
            agent {
                docker { image "docker:latest" }
            }
            steps {
                script {
                    docker.withRegistry("", "dockerhub") {
                        def customImage = docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                        customImage.push()
                    }
                }
            }
        }
    }
    post{
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}