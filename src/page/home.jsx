/* 首页 */
import React, { useState, useEffect } from 'react';
import Headers from '../component/headers';
import {
    Container, Typography,
    Button,
    Card,
    CardHeader,
    IconButton,
    Avatar,
    CardMedia,
    CardContent,
    CardActions,
} from '@material-ui/core';

import { articleList } from './../api/article';
import { UserState } from '../api/account';
import Cardbox from './../component/cardbox';
/* 吐司弹框提示 */
import Toast from './../component/Toast';
export default function Home(props) {
    const [loginUser, setloginUser] = useState(false);/* 判断是否为登录的用户 */
    const [list, setlist] = useState([]);/* 存储文章数据 */
    const [user, setuser] = useState('');/* 登录的用户数据局 */
    const [msg, setmsg] = useState('');/* 提示的文案信息 */
    useEffect(() => {
        /* 获得所有文章的列表 */
        showList()
        /* 获得当前登录的用户数据 */
        UserState().then((res) => {

            if (res.ret == '001') {
            } else {
                // console.log(res.data.data.userdata)
                setuser(res.data.data.userdata)
            }

        }).catch((err) => {
            console.log(err)
        })
    }, []);
    const showList = () => {
        /* 所有文章的列表 */
        articleList().then((res) => {
            console.log(res);
            // console.log(res)
            setlist(res.reverse());
        }).catch((err) => {
            console.log(err)
        })
    }
    /* 删除文章，子传父 */
    const setMaking = (res) => {

        if (res.ret == '000') {
            setmsg(res);
            /* 获得所有文章的列表 */
            showList()
        };
    }
    return (
        <div id='home'>
            <Headers type="home" />
            <Container style={{ marginTop: '80px' }} id='mainlist'>
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', minHeight: '100vh' }} >
                    {/* <div className='topbox'>
                        <div className='mainbox fn-clear'>
                            <div className='fn-clear'>
                                <div className='fl'>
                                    <div className='head'>
                                        <img src="https://picsum.photos/120/120" alt="" />
                                    </div>

                                </div>
                                <div className='fr'>
                                    {loginUser == true ?
                                        <Button className='showdetail' variant="contained" color="secondary" href="/home">
                                            Show Detail
                                        </Button>
                                        : ''}

                                </div>
                            </div>
                            <div className='usernews'>
                                <p className='tit'>Full Name:123</p>
                                <p className='desc'>Email:</p>
                                <p className='desc'>registration date:</p>
                                <p className='desc'>description:</p>
                            </div>
                        </div>
                    </div> */}
                    <div className='cardList'>

                        {list.map((ele, i) => {
                            return (
                                <div key={i}>
                                    <Cardbox cardData={ele} userdata={user} setMaking={setMaking} />
                                </div>
                            )
                        })}


                    </div>
                </Typography>
            </Container>
            {msg != '' ? <Toast msg={msg} /> : ""}
        </div>
    );
}