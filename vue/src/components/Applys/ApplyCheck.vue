<template>

    <!-- model-applycommit-->

    <div class="my-modal-back" id="modal_check" style="z-index: 999999999999">
        <div class="my-modal">
            <div class="">
                <div>{{title}}</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="memberWxNameApply1"></h4>
                </div>
                <div class="my_modal_body">
<!--                    <p>有未完成订单</p>-->
                    <h3>每个订单必须有单价和数量</h3>
                </div>
                <div class="row">
                    <button type="button" class="btn btn-bg btn-primary"   @click="close">检查单价和数量</button>
<!--                    <button type="button" class="btn btn-sm btn-primary "  @click="abc">打印成功</button>-->
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>

</template>

<script>
    

    export default {
        name: "ApplyCheck",

        data() {
            return {

                title: "不能打印保存配送单",


            }
        },



        methods: {


            close: function () {
                console.log("colsossoosososoososos")
                $('#modal_check').hide();
                // $('.blocker').hide();

            },


        }
    }
</script>

<style>



</style>
