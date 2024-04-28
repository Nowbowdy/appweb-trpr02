<script setup lang="ts">
import type Character from '../scripts/character'

const props = defineProps<{
  enemy: Character
}>();

function getExperienceString(rankingNumber: number)
{
    switch (rankingNumber) {
        case 1:
            return 'Débutant'
        case 2:
            return 'Confirmé'
        case 3:
            return 'Expert'
        case 4:
            return 'Maître'
        default:
            'Inconnu'
          break
    }
}
</script>

<template>

<div class="col-6">
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">{{ getExperienceString(props.enemy.experience) }} {{ props.enemy.name }}</h5>
                <p class="card-text" >{{ props.enemy.ship.name }} - {{ props.enemy.credit }} GC</p>

                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" :style="{ width: props.enemy.ship.vitality + '%' }">
                        {{ props.enemy.ship.vitality }}%
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>