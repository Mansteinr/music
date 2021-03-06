
import { playMode } from '@/api/config'
import * as types from '@/common/js/utils'

const state = {
  favoriteList: types.loadFavorite(),
  playHistory: localStorage.getItem('_play_') || [], // 播放历史
  topList: [], // 排行榜列表
  singer: {},
  disc: {}, // 歌单对象
  playing: false, // 播放状态
  fullScreen: false, // 播放器是否是全屏状态
  playList: [], // 播放列表
  sequenceList: [], // 原始数据
  currentIndex: -1, // 表示当前播放列表中的歌曲
  mode: playMode.sequence,// 播放模式 随机，顺序
  searchHistory: localStorage.getItem('search') || [],// 搜索历史
}
 
export default state