<template>
    <div >        
        <h3 class="my-1" v-if="code">{{toCountry(code).country}}</h3>
        <b-row>
            <b-col cols="6" sm="4" md="3" lg="2" xl="1" class="p-1" v-for="(d,i) in data" v-bind:key="i">
                <div class="p-2 card" >
                    <span class="badge badge-primary">{{d.date | moment("ddd, MMM D")}}</span>
                    <div class="pt-1">
                         <div class="py-1" v-b-popover.hover.top="'Confirmed'">
                            <font-awesome-icon :icon="['fad', 'male']" fixed-width class="text-danger" /> 
                            {{ d.confirmed }}
                        </div>
                        <div class="py-1" v-b-popover.hover.top="'Deaths'">
                            <font-awesome-icon :icon="['fad', 'coffin-cross']" fixed-width :style="{ color: '#333333' }" /> 
                            {{ d.deaths }}
                        </div>
                        <div class="py-1" v-b-popover.hover.top="'Recovered'">
                            <font-awesome-icon :icon="['fad', 'life-ring']" fixed-width class="text-info"  /> 
                            {{ d.recovered }}
                        </div>
                    </div>
                </div>
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
