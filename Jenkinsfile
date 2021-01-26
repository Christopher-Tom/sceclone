pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/Christopher-Tom/sceclone'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Install server') {
       steps {
        sh 'npm run server-install'
      }
    }
    stage('Test') {
      steps {
         sh 'npm run api-test'
      } 
    }      
    stage('Install front-end test') {
      steps {
        sh 'npm run frontend-test'
      }
    }  
  }
}
