import { it, expect, describe, vi, beforeEach } from 'vitest';
import {render, screen} from '@testing-library/react'
import { PaymentSummary } from './PaymentSummary';
import '@testing-library/jest-dom/vitest';
// import axios from 'axios';
import { MemoryRouter } from 'react-router';
// import userEvent from '@testing-library/user-event';

// vi.mock('axios');


describe('PaymentSummary component', ()=>{
    let loadCart;
    let paymentSummary;

    beforeEach(()=> {
       

        // axios.get.mockImplementation(async (urlPath) => {
        //     if(urlPath === '/api/payment-summary') {
        //         return {
        //             data: [{
        //                 "totalItems": 20,
        //                     "productCostCents": 24301,
        //                     "shippingCostCents": 499,
        //                     "totalCostBeforeTaxCents": 24800,
        //                     "taxCents": 2480,
        //                     "totalCostCents": 27280
        //             }]
        //         }
        //     }
        // })

        paymentSummary = {
            "totalItems": 20,
            "productCostCents": 24301,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 24800,
            "taxCents": 2480,
            "totalCostCents": 27280
        };

         loadCart = vi.fn();
    })

    it('displays the payment summary correctly', async () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
            </MemoryRouter>
        );

        // also works:
        // expect(
        //     screen.getByText('Items (20):')
        // ).toBeInTheDocument();

        expect(
            screen.getByTestId('payment-summary-totalItems')
        ).toHaveTextContent('20');

                //or this also works:
        // expect(
        //     within(screen.getByTestId('payment-summary-money-productCostCents')).getByText('$243.01')
        // ).toBeInTheDocument();

        expect(
            screen.getByTestId("payment-summary-money-productCostCents")
        ).toHaveTextContent('$243.01');

        expect(
            screen.getByTestId("payment-summary-money-shippingCostCents")
        ).toHaveTextContent('$4.99');

        expect(
            screen.getByTestId("payment-summary-money-totalCostBeforeTaxCents")
        ).toHaveTextContent('$248.00');

        expect(
            screen.getByTestId("payment-summary-money-taxCents")
        ).toHaveTextContent('$24.80');

        
         expect(
            screen.getByTestId("payment-summary-money-totalCostCents")
        ).toHaveTextContent('$272.80');

    })


}) 