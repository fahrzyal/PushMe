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

    it('Tambah Pengguna', () => {
        // Buka menu Manajemen Pengguna
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        // Klik "Pengguna"
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(1) > a > .peer\\/menu-button').click()
        cy.wait(4000)
        // Klik "Tambah User"
        cy.get('.items-center.justify-between > .inline-flex').click()
        // Isi Form User Baru
        cy.get('#badge').type('000000{enter}')
        cy.get('#\:r1t\:-form-item > .inline-flex').click()
        cy.wait(3000)
        cy.get('#nama').type('Dummy User')
        // PIlih Profile
        cy.get('.space-y-4 > :nth-child(3) > .inline-flex').click()
        cy.get('[role="option"]').should('be.visible')
        cy.get('[role="option"]').eq(4).click()
        // Klik "Simpan"
        cy.get('.flex-col-reverse > .inline-flex').click()
    })

    it('Edit Pengguna', () => {
        // Buka menu Manajemen Pengguna
        cy.contains('Manajemen Pengguna', { timeout: 10000 }).click()
        cy.get('.mx-3\\.5 > .min-w-0 > :nth-child(1) > a > .peer\\/menu-button').click()
        cy.wait(4000)
        // Cari Pengguna
        cy.get('.relative.w-full > .relative > .flex').type('000000{enter}')
        cy.wait(3000)
        cy.get(':nth-child(1) > :nth-child(7) > .inline-flex').click()
        // Edit Informasi User
        cy.get('.grid > :nth-child(3) > .text-sm').type('Dum') //Tambah Alias
        cy.get('.grid > :nth-child(6) > .leading-none').click // Tambah Atasan
        cy.wait(3000)
        cy.get('#\:r2c\:').type('000000{enter}')
        cy.get('.space-y-4 > .inline-flex').click()
        cy.get('#radix-\:r25\:-trigger-group-requestor').click()
        cy.get('#\:r1d\:-form-item > :nth-child(4) > .peer').click()
        cy.get('.space-y-4 > .inline-flex')
        cy.get('.flex-col > .inline-flex').click()
    })
})