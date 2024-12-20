<template>
    <div class="screen">
      <!-- 轮播图 -->
      <div class="carousel-container">
        <img :src="currentAd" alt="广告" class="carousel-image" />
      </div>
  
      <!-- 底部部分 -->
      <div class="footer">
        <!-- 左侧标题 -->
        <div class="left-title">
          <h1>京京送货自助打印</h1>
        </div>
  
        <!-- 右侧按钮 -->
        <div class="right-btn">
          <button @click="goHome" class="print-btn">打印配送单</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter } from 'vue-router'; // 导入 useRouter

  // 使用 import 来引入图片
  import ad1 from '../assets/ad/ad1.png'
  import ad2 from '@/assets/ad/ad2.png';
  import ad3 from '@/assets/ad/ad3.png';
  import ad4 from '@/assets/ad/ad4.png';
  import ad5 from '@/assets/ad/ad5.png';
  
  export default {
    name: 'Screen',
    setup() {
        // 获取路由对象
    const router = useRouter();

      // 广告图片数组
      const ads = [ad1, ad2, ad3, ad4, ad5];
  
      const currentAd = ref(ads[0]); // 当前展示的广告
      let adIndex = 0;  // 当前广告索引
      let adInterval = null;  // 定时器
  
      // 启动广告轮播
      const startAdRotation = () => {
        adInterval = setInterval(() => {
          adIndex = (adIndex + 1) % ads.length;  // 切换广告
          currentAd.value = ads[adIndex];
        }, 3000); // 每3秒切换一次广告
      };
  
      // 停止广告轮播
      const stopAdRotation = () => {
        clearInterval(adInterval);
      };
  
       // 点击按钮跳转到 Home 页面
    const goHome = () => {
      router.push({ name: 'Home' }); // 使用 router.push() 跳转
    };
  
      // 生命周期钩子
      onMounted(() => {
        startAdRotation();
      });
  
      onBeforeUnmount(() => {
        stopAdRotation();
      });
  
      return {
        currentAd,
        goHome
      };
    }
  };
  </script>
  
  <style scoped>
  .screen {
    height: 100vh; /* 使整个屏幕的高度 */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 防止出现滚动条 */
  }
  
  .carousel-container {
    flex-grow: 1; /* 使轮播图占据屏幕的剩余空间 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .carousel-image {
    /* width: 100%;
    height: 100%;  */
    object-fit: cover; /* 图片按比例缩放并填满区域 */
  }
  
  /* 底部部分样式 */
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ff8c00; /* 鲜艳的背景色 */
    color: white;
    padding: 20px 40px;
    width: 100%;
    position: relative; /* 让它紧贴底部 */
  }
  
  .left-title h1 {
    font-size: 32px; /* 设置大字体 */
    font-weight: bold;
    margin: 0;
    text-align: left;
  }
  
  .right-btn {
    display: flex;
    align-items: center;
  }
  
  .print-btn {
    padding: 15px 30px;
    font-size: 18px;
    font-weight: bold;
    background-color: #e53935;  /* 红色背景 */
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .print-btn:hover {
    background-color: #d32f2f;  /* 更深的红色，增加悬停效果 */
  }
  </style>
  