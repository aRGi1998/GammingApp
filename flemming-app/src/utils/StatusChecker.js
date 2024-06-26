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

export async function levelStatusChecker(levelId,gameMode,campusName = sessionStorage.getItem('campusName')){
    try {
        // `https://api-flrming.dhoomaworksbench.site/api/game/type/`
        const url = `https://api-flrming.dhoomaworksbench.site/user-game-list/${levelId}?game_mode=${gameMode}&campus_name=${campusName}`
        const res = await axios.get(url,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }            
        })
        
        if(res.status !== 200) {
            alert("something went wrong !")
        }

        const response = res.data.data
        const game = response.filter((gameObj) => gameObj.status)
        return game.every((elem) => elem === 'F' || elem ==='C')
        
    } catch (error) {
        throw new Error(error.message)
    }
}