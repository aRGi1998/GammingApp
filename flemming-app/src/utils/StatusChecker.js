import axios from 'axios'

export async function gameStatusChecker(gameId){
    try {
        const res = await axios.get(`https://api-flrming.dhoomaworksbench.site/game-user`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })

        console.log("res: ",res)
        if(res.status === 200) {
            const response = res.data.results.filter((obj) => obj.game === gameId)[0]
            console.log("response",response)
            if ( typeof response?.status === 'string' && (response.status === "F" || response.status === "C") ) {
                console.log("locked")
                return false
            }
            console.log("unlocked")
            return true
        }
        
    } catch (error) {
        throw new Error(error.message)
    }
}

export async function levelStatusChecker(levelId){
    try {

        const res = await axios.get(`https://api-flrming.dhoomaworksbench.site/api/game/type/`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }            
        })

        
        if(res.status === 200) {
            const response = res.data.results
            const game = response.filter((gameObj) => gameObj.id == levelId)[0]
            return game?.status
        }

        return false
        
    } catch (error) {
        throw new Error(error.message)
    }
}