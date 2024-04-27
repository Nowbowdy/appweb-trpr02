<script setup lang="ts">

const props = defineProps({
  playerName: String,

})

</script>



<template>

    <div class="col-6">
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Informations joueur</h5>
                <p class="card-text" >{{ props.playerName }}</p>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>