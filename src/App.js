import './App.css';

import {Amplify} from 'aws-amplify';
import awsExports from "./aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from "aws-amplify";

// Configure Amplify in index file or root file
Amplify.configure({
  Auth: {
    // region: awsExports.REGION,
    // userPoolId: awsExports.USER_POOL_ID,
    // userPoolWebClientId: awsExports.USER_POOL_APP_CLIENT_ID
    Cognito: {
      userPoolClientId: awsExports.USER_POOL_APP_CLIENT_ID,
      userPoolId: awsExports.USER_POOL_ID,
      loginWith: { // Optional
        oauth: {
          domain: 'https://wingmallpool.auth.ap-southeast-2.amazoncognito.com',
          scopes: ['openid email phone profile aws.cognito.signin.user.admin '],
          redirectSignIn: ['http://localhost:3000/','https://example.com/'],
          redirectSignOut: ['http://localhost:3000/','https://example.com/'],
          responseType: 'code',
        },
        username: 'true',
        email: 'false', // Optional
        phone: 'false', // Optional
      }
    }
  }
})

function App() {
  return (
      <Authenticator>
        {({ signOut, user }) => (
            <div>
              <p>Welcome {user.username}</p>
              <button onClick={signOut}>Sign out</button>
            </div>
        )}
        {/* <div>Hello</div> */}
      </Authenticator>
  );
}

export default App;