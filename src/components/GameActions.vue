<script setup lang="ts">

</script>

<template>
    <div class="row mt-3">
        <div class="col-12">
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">Que voulez-vous faire ? ...</h5>
                    <div class="col-6 mx-auto">
                        <div class="row">
                            <button @click="$emit('continueCombat')" type="button" class="btn btn-outline-danger">Attaquer !</button>
                            <button @click="$emit('quitCombat')" type="button" class="btn btn-outline-warning">Terminer la mission...</button>
                            <button @click="$emit('quitCombatAndHeal')" type="button" class="btn btn-outline-success">Terminer la mission et réparer le vaisseau !</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>