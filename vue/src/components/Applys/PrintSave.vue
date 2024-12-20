<template>

    <!-- model-applycommit-->

    <div class="my-modal-back" id="modal_inventory" style="z-index: 99">
        <div class="my-modal" >
            <div class="">
                <div>{{title}}</div>
                <div class="">
                    <button type="button" @click="close" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="memberWxNameApply"></h4>
                </div>
                <div class="my_modal_body">
                    <!--<p>{{fatherName}}</p>-->
                    <h3>打印成功即将完成保存</h3>
                    <form class="form-horizontal">


                    </form>

                </div>

                <div class="my-modal-footer" v-if="showType == 'main'">
                    <button type="button" class="btn btn-sm btn-default margin-r-5"   @click="close">打印失败</button>
                    <button type="button" class="btn btn-sm btn-primary "  @click="abc">打印成功</button>
                </div>
                <div class="my-modal-footer" v-if="showType == 'print'">
                    <button type="button" class="btn btn-lg btn-default margin-r-5"   @click="close">打印完成</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>


</template>

<script>
   

    export default {
        name: "PrintSave",
        props:['showType'],

        data() {
            return {

                title: "打印结果",


            }
        },



        methods: {
        abc(){
            console.log("abcabc");
            this.$emit('printOk');

        },

            close: function () {
                $('#modal_inventory').hide();
                this.$emit('printCancel');

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
