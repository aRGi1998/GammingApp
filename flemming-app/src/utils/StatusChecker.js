import axios from 'axios'

export async function gameStatusChecker(gameId){
    try {
        const res = await axios.get(`https://api-flrming.dhoomaworksbench.site/api/game/${gameId}/`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })

        if(res.status === 200) {
            const response = res.data
            if (response?.status) {
                return true
            }
            return false
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
            console.log(game , levelId)
            return game?.status
        }

        return false
        
    } catch (error) {
        throw new Error(error.message)
    }
}