<template>

    <div class="applyBodyPage ">
        <div class=" card  shadow-lg p-20" style="min-height: 500px;">
            <!-- 页头 -->
            <div class="headerPage">
                <div class="header-content">
                    <div class="leftPage">
                        <div class="item">单位: {{ depName }}</div>
                        <div class="item">时间: {{ todayDate }}</div>
                    </div>
                    <div class="centerPage">
                        <div class="title">{{ disInfo.nxDistributerName }} 送货单</div>
                    </div>

                    <div class="rightPage">
                        <div class="item">共{{ totalPages }}页 - 第{{ pagesIndex }}页</div>
                        <div class="item">单号: {{ tradeNo }}</div>
                    </div>
                </div>
            </div>


            <!-- 订单内容部分 -->
            <div class="content-bill">
                <div class="left_bill_page">
                    <div class="table-header">
                        <div class="ten">序号</div>
                        <div class="thirty">商品</div>
                        <div class="fifteen">规格</div>
                        <div class="ten">数量</div>
                        <div class="fifteen">单价</div>
                        <div class="twenty">小计</div>
                    </div>

                    <!-- 订单信息 -->
                    <div class="table-row" v-for="(item, index) in currentPageData.leftColumn" :key="'left-' + index">

                        <div class="ten">{{ index + 1 }}</div>
                        <div class="thirty">{{ item.nxDistributerGoodsEntity.nxDgGoodsName }}</div>
                        <div class="fifteen">{{ item.nxDistributerGoodsEntity.nxDgGoodsStandardname }}</div>
                        <div class="ten">{{ item.nxDoWeight }}</div>
                        <div class="fifteen">{{ item.nxDoPrice }}</div>
                        <div class="twenty">{{ item.nxDoSubtotal }}</div>
                    </div>
                </div>

                <div class="middle_bill_page">
                    <div class="table-header">
                        <div class="ten">序号</div>
                        <div class="thirty">商品</div>
                        <div class="fifteen">规格</div>
                        <div class="ten">数量</div>
                        <div class="fifteen">单价</div>
                        <div class="twenty">小计</div>
                    </div>

                    <!-- 订单信息 -->
                    <div class="table-row" v-for="(item, index) in currentPageData.rightColumn" :key="'right-' + index">
                        <div class="ten">{{ index + 13 }}</div>
                        <div class="thirty">{{ item.nxDistributerGoodsEntity.nxDgGoodsName }}</div>
                        <div class="fifteen">{{ item.nxDistributerGoodsEntity.nxDgGoodsStandardname }}</div>
                        <div class="ten">{{ item.nxDoWeight }}</div>
                        <div class="fifteen">{{ item.nxDoPrice }}</div>
                        <div class="twenty">{{ item.nxDoSubtotal }}</div>
                    </div>
                </div>
            </div>

            <!-- 合计信息 -->
            <div class="summary pr-10"
                style="border-bottom: 1px solid gray; border-left: 1px solid gray; border-right: 1px solid gray;">
                <div class="fifty_line">
                    <div class="pl-10">
                        地址: {{ disInfo.nxDistributerAddress }}
                    </div>
                </div>
                <div class="centerPage text-right pr-10">
                    <div>第{{ pagesIndex }}页小计: {{ currentPageData.pageSubtotal }}</div>
                </div>
            </div>

            <!-- 页脚 -->
            <div class="footerPage" v-if="totalPages == pagesIndex">
                <!-- 合计信息 -->
                <div class="summary pr-10">
                    <div class="" style="background-color: red;">
                        <div></div>
                    </div>
                    <div class="text-right pr-10" style="font-size: 18px">
                        <div>{{ subtotalHanzi }} 合计: {{ subtotal }}</div>
                    </div>
                </div>

            </div>

        </div>

        <div class="d-flex justify-content-between p-20">
            <button class="btn btn-lg btn-primary" @click="generatePrintContent">
                <i class="fas fa-print"></i> 开始打印
            </button>
            <div>
                <ul class="pagination pagination-sm">
                    <li class="page-item">
                        <button class="page-link" @click="changePage(pagesIndex - 1)"
                            :disabled="pagesIndex <= 1">上一页</button>
                    </li>
                    <li class="page-item">
                        <button class="page-link" @click="changePage(pagesIndex + 1)"
                            :disabled="pagesIndex >= totalPages">下一页</button>
                    </li>
                </ul>
            </div>
        </div>


 <!-- Confirmation Modal -->
  
 <ConfirmationModal
            :visible="isModalVisible"
            message="是否需要保存订单？"
            @confirm="handleConfirm"
            @cancel="handleCancel"
        />

        <!-- ...您的其他内容... -->

        <div id="printArea" class="print-area"></div>

        <!-- 打印纸尺寸信息 -->
        <div class="paper-size-info">
            打印纸尺寸: 241.3mm x 339.7mm<br>
            当前打印区域尺寸: {{ printWidth }}px x {{ printHeight }}px
        </div>
      


    </div>

</template>



<script>
import api from '@/api/all'
import PrintSave from '../Applys/PrintSave.vue'
import ApplyCheck from '../Applys/ApplyCheck.vue'
import { mapState } from 'vuex';

import ConfirmationModal from '../ConfirmationModal.vue'; // 导入模态框组件


export default {
    name: "ApplyFiftyPanel",
    props: ['nxDepFatherId', 'nxDepId', 'depName', 'depPrintName', 'updateTime'],
    computed: {

        ...mapState(['loading', 'disUser']),
        currentPageData() {
            // 确保 applyArrPrint 是一个数组
            if (!Array.isArray(this.applyArrPrint)) {
                return { leftColumn: [], rightColumn: [] }; // 如果数据为空或格式不正确，返回空列
            }
            // 当前页的起始位置和结束位置
            const start = (this.pagesIndex - 1) * 48;
            const end = start + 48;

            // 获取当前页的数据
            const pageData = this.applyArrPrint.slice(start, end);

            // 将每页的数据分为两列，前12条为左列，后12条为右列
            const leftColumn = pageData.slice(0, 24);
            const rightColumn = pageData.slice(24, 48);

            // 计算当前页的合计
            const pageSubtotal = pageData.reduce((acc, item) => acc + parseFloat(item.nxDoSubtotal || 0), 0);
            const pageSubtotalHanzi = this.numberToChinese(pageSubtotal);

            return {
                leftColumn,
                rightColumn,
                pageSubtotal,
                pageSubtotalHanzi
            };
        },

        disInfo() {
            return this.disUser && this.disUser.nxDistributerEntity ? this.disUser.nxDistributerEntity : {};
        },
        disId() {
            return this.disUser && this.disUser.nxDistributerEntity ? this.disUser.nxDistributerEntity.nxDistributerId : -1;
        },
        disName() {
            return this.disUser && this.disUser.nxDistributerEntity ? this.disUser.nxDistributerEntity.nxDistributerName : '';
        },
        todayDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            return `${year}-${month}-${day}`;
        },
    },


    watch: {


        nxDepId: function (newVal) {
            this.pagesIndex = 1;
            this.totalPages = "";
            this.applyArrPrint = [];
            this.subtotal = 0;
            this.subtotalHanzi = "";
            this.fetchOrderData(); 
        },


        // 监听applyArrPrint的变化，重新计算页数
        applyArrPrint() {
            this.calculateTotalPages();
        },
    },

    components: {
        PrintSave,
        ApplyCheck,
        ConfirmationModal,
    },


    data() {
        return {
            pagesIndex: 1, // 当前页
            totalPages: "", // 总页数
            gbDepId: -1,
            resFatherId: -1,
            gbDisId: -1,
            comId: -1,
            tradeNo: "",
            applyArrPrint: [], // 假设从外部获取到的订单数据
            subtotalHanzi: '', // 合计大写
            subtotal: 0,
            printWidth: 0,
            printHeight: 0,
            isModalVisible: false, // 控制模态框显示

        }
    },


    mounted() {

        this.fetchOrderData().then(() => {
            console.log("订单数据加载完成：", this.applyArrPrint);
            this.calculateTotalPages();  // 数据加载完成后计算总页数

            this.$nextTick(() => {
                const printArea = document.getElementById('printArea');
                if (printArea) {
                    const rect = printArea.getBoundingClientRect();
                    this.printWidth = rect.width.toFixed(2);
                    this.printHeight = rect.height.toFixed(2);
                }
            });


        }).catch(error => {
            console.error("加载订单数据失败：", error);
        });

    },


    methods: {


        // 打开确认模态框
        print() {
            this.isModalVisible = true;
        },

       
        // 处理模态框的确认事件
    async handleConfirm() {
      this.isModalVisible = false;
      try {
        await this.saveOrder();
        // this.executePrint();
        // Emit event to parent
        this.$emit('order-saved');
      } catch (error) {
        console.error("保存订单或打印失败:", error);
        // Optionally, show an error message to user
      }
    },

        // 处理取消保存
        handleCancel() {
            this.isModalVisible = false;
          
        },

        async fetchOrderData() {
            console.log("开始获取订单数据");
            try {

                // 构建请求参数
                const params = new URLSearchParams();
                params.append('depFatherId', parseInt(this.nxDepFatherId));
                params.append('depId', parseInt(this.nxDepId));
                params.append('gbDepFatherId', parseInt(this.gbDepId));
                params.append('resFatherId', parseInt(this.resFatherId));
                params.append('disId', this.disId);

                // 发送请求
                console.log("请求参数-====", params.toString());
                const res = await api.disGetToFillDepOrders(params);

                if (res.data && res.data.data) {
                    this.tradeNo = res.data.data.tradeNo;
                    this.subtotal = res.data.data.total;
                    this.subtotalHanzi = res.data.data.totalHanzi;
                    this.applyArrPrint = res.data.data.arr;

                    console.log("this.orders=========", this.applyArrPrint); // 应输出数组内容
                } else {
                    console.error("响应数据格式不正确:", res.data);
                }

            } catch (error) {
                console.error("请求数据失败:", error);
            }
        },

        // 切换页面
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.pagesIndex = page; // 更新当前页
        },


  // 保存订单的逻辑
  async saveOrder() {
            console.log("开始保存订单aaaa");
            try {
                const ids = this.applyArrPrint.map(item => item.nxDepartmentOrdersId);
                const bill = {
                    nxDbTradeNo: this.tradeNo,
                    nxDbDepId: this.nxDepId,
                    nxDbDepFatherId: this.nxDepId,
                    nxDbTotal: this.subtotal,
                    nxDbIssueUserId: this.disUser ? this.disUser.nxDistributerUserId : null,
                    nxOrderIds: ids,
                    nxDbPrintTimes: 1,
                    nxDbGbDisId: this.gbDisId,
                    nxDbDisId: this.disUser ? this.disUser.nxDistributerEntity.nxDistributerId : null,
                    nxDbGbDepId: this.gbDepId,
                    nxDbNxCommunityId: this.comId,
                    nxDbNxRestrauntId: this.resFatherId
                };
                const res = await api.saveAccountBill(bill);
                if (res) {
                    console.log("订单保存成功");

                    this.isModalVisible = false;

                    // 如果需要，您可以在这里添加成功提示
                }
            } catch (error) {
                console.error("保存账单失败:", error);
                throw error; // 将错误抛出以便在 saveOrderAndPrint 中捕获
            }
        },

        


        // 计算需要的打印页数
        calculateTotalPages() {
            const totalRows = this.applyArrPrint.length; // 数据总行数
            const rowsPerPage = 24; // 每列12行
            const columnsPerPage = 2; // 每页两列
            const totalRowsPerPage = rowsPerPage * columnsPerPage; // 每页最大行数
            this.totalPages = Math.ceil(this.applyArrPrint.length / 48);
            // 计算打印所需总页数
            return Math.ceil(totalRows / totalRowsPerPage);
        },

        // 创建每一页的头部内容
        createHeader(pageIndex, totalPriPage) {
            return `
            <div class="header" style="width: 100%; float:left; border-bottom: 1px solid gray; ">
                <div style="width: 85%; margin-left: 7.5%; line-height: 36px; float:left; font-size: 14px;">
                    <div style="width: 34%; float: left;">
                        <div style="line-height: 36px; font-size: 14px;">单位: ${this.depName}</div>
                    </div>
                    <div style="width: 33%; float: left; text-align: center; font-size: 24px;">${this.disName}送货单</div>
                    <div style="width: 33%; float: left; text-align: right; font-size: 12px;">
                        <div style="line-height: 18px;">共${totalPriPage}页  第${pageIndex}页</div>
                        <div style="line-height: 18px;">时间: ${this.todayDate}</div>
                    </div>
                </div>
            </div>
        `;
        },

        // 创建每一页的页脚内容
        createFooter() {
            const address = this.disUser.nxDistributerEntity.nxDistributerAddress !== 1
                ? this.disUser.nxDistributerEntity.nxDistributerAddress
                : "送货人: ";
            return `
            <div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                <div style="width: 100%; line-height: 36px; float:left;">
                    <div style="width: 60%; margin-left: 5%; float: left;">
                        <div>地址: ${address}</div>
                    </div>
                </div>
            </div>
        `;
        },

        // 创建单个页面的内容，分为两列显示
        createPageContent(pageIndex) {
            const rowsPerPage = 24; // 每列12行
            const columnsPerPage = 2; // 每页2列
            const startIndex = (pageIndex - 1) * rowsPerPage * columnsPerPage;
            const endIndex = pageIndex * rowsPerPage * columnsPerPage;

            // 获取当前页的数据
            const currentPageData = this.applyArrPrint.slice(startIndex, endIndex);

            let pageContent = '';
            // 将数据按列分组，每列12行
            for (let col = 0; col < columnsPerPage; col++) {
                let columnContent = '';
                for (let row = 0; row < rowsPerPage; row++) {
                    const dataIndex = col * rowsPerPage + row;
                    if (currentPageData[dataIndex]) {
                        const rowData = currentPageData[dataIndex];
                        columnContent += `
            <div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray; line-height: 24px; text-align: center;font-size: 12px;">
                <div style="word-break: keep-all; box-sizing: border-box; float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray;">${row + 1}</div>
                <div style="word-break: keep-all; box-sizing: border-box; float: left; width: 30%; border-right: 1px solid gray; text-align: left; padding-left: 10px;">${rowData['nxDistributerGoodsEntity']['nxDgGoodsName']}</div>
                <div style="word-break: keep-all; box-sizing: border-box; float: left; width: 15%; border-right: 1px solid gray;">${rowData['nxDoPrintStandard']}</div>
                <div style="word-break: keep-all; box-sizing: border-box; float: left; width: 10%; border-right: 1px solid gray;">${rowData['nxDoWeight']}</div>
                <div style="word-break: keep-all; box-sizing: border-box; float: left; width: 15%; border-right: 1px solid gray;">${rowData['nxDoPrice']}</div>
                <div style="word-break: keep-all; box-sizing: border-box; float: left; width: 20%; border-right: 1px solid gray;">${rowData['nxDoSubtotal']}</div>
            </div>
        `;

                    }
                }
                pageContent += `<div style="float: left; width: 50%;">${columnContent}</div>`;
            }

            return pageContent;
        },



        // 打印内容生成
        generatePrintContent() {
            // 计算总页数
            const totalPages = this.calculateTotalPages();

            // 清空之前的打印内容
            const printArea = document.getElementById('printArea');
            printArea.innerHTML = '';

            // 循环生成每一页的 HTML 内容
            for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
                const pageHtml = `
          <div id="page${pageIndex}" class="applyBody">
            ${this.createHeader(pageIndex, totalPages)}
            <div class="content_bill" style="width: 90%; margin-left: 5%; float: left; border-bottom: 1px solid gray; border-right: 1px solid gray;">
              ${this.createPageContent(pageIndex)}
            </div>
            <div style="box-sizing: border-box; float: left; width: 100%; line-height: 24px; text-align: center; font-size: 13px; border-top: 1px solid gray;">
              <div style="box-sizing: border-box; float: left; width: 50%; border-left: 1px solid gray; padding-right: 10px; text-align: left;">
                <div>合计大写: ${this.numberToChinese(this.subtotal)}</div>
              </div>
              <div style="box-sizing: border-box; float: left; width: 50%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">
                合计: ${this.subtotal}
              </div>
            </div>
            ${this.createFooter()}
          </div>
        `;
                printArea.innerHTML += pageHtml;
            }

            // 打印页面
            this.printOnly();
        },

        // 打印页面的逻辑
        printOnly() {

            const printContent = document.getElementById('printArea').innerHTML;

            // 使用 Electron 的 API 发送打印请求到主进程
            window.electronAPI.sendPrintRequest(printContent);
            // setTimeout(() => {
            //     console.log('Calling triggerEnterKey...');
            //     window.electronAPI.triggerEnterKey(); // 模拟按下回车键，确认打印
            // }, 2000);

            // this.$emit('print-only');
            this.print();
        },



        numberToChinese(num) {
            // 定义汉字数字
            const units = ["", "拾", "佰", "仟"];
            const sectionUnits = ["", "万", "亿", "万亿"];
            const numMap = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

            if (num === 0) return "零元整";

            // 分离整数和小数部分
            let [integer, decimal] = String(num).split(".");
            decimal = decimal ? decimal.slice(0, 2) : "";

            // 转换整数部分
            const integerToChinese = (integer) => {
                let result = "";
                let section = 0;
                let zero = false;

                while (integer.length > 0) {
                    let part = integer.slice(-4);  // 每4位为一段
                    integer = integer.slice(0, -4);
                    let str = "";

                    for (let i = 0; i < part.length; i++) {
                        const digit = Number(part[part.length - 1 - i]);
                        if (digit === 0) {
                            zero = true;
                        } else {
                            if (zero) {
                                str = numMap[0] + str;
                                zero = false;
                            }
                            str = numMap[digit] + units[i] + str;
                        }
                    }
                    if (str) {
                        result = str + sectionUnits[section] + result;
                    }
                    section++;
                }

                return result + "元";
            };

            // 转换小数部分
            const decimalToChinese = (decimal) => {
                if (!decimal) return "整";
                let result = "";
                if (decimal[0]) result += numMap[decimal[0]] + "角";
                if (decimal[1]) result += numMap[decimal[1]] + "分";
                return result;
            };

            return integerToChinese(integer) + decimalToChinese(decimal);
        },



    }


}
</script>


<style scoped>
#printArea {
    border: 2px dashed rgb(6, 6, 239);
    /* 屏幕上显示蓝色虚线边框 */
    background-color: rgba(0, 0, 255, 0.1);


    /* 半透明蓝色背景 */
}

/* 设置打印样式 */
.print-area {
    width: 241.3mm;
    /* 设置与打印纸相同的尺寸 */
    height: 339.7mm;
    border: 2px dashed red;
    /* 可视化边框 */
    background-color: rgba(255, 0, 0, 0.1);
    /* 半透明背景色 */
    margin: auto;
    /* 居中显示 */
    box-sizing: border-box;
}

.paper-size-info {
    position: fixed;
    top: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 1000;
    font-size: 12px;
}

@media print {
    #printArea {
        border: 2px dashed green;
        /* 打印时显示绿色虚线边框 */
        background-color: rgba(0, 255, 0, 0.1);
        /* 半透明绿色背景 */
    }

    /* @page {
        size: 241.3mm 139.7mm;
        margin: 10mm;
    } */

    body {
        font-size: 12pt;
    }

    .no-print {
        display: none;
    }
}

.applyBodyPage {
    width: 100%;
    /* padding: 20px; */
    box-sizing: border-box;
    /* 确保内边距被包含在宽度内 */
    background-color: #fff;
}

.p-20 {
    padding: 20px;

}

.headerPage {
    width: 100%;
    /* margin-bottom: 20px; */
    font-size: 14px;
}

.header-content {
    display: flex;
    justify-content: space-between;
}

.leftPage,
.rightPage {
    width: 30%;
}


.fifty_line {
    width: 50%;
}

.centerPage {
    width: 40%;
    text-align: center;
}

.title {
    font-size: 18px;
    font-weight: bold;
}

.item {
    font-size: 14px;
    line-height: 24px;
}

.content-bill {
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 20px; */
    border: 1px solid #ccc;
    box-sizing: border-box;
    /* 防止布局溢出 */
}

.left_bill_page,
.middle_bill_page {
    width: 50%;
    box-sizing: border-box;
    /* 确保宽度不超出父容器 */
}

.text-right {
    text-align: right;
}

.table-header {
    display: flex;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    border-bottom: 1px solid gray;
    border-top: 1px solid gray;
}

.table-header .col {
    /* width: 16.66%; */
    /* padding: 5px; */
    /* box-sizing: border-box; */
}

.table-row {
    display: flex;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    border-bottom: 1px solid gray;
}

.table-row .col {
    width: 16.66%;
    padding: 5px;
    box-sizing: border-box;
}

.summary {
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 20px; */
    font-size: 14px;
}

.footerPage {
    text-align: leftPage;
    font-size: 14px;
}

.address {
    margin-top: 10px;
}

.address div {
    margin-bottom: 5px;
}

.pr-10 {
    padding-right: 10px;
}

.pl-10 {
    padding-left: 10px;
}

.ten {
    width: 10%;
    border-right: 1px solid gray;
}

.fifteen {
    width: 15%;
    border-right: 1px solid gray;
}

.twenty {
    width: 20%;
    border-right: 1px solid gray;
}

.thirty {
    width: 30%;
    border-right: 1px solid gray;
}
</style>
