<script setup lang="ts">
    import { onMounted } from 'vue';
    import {loadScript} from '@paypal/paypal-js';

    const props = defineProps<{
        reference_id: string;
        price:number;
        clientId?:string;
    }>()

    onMounted(async() => {
        try {
            const paypal: any = await loadScript({
                clientId: props.clientId ?? "ARc0CcRTlluyOmdLdBIpfQiF83_KNnaGONA9eULeaq97UJ6rKlCtWzcRy-j5UIelD3BL40npGsX-K2nQ"
            });

            await paypal.Buttons({
                createOrder: function(data: any, actions: any) {
                    return actions.order.create({
                        purchase_units: [{
                            reference_id: props.reference_id,
                            amount: {
                                value: props.price.toString()
                            },
                        }],
                    });
                },
                onApprove: function(data: any, actions: any) {
                    return actions.order.capture().then(function(orderData: any) {
                    });
                },
                style: {
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                },
                fundingSource: paypal.FUNDING.PAYPAL,
            }).render('#paypal-button-container');
        } catch (error) {
            console.error(error);
        }
    });
</script>
<template>
    <div id="paypal-button-container"></div>
</template>
<style scoped>
</style>