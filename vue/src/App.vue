
<template>
 
  <!-- 显示匹配的组件 -->
  <div >
   <LoadingOverlay />
 
     <router-view></router-view>
   </div>
 </template>
 
 <script>
 import LoadingOverlay from './components/LoadingOverlay.vue';
 
 export default {
   name: 'App',
   components: {
     LoadingOverlay,
   },
 };
 </script>
 