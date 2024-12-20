<template>

    <!-- model-applycommit-->

    <div class="my-modal-back" id="modal_order">
        <div class="my-modal">
            <div class="">
                <div>修改订单</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                </div>
                <div class="my_modal_body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">商品名称</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="editOrder.nxDgGoodsName"
                                       value="name"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 control-label">数量</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="editOrder.nxDoQuantity"
                                       value="quantity"  placeholder="数量"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">单位</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="editOrder.nxDoStandard"
                                     value="standard"  placeholder="规格"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-2 control-label">备注</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="editOrder.nxDoRemark"
                                       value="remark"  placeholder="备注"/>
                            </div>
                        </div>


                    </form>

                </div>
                <div class="my-modal-footer">
                    <button type="button" class="btn btn-sm btn-default" @click="close">关闭</button>
                    <button type="button" class="btn btn-sm btn-primary" @click="updateOrderItem">确定</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>


</template>

<script>
    import api from '@/api/order/distributer'

    export default {
        name: "AddNewGoods",
        computed: {
            todayDate() {
                var today = new Date();
                var year = today.getFullYear();//获取年份
                var month = today.getMonth() + 1;//获取月份
                var day = today.getDate();//获取日期
                console.log(year + "-" + month + "-" + day);
                return year + "-" + month + "-" + day;
            },
        },
        data() {
            return {
                addGoods: "",

            }
        },

        props: ['editOrder'],

        methods: {

            close: function () {
                $('#modal_order').hide();
                this.goodsName = null;
                this.standard = null;
                this.$emit('submit-add');
            },


            updateOrderItem: function () {


                var data  = "id=" + this.editOrder.nxDepartmentOrdersId +
                    "&weight=" +this.editOrder.nxDoQuantity +
                    "&standard=" + this.editOrder.nxDoStandard +
                    "&remark=" + this.editOrder.nxDoRemark ;
                console.log(data);
                    api.updateOrder(data).then(res => {
                    if (res.code == 0) {
                        this.addGoods = res.data;
                        $('#modal_order').hide();
                        console.log(res.data);
                        this.$emit('updateOrder',res.data);


                    }
                })
            },

            // back: function () {
            //     $('#modal-warning').modal('hide')
            //
            //     this.$router.go(-1)
            // }
        }
    }
</script>

<style>


</style>
