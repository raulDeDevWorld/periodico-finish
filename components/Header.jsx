import { useUser } from '../context/Context.js'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Link from 'next/link'
import Modal from './Modal'

import Dates from './Date'
import styles from '../styles/Header.module.css'
import { useState } from 'react'
import Button from '../components/Button'
import BannerPortada from '../components/BannerPortada'
import BannerLeft from '../components/BannerLeft'
import RelojDigital from './RelojDigital'

import FormAdds from '../components/FormAdds'

import { getDate } from '../utils/Utils'
import { onAuth, getIndexData } from '../firebase/utils'
import { writeUserData } from '../firebase/utils'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';


import { connectStorageEmulator } from 'firebase/storage'

export default function Header(props) {
    const router = useRouter()
    const { user, userDB, setUserData, postsIMG, setUserMonthAndYear, setUserDayMonthYear, setUserSuccess, setUserPostsIMG, date, setUserDate } = useUser()

    const [data, setData] = useState({})

    const [newBannerIntro, setNewBannerIntro] = useState(null)
    const [urlBannerIntro, setUrlBannerIntro] = useState(null)

    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }

    function dateEvent(e) {
        const months = ['Ene', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        const format = e.target.value.split("-")
        let d =new Date(parseInt(format[0]), parseInt(format[1] - 1), format[2], 23, 59, 0).toString()
        let md =new Date(parseInt(format[0]), parseInt(format[1] - 1), format[2], 0, 0, 0).toString()

        getIndexData(setUserData, d, md)
    }

    function handlerClick(url) {
        router.push(url)
    }
    function handlerClickEnlace(i) {
        router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
        router.pathname == "/Admin" && setDataEditor(i)

        console.log(i)
    }
    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }
    function handlerClickEnlace(data) {
        router.pathname != "/Admin" && window.open(data.href, data.target)
        router.pathname == "/Admin" && setDataEditor(data)
        // console.log(data.href, data.target)
    }
    function redirect(rute) {
        rute !== '#' && window.open(rute, '_blank')
    }
    // console.log(userDB)
    return (
        <>
            {router.pathname == "/Admin" && <FormAdds />}
            <header className={styles.header}>
                <div className={styles.fecha}>
                    <Dates></Dates>
                    <input className={styles.calendario} type="date" id="start" name="trip" onChange={dateEvent} />
                </div>
                <div className={styles.portada}>
                    <RelojDigital></RelojDigital>

                    <img className={styles.video} src="/1675975675928.gif" alt="navidad" />



                    <div className={styles.box} >
                        <Fade transitionDuration={800} duration={2000} scale={1}{...properties} indicators={true}>
                            {
                                userDB && userDB.BannerPortada && Object.keys(userDB.BannerPortada).map((i, index) =>
                                    <div className="each-slide" key={index} >
                                        <div>
                                            {
                                                router.pathname === "/Admin" ?
                                                    <span onClick={() => handlerClickEnlace({carpeta: 'BannerPortada', item : '', i })}><img className={styles.boxImg} src={postsIMG[`Banners/${i}`]} /></span>
                                                    : <span onClick={() => redirect(userDB[`BannerPortada`][i].enlace ? userDB[`BannerPortada`][i].enlace : '#')}><img className={styles.boxImg} src={postsIMG[`Banners/${i}`]} /></span>
                                            }
                                        </div>
                                    </div>
                                )}
                        </Fade>
                    </div>



                    {/* <img className={styles.navidad} src={postsIMG[]} alt="navidad" /> */}

                </div>
            </header>
            <Navbar />
            {/* {dataEditor && <Modal post={dataEditor.key} topic={'/'} i={dataEditor.i} close={handlerClickEnlace}></Modal>} */}
            {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}

        </>
    )
}





