<script setup lang="ts">
import type  Player  from '../scripts/player';

const props = defineProps<{
  player: Player
}>();

</script>


<template>
    <div class="col-6">
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">{{ props.player.experience }} {{ props.player.name }}</h5>
                <p class="card-text" >{{ props.player.ship.shipName }} - {{ props.player.score }} GC</p>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" :style="{ width: props.player.ship.vitality + '%' }">
                        {{ props.player.ship.vitality }}%
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>