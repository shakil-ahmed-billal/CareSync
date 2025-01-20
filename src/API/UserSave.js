import axios from "axios"



const saveUser = async (user) =>{
    
    const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user` , {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
        acTime: new Date()
    })
    console.log(data)
}

export default saveUser
