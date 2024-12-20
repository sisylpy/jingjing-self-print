<template>
  <div class="bills-container">
    <PageHeader />

    <section class="row justify-content-center  bill-body">
      <!-- 侧边栏 -->
      <div class="col-md-2">
        <div class="box ">
          <div class="box-header with-border" @click="refreshCustomerList">
             <h6 class="box-title btn btn-primary">刷新客户</h6>
          </div>
          <div class="box-body no-padding">
            <!-- 改进 nav 样式，确保垂直排列 -->
            <ul class="nav nav-pills nav-stacked" style="max-height: 600px; min-height: 400px; overflow-y: auto; display: block;">
              <li v-for="(item, index) in depList" :key="item.nxDepartmentId" :id="item.nxDepartmentId"
                :class="{ 'active': isactive === index, 'tab-item': true }"
                @click="onclick(index, item.nxDepartmentId, item.nxDepartmentId,item.nxDepartmentAttrName, '',item.nxDepartmentPrintName)">
                <a>{{ item.nxDepartmentName }}</a>
                <ul v-if="item.nxDepartmentEntities && item.nxDepartmentEntities.length > 0" class="sub-department-list"
                  style="list-style-type: none; padding-left: 20px;">
                  <li v-for="(subItem, subIndex) in item.nxDepartmentEntities" :key="subItem.nxDepartmentId"
                    :class="{ 'active': isactiveSub === subIndex, 'tab-item': true }"
                    @click="childClick(index, item.nxDepartmentId, subItem.nxDepartmentId, item.nxDepartmentAttrName,  '-'+subItem.nxDepartmentAttrName, subItem.nxDepartmentPrintName,$event)">
                    <a>{{ subItem.nxDepartmentName }}</a>
                  </li>
                </ul>
              </li>
              <!-- 显示子部门 -->

            </ul>
          </div>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="col-md-10 row">
        <keep-alive>
          <component :is="depPrintName" :nxDepFatherId="nxDepFatherId" :nxDepId="nxDepId" :depName="depName" :depPrintName="depPrintName"
            :updateTime="updateTime" :disId="disId" :disName="disName"  
            
      @order-saved="refreshCustomerList"
      @print-only="handlePrintOnly"
            ></component>
        </keep-alive>
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import api from "../api/all";
import ApplyPanel from "../components/Applys/ApplyPanel.vue";
import ApplyFiftyPanel from '../components/Applys/ApplyFiftyPanel.vue'
import ApplyHalfPanel from '../components/Applys/ApplyHalfPanel.vue';
import ApplyHalfWholePanel from "../components/Applys/ApplyHalfWholePanel.vue";

export default {
  name: "Bills",

  components: {
    PageHeader,
    ApplyPanel,
    ApplyFiftyPanel,
    ApplyHalfPanel,
    ApplyHalfWholePanel
  },


  data() {
    return {
      ad1: "",
      depList: [],
      isactive: 0,
      gbDepId: -1,
      disId: null,
      resFatherId: -1,
      gbDisId: -1,
      comId: -1,
      nxDepFatherId: "",
      nxDepId: "",
      depName: "",
      depPrintName: "",
      currPage: 1,
      limit: 10,
      totalCount: "",
      totalPage: "",
      updateTime: new Date().getMilliseconds(),
      pollInterval: null,  // 保存定时器ID
      pollStartTime: null // 轮询开始时间
    }
  },

  created() {
    // 获取 URL 中的 query 参数 disId---
    this.disId = this.$route.query.disId;
    this.disName = this.$route.query.disName;

    console.log('获取到的 disId:====', this.disId, this.disName);
  },
  computed: {
    disUser() {
      return this.$store.state.disUser;
    },

    currentTabComponent() {
      return this.depPrintName;
    }
  },


  beforeUnmount() {
  // 清除定时器，防止内存泄漏
  if (this.pollInterval) {
    console.log("清除定时器，防止内存泄漏")
    clearInterval(this.pollInterval);
  }
},
  mounted() {

    
    // 检查 window.electronAPI 是否存在
    console.log('electronAPI:', window.electronAPI);

    this.fetchCustomerList();

    // 监听来自主进程的 'refresh-customer-list' 消息
    if (window.electronAPI && window.electronAPI.onRefreshCustomerList) {
      console.log("billlvueeieieieieijiantongdaoo----------")
      window.electronAPI.onRefreshCustomerList(() => {
        this.fetchCustomerList();
      });
    }


  },

  methods: {

    startPolling() {
      this.pollStartTime = Date.now();  // 记录轮询开始的时间
      this.pollForUserInfo();
    },


    pollForUserInfo() {
    this.pollInterval = setInterval(() => {
    // 检查是否超过 1 分钟
    const currentTime = Date.now();
    if (currentTime - this.pollStartTime >= 60000) {
      // 超过 1 分钟，停止轮询并返回上一页
      clearInterval(this.pollInterval);
      // alert('登录超时，返回上一页');
      this.$router.back();
      return;
    }

  }, 5000);  // 每 5 秒轮询一次
},


fetchCustomerList(){

  const disId = this.disUser.nxDiuDistributerId;
    api.webNxDisGetTodayOrderCustomer(disId).then(res => {
      if (res  && res.data) {
        console.log("收到的数据:", res.data.data);
        this.isactive = 0;
        this.depList = res.data.data;
        if (res.data.data.length > 0) {
          this.nxDepFatherId = res.data.data[0].nxDepartmentId;
          this.nxDepId = res.data.data[0].nxDepartmentId;
          this.depName = res.data.data[0].nxDepartmentName;
          this.depPrintName = res.data.data[0].nxDepartmentPrintName;
          this.updateTime =  new Date().getMilliseconds()   // 启动轮询
        } else {
          // 处理空数据的情况
          this.nxDepFatherId = "";
          this.nxDepId = "";
          this.depName = "";
          this.depPrintName = "";
          console.log("arrleleene==00000")
      
          this.$router.go(-2); 
        }
        
      }else {
        console.error("API 返回的数据格式不正确:", res);
      }
      console.log("this.nxdefatheid=" , this.nxDepFatherId)
    }).catch(error => {
      console.error("API 请求失败:", error);
    });;

},
    


 // 处理 'order-saved' 事件，刷新客户列表
 refreshCustomerList() {
      this.fetchCustomerList();
    },

    // 处理 'print-only' 事件，如果需要
    handlePrintOnly() {
      // 如果 'print-only' 也需要刷新客户列表，可以调用 fetchCustomerList
      // 如果不需要，可以忽略或执行其他逻辑
      this.fetchCustomerList();
    },


    onclick(index, nxDepFatherId, nxDeId,depName, subDepName,depPrintName) {
      console.log("subnamem", subDepName);

      this.isactive = index;
      this.nxDepFatherId = nxDepFatherId;
      this.nxDepId = nxDeId,
      this.depName = depName + subDepName;
      this.depPrintName = depPrintName;
      this.updateTime = new Date().getMilliseconds();
    },
    childClick(index, nxDepFatherId, nxDeId,depName, subDepName,depPrintName,event) {
      // 阻止事件冒泡，防止触发父部门的点击事件
      event.stopPropagation();

      // 更新子部门的选中状态
      this.isactive = index;
      this.nxDepFatherId = nxDepFatherId;
      this.nxDepId = nxDeId,
      this.depName = depName + subDepName;
      this.depPrintName = depPrintName;
      this.updateTime = new Date().getMilliseconds();
      console.log("点击了子部门:", subDepName);
      
      // 可以在这里处理子部门的具体逻辑，比如传递参数等
    }

  }
}
</script>

<style scoped>
/* 侧边栏和内容区域的整体布局 */
.bills-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.bill-body{
  padding: 20px;
}
/* 侧边栏样式 */
.box-primary {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.box-header {
  background-color: #e2e2e2;
  padding: 10px 20px;
  border-radius: 10px 10px 0 0;
  font-size: 12px;
  text-align: center;
}

.box-body {
  /* padding: 10px; */
}

.nav-pills {
  list-style: none;
  padding-left: 0;
  display: block;
}

.nav-pills .tab-item {
  padding: 20px 20px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s ease;
}

.nav-pills .tab-item:hover {
  background-color: #f4f4f4;
  color: #000;
}

.nav-pills .active {
  background-color: #590381;
  color: #fff;
  font-weight: bold;
}

/* 主内容区域样式 */
.col-md-9 {
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
  height: 100%;
}

.col-md-9 .box {
  border-radius: 10px;
  margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .col-md-3,
  .col-md-9 {
    width: 100%;
    padding: 10px;
  }

  .nav-pills {
    max-height: 300px;
    overflow-y: auto;
  }
}
</style>