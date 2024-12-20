<template>


        <div class="row ">
            <div class="col-md-6" v-if="subAmount == '0'">

                <div class="box box-primary" >
                    <div class="box-header with-border">
                        <div class="row">
                            <div class="col-md-4 col-sm-4">
                                <h5>日期：{{todayDate}}</h5>
                                <h5>商品：{{applyArrPrint.length}}个</h5>
                                <h5 class="">总金额：{{subtotal}} 元</h5>
                            </div>
                            <div class="col-md-4  col-sm-4">
                                <h2>{{depName}}</h2>
                            </div>
                            <div class="col-md-4  col-sm-4">
                                <h5>格式:一张一列</h5>
                                <button class="" @click="PrintBillOne(0)">打印选择商品</button>
                            </div>
                        </div>
                    </div>


                    <div class="box-body no-padding ">

                        <div class="" id="deliveryOrderNew" style="background: #fff; ">
                            <table class="table table-striped ">
                                <thead>
                                <tr>
<!--                                    <th style="text-align: center;">-->
<!--                                        <label class="css-input css-checkbox css-checkbox-primary">-->
<!--                                            <input type="checkbox"  id="checkAll" @click="choiceAll"><span></span>-->
<!--                                        </label>-->
<!--                                    </th>-->
                                    <th>序号</th>
                                    <th>商品名称</th>
                                    <th>申请</th>
                                    <th>出库数量</th>
                                    <th>单价</th>
                                    <th>小计</th>
                                </tr>
                                </thead>

                                <tbody class=""   >

                                <tr v-for="(item, index) in applyArrPrint">

                                    <td class="text-center" style="width: 40px;">
                                        <label class="css-input css-checkbox css-checkbox-primary">
                                            <input type="checkbox"  :checked="item.hasChoice"  @click="choice(index)" ><span></span>
                                        </label>
                                    </td>
                                    <td>{{index + 1}}</td>
                                    <td>{{item.nxDistributerGoodsEntity.nxDgGoodsName}}</td>

                                    <td>
                                        {{item.nxDoQuantity}}{{item.nxDoStandard}}
                                    </td>
                                    <td>
                                        <input type="text" name="weight"
                                               :value="item.nxDoWeight"
                                               :index="index"
                                               disabled
                                        >{{item.nxDoPrintStandard}}
                                    </td>
                                    <td :style='item.nxDoPrice !== null && item.nxDoPrice > 0? "color: blue": "" '>
                                        <input type="text" name="price"
                                               :value="item.nxDoPrice"
                                               :index="index"
                                               disabled></td>
                                    <td class="cost">
                                        {{item.nxDoSubtotal}}
                                    </td>

                                </tr>

                                </tbody>




                            </table>
                            <div class="flex-column-center" style="padding: 40px; background: #fff; font-size: 10px; text-align: center;">没有数据啦！</div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="col-md-6" v-else v-for="(item, index) in applyArrPrint">

                <div class="box box-primary" >
                    <div class="box-header with-border">
                        <div class="row">
                            <div class="col-md-4 col-sm-4">
                                <h5>日期：{{todayDate}}</h5>
                                <h5>商品：{{item.depOrders.length}}个</h5>
                                <h5 class="">总金额：{{item.depSubtotal}} 元</h5>
                            </div>
                            <div class="col-md-4  col-sm-4">
                                <h2>
                                    {{depName}}-{{item.depName}}
                                </h2>
                            </div>
                            <div class="col-md-4  col-sm-4">
                                <h5>格式:一张一列</h5>
                                <button class="btn btn-success btn-sm" style="padding: 4px 54px; margin: 10px 0px ;"  @click="PrintBillOne(index)">打印</button>
                            </div>
                        </div>
                    </div>


                    <div class="box-body no-padding " >

                        <div class="" :id="`deliveryOrderNew${index}`" style="background: #fff; ">
                            <table class="table table-striped ">
                                <thead>
                                <tr>
                                    <th style="width: 30px;">序号</th>
                                    <th>商品名称</th>
                                    <th>申请</th>
                                    <th>出库数量</th>
                                    <th>单价</th>
                                    <th>小计</th>
                                </tr>
                                </thead>



                                <tbody  >

                                <tr  v-for="(orders, orderIndex) in item.depOrders">
                                    <td style="width: 30px;">{{orderIndex + 1}}</td>
                                    <td style="width: 120px;">{{orders.nxDistributerGoodsEntity.nxDgGoodsName}}</td>

                                    <td>
                                        {{orders.nxDoQuantity}}{{orders.nxDoStandard}}
                                    </td>
                                    <td>
                                        <input type="text" name="weight"
                                               :value="orders.nxDoWeight"
                                               :index="index"
                                               disabled
                                        >{{orders.nxDoPrintStandard}}
                                    </td>
                                    <td :style='orders.nxDoPrice !== null && orders.nxDoPrice > 0? "color: blue": "" '>
                                        <input type="text" name="price"
                                               :value="orders.nxDoPrice"
                                               :index="index"
                                               disabled></td>
                                    <td class="cost">
                                        {{orders.nxDoSubtotal}}
                                    </td>
                                </tr>

                                </tbody>


                            </table>
                            <div class="flex-column-center" style="padding: 40px; background: #fff; font-size: 10px; text-align: center;">没有数据啦！</div>
                        </div>

                    </div>

                </div>
            </div>

            <div style="display: none" id="testDeliveryOneChoice"></div>
            <PrintSave @printOk="printOk" @printCancel="printCancel" :showType="showType"/>
            <ApplyCheck />
        </div>




</template>

<script>
    import api from '../../api/orderCustomer'
    import PrintSave from '@/components/Applys/PrintSave'
    import ApplyCheck from '@/components/Applys/ApplyCheck'

    export default {
        name: "ApplyPanelChoice",
        props: ['nxDepFatherId', 'depName'],
        computed: {

            disUser() {
                return this.$store.state.disUser;
            },
            disId() {
                return this.$store.state.disUser.nxDistributerEntity.nxDistributerId;
            },
            disName() {
                return this.$store.state.disUser.nxDistributerEntity.nxDistributerName;
            },

            todayDate() {
                var today = new Date();
                var year = today.getFullYear();//获取年份
                var month = today.getMonth() + 1;//获取月份
                var day = today.getDate();//获取日期
                console.log(year + "-" + month + "-" + day);
                return year + "-" + month + "-" + day;
            },

        },



        components: {
            PrintSave,
            ApplyCheck
        },
        data() {
            return {
                isactive: 0,
                gbDepId: -1,
                resFatherId: -1,
                gbDisId: -1,
                comId: -1,
                applyArrPrint: [],
                choiceArr: [],
                subtotal: 0,
                subtotalHanzi: "",
                depSubtotalHanzi: "",
                printSubtotal: 0,
                tradeNo: "",
                checkAll: false,
                subAmount: 0,
                showType: "main",
                nxDepId: "",
                depSubtotal: ""
            }
        },


        mounted() {


           this.getOrderPageForPrint();

            var that = this;

            $('#deliveryOrderNew').on('dblclick', 'input', function () {
                console.log("dblclick")
                $(this).removeAttr("disabled");
                $(this).focus();
            });


            $('#deliveryOrderNew').on('keyup', 'input', function (e) {

                // if (e.keyCode == 13) {
                var index = $(this).attr('index');
                var newPrice = $('input[name=price]').eq(index).val();
                newPrice = String(newPrice).replace('。', '.');
                var orderPrice = "";
                if (!isNaN(newPrice) && newPrice.trim() !== '') {
                    orderPrice =  parseFloat(newPrice); // 返回数字类型
                } else {
                    // orderPrice = -1 // 不是数字时返回 NaN
                    $('#modal_check').show()
                }
                var newQuantity = $('input[name=weight]').eq(index).val();
                newQuantity = String(newQuantity).replace('。', '.');
                var orderQuantity = "";
                if (!isNaN(newQuantity) && newQuantity.trim() !== '') {
                    orderQuantity =  parseFloat(newQuantity); // 返回数字类型
                } else {
                    // orderPrice = -1 // 不是数字时返回 NaN
                    $('#modal_check').show()
                }
                var nxDoSubtotal = (Number(orderPrice) * Number(orderQuantity)).toFixed(1)
                var data = that.applyArrPrint[index];
                data.nxDoWeight = orderQuantity;
                data.nxDoPrice = orderPrice;
                data.nxDoSubtotal = nxDoSubtotal;
                api.saveToFillPriceOrder(data).then(res => {
                    if (res.code == 0) {
                        that.getOrderPageForPrint();
                        $(this).blur();
                        $(this).attr('disabled', "true")

                    }
                })
                // }
            });


        },
        methods: {

            choiceAll(){
                console.log(this.checkAll);
                if(this.checkAll){
                    for(var i = 0; i < this.applyArrPrint.length; i++){
                        console.log(this.applyArrPrint[i].hasChoice )
                        this.applyArrPrint[i].hasChoice = false;

                    }
                }else{
                    for(var i = 0; i < this.applyArrPrint.length; i++){
                        this.applyArrPrint[i].hasChoice = true;
                        console.log("falldlddgaigai-----> true" + this.applyArrPrint[i].hasChoice )
                    }
                }
                this.checkAll = !this.checkAll;
            },

            choice(index){
                this.applyArrPrint[index].hasChoice = !this.applyArrPrint[index].hasChoice;
            },



            getOrderPageForPrint(){
                var data = "depFatherId=" + parseInt(this.nxDepFatherId) + "&gbDepFatherId=" + parseInt(this.gbDepId) + "&resFatherId="
                    + parseInt(this.resFatherId) + "&disId=" + this.disId;
                api.disGetToFillDepOrders(data).then(res => {
                    this.applyArrPrint = res.data.arr;
                    this.tradeNo = res.data.tradeNo;
                    this.subtotal = res.data.total;
                    this.subtotalHanzi = res.data.totalHanzi;
                    this.subAmount = res.data.subAmount;
                    if(this.applyArrPrint.length == 0){
                        window.close();
                    }
                })
            },

            printCancel(){
                window.location.reload();
            },


            printOk() {
                var ids = [];
                for(var i = 0; i < this.choiceArr.length; i++){
                    var id = this.choiceArr[i].nxDepartmentOrdersId;
                    ids.push(id);
                }
                var bill = {
                    nxDbTradeNo: this.tradeNo,
                    nxDbDepFatherId: this.nxDepFatherId,
                    nxDbDepId: this.nxDepId,
                    nxDbTotal: this.depSubtotal,
                    nxDbIssueUserId: this.disUser.nxDistributerUserId,
                    nxOrderIds: ids,
                    nxDbPrintTimes: 1,
                    nxDbGbDisId: this.gbDisId,
                    nxDbDisId: this.disUser.nxDiuDistributerId,
                    nxDbGbDepId: this.gbDepId,
                    nxDbNxCommunityId: this.comId,
                    nxDbNxRestrauntId: this.resFatherId
                };
                this.bus.$emit('loading', true);
                api.saveAccountBill(bill).then(res => {
                    if (res) {
                        this.bus.$emit('loading', false);
                        window.location.reload();

                    }
                })
            },

            _getArr(){
                var temp = [];
                var total = 0;
                for(var i = 0; i  < this.applyArrPrint.length; i++){
                    var haschoice = this.applyArrPrint[i].hasChoice;
                    if(haschoice){
                        temp.push(this.applyArrPrint[i]);
                        total = (Number(total) + Number(this.applyArrPrint[i].nxDoSubtotal)).toFixed(1);
                    }
                }
                this.choiceArr = temp;
                this.printSubtotal = total;
                return temp;
            },


            _checkCanSave(){
                var that  = this;
                var arr = that.choiceArr;
                var count = 0;
                if(arr.length > 0){
                    for(var i = 0; i < arr.length;i++){
                        var nxDoWeight = arr[i].nxDoWeight;
                        var nxDoPrice = arr[i].nxDoPrice;
                        if (Number(nxDoWeight) > 0 && Number(nxDoPrice) ){
                            count = count + 1;
                        }
                    }
                }

                if(count == that.choiceArr.length){
                    return true;
                }else{
                    return  false;
                }
            },

            PrintBillOne(index){

                this.choiceArr =  this.applyArrPrint[index].depOrders;
                this.printSubtotal = this.applyArrPrint[index].depSubtotal;
                this.depName = this.depName + "-" + this.applyArrPrint[index].depName;
                this.nxDepId = this.applyArrPrint[index].depId;
                this.depSubtotal = this.applyArrPrint[index].depSubtotal;
                this.depSubtotalHanzi = this.applyArrPrint[index].depSubtotalHanzi;

                // this.PrintBillOneMain(index)
                var canSave =  this._checkCanSave();
                console.log("111111111", canSave)
                if(canSave && this.choiceArr.length > 0){
                    this.PrintBillOneMain()

                }else{
                    $('#modal_check').show()
                }
            },

            PrintBillOneMain: function (index) {
                console.log("modallalal")
                $('#modal_inventory').show();

                var arr = this.choiceArr;
                var arrLen = this.choiceArr.length;
                var totalGoods = 30;
                var totalPriPage = Math.ceil(arrLen / totalGoods);
                if (totalPriPage <= 1) {
                    var applyBody = `<div id="page1" class="applyBody" ></div>`
                    $('#testDeliveryOneChoice').append(applyBody);
                    var top = `<div class="" style="width: 100%; float: left; height: 80px; "></div>`
                    $('#page1').append(top);

                    var header = `<div class="header" style="width: 100%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.fullDepName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `送货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 10px; ">
                                <div style="line-height: 18px;">共1页-第1页</div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;
                    $('#page1').append(header);

                    var content = `<div class="content_bill" style="width: 90%; margin-left: 5%; float: left; "></div>`

                    $('#page1').append(content);

                    var left = `<div class="left_bill" style="float: left; width: 100%;"></div>`
                    $('.content_bill:eq(0)').append(left);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 30px; text-align: center;font-size: 12px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 5%; border-right: 1px solid gray; border-left: 1px solid gray;">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; ">品名</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">单位</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">金额(元)</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(oneTitle);

                    for (var j = 0; j < arr.length; j++) {
                        var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 12px;"></div>`
                        $('.left_bill:eq(0)').append(oneItem);
                        var index = Number(j) + 1;
                        var nxIndex = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 5%; border-right: 1px solid gray;border-left: 1px solid gray; border-right: 1px solid gray;" >` + index + `</div>`
                        var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray;text-align: left; padding-left: 4px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                        var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; text-align: center;" >` +arr[j]['nxDoPrintStandard']  + `</div>`
                        var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray;text-align: center; " >` + arr[j]['nxDoWeight'] + `</div>`
                        var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; text-align: center; padding-right: 10px;" >` + arr[j]['nxDoPrice'] + `</div>`
                        var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; text-align: right;padding-right: 10px;" >` + arr[j]['nxDoSubtotal'] + `</div>`;

                        $('.oneItem:eq(' + j + ')').append(nxIndex);
                        $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                        $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                        $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                        $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                        $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);
                    }


                    var sub = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 24px; text-align: center;font-size: 13px;border-bottom: 1px solid gray;">

                                <div style="box-sizing: border-box; float:left; width: 50%; border-left: 1px solid gray; padding-right: 10px; text-align: left;">
                                <div>合计大写:  `+this.depSubtotalHanzi + `</div>
                                </div>
                                <div style="box-sizing: border-box; float:left; width: 50%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">合计:` + this.depSubtotal +`</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(sub);


                    if(this.disUser.nxDistributerEntity.nxDistributerAddress !== 1){
                        var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;float: left; " >
                               <div>地址:`+ this.disUser.nxDistributerEntity.nxDistributerAddress + `</div>
                               </div>
                            </div>
                          </div>`;
                    }else{
                        var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; " >
                               <div>送货人: </div>
                               </div>
                               <div style="width: 33%; float: left; ">送货人: </div>
                            </div>
                          </div>`;
                    }
                    $('.left_bill:eq(0)').append(footer);

                } else {

                    for (var i = 1; i <= totalPriPage; i++) {
                        console.log("dayu 45 ge le====" , arrLen)
                        var newi = i - 1

                        var applyBody = `<div id=page` + i + ` class="applyBody" ></div>`
                        $('#testDeliveryOneChoice').append(applyBody);
                        var top = `<div class="" style="width: 100%; float: left; height: 80px; "></div>`
                        $('#' + "page" + i).append(top);

                        var header = `<div class="header" style="width: 100%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `送货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 10px; ">
                                <div style="line-height: 18px;">共` + totalPriPage + `页-第 ` + i + `页</div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;
                        $('#' + "page" + i).append(header);


                        var content = `<div class="content_bill" style="width: 90%; margin-left: 5%;float: left; "></div>`

                        $('#page' + i).append(content);

                        var left = `<div class="left_bill" style="float: left; width: 100%;"></div>`
                        $('.content_bill:eq(' + newi + ')').append(left);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%;  line-height: 30px; text-align: center;font-size: 12px; border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 5%; border-right: 1px solid gray; border-left: 1px solid gray;">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; ">品名</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">单位</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">金额(元)</div>
                                </div>`;
                        $('.left_bill:eq(' + newi + ')').append(oneTitle);


                        for (var j = i * totalGoods - totalGoods; j < i * totalGoods; j++) {

                            if (j < arrLen) {
                                var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 24px; text-align: center;font-size: 12px;"></div>`
                                $('.left_bill:eq(' + newi + ')').append(oneItem);
                                var index = Number(j) + 1;
                                var nxIndex = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 5%; border-right: 1px solid gray;border-left: 1px solid gray; border-right: 1px solid gray;" > `+ index + ` </div>`
                                var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray;text-align: left; padding-left: 4px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                                var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; text-align: center;" >` +arr[j]['nxDoPrintStandard']  + `</div>`
                                var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray;text-align: center; " >` + arr[j]['nxDoWeight'] + `</div>`
                                var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; text-align: center; padding-right: 10px;" >` + arr[j]['nxDoPrice'] + `</div>`
                                var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; text-align: right;padding-right: 10px;" >` + arr[j]['nxDoSubtotal'] + `</div>`;

                                $('.oneItem:eq(' + j + ')').append(nxIndex);
                                $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                                $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                                $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                                $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                                $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);

                            }

                        }

                         var sub = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 24px; text-align: center;font-size: 13px;border-bottom: 1px solid gray;">

                                <div style="box-sizing: border-box; float:left; width: 50%; border-left: 1px solid gray; padding-right: 10px; text-align: left;">
                                <div>合计大写:  `+this.subtotalHanzi + `</div>
                                </div>
                                <div style="box-sizing: border-box; float:left; width: 50%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">合计:` + this.subtotal +`</div>
                                </div>`;
                        $('.left_bill:eq('+ newi +')').append(sub);


                        if(this.disUser.nxDistributerEntity.nxDistributerAddress !== 1){
                            var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%; float: left; " >
                               <div>地址:`+ this.disUser.nxDistributerEntity.nxDistributerAddress + `</div>
                               </div>
                            </div>
                          </div>`;
                        }else{
                            var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; " >
                               <div>送货人: </div>
                               </div>
                               <div style="width: 33%; float: left; ">送货人: </div>
                            </div>
                          </div>`;
                        }

                        $('.left_bill:eq('+ newi +')').append(footer);

                    }
                    var fenye = `<div style="page-break-after:always"></div>`

                    $('#page1').append(fenye);
                }

                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                    "<style media=\"print\">" +
                    "    @page {" +
                    "      size: auto;  /* auto is the initial value */\n" +
                    "      margin: 0mm; /* this affects the margin in the printer settings */\n" +

                    "    }" +
                    "</style>" +
                    "</head><body style='height: 140px; margin: 0;'>";
                var content = "";
                for (var m = 0; m < totalPriPage; m++) {
                    var newm = m + 1;
                    var str = document.getElementById('page' + newm + '').innerHTML;
                    content = content + str;
                }


                printStr = printStr + content + "</body></html>";
                var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需
                pwin.document.write(printStr);
                pwin.document.close();     //这句很重要，没有就无法实现
                pwin.print();


            },
            PrintBillOneMain1: function () {
                console.log("modallalal")
                $('#modal_inventory').show();


                var arr = this.choiceArr;
                var arrLen = arr.length;
                var totalGoods = 41;
                var totalPriPage = Math.ceil(arrLen / totalGoods);
                if (totalPriPage <= 1) {
                    console.log("111111111111" , arrLen)
                    var applyBody = `<div id="page1" class="applyBody" ></div>`
                    $('#testDeliveryOneChoice').append(applyBody);
                    var top = `<div class="" style="width: 100%; float: left; height: 50px; "></div>`
                    $('#page1').append(top);

                    var header = `<div class="header" style="width: 100%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `送货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 10px; ">
                                <div style="line-height: 18px;">共1页-第1页</div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;
                    $('#page1').append(header);

                    var content = `<div class="content_bill" style="width: 90%; margin-left: 5%; float: left; "></div>`

                    $('#page1').append(content);

                    var left = `<div class="left_bill" style="float: left; width: 100%;"></div>`
                    $('.content_bill:eq(0)').append(left);

                    var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 24px; text-align: center;font-size: 13px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 5%; border-right: 1px solid gray; border-left: 1px solid gray;">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; ">品名</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">单位</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">金额(元)</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(oneTitle);

                    for (var j = 0; j < arr.length; j++) {
                        var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 18px; text-align: center;font-size: 12px;"></div>`
                        $('.left_bill:eq(0)').append(oneItem);
                        var index = Number(j) + 1;
                        var nxIndex = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 5%; border-right: 1px solid gray;border-left: 1px solid gray; border-right: 1px solid gray;" >` + index + `</div>`
                        var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray;text-align: left; padding-left: 4px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                        var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; text-align: center;" >` +arr[j]['nxDoPrintStandard']  + `</div>`
                        var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray;text-align: center; " >` + arr[j]['nxDoWeight'] + `</div>`
                        var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; text-align: right; padding-right: 10px;" >` + arr[j]['nxDoPrice'] + `</div>`
                        var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; text-align: right;padding-right: 10px;" >` + arr[j]['nxDoSubtotal'] + `</div>`;

                        $('.oneItem:eq(' + j + ')').append(nxIndex);
                        $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                        $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                        $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                        $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                        $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);
                    }

                    var subtotal = `<div class="" style="float: left; width: 100%;"></div>`
                    $('.content_bill:eq(0)').append(subtotal);


                    var sub = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 24px; text-align: center;font-size: 13px;border-bottom: 1px solid gray;">

                                <div style="box-sizing: border-box; float:left; width: 50%; border-left: 1px solid gray; padding-right: 10px; text-align: left;">
                                <div>合计大写:  `+this.subtotalHanzi + `</div>
                                </div>
                                <div style="box-sizing: border-box; float:left; width: 50%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">合计:` + this.subtotal +`</div>
                                </div>`;
                    $('.left_bill:eq(0)').append(sub);


                    if(this.disUser.nxDistributerEntity.nxDistributerAddress !== 1){
                        var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;float: left; " >
                               <div>地址:`+ this.disUser.nxDistributerEntity.nxDistributerAddress + `</div>
                               </div>
                            </div>
                          </div>`;
                    }else{
                        var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; " >
                               <div>送货人: </div>
                               </div>
                               <div style="width: 33%; float: left; ">送货人: </div>
                            </div>
                          </div>`;
                    }
                    $('.left_bill:eq(0)').append(footer);

                } else {

                    for (var i = 1; i <= totalPriPage; i++) {
                        console.log("dayu 45 ge le====" , arrLen)
                        var newi = i - 1

                        var applyBody = `<div id=page` + i + ` class="applyBody" ></div>`
                        $('#testDeliveryOneChoice').append(applyBody);
                        var top = `<div class="" style="width: 100%; float: left; height: 50px; "></div>`
                        $('#' + "page" + i).append(top);

                        var header = `<div class="header" style="width: 100%; float:left; ">
                            <div style=" width: 85%; margin-left: 7.5%; line-height: 36px;  float:left; font-size: 14px; " >
                               <div  style="width: 34%; float: left; ">
                                  <div style="line-height: 36px; font-size: 14px;">单位: `+ this.depName + `  </div>
                               </div>
                               <div style="width: 33%; float: left; text-align: center; font-size: 24px;"> ` + this.disName + `送货单 </div>

                               <div style="width: 33%; float: left;  text-align: right; font-size: 10px; ">
                                <div style="line-height: 18px;">共` + totalPriPage + `页-第 ` + i + `页</div>
                               <div style="line-height: 18px;">时间: ` + this.todayDate +`</div>
                               </div>
                            </div>
                          </div>`;
                        $('#' + "page" + i).append(header);


                        var content = `<div class="content_bill" style="width: 90%; margin-left: 5%;float: left; "></div>`

                        $('#page' + i).append(content);

                        var left = `<div class="left_bill" style="float: left; width: 100%;"></div>`
                        $('.content_bill:eq(' + newi + ')').append(left);

                        var oneTitle = `<div style="box-sizing: border-box; float:left; width: 100%;  line-height: 24px; text-align: center;font-size: 13px;border-bottom: 1px solid gray;border-top: 1px solid gray;">
                                <div style="box-sizing: border-box; float:left; width: 5%; border-right: 1px solid gray; border-left: 1px solid gray;">序号</div>
                                <div style="box-sizing: border-box; float:left; width: 35%; border-right: 1px solid gray; ">品名</div>
                                <div style="box-sizing: border-box; float:left; width: 10%; border-right: 1px solid gray; ">单位</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">数量</div>
                                <div style="box-sizing: border-box; float:left; width: 15%; border-right: 1px solid gray; ">单价</div>
                                <div style="box-sizing: border-box; float:left; width: 20%; border-right: 1px solid gray; ">金额(元)</div>
                                </div>`;
                        $('.left_bill:eq(' + newi + ')').append(oneTitle);


                        for (var j = i * totalGoods - totalGoods; j < i * totalGoods; j++) {

                            if (j < arrLen) {
                                var oneItem = `<div class="oneItem" style="float: left;width: 100%; border-bottom: 1px solid gray;
                                                                        line-height: 18px; text-align: center;font-size: 12px;"></div>`
                                $('.left_bill:eq(' + newi + ')').append(oneItem);
                                var index = Number(j) + 1;
                                var nxIndex = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 5%; border-right: 1px solid gray;border-left: 1px solid gray; border-right: 1px solid gray;" > `+ index + ` </div>`
                                var nxDgGoodsName = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 35%; border-right: 1px solid gray;text-align: left; padding-left: 4px;" >` + arr[j]['nxDistributerGoodsEntity']['nxDgGoodsName'] + `</div>`
                                var nxDoStandard = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 10%; border-right: 1px solid gray; text-align: center;" >` +arr[j]['nxDoPrintStandard']  + `</div>`
                                var nxDoWeight = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray;text-align: center; " >` + arr[j]['nxDoWeight'] + `</div>`
                                var nxDoPrice = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 15%; border-right: 1px solid gray; text-align: right; padding-right: 10px;" >` + arr[j]['nxDoPrice'] + `</div>`
                                var nxDoSubtotal = `<div style="word-break:keep-all;box-sizing: border-box;float: left; width: 20%; border-right: 1px solid gray; text-align: right;padding-right: 10px;" >` + arr[j]['nxDoSubtotal'] + `</div>`;

                                $('.oneItem:eq(' + j + ')').append(nxIndex);
                                $('.oneItem:eq(' + j + ')').append(nxDgGoodsName);
                                $('.oneItem:eq(' + j + ')').append(nxDoStandard);
                                $('.oneItem:eq(' + j + ')').append(nxDoWeight);
                                $('.oneItem:eq(' + j + ')').append(nxDoPrice);
                                $('.oneItem:eq(' + j + ')').append(nxDoSubtotal);

                            }

                        }

                        if(totalPriPage == i){

                            var subtotal = `<div class="" style="float: left; width: 100%;"></div>`
                            $('.content_bill:eq('+ newi +')').append(subtotal);


                            var sub = `<div style="box-sizing: border-box; float:left; width: 100%; line-height: 24px; text-align: center;font-size: 13px;border-bottom: 1px solid gray;">

                                <div style="box-sizing: border-box; float:left; width: 50%; border-left: 1px solid gray; padding-right: 10px; text-align: left;">
                                <div>合计大写:  `+this.subtotalHanzi + `</div>
                                </div>
                                <div style="box-sizing: border-box; float:left; width: 50%; border-right: 1px solid gray; text-align: right; padding-right: 10px;">合计:` + this.subtotal +`</div>
                                </div>`;
                            $('.left_bill:eq('+ newi +')').append(sub);

                            if(this.disUser.nxDistributerEntity.nxDistributerAddress !== 1){
                                var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%; float: left; " >
                               <div>地址:`+ this.disUser.nxDistributerEntity.nxDistributerAddress + `</div>
                               </div>
                            </div>
                          </div>`;
                            }else{
                                var footer = `<div class="myFooter" style="width: 100%; float:left; font-size: 14px;">
                            <div style=" width: 100%; line-height: 36px;  float:left;" >
                               <div style="width: 60%;margin-left: 5%; float: left; " >
                               <div>送货人: </div>
                               </div>
                               <div style="width: 33%; float: left; ">送货人: </div>
                            </div>
                          </div>`;
                            }
                            $('.left_bill:eq('+ newi +')').append(footer);

                        }


                    }
                    var fenye = `<div style="page-break-after:always"></div>`

                    $('#page1').append(fenye);
                }

                var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'>" +
                    "<style media=\"print\">" +
                    "    @page {" +
                    "      size: auto;  /* auto is the initial value */\n" +
                    "      margin: 0mm; /* this affects the margin in the printer settings */\n" +

                    "    }" +
                    "</style>" +
                    "</head><body style='height: 140px; margin: 0;'>";
                var content = "";
                for (var m = 0; m < totalPriPage; m++) {
                    var newm = m + 1;
                    var str = document.getElementById('page' + newm + '').innerHTML;
                    content = content + str;
                }


                printStr = printStr + content + "</body></html>";
                var pwin = window.open("Print.htm", "print"); //如果是本地测试，需要先新建Print.htm，如果是在域中使用，则不需
                pwin.document.write(printStr);
                pwin.document.close();     //这句很重要，没有就无法实现
                pwin.print();


            },

        }
    }
</script>

<style scoped>

    .category {
        padding-left: 0;
    }
    table tbody {
        display: block;
        height: 425px;
        padding-bottom: 40px;
        overflow-y: scroll;
    }
    table thead,
     tbody tr {
        display: table;width: 100%;table-layout: fixed;/*重要  表格固定算法*/
     }

    input{
        width: 60px;
    }



</style>
