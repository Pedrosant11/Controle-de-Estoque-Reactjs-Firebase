# Controle de estoque em Reactjs
Projeto de controle de estoque usando React e Firebase.

* Login usando Firebase
* Cadastro com email e senha authentication

## Firebase

1 - Crie um banco de dados no Firebase

2 - Copiar o código que for dado, por exemplo: 
```
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import "firebase/compat/storage";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export default firebase;

```

3 - Crie um arquivo .env e coloque as chaves com essas variáveis
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```

4 - Altere as regras do banco para true

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```


# Authentication
Autenticar e gerenciar usuários para terem acesso.

1 - Ativar Email/Senha


# Start
No diretório do projeto, abra o terminal e aplique o comando para instalar as dependências:

```
npm install
```
Após isso, dê o comando para iniciar o servidor:
```
npm start
```