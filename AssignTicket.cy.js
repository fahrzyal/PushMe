describe('Open Ticket - Service Desk', () => {
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

    it('Assign tiket dengan status OPEN', () => {
    // Buka menu Daftar Tiket
    cy.contains('Daftar Tiket', { timeout: 10000 }).click()
    // Pilih kasus
    cy.wait(3000)
    cy.get(':nth-child(1) > .relative.w-full > [style="backface-visibility: hidden;"] > .rounded-xl > .p-4').click()
    // Tekan tombol "Tindakan"
    cy.get('.space-y-4 > .bg-primary').click()
    // Pilih grup
    cy.get('.my-4 > .space-y-2 > :nth-child(2) > .inline-flex').click()
    // Klik "Submit"
    cy.get('.mt-4 > .inline-flex').click()
    })
})