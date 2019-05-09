const store = {
    state:{
        user: null
    },
    getters:{
        getUser(state){
            return state.user
        }
    },
    mutations:{
        login(states, user){
            states.user = user
        }
    },
    actions:{
        login({commit}, credentials){
            return new Promise((resolve, reject) =>{
                resolve()
            })
        },
        logOut({commit}){            
            return new Promise((resolve, reject) => {
                signOut().then(()=>{
                    commit('login', null)
                    resolve()
                }).catch((error)=> reject(error))
            })
        },
        createUser({commit}, newUser){           
            return new Promise((resolve, reject) => {                
                createUserWithEmailAndPassword(newUser.email, newUser.password).then(() => {                    
                    user.updateProfile({
                        displayName: newUser.fullName
                    }).then(()=>{
                        resolve()
                    }).catch((error) => {
                        reject(error)
                    })
                }).catch((error) => reject(error))
            })
        },
        createReport({commit}, newreport){
            return new Promise((resolve, reject) =>{
                resolve()
            })
        }
    }
}
export default store