<template>
  <div class="coModal">
    <div class="modalInner">
      <div class="top">
        <p class="u3">{{message}}</p>
      </div>
      <div class="bottom">
        <Button
          class="button"
          @click.native="onClick('cancel')"
        >
          <span class="u2 buttonText">{{type === 'normal' ? 'Cancel' : 'Ok'}}</span>
        </Button>
        <Button
          class="button"
          v-if="type === 'normal'"
          @click.native="onClick('submit')"
        >
          <span class="u2 buttonText">Ok</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Prop, Watch } from 'vue-property-decorator';
  import Button from '@/components/elements/Button.vue';

  @Component({
    components: { Button },
  })
  export default class Modal extends Vue {
    @Prop({ required: true }) public message!: string;
    @Prop({ required: false, default: 'normal' }) public type!: string;

    public onClick(type: string) {
      switch (type) {
        case 'submit':
          this.$emit('onSubmit');
          break;
        case 'cancel':
          this.$emit('onCancel');
          break;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coModal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, .5);
    display: flex;

    .modalInner {
      padding: 10px 20px;
      background-color: #fff;
      border-radius: 5px;
      margin: auto;
    }

    .bottom {
      text-align: right;
    }

    .button {
      &:first-of-type {
        margin: 0 10px;
      }
    }

    .buttonText {
      color: #fff;
    }
  }
</style>
