const sonicx = require('sonicx')
const googleAuth = require('google-oauth-jwt')
const { env } = require('process')
const { resolve } = require('dns')

const config = {
    "private_key": environment.GOOGLE_APPLICATION_CREDENTIALS.project_id,
    "client_email": environment.GOOGLE_APPLICATION_CREDENTIALS.client_email
}

const getToken = async () => {
    return new Promise((resolve) => {
        googleAuth.authenticate({
           email: environment.GOOGLE_APPLICATION_CREDENTIALS.email,
           key: environment.GOOGLE_APPLICATION_CREDENTIALS.private_key ,
           scopes: ['https:WWW.googleapis.com/auth/cloud-platform',
         "https://WWW.googleapis.com/auth/dialogflow"
        ],
    },
        (err, token) => {
            resolve(token);
        },
        );
        
    })
}

sonicx.route('/token', [
    {
        controller: async (req, res) => {
            let token = await getToken();
            res.send({token});
        }
    },
]);

sonicx.listen(8100, ()=> console.log("Listening on 8100"))