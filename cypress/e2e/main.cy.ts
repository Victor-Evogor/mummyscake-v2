import cyp  from "cypress"

/// <reference types="cypress" />

const cy:any = cyp

describe("test suite", ()=> {

    beforeEach(()=>{
        cy.visit("/")
    })

    it("passes",async ()=>{
        
    })
})

