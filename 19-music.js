var app = new Vue({
    el:".play_wrap",
    data:{
        // 查询关键字
        query:"",
        // 歌曲数组
        musicList:[],
        // 歌曲地址
        musicUrl:"",
        // 歌曲封面
        musicCover:"",
        // 歌曲评论
        musicComment:[],
        // 播放状态
        isPlaying:false,
        // 遮罩层的显示状态
        isShow:false,
        // mv地址
        mvUrl:""
    },
    methods:{
        // 歌曲搜索
        searchMusic:function(){
            // console.log(this.query);
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(resp){
                that.musicList = resp.data.result.songs;
                // console.log(resp.data.result.songs);
            },function(err){})
        },
        // 歌曲播放
        playMusic:function(musicid){
            var that = this;
            // console.log(musicid);
            // 获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id="+musicid)
            .then(function(resp){
                // console.log(resp.data.data[0].url);
                that.musicUrl = resp.data.data[0].url;
            },function(err){})

            // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids="+musicid)
            .then(function(resp){
                // console.log(resp.data.songs[0].al.picUrl);
                that.musicCover = resp.data.songs[0].al.picUrl;
            },function(err){})

            // 歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicid)
            .then(function(resp){
                // console.log(resp.data.hotComments);
                that.musicComment = resp.data.hotComments;
            },function(err){})
        },
        // 歌曲播放
        play:function(){
            // console.log("play");
            this.isPlaying = true;
        },
        // 歌曲暂停
        pause:function(){
            // console.log("pause");
            document.querySelector(".audio_bd").pause();
            this.isPlaying = false;
        },
        // 播放mv
        playMv:function(mvid){
            this.pause();
            var that = this;            
            // 这里的id号是mvid的值
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(resp){
                console.log(resp.data.data.url);
                that.isShow = true;                
                that.mvUrl = resp.data.data.url;
            },function(err){})
        },
        // 隐藏
        hidden:function(){
            this.isShow = false;
            document.getElementById("video_mv").pause();
        }
    }
})