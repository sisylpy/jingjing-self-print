<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <p>{{ message }}</p>
        <div class="modal-buttons">
          <button @click="onConfirm">确认</button>
          <button @click="onCancel">取消</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ConfirmationModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      message: {
        type: String,
        default: '是否需要保存订单？'
      }
    },
    emits: ['confirm', 'cancel'],
    methods: {
      onConfirm() {
        this.$emit('confirm');
      },
      onCancel() {
        this.$emit('cancel');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 300px;
  }
  
  .modal-buttons {
    margin-top: 20px;
  }
  
  .modal-buttons button {
    margin: 0 10px;
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>
  