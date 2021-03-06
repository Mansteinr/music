import jsonp from '@/common/js/jsonp'
import { commonParams, options } from './config.js'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const data = Object.assign(commonParams, {
        uin: 0,
        platform: 'h5',
        needNewCode: 1,
    })
    return jsonp(url, data, options)
}

// 获取歌单
export function getDiscList() {
    const url = '/api/getDiscList',
        data = Object.assign(commonParams, {
            rnd: Math.random(),
            hostUin: 0,
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0,
            categoryId: 10000000,
            sortId: 5,
            sin: 0,
            ein: 19,
            inCharset: 'utf8',
            loginUin: 0,
            picmid: 1
        })
    return jsonp(url, data, options)
}