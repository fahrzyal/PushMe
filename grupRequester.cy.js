describe('Manajemen Pengguna - Service Desk', () => {
    beforeEach( () => {
        // Kunjungi halaman login
        cy.visit('https://pushme-stagging.pusri.dev/login')

        // Login sebagai user
        cy.get('.space-y-6 > :nth-child(1)').type('1102871') // Input Username
        cy.get('.space-y-6 > :nth-child(2)').type('bypass')  // Input Password
        cy.get('.bg-primary').click() // Klik tombol "Login"

        // Verifikasi bahwa URL berubah ke dashboard setelah login berhasil
        cy.url({ timeout: 10000 }).should('include', '/dashboard')

        // Ganti role
        cy.get('[data-cy="user-menu-button"] > .hidden').click() // Buka menu user
        cy.contains('div[role="menuitem"]', 'Service Desk', { timeout: 3000 }).click() // Pilih role "Service Desk"

        // Verifikasi role sudah terganti
        cy.contains('Requester').should('be.visible')
    })

    it('Create Group', () => {
        // Buka menu Manajemen Pengguna
        cy.wait(3000)
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        // Klik "Grup Requester"
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(3) > a > .peer\\/menu-button').click()
        // Pilih Grup Requester
        cy.get(':nth-child(4) > .text-center > .px-4').click()
        cy.get(':nth-child(1) > .pt-0 > .flex-col > :nth-child(1) > .flex > .peer').click()
        cy.get(':nth-child(1) > .pt-0 > .flex-col > :nth-child(2) > .flex > .peer').click()
        cy.get(':nth-child(1) > .pt-0 > .flex-col > :nth-child(3) > .flex > .peer').click()
        cy.get(':nth-child(2) > .pt-0 > .flex-col > .justify-between > .flex > .peer').click()
        cy.get(':nth-child(3) > .pt-0 > .flex-col > :nth-child(1) > .flex > .peer').click()
        cy.get(':nth-child(3) > .pt-0 > .flex-col > :nth-child(2) > .flex > .peer').click()
        cy.get(':nth-child(3) > .pt-0 > .flex-col > :nth-child(3) > .flex > .peer').click()
        cy.get(':nth-child(4) > .pt-0 > .flex-col > :nth-child(1) > .flex > .peer').click()
        cy.get(':nth-child(4) > .pt-0 > .flex-col > :nth-child(2) > .flex > .peer').click()
        cy.get(':nth-child(5) > .pt-0 > .flex-col > :nth-child(1) > .flex > .peer').click()
        cy.get(':nth-child(5) > .pt-0 > .flex-col > :nth-child(2) > .flex > .peer').click()
        cy.get(':nth-child(5) > .pt-0 > .flex-col > :nth-child(3) > .flex > .peer').click()
        cy.get(':nth-child(6) > .pt-0 > .flex-col > :nth-child(1) > .flex > .peer').click()
        cy.get(':nth-child(6) > .pt-0 > .flex-col > :nth-child(2) > .flex > .peer').click()
        cy.get(':nth-child(6) > .pt-0 > .flex-col > :nth-child(3) > .flex > .peer').click()
    })

    it('Edit Nama Group', () => {
        // Buka menu Manajemen Pengguna
        cy.wait(3000)
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        // Klik "Grup Requester"
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(3) > a > .peer\\/menu-button').click()
        // Pilih Grup
        cy.get('[aria-controls="radix-:r1q:"]').type('edit tes Dummy Group')
        cy.get('.space-y-4 > .inline-flex').click()
    })
})