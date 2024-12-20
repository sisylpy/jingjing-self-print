<template>

    <!-- model-applycommit-->

    <div class="my-modal-back" id="modal_add_new_goods">
        <div class="my-modal">
            <div class="">
                <div>添加临时商品</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                </div>
                <div class="my_modal_body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">商品名称</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="goodsName"
                                       value="name"/>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">单位</div>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="standard"
                                     value="standard"  placeholder="规格"/>
                            </div>
                        </div>

                    </form>

                </div>
                <div class="my-modal-footer">
                    <button type="button" class="btn btn-sm btn-default" @click="close">关闭</button>
                    <button type="button" class="btn btn-sm btn-primary" @click="saveNewGoods">确定</button>
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
            disId() {
                return this.$store.state.disUser.nxDistributerEntity.nxDistributerId;
            },
        },
        data() {
            return {
                addGoods: "",

            }
        },

        props: ['goodsName', 'standard'],

        methods: {

            close: function () {
                $('#modal_add_new_goods').hide();

            },


            saveNewGoods: function () {
                var goods = {
                        nxDgGoodsId: "-1",
                        nxDgPullOff: 0,
                        nxDgGoodsStatus: 0,
                        nxDgBuyingPriceIsGrade: 0,
                        nxDgBuyingPrice: "0.1",
                        nxDgBuyingPriceUpdate: this.todayDate,
                        nxDgDistributerId: this.disId,
                        nxDgGoodsName: this.goodsName,
                        nxDgGoodsStandardname: this.standard,
                        nxDgGoodsInventoryType: 1,
                        nxDgNxGoodsFatherColor: "#20afb8",
                        nxDgGoodsFile: 'goodsImage/logo.jpg',
                        nxDistributerStandardEntities: []
                    };


                api.saveNewGoods(goods).then(res => {
                    if (res.code == 0) {
                        this.addGoods = res.data;
                        $('#modal_add_new_goods').hide();
                        console.log(res.data);
                        this.$emit('submit-add',res.data);


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
