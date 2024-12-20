<template>



    <div class="my-modal-back" id="warn_order">
        <div class="my-modal">
            <div class="">
                <div v-if="warnType == 'style'">检查订单样式</div>
                <div v-else-if="warnType == 'standard'">单位是否正确</div>
                <div v-else>订单是否缺少内容</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                </div>
                <div class="my_modal_body">
<!--                    <form class="form-horizontal">-->
                        <div class="row">
<!--                            <div class="col-sm-2 control-label">请检查:</div>-->
                            <h4 class="col-sm-10">{{warnWords}}</h4>
                        </div>


<!--                    </form>-->
<!---->
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
        name: "WarnOrder",
        computed: {

        },
        data() {
            return {


            }
        },

        props: ['warnWords', 'warnType'],

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
