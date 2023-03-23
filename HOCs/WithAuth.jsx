import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { onAuth, getIndexData } from '../firebase/utils'

export function WithAuth(Component) {
    return () => {
        const { user, userDB, success, setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, date, setUserMonthAndYear, setUserDayMonthYear, monthAndYear } = useUser()
        const router = useRouter()

        useEffect(() => {
            let d = date ? date :  `${new Date()}`

            onAuth(setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear)
            getIndexData(setUserData, d)
            if(user === null) router.replace('/')
        }, [date, user, success])
        return (
            <>
                {user === undefined && <Loader />}
                {user && <Component {...arguments} />}
            </>
        )
    }
}
