const mixinForm = {
    data() {
        return {
            loadingForm: false,
            error: '',
            valid:false,
            email:'',
            password:'',
            repitPassword:'',
            rulesName:[
                (name)=> name.length > 0 || 'Debe ingresar un nombre valido',
                (name)=> name.length <= 40 || 'Debe ingresar un nombre menor a 40 caracteres'
            ],
            emailRules:[
                (email)=> this.emailValidation(email) || 'Ingrese un correo valido'
            ],
            passwordRules: [
                (password) => password.length >= 8 || 'Debe ingresar una contraseña mayor o igual que 8 caracteres'
            ],
            reglasrepitPassword:[
                (repitPassword) => this.password === repitPassword || 'Las contraseñas deben coincidir'
            ]
        }
    },
    methods:{
        emailValidation(email) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }    
}

export {
    mixinForm
}