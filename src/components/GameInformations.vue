<script setup lang="ts">

const props = defineProps<{
  enemyCount: number
}>();

</script>



<template>

    <div class="row">
        <div class="col-12">
            <div class="card text-center">
                <div class="card-body">
                    <h3 class="card-title">Mission en cours...</h3>
                    <h5>Objectif: Vaincre 5 vaisseaux ennemis</h5>
                    <p class="card-text">{{ props.enemyCount }}/5</p>
                </div>
            </div>
        </div>
    </div>

</template>