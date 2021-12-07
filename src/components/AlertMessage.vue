<template>
    <div class="alert"
        :style="{backgroundColor:
            messageType == 'error' ? '#f44336' :
            messageType == 'warning' ? '#ff9800' :
            messageType == 'info' ? '#2196F3' :
            messageType == 'success' ? '#4CAF50' : '#FFF'}">
        <span :style="{backgroundColor:
            messageType == 'error' ? '#f44336' :
            messageType == 'warning' ? '#ff9800' :
            messageType == 'info' ? '#2196F3' :
            messageType == 'success' ? '#4CAF50' : '#FFF'}"
            class="closebtn" onclick="this.parentElement.style.display='none';">&times;
        </span>
        {{messageType}}! {{description}}
    </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    description: {
      type: String
    },
    messageType: {
      type: String
    }
  }
}
</script>

<style scoped>
.alert {
  padding: 20px;
  color: white;
  opacity: 1;
  transition: opacity 0.6s;
  margin-bottom: 15px;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: #333;
}
</style>
