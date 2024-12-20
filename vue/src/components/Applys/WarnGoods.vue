<template>



    <div class="my-modal-back" id="warn_goods">
        <div class="my-modal">
            <div class="">
                <div>确认添加商品别名</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                </div>
                <div class="my_modal_body">
                    <form class="form-horizontal">
                        <div class="form-group">
                            <div class="col-sm-2 control-label">商品</div>
                            <div class="col-sm-10">
                               {{goodsName}}
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-2 control-label">订货数量</div>
                            <div class="col-sm-10">
                                {{aliasName}}
                            </div>
                        </div>


                    </form>
                </div>
                <div class="my-modal-footer">
                    <button type="button" class="btn btn-sm btn-default" @click="close">关闭</button>
                    <button type="button" class="btn btn-sm btn-primary" @click="saveNewStandard" v-if="warnType=='standard'">确定</button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>

    export default {
        name: "WarnGoods",
        computed: {

        },
        data() {
            return {


            }
        },

        props: ['goodsName', 'aliasName','warnType'],

        methods: {

            close: function () {
                $('#warn_order').hide();

            },


            saveNewStandard(){

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
