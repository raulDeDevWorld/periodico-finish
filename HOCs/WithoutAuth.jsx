import Loader from '../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'
import { onAuth, getIndexData } from '../firebase/utils'

export function WithoutAuth(Component) {
    return () => {
        const { user, userDB, setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, date, setUserMonthAndYear, setUserDayMonthYear, monthAndYear} = useUser()
        const router = useRouter()
        useEffect(() => {
            let d = date ? date : `${new Date()}`
            onAuth(setUserProfile, setUserData, postsIMG, setUserPostsIMG, setUserDate, setUserMonthAndYear, setUserDayMonthYear, monthAndYear)
            getIndexData(setUserData, d)
        }, [date, user,]);

        return (
            <>
                {userDB == '' && <Loader />}
                {userDB !== "" && postsIMG !== {} && <Component {...arguments} />}
            </>
        )
    }
}
