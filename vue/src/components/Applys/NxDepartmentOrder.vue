<template>

    <!-- model-applycommit-->

    <div class="my-modal-back" id="nx_order_modal">
        <div class="my-modal" v-if="editType == 'edit'">
            <div class="">
                <div>修改订单</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">}}</h4>
                </div>
                <div class="my_modal_body">
                    <!--<p>{{fatherName}}</p>-->
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">商品</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyItem.nxDoGoodsName" placeholder="商品名称"
                                       value="name"/>
<!--                                <input type="hidden" :name="ckGoods.fatherId" :v-model="fatherId">-->
                            </div>
                            <div class="form-group" v-if="editType == 'add' ">
                                <div class="col-sm-2 control-label">所属大类</div>
<!--                                <div class="col-sm-10">-->
<!--                                    <select class="form-control" v-model="ckGoods.nxDis">-->
<!--                                        <option :value="item.nxDistributerGoodsId" v-for="item in goodsArr">{{item.nxDgGoodsName}}</option>-->
<!--                                    </select>-->
<!--                                </div>-->
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">订货数量</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyItem.nxDoQuantity"
                                       placeholder="订货数量"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 control-label">订货规格</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyItem.nxDoStandard"
                                       placeholder="申请规格"/>
                            </div>
                        </div>


<!--                        <div class="form-group" v-if="goodsType !== 1">-->
<!--                            <div class="col-sm-2 control-label">零售价格</div>-->
<!--                            <div class="col-sm-10">-->
<!--                                <input class="form-control" type="number" v-model="ckGoods.price"/>-->
<!--                            </div>-->
<!--                        </div>-->

                    </form>

                </div>
                <div class="my-modal-footer">
                    <button type="button" class="btn btn-sm btn-default" @click="close">关闭</button>
                    <button type="button" class="btn btn-sm btn-primary" @click="saveOrUpdate">确定</button>
                </div>
            </div>

        </div>

        <div class="my-modal" v-else>
            <div class="">
                <div>添加订单</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{depName}}</h4>
                </div>
                <div class="my_modal_body">
                    <!--<p>{{fatherName}}</p>-->
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">商品</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyQuantity" placeholder="商品名称"
                                       value="name"/>
                                <!--                                <input type="hidden" :name="ckGoods.fatherId" :v-model="fatherId">-->
                            </div>
<!--                            <div class="form-group" >-->
<!--                                <div class="col-sm-2 control-label">所属大类</div>-->
<!--                                <div class="col-sm-10">-->
<!--                                    <select class="form-control" v-model="ckGoods.nxDis">-->
<!--                                        <option :value="item.nxDistributerGoodsId" v-for="item in goodsArr">{{item.nxDgGoodsName}}</option>-->
<!--                                    </select>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">订货数量</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyQuantity"
                                       placeholder="订货数量"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 control-label">订货规格</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyStandard"
                                       placeholder="申请规格"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 control-label">备注</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="applyRemark"
                                       placeholder="申请规格"/>
                            </div>
                        </div>

                    </form>

                </div>
                <div class="my-modal-footer">
                    <button type="button" class="btn btn-sm btn-default" @click="close">关闭</button>
                    <button type="button" class="btn btn-sm btn-primary" @click="_saveFillOrder">确定</button>
                </div>
            </div>

        </div>

    </div>


</template>

<script>
    import api from '@/api/background/goods'
    import apio from '@/api/background/ckDep'

    export default {
        name: "NxDepartmentOrder",

        data() {
            return {
                itemDis: "",
                applyQuantity: "",
                applyStandard: "",
                applyRemark: "",


            }
        },
        props: ['applyItem', 'editType', 'userId',
            'depId','depFatherId', 'depName','beforeId'],


        methods: {


            _saveFillOrder: function (e) {

                var arriveDate = dateUtils.getArriveDate(0);
                var arriveOnlyDate = dateUtils.getArriveOnlyDate(0);
                var weekYear = dateUtils.getArriveWeeksYear(0);
                var week = dateUtils.getArriveWhatDay(0);
                var depDisGoodsId = -1;
                var purGoodsId = null;
                var price = null;
                var weight = null;
                var subtotal = null;
                var costSubtotal =  0 ;
                var profitSubtotal = 0;
                var profitScale = 0;

                var costPrice = this.data.itemDis.nxDgBuyingPrice;

                //是否是出库
                if(this.data.itemDis.nxDgPurchaseAuto == -1){
                    purGoodsId = -1;
                }

                //是否给weight赋值
                if(order.nxDoStandard == this.itemDis.nxDgGoodsStandardname){
                    weight = this.order.nxDoQuantity;
                    costSubtotal = (costPrice * weight).toFixed(1);
                }

                // 是否有部门商品
                if( this.data.itemDis.departmentDisGoodsEntity !== null){
                    depDisGoodsId = this.data.itemDis.departmentDisGoodsEntity.nxDepartmentDisGoodsId;
                    //是否是固定价格客户
                    if(this.data.depType == 'fixed'){
                        price = this.data.itemDis.departmentDisGoodsEntity.nxDdgOrderPrice;
                        if(order.nxDoStandard == this.itemDis.nxDgGoodsStandardname){
                            subtotal = (price * order.nxDoQuantity).toFixed(1);
                            // profitSubtotal = (Number(subtotal) - Number(costSubtotal)).toFixed(1);
                            profitSubtotal = (subtotal - costSubtotal).toFixed(1);
                            // profitScale = Number((Number(price) - Number(costPrice)) / Number(price) * 100).toFixed(2);
                            profitScale = (((price - costPrice) / price) * 100).toFixed(2);

                        }
                    }
                }

                var dg = {
                    nxDoDepDisGoodsId: depDisGoodsId, //
                    nxDoDisGoodsFatherId: this.itemDis.nxDgDfgGoodsFatherId,
                    nxDoDisGoodsGrandId: this.itemDis.nxDgDfgGoodsGrandId,
                    nxDoDisGoodsId: this.itemDis.nxDistributerGoodsId, //1
                    nxDoDepartmentId: this.depId,
                    nxDoDistributerId: this.disId,
                    nxDoDepartmentFatherId: this.depFatherId,
                    nxDoPrice: price,
                    nxDoWeight: weight,
                    nxDoSubtotal: subtotal,
                    nxDoQuantity: this.applyQuantity,
                    nxDoStandard: this.applyStandard,
                    nxDoRemark: this.applyRemark,
                    nxDoIsAgent: this.userId,
                    // nxDoArriveDate: arriveDate,
                    // nxDoArriveWeeksYear: weekYear,
                    // nxDoArriveOnlyDate: arriveOnlyDate,
                    // nxDoArriveWhatDay: week,
                    nxDoCostPriceUpdate: this.itemDis.nxDgBuyingPriceUpdate,
                    nxDoCostPrice: this.itemDis.nxDgBuyingPrice,
                    nxDoPurchaseGoodsId: this.itemDis.nxDgPurchaseAuto,
                    nxDoCostSubtotal: costSubtotal,
                    nxDoProfitSubtotal: profitSubtotal,
                    nxDoProfitScale: profitScale,
                    nxDoNxGoodsId: this.itemDis.nxDgNxGoodsId,
                    nxDoNxGoodsFatherId: this.itemDis.nxDgNxFatherId,
                    nxDoGoodsType: this.itemDis.nxDgPurchaseAuto,
                    nxDoPrintStandard: this.itemDis.nxDgGoodsStandardname,
                    nxDoGoodsName: this.itemDis.nxDistributerGoodsName,
                    nxDoPurchaseUserId: this.data.beforeId,
                };

                var that = this;
                saveOrder(dg).then(res => {
                    if (res.result.code == 0) {
                        wx.showToast({
                            title: '保存成功',
                        })

                        this.setData({
                            isSearching: false,
                            strArr: [],
                            searchStr: "",
                            toSearch: true
                        })
                        var arr = this.data.showArr;
                        arr.push(res.result.data);
                        that.setData({
                            showArr: arr,
                        })


                    } else {
                        wx.showToast({
                            title: '订单保存失败',
                            icon: 'none'
                        })
                    }
                })
            },



            // getFatherList: function () {
            //     api.queryTypeFatherList(this.ckGoods.type).then(res => {
            //         if (res) {
            //             this.fatherArr = res.data;
            //         }
            //     })
            // },
            //
            //
            close: function () {
                $('#nx_order_modal').hide();
                this.applyItem = "";
                this.editType = "";
                this.itemDis = "";
                this.applyQuantity = "";
                this.applyStandard = "";
                this.applyRemark = "";
                this.$emit('submit-add');

            },
            //
            //
            // getOutDepData: function () {
            //     var type = 1;
            //     apio.getOutDepList(type).then(res => {
            //         if (res) {
            //             this.outDepArr = res.data
            //         }
            //     })
            // },
            //
            //
            // saveOrUpdate: function (event) {
            //     if (this.ckGoods.goodsId) {
            //         api.updateGoods(JSON.stringify(this.ckGoods)).then(res => {
            //             $('#modal_inventory').hide();
            //             // this.goodsId = null;
            //             // this.ckGoods = {};
            //             this.ckGoods = {
            //                 // outDepId: '',
            //                 type: this.goodsType
            //             };
            //             this.$emit('submit-add');
            //         })
            //     } else {
            //         console.log("save")
            //         api.saveGoods(this.ckGoods).then(res => {
            //             if (res.code == 0) {
            //                 $('#modal_inventory').hide();
            //                 this.$emit('submit-add');
            //                 this.ckGoods = {
            //                     // outDepId: '',
            //                     type: this.goodsType
            //                 };
            //                 // this.goodsId = null;
            //
            //             }
            //         })
            //     }
            // },

        }
    }
</script>

<style>


</style>
