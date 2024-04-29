<script setup lang="ts">
import { Modal } from 'bootstrap'
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  trigger: Number,
  title: String,
  body: String,
  cancelButton: String,
  confirmButton: String,
  cancelButtonStyle: String,
  confirmButtonStyle: String
})

const emit = defineEmits(['onModalConfirmed'])

const modal = ref<Modal | null>(null)

onMounted(() => {
  if (document.querySelector('#confirm-modal')) {
    modal.value = new Modal('#confirm-modal')
  }
})

watch(() => props.trigger, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    modal.value?.show()
  }
})

const confirm = () => {
  emit('onModalConfirmed')
}
</script>

<template>
  <div
    class="modal fade"
    id="confirm-modal"
    tabindex="-1"
    aria-labelledby="confirm-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            data-bs-dismiss="modal"
            class="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ body }}
        </div>
        <div class="modal-footer">
          <button
            name="confirmer"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-primary"
            :style="{ display: props.confirmButtonStyle }"
            @click="confirm"
          >
            {{ confirmButton }}
          </button>
          <button
            name="annuler"
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-secondary"
            :style="{ display: props.cancelButtonStyle }"
          >
            {{ cancelButton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
