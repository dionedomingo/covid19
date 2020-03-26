<template>
    <div >
        <h4 class="my-1" v-if="code"><img :src="flag(code)" />  {{toCountry(code).country}} </h4>
        <b-row>
            <b-col  class="p-1" v-for="(d,i) in data" v-bind:key="i">
                <div class="badge w-100 badge-primary">{{d.date | moment("ddd, MMM D")}}</div>
                <b-card no-body class="p-2 my-1 border-0 shadow-sm">
                    <div class="py-1" v-b-popover.hover.top="'+' + confirmedPop(d,i)">
                        <font-awesome-icon size="1x" :icon="['fad', 'male']" fixed-width :style="{ color: '#23395d' }" /> 
                        <span class="float-right"> <font-awesome-icon v-if="confirmedPop(d,i)" :icon="['fad', 'caret-up']" :style="{ color: 'red' }" />  {{ d.confirmed }}</span>
                    </div>
                </b-card>
                <b-card no-body class="p-2 shadow-sm border-0">
                    <div class="py-1" v-b-popover.hover.top="'+' + deathsPop(d,i)">
                        <font-awesome-icon size="1x" :icon="['fad', 'coffin-cross']" fixed-width :style="{ color: '#654321' }" /> 
                        <span class="float-right"> <font-awesome-icon v-if="deathsPop(d,i)" :icon="['fad', 'caret-up']" :style="{ color: 'red' }" />  {{ d.deaths }}</span>
                    </div>
                    <div hidden class="py-1" v-b-popover.hover.top="'Recovered'">
                        <font-awesome-icon :icon="['fad', 'life-ring']" fixed-width class="text-info"  /> 
                        {{ d.recovered }}
                    </div>
                </b-card>
            </b-col> 
        </b-row>
    </div>
</template>

<script>
    const iso = require('iso-3166-1');
    export default {
        props: ['code','data'] ,
        data(){
            return {
                iso_code:'' ,
            }
        },
        mounted() {
        },
        methods: {
            flag: function(code){
                return 'https://www.countryflags.io/'+this.toCountry(code).alpha2+'/flat/32.png';
            },
            deathsPop: function(d,i){
                let newDeaths = 0;
                if(i){
                    newDeaths = d.deaths - this.data[i-1].deaths;
                }
                return newDeaths 
            },
            confirmedPop: function(d,i){
                let newConf = 0;
                if(i){
                    newConf = d.confirmed - this.data[i-1].confirmed;
                }
                return newConf 
            },
            toCountry: function(code){
                const o = {
                    country: 'Unknown'
                };
                const oiso = iso.whereAlpha3(code);
                if(!oiso){
                    return {
                        country: code + ' ? '
                    };
                }
                return {...o,...oiso};
            }
        }
    }
</script>
