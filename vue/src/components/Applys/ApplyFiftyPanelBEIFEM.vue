<template>


        <div class="col-md-10 col-sm-10">

            <div class="box box-primary" >
                <div class="box-header with-border">
                    <div class="row">
                        <div class="col-md-4" >
                            <h5>日期：{{todayDate}}</h5>
                            <h5  >商品：{{totalCount}}个</h5>
                            <h5 class="" >总金额：{{subtotal}} 元</h5>
                        </div>
                        <div class="col-md-4" >
                            <h2>{{depName}}</h2>
                            <h5>一张二列</h5>
                        </div>
                        <div class="col-md-4"  >
                            <button class="btn btn-primary btn-sm" style="padding: 4px 54px;margin: 10px 0px" @click="PrintBillTwoPick">打印拣货单</button>
                            <button  class="btn btn-info btn-sm" style="padding: 4px 54px;"  v-if="subAmount > 0" @click="PrintBillTwoChoice">部门打印</button>
                            <button  class="btn btn-success btn-sm" style="padding: 4px 54px; margin: 10px 0px ;" @click="PrintBillTwo">全部打印</button>
                        </div>
                    </div>
                </div>


<!--                没有部门-->
                <div v-if="subAmount == 0">

                    <TablePanel :applyArr="applyArr" currPage="currPage" />

<!--                    <div class="box-body no-padding ">-->

<!--                        <div class="" id="deliveryOrderNew" style="height: 460px;  ">-->
<!--                            <table class="table table-striped">-->
<!--                                <thead>-->
<!--                                <tr>-->
<!--                                    <th>序号</th>-->
<!--                                    <th  style="width: 150px; ">商品名称</th>-->
<!--                                    <th>申请</th>-->
<!--                                    <th>出库数量</th>-->
<!--                                    <th>单价</th>-->
<!--                                    <th>小计</th>-->
<!--                                </tr>-->
<!--                                </thead>-->

<!--                                <tbody>-->


<!--                                <tr v-for="(item, index) in applyArr" >-->
<!--                                    <td>{{ ((currPage - 1) * 10) +  index + 1}}</td>-->
<!--                                    <td  v-if="item.nxDoStatus > -1" style="width: 150px; ">{{item.nxDistributerGoodsEntity.nxDgGoodsName}}</td>-->
<!--                                    <td  v-else style="width: 150px; color: red ">{{item.nxDoGoodsName}}</td>-->
<!--                                    <td>-->
<!--                                        {{item.nxDoQuantity}}{{item.nxDoStandard}}-->
<!--                                    </td>-->
<!--                                    <td v-if="item.nxDoStatus > -1" >-->
<!--                                        <input type="text" name="weight"-->
<!--                                               :value="item.nxDoWeight"-->
<!--                                               :index="index"-->
<!--                                               disabled-->
<!--                                        >{{item.nxDoPrintStandard}}-->
<!--                                    </td>-->
<!--                                    <td v-else >-->
<!--                                    </td>-->
<!--                                    <td v-if="item.nxDoStatus > -1" >-->
<!--                                        <input type="text" name="price"-->
<!--                                               :value="item.nxDoPrice"-->
<!--                                               :index="index"-->
<!--                                               disabled></td>-->
<!--                                    <td v-else >-->
<!--                                    </td>-->

<!--                                    <td v-if="item.nxDoStatus > -1"  class="cost" style="color: #0a8eec; width: 100px;">-->
<!--                                        {{item.nxDoSubtotal}}-->

<!--                                    <td v-else  class="cost" style="color: #0a8eec; width: 100px;">-->
<!--                                        下单:{{item.nxAgentUserEntity.nxDiuWxNickName}}-->
<!--                                    </td>-->
<!--                                    <td>-->
<!--                                        <div class="box-tools pull-right">-->
<!--                                            <div class="btn-group">-->
<!--                                                <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">-->
<!--                                                    <i class="fa fa-wrench"></i></button>-->
<!--                                                <ul class="dropdown-menu" role="menu">-->
<!--                                                    <li><a @click="addBefore(index)">在之前新增</a></li>-->
<!--                                                    <li><a @click="editOrder(index)">修改</a></li>-->
<!--                                                    <li><a @click="deleteOrder(index)">删除</a></li>-->
<!--                                                    &lt;!&ndash;<li class="divider"></li>&ndash;&gt;-->
<!--                                                </ul>-->
<!--                                            </div>-->

<!--                                            &lt;!&ndash;<button type="button" class="btn btn-box-tool" data-widget="collapse"><i&ndash;&gt;-->
<!--                                            &lt;!&ndash;class="fa fa-minus"></i>&ndash;&gt;-->
<!--                                            &lt;!&ndash;</button>&ndash;&gt;-->
<!--                                        </div>-->
<!--                                    </td>-->

<!--                                </tr>-->

<!--                                </tbody>-->

<!--                            </table>-->
<!--                        </div>-->

<!--                    </div>-->

                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li :class="currPage == 1  ? 'disabled' : '' "
                                @click="nextPage('before')"><span
                                    aria-hidden="true">&laquo;</span></li>
                            <li   @click="getCurrPage(index)"
                                  :class="index+ 1 == currPage ? 'active' : '' "
                                  v-for="(item, index) in totalPage"
                            >
                                <a >{{ index + 1}} </a>
                            </li>
                            <li :class="currPage == totalPage  ? 'disabled' : '' " @click="nextPage('next')"><span
                                    aria-hidden="true">&raquo;</span></li>
                        </ul>
                    </nav>
                </div>

<!--                多部门-->

                <div v-if="subAmount > 0">

                    <ul class="nav nav-tabs">
                        <li :class="index === selectedIndex ? 'active' : ''" v-for="(dep, index) in depsPart"><a  @click="getSubDepApply(index)">{{dep.depName}}</a></li>

                    </ul>
                    <div class="box-body">
                        <div class="nav-tabs-justified">

                            <div class="tab-content">
                                <div class="" id="deliveryOrderNewSub" style="height: 560px;  ">
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>序号</th>
                                            <th  style="width: 150px; ">商品名称</th>
                                            <th>申请</th>
                                            <th>出库数量</th>
                                            <th>单价</th>
                                            <th>小计</th>
                                        </tr>
                                        </thead>

                                        <tbody>


                                        <tr v-for="(item, index) in applyArr" >
                                            <td>{{ ((currPage - 1) * 10) +  index + 1}}</td>
<!--                                            <td  v-if="item.nxDoStatus > -1" style="width: 150px; ">{{item.nxDistributerGoodsEntity.nxDgGoodsName}}</td>-->
<!--                                            <td  v-else style="width: 150px; color: red ">{{item.nxDoGoodsName}}</td>-->
                                            <td   style="width: 150px; color: red ">{{item.nxDoGoodsName}}</td>
                                            <td>
                                                {{item.nxDoQuantity}}{{item.nxDoStandard}}
                                            </td>
                                            <td v-if="item.nxDoStatus > -1" >
                                                <input type="text" name="weight"
                                                       :value="item.nxDoWeight"
                                                       :index="index"
                                                       disabled
                                                >{{item.nxDoPrintStandard}}
                                            </td>
                                            <td v-else >
                                            </td>
                                            <td v-if="item.nxDoStatus > -1" >
                                                <input type="text" name="price"
                                                       :value="item.nxDoPrice"
                                                       :index="index"
                                                       disabled></td>
                                            <td v-else >
                                            </td>

                                            <td v-if="item.nxDoStatus > -1"  class="cost" style="color: #0a8eec; width: 100px;">
                                                {{item.nxDoSubtotal}}

                                            <td v-else  class="cost" style="color: #0a8eec; width: 100px;">
                                                下单:{{item.nxAgentUserEntity.nxDiuWxNickName}}
                                            </td>
                                            <td>
                                                <div class="box-tools pull-right">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-box-tool dropdown-toggle" data-toggle="dropdown">
                                                            <i class="fa fa-wrench"></i></button>
                                                        <ul class="dropdown-menu" role="menu">
                                                            <li><a @click="addBefore(index)">在之前新增</a></li>
                                                            <li><a @click="editOrder(index)">修改</a></li>
                                                            <li><a @click="deleteOrder(index)">删除</a></li>
                                                            <!--<li class="divider"></li>-->
                                                        </ul>
                                                    </div>

                                                    <!--<button type="button" class="btn btn-box-tool" data-widget="collapse"><i-->
                                                    <!--class="fa fa-minus"></i>-->
                                                    <!--</button>-->
                                                </div>
                                            </td>

                                        </tr>

                                        </tbody>

                                    </table>
                                </div>


                            </div>
                            <!-- /.tab-pane -->

                        </div>

                    </div>

                    <nav aria-label="Page navigation" style="margin-top: 10px;">
                        <ul class="pagination">
                            <li :class="currPage == 1  ? 'disabled' : '' "
                                @click="nextPage('before')"><span
                                    aria-hidden="true">&laquo;</span></li>
                            <li   @click="getCurrPage(index)"
                                  :class="index+ 1 == currPage ? 'active' : '' "
                                  v-for="(item, index) in totalPage"
                            >
                                <a >{{ index + 1}} </a>
                            </li>
                            <li :class="currPage == totalPage  ? 'disabled' : '' " @click="nextPage('next')"><span
                                    aria-hidden="true">&raquo;</span></li>
                        </ul>
                    </nav>

                </div>


            </div>
            <div style="display: none" id="testDeliveryTwo"></div>

            <PrintSave @printOk="printOk" @printCancel="printCancel" :showType="showType"/>
            <ApplyCheck />
            <NxDepartmentOrder :applyItem="applyItem" :editType = "editType" />


        </div>

</template>

<script>
    import api from '../../api/orderCustomer'
    import PrintSave from '@/components/Applys/PrintSave'
    import ApplyCheck from '@/components/Applys/ApplyCheck'
    import NxDepartmentOrder from '@/components/Applys/NxDepartmentOrder'
    import TablePanel from '@/components/Applys/TablePanel'

    export default {
        name: "ApplyFiftyPanel",
        props: ['nxDepId', 'depName','depPrintName'],
        computed: {
            disUser() {
                return this.$store.state.disUser;
            },
            disName() {
                return this.$store.state.disUser.nxDistributerEntity.nxDistributerName;
            },
            disId() {
                return this.$store.state.disUser.nxDistributerEntity.nxDistributerId;
            },
            todayDate (){
                var today = new Date();
                var year = today.getFullYear();//获取年份
                var month = today.getMonth() + 1;//获取月份
                var day = today.getDate();//获取日期
                console.log(year + "-" + month + "-" + day);
                return year + "-" + month + "-" + day;
            },
        },
        watch: {
            nxDepId: function (newVal) {
                this.nxDepId = newVal;
                this.currPage = 1;
                this.getOrderPageData();
                this.getToFillDepOrdersForPrint();
            },
            depPrintName: function (newVal) {
                this.depPrintName = newVal;
                this.currPage = 1;
                this.getOrderPageData();
                this.getToFillDepOrdersForPrint();
            },
        },

        components: {
            PrintSave,
            ApplyCheck,
            NxDepartmentOrder,
            TablePanel
        },
        data() {
            return {

                resList: [],
                gbList: [],
                depList: [],
                isactive: 0,

                gbDepId: -1,
                resFatherId: -1,
                gbDisId: -1,
                comId: -1,
                applyPrintArr: [],
                applyArr: [],
                subtotal: 0,
                tradeNo: "",
                currPage: 1,
                limit: 10,
                totalCount: "",
                totalPage: "",
                showType: "",
                subAmount: 0,
                depsPart: [],
                selectedIndex: 0,

                applyItem: "",
                editType: "",
                beforeId: "",



            }
        },


        mounted() {




            this.getOrderPageData();
            this.getToFillDepOrdersForPrint();


            var that = this;
            $('#deliveryOrderNew').on('dblclick', 'input', function () {
                console.log("dblclick")
                $(this).removeAttr("disabled");
                $(this).focus();
            });

            $('#deliveryOrderNew').on('keyup', 'input[name=price]', function (e) {
                console.log("keyupddupddd")

                    if (e.keyCode == 13) {
                    var index = $(this).attr('index');
                    var newPrice = $('input[name=price]').eq(index).val();
                    console.log("keyupddupddd 1333==index" + index)

                    var id = that.applyArr[index].nxDepartmentOrdersId;
                    var data = "orderId=" + id + '&price=' + newPrice;
                    api.saveToFillPriceOrder(data).then(res => {
                        if (res.code == 0) {
                            that.getOrderPageData();
                            that.getToFillDepOrdersForPrint();
                            $(this).blur();
                            $(this).attr('disabled', "true")

                        }
                    })
                    }

            });

            $('#deliveryOrderNew').on('keyup', 'input[name=weight]', function (e) {
                console.log("keyupddupddd")
                if (e.keyCode == 13) {
                    console.log("keyupddupddweidhdththhthththt")
                    var index = $(this).attr('index');
                    var newWeight = $('input[name=weight]').eq(index).val();

                    var id = that.applyArr[index].nxDepartmentOrdersId;
                    var data = "orderId=" + id + '&weight=' + newWeight;
                    api.giveOrderWeight(data).then(res => {
                        if (res.code == 0) {
                            that.getOrderPageData();
                            that.getToFillDepOrdersForPrint();
                            $(this).blur();
                            $(this).attr('disabled', "true")

                        }
                    })
                }
            });



        },

        methods: {


            addBefore(index){
                this.applyItem = this.applyArr[index];
                this.editType = "add";
                this.beforeId = this.applyArr[index].nxDepartmentOrderId;
                $('#nx_order_modal').show();

            },

            editOrder(index){
                this.applyItem = this.applyArr[index];
                this.editType = "edit";
                $('#nx_order_modal').show();
            },

            deleteOrder(){

            },

            PrintBillTwoChoice(){
                $('#modal_inventory').show();
                this.showType = "print";
                window.open("PrintChoice.html?id=" + this.nxDepId +'&printName=ApplyFiftyPanel&depName='
                    + this.depName );
            },

            printCancel(){
                window.location.reload();
            },


            printOk(){
                this.bus.$emit('loading', true);
                var ids = [];
                for(var i = 0; i < this.applyArrPrint.length; i++){
                    var id = this.applyArrPrint[i].nxDepartmentOrdersId;
                   ids.push(id);
                }
                var bill = {
                    nxDbTradeNo: this.tradeNo,
                    nxDbDepId: this.nxDepId,
                    nxDbDepFatherId: this.nxDepId,
                    nxDbTotal: this.subtotal,
                    nxDbIssueUserId: this.disUser.nxDistributerUserId,
                    nxOrderIds: ids,
                    nxDbPrintTimes: 1,
                    nxDbGbDisId: this.gbDisId,
                    nxDbDisId: this.disUser.nxDiuDistributerId,
                    nxDbGbDepId: this.gbDepId,
                    nxDbNxCommunityId: this.comId,
                    nxDbNxRestrauntId: this.resFatherId
                };
                console.log(bill);
                api.saveAccountBill(bill).then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);
                        window.location.reload();
                    }
                })

            },


            _checkCanSave(){
                var arr = this.applyArrPrint;
                var count = 0;
                if(arr.length > 0){
                    for(var i = 0; i < arr.length;i++){
                        console.log("iiiiiiiiiiii")
                        var nxDoWeight = arr[i].nxDoWeight;
                        var nxDoPrice = arr[i].nxDoPrice;
                        if (Number(nxDoWeight) > 0 && Number(nxDoPrice) ){
                            count = count + 1;
                            console.log(i);
                            console.log("counctnntnntnntt", count);
                        }
                    }
                }
                console.log("count====" + count + "lengnht==" + this.applyArrPrint.length)
                if(count == this.applyArrPrint.length){
                    return true;
                }else{
                    return  false;
                }
            },

            PrintBillTwo(){
                var canSave =  this._checkCanSave();

                if(canSave){
                    this.PrintBillTwoMain()
                }else{
                    $('#modal_check').show()
                }
            },
            PrintBillTwoMain: function () {
                $('#modal_inventory').show();
                this.showType = "main";

                var arr = this.applyArrPrint;
                var arrLen = this.applyArrPrint.length;
                var totalGoods = 60;
                var totalPriPage = Math.ceil(arrLen / totalGoods);
                if (totalPriPage <= 1) {
                    var applyBody = `<div id="page1" class="applyBody"  ></div>`
                    $('#testDeliveryTwo').append(applyBody);
                    var top = `<div class="" style="width: 100%; float: left; height: 80px; "></div>`
                    $('#page1').append(top);

                    var header = `<div class="header" style="width: 100%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `送货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 12px; ">
                                <div style="line-height: 18px;">共1页-第1页</div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;
                    $('#page1').append(header);

                    var content = `<div class="content_bill" style="width: 90%; margin-left: 5%; float: left; border-bottom:1px solid gray; border-right:  1px solid gray;  "></div>`

                    $('#page1').append(content);

                    var left = `<div class="left_bill" style="float: left; width: 50%;"></div>`
                    $('.content_bill:eq(0)').append(left);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; border-left: 1px solid gray;">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 30%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">规格</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(oneTitle);


                    var middle = `<div class="middle_bill" style="float: left; width: 50%;"></div>`
                    $('.content_bill:eq(0)').append(middle);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%;  line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 30%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">规格</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                    $('.middle_bill:eq(0)').append(oneTitle);




                    for (var j = 0; j < arr.length; j++) {
                        if (j < totalGoods / 2) {
                            var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; font-size: 12px; text-align: center;"></div>`
                            $('.left_bill:eq(0)').append(oneItem);
                            var index = Number(j) + 1;

                            var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray; " >`+ index + `</div>`
                            var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 30%; border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                            var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; " >` + arr[j]['nxDoWeight'] + `</div>`
                            var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrintStandard'] + `</div>`
                            var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrice'] + `</div>`
                            var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['nxDoSubtotal'] + `</div>`;

                            $('.oneItem:eq(' + j + ')').append(indexC);
                            $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                            $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                            $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                            $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                            $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);

                        } else if (totalGoods / 2 <= j && j < totalGoods ) {
                            var index = Number(j) + 1;

                            var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 12px;"></div>`
                            $('.middle_bill:eq(0)').append(oneItem);
                            var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;" >`+ index + `</div>`
                            var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 30%;  border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                            var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; " >` + arr[j]['nxDoWeight'] + `</div>`
                            var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrintStandard'] + `</div>`
                            var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrice'] + `</div>`
                            var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['nxDoSubtotal'] + `</div>`;

                            $('.oneItem:eq(' + j + ')').append(indexC);
                            $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                            $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                            $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                            $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                            $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);

                        }
                    }

                    var sub = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 24px; text-align: center;font-size: 13px;border-top: 1px solid gray;">

                                <div style="box-sizing: border-box; float:left; width: 80%; border-left: 1px solid gray; padding-right: 10px; text-align: right;">合计:</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">` + this.subtotal +`</div>
                                </div>`;
                    $('.content_bill').append(sub);

                    var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; ">收货人: </div>
                               <div style="width: 33%; float: left; ">送货人: </div>
                            </div>
                          </div>`;
                    $('#page1').append(footer);

                } else {

                    for (var i = 1; i <= totalPriPage; i++) {
                        console.log("dayu 45 ge le;")
                        var newi = i - 1

                        var applyBody = `<div id=page` + i + ` class="applyBody" ></div>`
                        $('#testDeliveryTwo').append(applyBody);
                        var top = `<div class="" style="width: 100%; float: left; height: 80px; "></div>`
                        $('#' + "page" + i).append(top);


                        var header = `<div class="header" style="width: 100%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `送货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 12px; ">
                                <div style="line-height: 18px;">共` + totalPriPage + `页  第` + i + `页  </div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;

                        $('#' + "page" + i).append(header);

                        var content = `<div class="content_bill" style="width: 90%; margin-left: 5%; float: left; border-bottom:1px solid gray; border-right:  1px solid gray;  "></div>`

                        $('#' + "page" + i).append(content);

                        var left = `<div class="left_bill" style="float: left; width: 50%;"></div>`
                        $('.content_bill:eq('+ newi +')').append(left);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; border-left: 1px solid gray;">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 30%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">规格</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                        $('.left_bill:eq(' + newi + ')').append(oneTitle);

                        var middle = `<div class="middle_bill" style="float: left; width: 50%;"></div>`
                        $('.content_bill:eq(' + newi + ')').append(middle);


                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%;  line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 30%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">规格</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">小计</div>
                                </div>`;
                        $('.middle_bill:eq(' + newi + ')').append(oneTitle);


                            for (var j = i * totalGoods - totalGoods; j < i * totalGoods; j++) {

                                if (j < arrLen) {
                                    if (j < (i - 1) * totalGoods + totalGoods / 2 ) {
                                        console.log(j)

                                        var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; font-size: 12px; text-align: center;"></div>`
                                        $('.left_bill:eq(' + newi + ')').append(oneItem);
                                        var index = Number(j) + 1;

                                        var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray; " >`+ index + `</div>`
                                        var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 30%; border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                                        var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; " >` + arr[j]['nxDoWeight'] + `</div>`
                                        var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrintStandard'] + `</div>`
                                        var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrice'] + `</div>`
                                        var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['nxDoSubtotal'] + `</div>`;

                                        $('.oneItem:eq(' + j + ')').append(indexC);
                                        $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                                        $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                                        $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                                        $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                                        $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);
                                    }else{
                                        var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                                line-height: 24px; font-size: 12px; text-align: center;"></div>`
                                        $('.middle_bill:eq(' + newi + ')').append(oneItem);
                                        var index = Number(j) + 1;

                                        var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray; " >`+ index + `</div>`
                                        var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 30%; border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                                        var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; " >` + arr[j]['nxDoWeight'] + `</div>`
                                        var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrintStandard'] + `</div>`
                                        var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; " >` + arr[j]['nxDoPrice'] + `</div>`
                                        var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; " >` + arr[j]['nxDoSubtotal'] + `</div>`;

                                        $('.oneItem:eq(' + j + ')').append(indexC);
                                        $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                                        $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                                        $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                                        $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                                        $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);
                                    }
                                }

                            }


                            var sub = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 34px; text-align: center;font-size: 16px;border-top: 1px solid gray;">

                                <div style="box-sizing: border-box; float:left; width: 80%; border-left: 1px solid gray; padding-right: 10px; text-align: right;">合计:</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">` + this.subtotal +`元</div>
                                </div>`;
                            $('.content_bill:eq('+ newi +')').append(sub);

                            var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px; height: 130px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; ">收货人: </div>
                               <div style="width: 33%; float: left; ">送货人: </div>
                            </div>
                          </div>`

                        $('#' + "page" + i).append(footer);

                    }
                    var fenye = `<div style="page-break-after:always"></div>`

                    $('#' + "page" + i).append(fenye);
                }

                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                    "<style media=\"print\">" +
                    "    @page {" +
                    "      size: auto;  /* auto is the initial value */\n" +
                    "      margin: 0mm; /* this affects the margin in the printer settings */\n" +

                    "    }" +
                    "</style>" +
                    "</head><body style=' margin: 0;'>";
                var content = "";
                for (var m = 0; m < totalPriPage; m++) {
                    var newm = m + 1;
                    var str = document.getElementById('page' + newm + '').innerHTML;
                    content = content + str;
                }
                //height: 140px;


                printStr = printStr + content + "</body></html>";
                var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需
                pwin.document.write(printStr);
                pwin.document.close();     //这句很重要，没有就无法实现
                pwin.print();


            },



            PrintBillTwoPick: function(){
                $('#modal_inventory').show();
                this.showType = "print";

                var arr = this.applyArrPrint;
                var arrLen = this.applyArrPrint.length;
                var totalGoods = 50;
                var totalPriPage = Math.ceil(arrLen / totalGoods);
                if (totalPriPage <= 1) {
                    var applyBody = `<div id="page1" class="applyBody"  ></div>`
                    $('#testDeliveryTwo').append(applyBody);
                    var top = `<div class="" style="width: 80%; float: left; height: 80px; "></div>`
                    $('#page1').append(top);

                    var header = `<div class="header" style="width: 80%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `拣货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 12px; ">
                                <div style="line-height: 18px;">共1页-第1页</div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;
                    $('#page1').append(header);

                    var content = `<div class="content_bill" style="width: 70%; margin-left: 5%; float: left; border-bottom:1px solid gray; border-right:  1px solid gray;  "></div>`

                    $('#page1').append(content);

                    var left = `<div class="left_bill" style="float: left; width: 50%;"></div>`
                    $('.content_bill:eq(0)').append(left);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 34px; text-align: center;font-size: 16px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; border-left: 1px solid gray;">序</div>
                                <div style="box-sizing: border-box; float:left; width: 40%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">订货</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">出货</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(oneTitle);


                    var middle = `<div class="middle_bill" style="float: left; width: 50%;"></div>`
                    $('.content_bill:eq(0)').append(middle);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%;  line-height: 34px; text-align: center;font-size: 16px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                 <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">序</div>
                                <div style="box-sizing: border-box; float:left; width: 40%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">订货</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">出货</div>
                               </div>`;
                    $('.middle_bill:eq(0)').append(oneTitle);




                    for (var j = 0; j < arr.length; j++) {
                        if (j < totalGoods / 2) {
                            var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;border-right: 1px solid gray;
                                                                        line-height: 34px; font-size: 14px; text-align: center;"></div>`
                            $('.left_bill:eq(0)').append(oneItem);
                            var index = Number(j) + 1;

                            var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray; " >`+ index + `</div>`
                            var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 40%; border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                            var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['nxDoQuantity'] +arr[j]['nxDoStandard'] + `</div>`

                            $('.oneItem:eq(' + j + ')').append(indexC);
                            $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                            $('.oneItem:eq(' + j + ')').append(nxDoWeight);

                        } else if (totalGoods / 2 <= j && j < totalGoods ) {
                            var index = Number(j) + 1;

                            var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray; border-right: 1px solid gray;
                                                                        line-height: 34px; text-align: center;font-size: 14px;"></div>`
                            $('.middle_bill:eq(0)').append(oneItem);
                            var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;" >`+ index + `</div>`
                            var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 40%;  border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                            var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['nxDoWeight'] + arr[j]['nxDoStandard'] +`</div>`

                            $('.oneItem:eq(' + j + ')').append(indexC);
                            $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                            $('.oneItem:eq(' + j + ')').append(nxDoWeight);

                        }
                    }


                } else {

                    for (var i = 1; i <= totalPriPage; i++) {
                        var newi = i - 1
                        var applyBody = `<div id=page` + i + ` class="applyBody" ></div>`
                        $('#testDeliveryTwo').append(applyBody);
                        var top = `<div class="" style="width: 100%; float: left; height: 80px; "></div>`
                        $('#' + "page" + i).append(top);


                        var header = `<div class="header" style="width: 80%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `拣货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 12px; ">
                                <div style="line-height: 18px;">共` + totalPriPage + `页  第` + i + `页  </div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;

                        $('#' + "page" + i).append(header);

                        var content = `<div class="content_bill" style="width: 70%; margin-left: 5%; float: left;  "></div>`

                        $('#' + "page" + i).append(content);

                        var left = `<div class="left_bill" style="float: left; width: 50%;"></div>`
                        $('.content_bill:eq('+ newi +')').append(left);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 34px; text-align: center;font-size: 16px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; border-left: 1px solid gray;">序</div>
                                <div style="box-sizing: border-box; float:left; width: 40%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">订货</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">出货</div>
                                </div>`;
                        $('.left_bill:eq(' + newi + ')').append(oneTitle);

                        var middle = `<div class="middle_bill" style="float: left; width: 50%;"></div>`
                        $('.content_bill:eq(' + newi + ')').append(middle);


                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%;  line-height: 34px; text-align: center;font-size: 16px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">序</div>
                                <div style="box-sizing: border-box; float:left; width: 40%; border-right: 1px solid gray; ">商品</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">订货</div>
                                <div style="box-sizing: border-box; float:left; width: 25%; border-right: 1px solid gray; ">出货</div>
                                </div>`;
                        $('.middle_bill:eq(' + newi + ')').append(oneTitle);


                        for (var j = i * totalGoods - totalGoods; j < i * totalGoods; j++) {

                            if (j < arrLen) {
                                if (j < (i - 1) * totalGoods + totalGoods / 2 ) {
                                    console.log(j)

                                    var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray; border-right: 1px solid gray;
                                                                        line-height: 34px; font-size: 14px; text-align: center;"></div>`
                                    $('.left_bill:eq(' + newi + ')').append(oneItem);
                                    var index = Number(j) + 1;

                                    var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray; " >`+ index + `</div>`
                                    var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 40%; border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                                    var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['nxDoQuantity'] + arr[j]['nxDoStandard'] + `</div>`

                                    $('.oneItem:eq(' + j + ')').append(indexC);
                                    $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                                    $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                                }else{
                                    var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray; border-right: 1px solid gray;
                                                                                line-height: 34px; font-size: 14px; text-align: center;"></div>`
                                    $('.middle_bill:eq(' + newi + ')').append(oneItem);
                                    var index = Number(j) + 1;

                                    var indexC = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray;border-left: 1px solid gray; " >`+ index + `</div>`
                                    var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 40%; border-right: 1px solid gray; text-align: left; padding-left: 10px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                                    var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 25%; border-right: 1px solid gray; " >` + arr[j]['nxDoQuantity']+ arr[j]['nxDoStandard']  + `</div>`

                                    $('.oneItem:eq(' + j + ')').append(indexC);
                                    $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                                    $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                                }
                            }

                        }
                        var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 16px; height: 90px;">
                            <div style=" width: 100%; line-height: 38px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; ">拣货员: </div>
                            </div>
                          </div>`;
                        $('.left_bill:eq('+ newi +')').append(footer);


                    }
                    var fenye = `<div style="page-break-after:always"></div>`

                    $('#' + "page" + i).append(fenye);
                }

                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                    "<style media=\"print\">" +
                    "    @page {" +
                    "      size: auto;  /* auto is the initial value */\n" +
                    "      margin: 0mm; /* this affects the margin in the printer settings */\n" +

                    "    }" +
                    "</style>" +
                    "</head><body style=' margin: 0;'>";
                var content = "";
                for (var m = 0; m < totalPriPage; m++) {
                    var newm = m + 1;
                    var str = document.getElementById('page' + newm + '').innerHTML;
                    content = content + str;
                }
                //height: 140px;


                printStr = printStr + content + "</body></html>";
                var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需
                pwin.document.write(printStr);
                pwin.document.close();     //这句很重要，没有就无法实现
                pwin.print();


            //    pickPrint!!!!

            },

            //点击产品类别
            onclick(index, nxDepId, depName) {
                this.isactive = index;
                this.nxDepId = nxDepId;
                this.depName = depName;
                this.currPage = 1;
                this.getOrderPageData();
                this.getToFillDepOrdersForPrint();

            },


            getCurrPage(index){
                console.log(index + '????' + this.currPage)
                if(this.currPage !== index +1){
                    this.currPage = Number(index) + Number(1);
                    this.getOrderPageData();
                }

            },

            nextPage(type){
                console.log(type + "currpage====" + this.currPage + "totapage===" + this.totalPage)
                if(type == "next"){

                    if(this.currPage < this.totalPage){
                        this.currPage = Number(this.currPage) + Number(1);
                        this.getOrderPageData();
                    }
                }
                if(type == "before"){
                    if(this.currPage > 1){
                        this.currPage = Number(this.currPage) - Number(1);
                        this.getOrderPageData();
                    }
                }

            },

            getOrderPageData: function (e) {
                this.bus.$emit('loading', true);
                var data = "page=" + this.currPage + "&limit=" + this.limit + "&depFatherId=" + parseInt(this.nxDepId) + "&gbDepFatherId="
                    + parseInt(this.gbDepId) + "&resFatherId=" + parseInt(this.resFatherId);
                api.webGetOrderPage(data).then(res => {

                    console.log("withsusbsbbsb");
                    console.log(res.data);
                    this.bus.$emit('loading', false);
                    this.subAmount =res.data.length;
                    this.depsPart = res.data;

                    this.applyArr = res.data[0].page.list;
                    this.totalCount = res.data[0].page.totalCount;
                    this.totalPage = res.data[0].page.totalPage;
                    this.totalCount = res.data[0].page.totalCount;
                    this.currPage = res.data[0].page.currPage;
                    this.subtotal = res.data[0].total;

                });
            },


            getToFillDepOrdersForPrint: function (e) {
                var data = "depFatherId=" + parseInt(this.nxDepId) + "&gbDepFatherId=" + parseInt(this.gbDepId)
                    + "&resFatherId=" + parseInt(this.resFatherId) + "&disId=" + this.disId;
                api.disGetToFillDepOrders(data).then(res => {
                    this.subAmount = res.data.subAmount;
                    this.tradeNo = res.data.tradeNo;
                    if(res.data.subAmount > 0){
                        var temp = [];
                        for(var i = 0; i < res.data.arr.length;i++){
                            console.log("lennntt=====" + res.data.arr[i].depOrders.length);
                            temp = temp.concat(res.data.arr[i].depOrders);
                        }
                        this.applyArrPrint = temp;
                    }else{
                        this.applyArrPrint = res.data.arr;
                    }
                });

            },


            getSubDepApply(index){

                console.log("getSubDepApplygetSubDepApply", index);
                this.selectedIndex = index;
                this.applyArr = this.depsPart[index].page.list;
                this.totalCount = this.depsPart[index].page.totalCount;
                this.totalPage = this.depsPart[index].page.totalPage;
                this.totalCount = this.depsPart[index].page.totalCount;
                this.currPage = this.depsPart[index].page.currPage;
                this.subtotal = this.depsPart[index].total;
                this.$forceUpdate();
            }



        }
    }
</script>

<style scoped>


    .category {
        padding-left: 0;
    }

    input{
        width: 100px;
    }



</style>
