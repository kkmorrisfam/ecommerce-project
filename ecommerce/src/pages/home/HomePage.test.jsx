import { it, expect, describe, vi, beforeEach } from 'vitest';
import {render, screen, within} from '@testing-library/react'
import { HomePage } from './HomePage';
import '@testing-library/jest-dom/vitest';
// import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { MemoryRouter } from 'react-router';

vi.mock('axios');
 //we use this to create what will run when we 
        // mock axios.get
describe('HomePage component', ()=> {
    let loadCart;

    beforeEach(()=>{
        loadCart = vi.fn();

       
        axios.get.mockImplementation(async (urlPath)=> {
            if(urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                        stars: 4,
                        count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    }]
                }
            }
        })
    });
    
    it('displays the products correct', async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        );
        //look for the data-testid from Products
        // we use getAll because we're getting more than one
        // use findAll instead so that it waits for data to load (returns promise)
        const productContainers = await screen.findAllByTestId('product-container');

        //check results
        expect(productContainers.length).toBe(2);

        // to find things within the 1st product container, use within
        expect(
            within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')            
        ).toBeInTheDocument();
        
        expect(
            within(productContainers[1]).getByText('Intermediate Size Basketball')            
        ).toBeInTheDocument();
        

    });
});